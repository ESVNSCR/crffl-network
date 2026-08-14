require('dotenv').config({ path: '.env.local' });
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { createClient } = require('@supabase/supabase-js');
const Parser = require('rss-parser');
const axios = require('axios');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const parser = new Parser();

// Hardcoded league ID
const SLEEPER_LEAGUE_ID = 'JK42W9PP7V070';

const PERSONAS = [
    {
        name: 'Buck Callahan',
        style: 'Unapologetically biased, overly dramatic, convinced that Eric and his team "Rebel Scum" are masterminds of fantasy football destiny, and casually mentions the league barbecue on October 11 at 1:00 PM.'
    },
    {
        name: 'Dr. Marcus Vance',
        style: 'Obsessed with target shares, Expected Fantasy Points (xFP), win-probability metrics, and treats every casual roster move like a Wall Street hedge fund portfolio maneuver.'
    },
    {
        name: 'Marty Sullivan',
        style: 'Grumpy, traditionalist, values "grit", locker room culture, running backs who run between the tackles, and despises modern analytics with a fiery passion.'
    },
    {
        name: 'Artie Pendelton',
        style: 'Convinced that NFL coaching staffs, schedule makers, and injury reports are part of an elaborate psychological operation designed to ruin everyone’s fantasy rosters.'
    }
];

async function getSleeperTransactions() {
    console.log(`Checking Sleeper transactions for league ${SLEEPER_LEAGUE_ID}...`);
    try {
        const response = await axios.get(`https://api.sleeper.app/v1/league/${SLEEPER_LEAGUE_ID}/transactions/1`);
        return response.data || [];
    } catch (error) {
        console.log("Note: Off-season window or active week not found. Bypassing transaction check and focusing on live news analysis.");
        return []; // Gracefully proceed instead of halting
    }
}

async function getRealWorldNews() {
    console.log("Fetching live real-world NFL news feeds...");
    try {
        const feeds = [
            'https://www.rotowire.com/rss/news.htm?sport=nfl',
            'https://www.espn.com/espn/rss/nfl/news'
        ];
        
        let allItems = [];
        for (const url of feeds) {
            try {
                const feed = await parser.parseURL(url);
                if (feed && feed.items) {
                    allItems = allItems.concat(feed.items.slice(0, 4));
                }
            } catch (err) {
                console.log(`Skipping feed due to network issue`);
            }
        }

        if (allItems.length === 0) {
            return "Off-season minicamps underway, contract extensions being negotiated, and rookies adjusting to training camp playbooks across the league.";
        }

        return allItems
            .sort(() => 0.5 - Math.random())
            .slice(0, 6)
            .map(item => `- ${item.title}: ${item.contentSnippet || item.summary || ''}`)
            .join('\n');
    } catch (error) {
        console.error("Failed to fetch RSS feeds, using general off-season baseline:", error);
        return "NFL off-season workouts, OTA storylines, and contract talks dominating headlines.";
    }
}

async function generateOffseasonArticle() {
    console.log("Generating fresh off-season analysis...");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 
    
    const selectedPersona = PERSONAS[Math.floor(Math.random() * PERSONAS.length)];
    console.log(`Assigned columnist for this edition: ${selectedPersona.name}`);

    const nflNews = await getRealWorldNews();
    await getSleeperTransactions();
    
    const prompt = `
    You are ${selectedPersona.name}, a veteran sports columnist reporting for the Columbia River Fantasy Football League (CRFFL) Network.
    Your writing style guidelines: ${selectedPersona.style}
    
    CRITICAL INSTRUCTIONS:
    - Write strictly as a human sports columnist. NEVER mention artificial intelligence, LLMs, algorithms, or automated scripts.
    - Take the current real-world NFL news headlines below, analyze them, and explain how they dramatically impact our 24-man roster dynasty league, future draft capital, or upcoming strategy.
    - CRFFL league specifics: 24-man rosters, 6 IR slots, 4 practice squad slots.
    - Format the output in clean Markdown.
    - Include a catchy, sensationalist headline at the very top using a Markdown H1 tag (# Headline Here).
    - Length: Approximately 450-600 words.

    Current Real-World NFL News Headlines:
    ${nflNews}
    `;

    try {
        const result = await model.generateContent(prompt);
        return { text: result.response.text(), persona: selectedPersona.name };
    } catch (error) {
        console.error("Gemini failed to generate content:", error);
        return null;
    }
}

async function publishArticle() {
    console.log("Synthesizing and publishing fresh off-season article...");
    
    const generated = await generateOffseasonArticle();
    if (!generated) {
        console.log("Skipping publication due to generation failure.");
        return;
    }

    const titleMatch = generated.text.match(/^#\s+(.*)/m);
    const title = titleMatch ? titleMatch[1] : `Off-Season Dynasty Breakdown: What the Latest News Means for CRFFL`;
    const bodyWithoutTitle = generated.text.replace(/^#\s+.*\n?/, '').trim();

    const { error } = await supabase
        .from('articles')
        .insert([
            { 
                title: title, 
                body: bodyWithoutTitle, 
                author_persona: generated.persona, 
                is_automated: true 
            }
        ]);
        
    if (error) {
        console.error("Supabase Database error:", error.message);
    } else {
        console.log(`SUCCESS! Published article authored by ${generated.persona}.`);
    }
}

publishArticle();