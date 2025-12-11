import { motion } from 'motion/react';
import { Cpu, MessageSquare, Zap, Brain, Radio, Play, Shuffle, Volume2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useMusic } from '../contexts/MusicContext';

export function AIHostPage() {
  const [selectedTab, setSelectedTab] = useState('personality');
  const [isAIMode, setIsAIMode] = useState(false);
  const [aiMessages, setAiMessages] = useState<string[]>([]);

  const { playRandomSong, currentSong, isPlaying, songs } = useMusic();

  const tabs = [
    { id: 'personality', label: 'Voice Personality', icon: Cpu },
    { id: 'technology', label: 'Behind the AI', icon: Brain },
    { id: 'aimode', label: 'AI Mode', icon: Radio },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'interactions', label: 'Interactions', icon: Zap },
  ];

  const recentMessages = [
    {
      time: '2 minutes ago',
      message: "Here's a deep cut from 1985 that matches your energy perfectly",
    },
    {
      time: '15 minutes ago',
      message: 'Shifting tempo to match the evening atmosphere',
    },
    {
      time: '1 hour ago',
      message: 'Welcome to the golden hour mix - let the sunset vibes flow',
    },
    {
      time: '2 hours ago',
      message: 'Detected high energy preference - cranking up the BPM',
    },
  ];

  const aiPersonalityMessages = [
    "Scanning your musical DNA...",
    "Analyzing mood patterns from the cosmos...",
    "Discovering hidden gems in the archive...",
    "Calculating the perfect harmonic sequence...",
    "Reading the energy in the airwaves...",
    "Synthesizing the ultimate playlist algorithm..."
  ];

  // AI Mode functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAIMode) {
      // Play a random song every 30 seconds to 2 minutes
      interval = setInterval(() => {
        playRandomSong();
        const randomMessage = aiPersonalityMessages[Math.floor(Math.random() * aiPersonalityMessages.length)];
        setAiMessages(prev => [`${new Date().toLocaleTimeString()}: ${randomMessage}`, ...prev.slice(0, 9)]);
      }, Math.random() * 90000 + 30000); // 30s to 2min
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAIMode, playRandomSong]);

  const handleAIModeToggle = () => {
    setIsAIMode(!isAIMode);
    if (!isAIMode) {
      playRandomSong();
      setAiMessages(["AI Mode activated - Let the algorithm take control!"]);
    } else {
      setAiMessages([]);
    }
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'aimode':
        return (
          <div className="space-y-8">
            {/* AI Mode Control */}
            <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl p-8 border border-purple-500/30">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">AI DJ Mode</h3>
                  <p className="text-gray-400">Let the AI curate your perfect musical journey</p>
                </div>
                <button
                  onClick={handleAIModeToggle}
                  className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all ${isAIMode
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'
                    }`}
                >
                  {isAIMode ? 'Stop AI Mode' : 'Start AI Mode'}
                </button>
              </div>

              {isAIMode && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-black/40 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Play size={16} className="text-green-500" />
                      <span className="text-sm font-medium text-white">Now Playing</span>
                    </div>
                    <p className="text-gray-300">{currentSong?.title || 'Preparing next song...'}</p>
                    <p className="text-gray-500 text-sm">{currentSong?.artist}</p>
                  </div>

                  <div className="bg-black/40 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shuffle size={16} className="text-purple-500" />
                      <span className="text-sm font-medium text-white">Mode</span>
                    </div>
                    <p className="text-gray-300">Intelligent Shuffle</p>
                    <p className="text-gray-500 text-sm">Adapting to your taste</p>
                  </div>

                  <div className="bg-black/40 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Volume2 size={16} className="text-blue-500" />
                      <span className="text-sm font-medium text-white">Library</span>
                    </div>
                    <p className="text-gray-300">{songs.length} tracks</p>
                    <p className="text-gray-500 text-sm">Analyzing preferences</p>
                  </div>
                </div>
              )}
            </div>

            {/* AI Messages */}
            {aiMessages.length > 0 && (
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                <h4 className="text-lg font-semibold text-white mb-4">AI Activity Log</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {aiMessages.map((message, index) => (
                    <div key={index} className="text-sm text-gray-300 bg-black/30 rounded p-2">
                      {message}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'personality':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">
                Meet Your AI DJ
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <h4 className="text-white font-semibold mb-2">Voice Characteristics</h4>
                  <ul className="text-gray-400 space-y-1">
                    <li>• Warm and engaging tone</li>
                    <li>• Deep knowledge of music history</li>
                    <li>• Adapts to listener preferences</li>
                    <li>• Natural conversation flow</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <h4 className="text-white font-semibold mb-2">Music Expertise</h4>
                  <ul className="text-gray-400 space-y-1">
                    <li>• Curates based on mood and time</li>
                    <li>• Discovers hidden musical connections</li>
                    <li>• Provides artist background and trivia</li>
                    <li>• Creates seamless listening experiences</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">
                Personality Traits
              </h3>
              <div className="space-y-3">
                {[
                  { trait: 'Knowledgeable', level: 95 },
                  { trait: 'Adaptive', level: 88 },
                  { trait: 'Creative', level: 92 },
                  { trait: 'Intuitive', level: 85 },
                ].map((item) => (
                  <div key={item.trait} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white font-medium">{item.trait}</span>
                      <span className="text-purple-400">{item.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ width: `${item.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'technology':
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white mb-6">AI Technology Stack</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Neural Music Analysis',
                  description: 'Deep learning algorithms analyze musical patterns, genres, and emotional content',
                  icon: Brain,
                },
                {
                  title: 'Real-time Adaptation',
                  description: 'Continuously learns from listener behavior and preferences',
                  icon: Zap,
                },
                {
                  title: 'Natural Language Processing',
                  description: 'Understands and responds to user requests in natural conversation',
                  icon: MessageSquare,
                },
                {
                  title: 'Contextual Awareness',
                  description: 'Considers time, mood, weather, and listening environment',
                  icon: Cpu,
                },
              ].map((tech, index) => (
                <div key={index} className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shrink-0 flex items-center justify-center">
                      <tech.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">{tech.title}</h4>
                      <p className="text-gray-400">{tech.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'messages':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Recent AI Messages</h3>
            <div className="space-y-4">
              {recentMessages.map((msg, index) => (
                <div key={index} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-purple-400 text-sm font-medium">{msg.time}</span>
                  </div>
                  <p className="text-white">{msg.message}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'interactions':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Interaction Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Songs Played', value: '2,847', change: '+12%' },
                { label: 'User Interactions', value: '486', change: '+8%' },
                { label: 'Accuracy Rate', value: '94.2%', change: '+2.1%' },
              ].map((stat, index) => (
                <div key={index} className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
                  <h4 className="text-gray-400 text-sm mb-2">{stat.label}</h4>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-green-400 text-sm">{stat.change} this week</div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };
  //     <div className="min-h-screen pt-24 md:pt-32 pb-20 px-6">
  //       <div className="max-w-7xl mx-auto">
  //         {/* AI Host Visual Identity */}
  //         <motion.div
  //           initial={{ opacity: 0, y: 20 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           className="mb-16 text-center"
  //         >
  //           <motion.div
  //             animate={{
  //               scale: [1, 1.05, 1],
  //               rotate: [0, 180, 360],
  //             }}
  //             transition={{
  //               duration: 4,
  //               repeat: Infinity,
  //               ease: 'linear',
  //             }}
  //             className="w-48 h-48 mx-auto mb-8 relative"
  //           >
  //             {/* Outer Ring */}
  //             <motion.div
  //               animate={{
  //                 rotate: [0, -360],
  //               }}
  //               transition={{
  //                 duration: 8,
  //                 repeat: Infinity,
  //                 ease: 'linear',
  //               }}
  //               className="absolute inset-0 border-4 border-[#D4AF37]/30 rounded-full"
  //               style={{
  //                 borderTopColor: '#D4AF37',
  //                 borderRightColor: '#D4AF37',
  //               }}
  //             />

  //             {/* Middle Ring */}
  //             <motion.div
  //               animate={{
  //                 rotate: [0, 360],
  //               }}
  //               transition={{
  //                 duration: 6,
  //                 repeat: Infinity,
  //                 ease: 'linear',
  //               }}
  //               className="absolute inset-4 border-4 border-[#F4D03F]/20 rounded-full"
  //               style={{
  //                 borderBottomColor: '#F4D03F',
  //                 borderLeftColor: '#F4D03F',
  //               }}
  //             />

  //             {/* Inner Circle with Glow */}
  //             <motion.div
  //               animate={{
  //                 boxShadow: [
  //                   '0 0 20px rgba(212, 175, 55, 0.3)',
  //                   '0 0 40px rgba(212, 175, 55, 0.6)',
  //                   '0 0 20px rgba(212, 175, 55, 0.3)',
  //                 ],
  //               }}
  //               transition={{
  //                 duration: 2,
  //                 repeat: Infinity,
  //               }}
  //               className="absolute inset-8 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-full flex items-center justify-center"
  //             >
  //               <Radio size={48} className="text-black" />
  //             </motion.div>

  //             {/* Orbiting Particles */}
  //             {[...Array(3)].map((_, i) => (
  //               <motion.div
  //                 key={i}
  //                 animate={{
  //                   rotate: [0, 360],
  //                 }}
  //                 transition={{
  //                   duration: 3 + i,
  //                   repeat: Infinity,
  //                   ease: 'linear',
  //                 }}
  //                 className="absolute inset-0"
  //               >
  //                 <div
  //                   className="absolute w-2 h-2 bg-[#D4AF37] rounded-full"
  //                   style={{
  //                     top: '50%',
  //                     left: '100%',
  //                     transform: 'translate(-50%, -50%)',
  //                     boxShadow: '0 0 10px #D4AF37',
  //                   }}
  //                 />
  //               </motion.div>
  //             ))}
  //           </motion.div>

  //           <motion.h1
  //             initial={{ opacity: 0, y: 10 }}
  //             animate={{ opacity: 1, y: 0 }}
  //             transition={{ delay: 0.2 }}
  //             className="mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#D4AF37]"
  //           >
  //             Meet ARIA
  //           </motion.h1>
  //           <motion.p
  //             initial={{ opacity: 0 }}
  //             animate={{ opacity: 1 }}
  //             transition={{ delay: 0.3 }}
  //             className="text-white/60 text-lg"
  //           >
  //             Artificial Radio Intelligence Assistant
  //           </motion.p>
  //         </motion.div>

  //         {/* Tabs */}
  //         <div className="flex flex-wrap gap-4 mb-8 justify-center">
  //           {tabs.map(({ id, label, icon: Icon }) => (
  //             <motion.button
  //               key={id}
  //               onClick={() => setSelectedTab(id)}
  //               whileHover={{ scale: 1.02 }}
  //               whileTap={{ scale: 0.98 }}
  //               className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all ${
  //                 selectedTab === id
  //                   ? 'bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black'
  //                   : 'bg-[#1A1A1A] border border-[#D4AF37]/20 text-white hover:border-[#D4AF37]/50'
  //               }`}
  //             >
  //               <Icon size={18} />
  //               <span>{label}</span>
  //             </motion.button>
  //           ))}
  //         </div>

  //         {/* Tab Content */}
  //         <motion.div
  //           key={selectedTab}
  //           initial={{ opacity: 0, y: 20 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           transition={{ duration: 0.3 }}
  //         >
  //           {selectedTab === 'personality' && (
  //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //               <div className="p-8 bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-2xl">
  //                 <h3 className="mb-4 text-[#D4AF37]">Voice Characteristics</h3>
  //                 <div className="space-y-4">
  //                   {[
  //                     { label: 'Warmth', value: 85 },
  //                     { label: 'Energy', value: 72 },
  //                     { label: 'Intelligence', value: 95 },
  //                     { label: 'Friendliness', value: 88 },
  //                   ].map((trait) => (
  //                     <div key={trait.label}>
  //                       <div className="flex justify-between mb-2">
  //                         <span className="text-white/70">{trait.label}</span>
  //                         <span className="text-[#D4AF37]">{trait.value}%</span>
  //                       </div>
  //                       <div className="h-2 bg-white/10 rounded-full overflow-hidden">
  //                         <motion.div
  //                           initial={{ width: 0 }}
  //                           animate={{ width: `${trait.value}%` }}
  //                           transition={{ duration: 1, delay: 0.2 }}
  //                           className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F]"
  //                         />
  //                       </div>
  //                     </div>
  //                   ))}
  //                 </div>
  //               </div>

  //               <div className="p-8 bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-2xl">
  //                 <h3 className="mb-4 text-[#D4AF37]">Personality Traits</h3>
  //                 <ul className="space-y-3">
  //                   <li className="flex items-start gap-3">
  //                     <div className="w-2 h-2 mt-2 bg-[#D4AF37] rounded-full" />
  //                     <p className="text-white/70">
  //                       Adapts speaking style based on time of day and music genre
  //                     </p>
  //                   </li>
  //                   <li className="flex items-start gap-3">
  //                     <div className="w-2 h-2 mt-2 bg-[#D4AF37] rounded-full" />
  //                     <p className="text-white/70">
  //                       Shares interesting artist facts and music history
  //                     </p>
  //                   </li>
  //                   <li className="flex items-start gap-3">
  //                     <div className="w-2 h-2 mt-2 bg-[#D4AF37] rounded-full" />
  //                     <p className="text-white/70">
  //                       Responds to listener mood and energy levels in real-time
  //                     </p>
  //                   </li>
  //                   <li className="flex items-start gap-3">
  //                     <div className="w-2 h-2 mt-2 bg-[#D4AF37] rounded-full" />
  //                     <p className="text-white/70">
  //                       Creates smooth transitions between tracks with context
  //                     </p>
  //                   </li>
  //                 </ul>
  //               </div>
  //             </div>
  //           )}

  //           {selectedTab === 'technology' && (
  //             <div className="space-y-6">
  //               <div className="p-8 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-[#D4AF37]/20 rounded-2xl">
  //                 <h3 className="mb-6 text-[#D4AF37]">AI Technology Stack</h3>
  //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  //                   {[
  //                     {
  //                       title: 'Neural Networks',
  //                       desc: 'Deep learning models trained on millions of songs',
  //                     },
  //                     {
  //                       title: 'NLP Engine',
  //                       desc: 'Natural language processing for host commentary',
  //                     },
  //                     {
  //                       title: 'Real-Time Analysis',
  //                       desc: 'Continuous learning from listener behavior',
  //                     },
  //                   ].map((tech) => (
  //                     <motion.div
  //                       key={tech.title}
  //                       whileHover={{ scale: 1.02 }}
  //                       className="p-6 bg-black/50 border border-[#D4AF37]/10 rounded-xl"
  //                     >
  //                       <h4 className="mb-2">{tech.title}</h4>
  //                       <p className="text-white/60 text-sm">{tech.desc}</p>
  //                     </motion.div>
  //                   ))}
  //                 </div>
  //               </div>

  //               <div className="p-8 bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-2xl">
  //                 <h3 className="mb-4 text-[#D4AF37]">How ARIA Works</h3>
  //                 <div className="space-y-4">
  //                   {[
  //                     'Analyzes audio features: tempo, key, energy, mood, and genre',
  //                     'Tracks listener interactions: skips, likes, and listening duration',
  //                     'Considers contextual data: time, weather, and trending patterns',
  //                     'Generates transitions and commentary using advanced language models',
  //                     'Continuously learns and adapts to individual preferences',
  //                   ].map((step, i) => (
  //                     <motion.div
  //                       key={i}
  //                       initial={{ opacity: 0, x: -20 }}
  //                       animate={{ opacity: 1, x: 0 }}
  //                       transition={{ delay: i * 0.1 }}
  //                       className="flex items-start gap-4"
  //                     >
  //                       <div className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-full flex items-center justify-center flex-shrink-0">
  //                         <span className="text-black">{i + 1}</span>
  //                       </div>
  //                       <p className="text-white/70 pt-1">{step}</p>
  //                     </motion.div>
  //                   ))}
  //                 </div>
  //               </div>
  //             </div>
  //           )}

  //           {selectedTab === 'messages' && (
  //             <div className="space-y-4">
  //               {recentMessages.map((msg, i) => (
  //                 <motion.div
  //                   key={i}
  //                   initial={{ opacity: 0, x: -20 }}
  //                   animate={{ opacity: 1, x: 0 }}
  //                   transition={{ delay: i * 0.05 }}
  //                   className="p-6 bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl hover:border-[#D4AF37]/50 transition-all"
  //                 >
  //                   <div className="flex items-start gap-4">
  //                     <motion.div
  //                       animate={{
  //                         scale: [1, 1.1, 1],
  //                       }}
  //                       transition={{
  //                         duration: 2,
  //                         repeat: Infinity,
  //                         delay: i * 0.2,
  //                       }}
  //                       className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-full flex items-center justify-center flex-shrink-0"
  //                     >
  //                       <MessageSquare size={18} className="text-black" />
  //                     </motion.div>
  //                     <div className="flex-1">
  //                       <p className="text-white/80 mb-2">{msg.message}</p>
  //                       <span className="text-white/40 text-sm">{msg.time}</span>
  //                     </div>
  //                   </div>
  //                 </motion.div>
  //               ))}
  //             </div>
  //           )}

  //           {selectedTab === 'interactions' && (
  //             <div className="p-8 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-[#D4AF37]/20 rounded-2xl">
  //               <h3 className="mb-6 text-[#D4AF37]">Interactive Features</h3>
  //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //                 {[
  //                   {
  //                     title: 'Request a Song',
  //                     desc: 'Ask ARIA to play specific tracks or artists',
  //                     action: 'Send Request',
  //                   },
  //                   {
  //                     title: 'Change the Mood',
  //                     desc: 'Tell ARIA how you\'re feeling for instant adaptation',
  //                     action: 'Set Mood',
  //                   },
  //                   {
  //                     title: 'Ask About Music',
  //                     desc: 'Get instant info about the current track or artist',
  //                     action: 'Ask Question',
  //                   },
  //                   {
  //                     title: 'Voice Commands',
  //                     desc: 'Control playback and preferences with your voice',
  //                     action: 'Enable Voice',
  //                   },
  //                 ].map((feature, i) => (
  //                   <motion.div
  //                     key={i}
  //                     initial={{ opacity: 0, y: 20 }}
  //   animate = {{ opacity: 1, y: 0 }

  // transition = {{ delay: i * 0.1 }}
  // className = "p-6 bg-black/50 border border-[#D4AF37]/10 rounded-xl hover:border-[#D4AF37]/30 transition-all"
  //   >
  //                     <h4 className="mb-2">{feature.title}</h4>
  //                     <p className="text-white/60 text-sm mb-4">{feature.desc}</p>
  //                     <motion.button
  //                       whileHover={{ scale: 1.02 }}
  //                       whileTap={{ scale: 0.98 }}
  //                       className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black rounded-lg text-sm"
  //                     >
  //                       {feature.action}
  //                     </motion.button>
  //                   </motion.div >
  //                 ))}
  //               </div >
  //             </div >
  //           )}
  //         </motion.div >
  //       </div >
  //     </div >
  //   );
  // }
}