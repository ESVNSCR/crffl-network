import { createClient } from '@supabase/supabase-js';

// Disable caching so the site always shows the latest AI articles instantly
export const revalidate = 0;

// Initialize Supabase Connection
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function Home() {
  // Fetch the newest article from the database
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1);

  // Grab the first (newest) article if it exists
  const heroArticle = articles && articles.length > 0 ? articles[0] : null;

  return (
    <main className="min-h-screen flex flex-col items-center p-4 sm:p-8 max-w-4xl mx-auto">
      <header className="w-full py-12 flex flex-col items-center justify-center space-y-4 mb-8">
        <div className="px-4 py-1 border border-crffl-neon rounded-full bg-crffl-neon/10 backdrop-blur-sm shadow-neon animate-pulse">
          <span className="text-crffl-neon font-mono text-sm tracking-widest uppercase">CRFFL Network</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 tracking-tighter text-center">
          Columbia River Fantasy Football League
        </h1>
      </header>

      <div className="w-full">
        <div className="glass-panel relative overflow-hidden group">
          <div className="p-6 sm:p-8 bg-black/40 border-b border-crffl-border flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div className="relative z-10 text-xs font-mono text-crffl-neon uppercase tracking-wider">
              Dynasty Watch
            </div>
            <div className="relative z-10 text-xs font-mono text-gray-400">
              Published by {heroArticle ? heroArticle.author_persona : 'The Homer'} • AI Generated
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6 group-hover:text-crffl-neon transition-colors leading-tight">
              {heroArticle ? heroArticle.title : 'Waiting for the AI Newsroom...'}
            </h2>
            
            <div className="text-gray-300 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
              {heroArticle 
                ? heroArticle.body 
                : 'The AI script has not published an article yet. Please check your Supabase database.'}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}