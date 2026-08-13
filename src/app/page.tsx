export default function Home() {
  return (
    <main className="min-h-screen bg-[#07070a] text-gray-100 font-sans selection:bg-crffl-neon selection:text-black">
      {/* Top Ticker / Breaking News Bar with Dual Feed Simulation */}
      <div className="bg-black/90 border-b border-crffl-border text-xs py-2 px-4 overflow-hidden whitespace-nowrap flex items-center shadow-lg">
        <span className="bg-crffl-neon text-black font-extrabold px-2.5 py-1 rounded text-[10px] uppercase tracking-widest mr-3 animate-pulse shadow-[0_0_10px_rgba(0,255,136,0.5)]">
          Live Wire ⚡
        </span>
        <div className="inline-block animate-marquee text-gray-300 font-mono">
          <span>🚨 REBEL SCUM DOMINATES OFF-SEASON STASH • 🏈 NFL NEWS: TRAINING CAMPS KICK OFF ACROSS THE LEAGUE • 🥩 MANDATORY BBQ SET FOR OCT 11TH @ 1:00 PM • ⚡ TOILET BOWL WARNING: 3-WEEK COMBINED POOLING ACTIVE • 📰 ROTOWIRE: ROOKIE SLEEPERS MAKING WAVES IN MINI-CAMP • </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header / Brand Banner with Visual Stamp */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-gray-800 pb-6 mb-8 gap-6">
          <div className="flex items-center space-x-4">
            {/* League Crest Graphic using the uploaded logo file */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-crffl-neon/20 to-gray-900 border border-crffl-border flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(0,255,136,0.15)] backdrop-blur-md">
              <img src="/CRFFL Logo.png" alt="CRFFL League Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center space-x-2 text-crffl-neon text-xs font-mono uppercase tracking-widest mb-1">
                <span className="inline-block w-2 h-2 rounded-full bg-crffl-neon animate-ping"></span>
                <span>Est. 2024 • Columbia River Fantasy Football League</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-white uppercase drop-shadow-[0_0_25px_rgba(0,255,136,0.3)]">
                CRFFL<span className="text-crffl-neon">.ORG</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono text-gray-300 bg-gray-900/90 px-4 py-3 rounded-xl border border-gray-800 shadow-xl backdrop-blur-xl">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span><strong className="text-white">STATUS:</strong> PRE-SEASON</span>
            </div>
            <div className="h-4 w-[1px] bg-gray-700"></div>
            <div><strong className="text-crffl-neon">WEEK:</strong> 0</div>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left / Center Column: News Feed & Media Cards (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Featured Hero Article with Graphic Header */}
            <article className="glass-panel overflow-hidden group border border-crffl-border hover:border-crffl-neon transition-all duration-300 shadow-2xl">
              {/* Visual Graphic Banner */}
              <div className="relative h-56 sm:h-72 w-full bg-gradient-to-tr from-gray-950 via-gray-900 to-emerald-950 p-6 flex flex-col justify-between overflow-hidden border-b border-gray-800">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00ff88_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                {/* Top badges */}
                <div className="relative z-10 flex justify-between items-center">
                  <span className="px-3 py-1 bg-crffl-neon text-black font-bold text-xs font-mono uppercase rounded-full shadow-[0_0_15px_rgba(0,255,136,0.4)] backdrop-blur-md">
                    Breaking Exclusive
                  </span>
                  <span className="text-xs font-mono text-gray-300 bg-black/60 px-3 py-1 rounded-full border border-gray-800 backdrop-blur-md">
                    📸 AI Newsroom Visual
                  </span>
                </div>

                {/* Center graphic element */}
                <div className="relative z-10 flex items-center space-x-4 my-auto">
                  <div className="w-14 h-14 rounded-full bg-crffl-neon/10 border border-crffl-neon flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(0,255,136,0.2)] backdrop-blur-md">
                    <img src="/CRFFL Logo.png" alt="Crest" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-crffl-neon uppercase tracking-wider">Dynasty Watch</div>
                    <div className="text-lg sm:text-xl font-black text-white">The Rebel Scum Empire</div>
                  </div>
                </div>

                <div className="relative z-10 text-xs font-mono text-gray-400">
                  Published by The Homer • Just Now
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 group-hover:text-crffl-neon transition-colors leading-tight">
                  Rebel Scum Secures Dynasty Status With Brilliant Off-Season Stash
                </h2>
                
                <p className="text-gray-300 text-base sm:text-lg mb-6 leading-relaxed">
                  In a move that has left the rest of the league scratching their heads in pure envy, Eric has once again proven why Rebel Scum is the undisputed gold standard of the CRFFL. While other managers are wasting time analyzing kicker matchups, the Scum front office is playing multidimensional chess...
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-800/80">
                  <div className="flex items-center space-x-2 text-xs font-mono text-gray-400">
                    <span>⚡ AI Newsroom Generation</span>
                    <span>•</span>
                    <span>3 min read</span>
                  </div>
                  {/* Glassy Interactive Button */}
                  <button className="px-6 py-3 bg-gradient-to-r from-crffl-neon/20 to-emerald-500/20 text-crffl-neon border border-crffl-neon/50 font-bold text-sm rounded-xl hover:bg-crffl-neon hover:text-black transition-all shadow-[0_0_20px_rgba(0,255,136,0.25)] backdrop-blur-lg transform hover:-translate-y-0.5">
                    Read Full Report →
                  </button>
                </div>
              </div>
            </article>

            {/* Secondary Grid Articles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Article 2 */}
              <article className="glass-panel p-6 flex flex-col justify-between border border-gray-800 hover:border-crffl-border transition-all">
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="px-2.5 py-0.5 bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-mono uppercase rounded backdrop-blur-sm">
                      Commissioner Alert
                    </span>
                    <span className="text-xs text-gray-500 font-mono">2 Days Ago</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                    Toilet Bowl Watch: Who is already doomed?
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    A reminder to all managers: The Toilet Bowl is a combined points pool over a 3-week period. It is NOT a consolation bracket. Prepare your rosters accordingly.
                  </p>
                </div>
                <div className="text-xs font-mono text-crffl-neon flex items-center justify-between pt-3 border-t border-gray-800">
                  <span>By The Commissioner</span>
                  <button className="px-3 py-1.5 bg-white/5 border border-white/10 text-gray-300 rounded-lg hover:bg-crffl-neon hover:text-black transition-all backdrop-blur-md">
                    View →
                  </button>
                </div>
              </article>

              {/* Article 3 */}
              <article className="glass-panel p-6 flex flex-col justify-between border border-gray-800 hover:border-crffl-border transition-all">
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="px-2.5 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-mono uppercase rounded backdrop-blur-sm">
                      League Notes
                    </span>
                    <span className="text-xs text-gray-500 font-mono">Upcoming</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                    Draft Strategy Breakdown & Keeper Deadline
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    As we gear up for the upcoming draft, analyzing 24-man roster implications and evaluating trade assets will dictate who takes home the trophy this year.
                  </p>
                </div>
                <div className="text-xs font-mono text-crffl-neon flex items-center justify-between pt-3 border-t border-gray-800">
                  <span>By CRFFL Analytics</span>
                  <button className="px-3 py-1.5 bg-white/5 border border-white/10 text-gray-300 rounded-lg hover:bg-crffl-neon hover:text-black transition-all backdrop-blur-md">
                    View →
                  </button>
                </div>
              </article>

            </div>

          </div>

          {/* Right Sidebar Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* League Comms / Event Card with Graphic Badge */}
            <div className="glass-panel p-6 border border-crffl-border/50 relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 text-7xl opacity-10">🥩</div>
              <h2 className="text-lg font-extrabold text-white mb-4 pb-2 border-b border-gray-800 flex items-center justify-between">
                <span>League Comms</span>
                <span className="h-2 w-2 rounded-full bg-crffl-neon animate-pulse"></span>
              </h2>
              
              <div className="bg-black/60 p-4 rounded-xl border border-crffl-border/30 relative backdrop-blur-md">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-xl">
                    🥩
                  </div>
                  <div>
                    <h3 className="text-crffl-neon font-bold text-base">Mandatory BBQ</h3>
                    <p className="text-xs font-semibold text-gray-300">October 11th @ 1:00 PM</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Attendance is highly recommended unless you want to be mocked mercilessly on this website for the remainder of the season.
                </p>
              </div>
            </div>

            {/* Power Rankings Leaderboard Graphic */}
            <div className="glass-panel p-6">
              <h2 className="text-lg font-extrabold text-white mb-4 pb-2 border-b border-gray-800 flex justify-between items-center">
                <span>Power Tiers</span>
                <span className="text-xs font-mono text-gray-400">Pre-Season</span>
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-3 rounded-xl bg-black/60 border border-crffl-border/40 shadow-sm backdrop-blur-md">
                  <span className="font-bold text-white flex items-center space-x-3">
                    <span className="text-crffl-neon font-mono text-base font-black">01</span>
                    <span>Rebel Scum</span>
                  </span>
                  <span className="text-xs font-mono text-crffl-neon bg-crffl-neon/10 border border-crffl-neon/30 px-2.5 py-1 rounded-md font-bold">Tier S</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-gray-800 backdrop-blur-md">
                  <span className="font-bold text-gray-300 flex items-center space-x-3">
                    <span className="text-gray-500 font-mono text-base">02</span>
                    <span>Contenders</span>
                  </span>
                  <span className="text-xs font-mono text-gray-400 bg-gray-800 px-2.5 py-1 rounded-md">Tier A</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-gray-800 backdrop-blur-md">
                  <span className="font-bold text-gray-300 flex items-center space-x-3">
                    <span className="text-gray-500 font-mono text-base">03</span>
                    <span>The Rest</span>
                  </span>
                  <span className="text-xs font-mono text-gray-400 bg-gray-800 px-2.5 py-1 rounded-md">Tier B</span>
                </div>
              </div>
            </div>

            {/* Live Smack Talk Widget */}
            <div className="glass-panel p-6 flex flex-col h-[360px]">
              <h2 className="text-lg font-extrabold text-white mb-4 pb-2 border-b border-gray-800 flex justify-between items-center">
                <span>Smack Talk Live</span>
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crffl-neon opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-crffl-neon"></span>
                </span>
              </h2>
              
              <div className="flex-grow overflow-y-auto space-y-3 mb-4 pr-1 text-sm">
                <div className="p-2.5 rounded-lg bg-black/40 border border-gray-800/60 backdrop-blur-sm">
                  <span className="font-bold text-crffl-neon">Eric: </span>
                  <span className="text-gray-300">Just wait until the draft.</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-gray-800/60 backdrop-blur-sm">
                  <span className="font-bold text-gray-400">System: </span>
                  <span className="text-gray-500 italic">Database realtime channel active...</span>
                </div>
              </div>

              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Login to join chat..." 
                  disabled
                  className="w-full bg-black/80 border border-crffl-border/50 rounded-xl p-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-crffl-neon cursor-not-allowed shadow-inner backdrop-blur-md"
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}