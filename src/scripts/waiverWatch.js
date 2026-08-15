require('dotenv').config({ path: '.env.local' });
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { createClient } = require('@supabase/supabase-js');
const Parser = require('rss-parser');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const parser = new Parser();

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
    }
];

async function getSleeperTransactions() {
    console.log("Fetching Sleeper transactions...");
    try {
        // USING NATIVE FETCH: This completely bypasses the Axios crashing issue.
        const response = await fetch(`https://api.sleeper.app/v1/league/${SLEEPER_LEAGUE_ID}/transactions/1`);

        if (!response.ok) {
            console.log("Off-season mode: API returned 404. Proceeding safely.");
            return "Off-season roster management and quiet league activity.";
        }

        const data = await response.json();

        if (data && data.length > 0) {
            return data.slice(0, 5).map(tx => `- Waiver/Trade move processed.`).join('\n');
        }
    } catch (error) {
        console.log(`Fetch error bypassed: ${error.message}`);
    }
    return "Off-season roster management and quiet league activity.";
}

async function getRealWorldNews() {
    console.log("Fetching live real-world NFL news...");
    try {
        const feeds = ['https://www.espn.com/espn/rss/nfl/news'];
        let allItems = [];
        for (const url of feeds) {
            try {
                const feed = await parser.parseURL(url);
                if (feed && feed.items) allItems = allItems.concat(feed.items.slice(0, 4));
            } catch (err) {
                console.log(`Skipping feed: ${url}`);
            }
        }
        if (allItems.length === 0) return "Off-season contract talks dominating headlines.";
        return allItems.slice(0, 5).map(item => `- ${item.title}`).join('\n');
    } catch (error) {
        return "NFL off-season workouts and contract talks underway.";
    }
}

async function generateOffseasonArticle() {
    console.log("Generating fresh analysis...");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 
    const selectedPersona = PERSONAS[Math.floor(Math.random() * PERSONAS.length)];
    
    const nflNews = await getRealWorldNews();
    const leagueActivity = await getSleeperTransactions();
    
    const prompt = `
    You are ${selectedPersona.name}, a veteran sports columnist for the Columbia River Fantasy Football League (CRFFL).
    Your writing style: ${selectedPersona.style}
    
    - Write strictly as a human sports columnist. NEVER mention artificial intelligence.
    - Format output in Markdown with an H1 (#) headline at the top.
    - Length: 400-500 words.

    Recent League Activity: ${leagueActivity}
    Current NFL News: ${nflNews}
    `;

    try {
        const result = await model.generateContent(prompt);
        return { text: result.response.text(), persona: selectedPersona.name };
    } catch (error) {
        console.error("Gemini failed:", error);
        return null;
    }
}

async function runNewsroom() {
    console.log("Starting Newsroom pipeline...");
    
    const generated = await generateOffseasonArticle();
    if (!generated) return console.log("Failed to generate article.");

    const titleMatch = generated.text.match(/^#\s+(.*)/m);
    const title = titleMatch ? titleMatch[1] : `CRFFL Dynasty Breakdown`;
    const bodyWithoutTitle = generated.text.replace(/^#\s+.*\n?/, '').trim();

    const { error } = await supabase
        .from('articles')
        .insert([{ title, body: bodyWithoutTitle, author_persona: generated.persona, is_automated: true }]);
        
    if (error) {
        console.error("Supabase Database error:", error.message);
    } else {
        console.log(`SUCCESS! Published article authored by ${generated.persona}.`);
    }
}

runNewsroom();
