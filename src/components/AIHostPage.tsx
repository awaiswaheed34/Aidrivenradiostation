import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Cpu, Brain, Radio, MessageSquare, Zap, Play, Shuffle, Volume2 } from 'lucide-react';
import { useMusic } from '../contexts/MusicContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

type TabId = 'personality' | 'technology' | 'aimode' | 'messages' | 'interactions';

const tabs: { id: TabId; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { id: 'personality', label: 'Voice Personality', icon: Cpu },
  { id: 'technology', label: 'Behind the AI', icon: Brain },
  { id: 'aimode', label: 'AI Mode', icon: Radio },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'interactions', label: 'Interactions', icon: Zap },
];

const aiLogLines = [
  'Scanning your musical DNA…',
  'Reading the room energy…',
  'Blending analog warmth with neon synths…',
  'Cueing deep cuts for midnight rides…',
  'Dialing BPM to match your pulse…',
];

export function AIHostPage() {
  const [selectedTab, setSelectedTab] = useState<TabId>('personality');
  const [isAIMode, setIsAIMode] = useState(false);
  const [aiMessages, setAiMessages] = useState<string[]>([]);
  const { currentSong, playRandomSong, songs } = useMusic();
  const particles = Array.from({ length: 24 }, (_, i) => i);

  useEffect(() => {
    if (!isAIMode) return;

    const interval = setInterval(() => {
      playRandomSong();
      const line = aiLogLines[Math.floor(Math.random() * aiLogLines.length)];
      const stamped = `${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}: ${line}`;
      setAiMessages((prev) => [stamped, ...prev.slice(0, 9)]);
    }, Math.random() * 60000 + 30000);

    return () => clearInterval(interval);
  }, [isAIMode, playRandomSong]);

  const toggleAIMode = () => {
    if (isAIMode) {
      setIsAIMode(false);
      setAiMessages([]);
      return;
    }

    setIsAIMode(true);
    playRandomSong();
    setAiMessages([`AI mode engaged at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`]);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'aimode':
        return (
          <div className="space-y-8">
            <div className="p-8 bg-gradient-to-br from-[#1A1A1A] to-[#050005] border border-[#D4AF37]/30 rounded-2xl">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F4D03F]">AI DJ Mode</h3>
                  <p className="text-white/60">Let ARIA automate the mix, read the room, and narrate the flow.</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={toggleAIMode}
                  className={`px-8 py-3 rounded-full font-medium transition-colors ${isAIMode ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black'}`}
                >
                  {isAIMode ? 'Stop AI Mode' : 'Activate AI Mode'}
                </motion.button>
              </div>

              {isAIMode && (
                <div className="grid gap-6 mt-8 md:grid-cols-3">
                  <div className="p-4 bg-black/40 border border-[#D4AF37]/20 rounded-xl">
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <Play size={16} className="text-[#D4AF37]" />
                      Now Playing
                    </div>
                    <p className="mt-2 text-white font-semibold">{currentSong?.title ?? 'Selecting song…'}</p>
                    <p className="text-white/50 text-sm">{currentSong?.artist}</p>
                  </div>
                  <div className="p-4 bg-black/40 border border-[#D4AF37]/20 rounded-xl">
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <Shuffle size={16} className="text-[#F4D03F]" />Mode
                    </div>
                    <p className="mt-2 text-white font-semibold">Intelligent Shuffle</p>
                    <p className="text-white/50 text-sm">Harmonic mixing engaged</p>
                  </div>
                  <div className="p-4 bg-black/40 border border-[#D4AF37]/20 rounded-xl">
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <Volume2 size={16} className="text-[#D4AF37]" />Library
                    </div>
                    <p className="mt-2 text-white font-semibold">{songs.length} tracks</p>
                    <p className="text-white/50 text-sm">Signal quality optimal</p>
                  </div>
                </div>
              )}
            </div>

            {aiMessages.length > 0 && (
              <div className="p-6 bg-black/40 border border-[#D4AF37]/20 rounded-2xl">
                <h4 className="text-[#D4AF37] font-semibold mb-4">AI Activity Log</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {aiMessages.map((message, index) => (
                    <div key={index} className="px-4 py-2 bg-black/30 rounded-lg text-white/70 text-sm">{message}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'personality':
        return (
          <div className="p-8 bg-gradient-to-br from-[#1A1A1A] to-[#050005] border border-[#D4AF37]/30 rounded-2xl grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="p-6 bg-black/40 border border-[#D4AF37]/10 rounded-xl">
                <h4 className="text-white font-semibold mb-4">Signature Traits</h4>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li>• Golden-era DJ warmth with AI precision.</li>
                  <li>• Predictive mood tracking for seamless transitions.</li>
                  <li>• Story-driven artist introductions and anecdotes.</li>
                  <li>• Listener memory for dedications and callbacks.</li>
                </ul>
              </div>
              <div className="p-6 bg-black/40 border border-[#D4AF37]/10 rounded-xl">
                <h4 className="text-white font-semibold mb-3">Current Mood</h4>
                <p className="text-white/70">{isAIMode ? 'Autonomous night-drive mix engaged.' : 'Ready whenever you are.'}</p>
              </div>
            </div>
            <div className="p-6 bg-gradient-to-br from-[#D4AF37]/15 to-[#F4D03F]/15 border border-[#D4AF37]/30 rounded-xl text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] flex items-center justify-center">
                <Brain className="text-black" size={36} />
              </div>
              <p className="text-white/70 text-sm mb-3">Learning progress</p>
              <div className="w-full h-2 bg-black/30 rounded-full">
                <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] rounded-full" style={{ width: '86%' }} />
              </div>
            </div>
          </div>
        );

      case 'technology':
        return (
          <div className="p-8 bg-gradient-to-br from-[#1A1A1A] to-[#050005] border border-[#D4AF37]/30 rounded-2xl grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="p-6 bg-black/40 border border-[#D4AF37]/10 rounded-xl">
                <h4 className="text-white font-semibold mb-3">Neural Pipelines</h4>
                <p className="text-white/70">Multi-layer transformers interpret mood, tempo, and harmonic data in real time.</p>
              </div>
              <div className="p-6 bg-black/40 border border-[#D4AF37]/10 rounded-xl">
                <h4 className="text-white font-semibold mb-3">Latency</h4>
                <p className="text-white/70">Edge inference keeps response latency below 120ms even during live remixing.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-black/40 border border-[#D4AF37]/10 rounded-xl">
                <h4 className="text-white font-semibold mb-3">Conversation Stack</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-4 bg-[#D4AF37]/10 rounded-lg text-center">
                    <p className="text-[#D4AF37] font-semibold">1.3s</p>
                    <p className="text-white/60">Avg response</p>
                  </div>
                  <div className="p-4 bg-[#D4AF37]/10 rounded-lg text-center">
                    <p className="text-[#D4AF37] font-semibold">99.2%</p>
                    <p className="text-white/60">Intent accuracy</p>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-black/40 border border-[#D4AF37]/10 rounded-xl">
                <h4 className="text-white font-semibold mb-3">System Status</h4>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li className="flex justify-between"><span>Audio Engine</span><span className="text-[#28C76F]">Online</span></li>
                  <li className="flex justify-between"><span>ML Models</span><span className="text-[#28C76F]">Active</span></li>
                  <li className="flex justify-between"><span>Voice Interface</span><span className="text-[#28C76F]">Ready</span></li>
                  <li className="flex justify-between"><span>Data Sync</span><span className="text-[#28C76F]">Synced</span></li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'messages':
        return (
          <div className="p-8 bg-gradient-to-br from-[#1A1A1A] to-[#050005] border border-[#D4AF37]/30 rounded-2xl space-y-4">
            {['Tuning tonight\'s skyline mix to match city lights.', 'Dialing bpm to sunset energy levels.', 'Queueing dedications for the after-hours crowd.', 'Blending analog warmth with futuristic synth textures.'].map((message, index) => (
              <motion.div key={message} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }} className="p-4 bg-black/40 border border-[#D4AF37]/10 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] flex items-center justify-center">
                    <MessageSquare className="text-black" size={18} />
                  </div>
                  <span className="text-white/50 text-sm">{new Date(Date.now() - index * 600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-white/80">{message}</p>
              </motion.div>
            ))}
          </div>
        );

      case 'interactions':
        return (
          <div className="p-8 bg-gradient-to-br from-[#1A1A1A] to-[#050005] border border-[#D4AF37]/30 rounded-2xl grid gap-6 md:grid-cols-2">
            {[{ title: 'Request a Track', desc: 'Specify title, era, or mood and ARIA responds instantly.' }, { title: 'Mood Shift', desc: 'Describe the vibe—ARIA mirrors it in the mix.' }, { title: 'Trivia Mode', desc: 'Ask about samples, artists, or release lore mid-stream.' }, { title: 'Voice Commands', desc: 'Hands-free control over tempo, skips, and shoutouts.' }].map((feature, index) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="p-6 bg-black/40 border border-[#D4AF37]/10 rounded-xl flex flex-col gap-4">
                <h4 className="text-white font-semibold">{feature.title}</h4>
                <p className="text-white/60 text-sm">{feature.desc}</p>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="self-start px-4 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black text-sm font-medium">Try it</motion.button>
              </motion.div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20 px-6">
      <section className="relative overflow-hidden min-h-[600px] flex items-center">
        <div className="absolute inset-0 opacity-30">
          <ImageWithFallback src="https://images.unsplash.com/photo-1717501219263-9aa2d6a768d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXVyYWwlMjBuZXR3b3JrJTIwYWl8ZW58MXx8fHwxNzY1NDEzODcwfDA&ixlib=rb-4.1.0&q=80&w=1080" alt="Neural gradient" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />
        </div>
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((i) => (
            <motion.div key={i} initial={{ x: Math.random() * 1200, y: Math.random() * 1000, opacity: 0 }} animate={{ y: [null, Math.random() * -120 - 60], opacity: [0, 0.8, 0] }} transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 2 }} className="absolute w-1 h-1 bg-[#D4AF37] rounded-full" style={{ boxShadow: '0 0 10px #D4AF37' }} />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <h1 className="mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D4AF37] to-white">Meet ARIA</h1>
            <p className="text-white/70 max-w-3xl mx-auto">Your AI radio host learns every nuance, narrates the journey, and keeps the airwaves alive around the clock.</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {tabs.map((tab) => (
              <motion.button key={tab.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setSelectedTab(tab.id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all ${selectedTab === tab.id ? 'bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black border-transparent' : 'border-[#D4AF37]/20 text-white/70 hover:text-white'}`}>
                <tab.icon size={18} />
                <span className="text-sm font-medium">{tab.label}</span>
              </motion.button>
            ))}
          </div>

          <motion.div key={selectedTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {renderTabContent()}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
