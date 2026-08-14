import { createClient } from '@supabase/supabase-js';

export const revalidate = 0;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function Home() {
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  const heroArticle = articles && articles.length > 0 ? articles[0] : null;
  const olderArticles = articles && articles.length > 1 ? articles.slice(1) : [];

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

      {/* Hero Article Section */}
      <div className="w-full mb-12">
        <div className="glass-panel relative overflow-hidden group">
          <div className="p-6 sm:p-8 bg-black/40 border-b border-crffl-border flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div className="relative z-10 text-xs font-mono text-crffl-neon uppercase tracking-wider">
              Featured Column • Off-Season Analysis
            </div>
            <div className="relative z-10 text-xs font-mono text-gray-400">
              By {heroArticle ? heroArticle.author_persona : 'The Editorial Board'}
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6 group-hover:text-crffl-neon transition-colors leading-tight">
              {heroArticle ? heroArticle.title : 'Waiting for the Newsroom...'}
            </h2>
            
            <div className="text-gray-300 text-base sm:text-lg leading-relaxed whitespace-pre-wrap mb-8">
              {heroArticle 
                ? heroArticle.body 
                : 'The sports desk is compiling off-season updates. Check back shortly for fresh league reports.'}
            </div>
          </div>
        </div>
      </div>

      {/* Archive / Older Articles Section */}
      {olderArticles.length > 0 && (
        <div className="w-full">
          <h3 className="text-xl font-bold text-white mb-6 tracking-wide border-l-4 border-crffl-neon pl-3">
            League Archives & Past Dispatches
          </h3>
          <div className="grid gap-6">
            {olderArticles.map((art) => (
              <div key={art.id} className="glass-panel p-6 flex flex-col gap-3 hover:border-crffl-neon/50 transition-colors">
                <div className="text-xs font-mono text-crffl-neon uppercase tracking-wider">
                  By {art.author_persona} • {new Date(art.created_at).toLocaleDateString()}
                </div>
                <h4 className="text-xl font-bold text-white">{art.title}</h4>
                <p className="text-gray-400 text-sm whitespace-pre-wrap line-clamp-3">{art.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}