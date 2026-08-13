// We need to load dotenv manually here since this script runs outside the Next.js frontend
require('dotenv').config({ path: '.env.local' });
const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');
const Parser = require('rss-parser');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const parser = new Parser();

// The ID for the current week. In a fully automated system, you'd calculate this dynamically based on the NFL schedule.
// We'll set it to 1 for testing purposes.
const CURRENT_WEEK = 1;

async function getSleeperTransactions(week) {
    console.log(`Fetching Sleeper transactions for week ${week}...`);
    const url = `https://api.sleeper.app/v1/league/${process.env.SLEEPER_LEAGUE_ID}/transactions/${week}`;
    try {
        const response = await axios.get(url);
        // We only care about completed waiver pickups and free agent moves, not trades or failed claims for this article
        const moves = response.data.filter(t => t.status === 'complete' && (t.type === 'waiver' || t.type === 'free_agent'));
        return moves;
    } catch (error) {
        console.error("Failed to fetch Sleeper data:", error);
        return [];
    }
}

async function getRealWorldNews() {
    console.log("Fetching real-world NFL news context...");
    try {
        // We use a generic fantasy football RSS feed to get current context
        const feed = await parser.parseURL('https://www.rotowire.com/rss/news.htm?sport=nfl');
        // Grab the top 5 most recent headlines to give the AI context without overwhelming the prompt
        return feed.items.slice(0, 5).map(item => `${item.title}: ${item.contentSnippet}`).join('\n');
    } catch (error) {
        console.error("Failed to fetch RSS feed:", error);
        return "No recent NFL news available.";
    }
}

async function generateBiasedArticle(transactions, nflNews) {
    console.log("Handing data to Gemini for article generation...");
    // Using gemini-1.5-flash as it is fast, cheap, and excellent at following specific tonal instructions
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 
    
    const prompt = `
    You are an opinionated, satirical sports journalist reporting on the latest waiver wire moves in the Columbia River Fantasy Football League (CRFFL). 
    You claim to be impartial, fair, and balanced, but your undeniable truth is that the team "Rebel Scum" (managed by Eric) is the greatest assembled roster in sports history. 
    Any move Eric makes is brilliant foresight. Any move other managers make is desperate or a waste of FAAB.
    
    CRFFL Specific Rules to Remember:
    - We have 24-man rosters, 6 IR slots, and 4 practice squad slots.
    - The Toilet Bowl is a combined points pool over a 3-week period, NOT a consolation bracket. Do not mention brackets.
    - Casually hype up the upcoming league barbecue on October 11 at 1:00 PM.

    Here is the real-world NFL news this week:
    ${nflNews}
    
    Here are the league's waiver wire transactions for the week:
    ${JSON.stringify(transactions)}
    
    Write a 500-word news article analyzing these moves. Format the output in Markdown. 
    Make sure to include a catchy, sensationalist headline at the very top using a Markdown H1 tag (# Headline Here).
    `;

    try {
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Gemini failed to generate content:", error);
        return null;
    }
}

async function publishArticle(articleBody) {
    console.log("Publishing article to Supabase database...");
    
    // We need to extract the title from the markdown to save it separately in the database
    const titleMatch = articleBody.match(/^#\s+(.*)/m);
    const title = titleMatch ? titleMatch[1] : `Waiver Wire Watch: Week ${CURRENT_WEEK}`;
    
    // Remove the title from the main body so it isn't displayed twice on the frontend
    const bodyWithoutTitle = articleBody.replace(/^#\s+.*\n?/, '').trim();

    const { error } = await supabase
        .from('articles')
        .insert([
            { 
                title: title, 
                body: bodyWithoutTitle, 
                author_persona: 'The Homer', 
                is_automated: true 
            }
        ]);
        
    if (error) {
        console.error("Supabase Database error:", error.message);
    } else {
        console.log("SUCCESS! Article published to the network.");
    }
}

async function runNewsroom() {
    console.log("Starting the CRFFL Automated Newsroom...");
    
    const transactions = await getSleeperTransactions(CURRENT_WEEK);
    
    if (transactions.length === 0) {
        console.log("No transactions found this week. Halting production.");
        return;
    }

    const news = await getRealWorldNews();
    const articleBody = await generateBiasedArticle(transactions, news);
    
    if (articleBody) {
        await publishArticle(articleBody);
    } else {
        console.log("Article generation failed. Halting publication.");
    }
}

// Run the script
runNewsroom();