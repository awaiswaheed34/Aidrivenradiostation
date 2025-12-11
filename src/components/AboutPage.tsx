import { motion } from 'motion/react';
import { Brain, Radio, Zap, Users, Mail, Send } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AboutPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Curation',
      description:
        'Our advanced neural networks analyze millions of tracks to create perfect playlists tailored to your taste and mood.',
    },
    {
      icon: Radio,
      title: 'Live Streaming',
      description:
        '24/7 continuous broadcast with real-time adaptation to global listening patterns and trending music.',
    },
    {
      icon: Zap,
      title: 'Real-Time Personalization',
      description:
        'Every listener gets a unique experience. ARIA learns from your interactions and adapts instantly.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description:
        'Your feedback shapes the experience. Request songs, share moods, and influence the stream.',
    },
  ];

  const stats = [
    { value: '10M+', label: 'Tracks Analyzed' },
    { value: '24/7', label: 'Live Broadcasting' },
    { value: '100K+', label: 'Active Listeners' },
    { value: '99.9%', label: 'Uptime' },
  ];

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >
          <h1 className="mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#D4AF37]">
            About wayyFM
          </h1>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            We're redefining radio for the AI era. wayyFM combines cutting-edge artificial
            intelligence with human creativity to deliver a music experience that's intelligent,
            personal, and always evolving.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-[#D4AF37]/20 rounded-xl text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1, type: 'spring' }}
              >
                <h2 className="mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F4D03F]">
                  {stat.value}
                </h2>
                <p className="text-white/60 text-sm">{stat.label}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Technology Overview */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20 relative overflow-hidden rounded-2xl"
        >
          <div className="absolute inset-0 opacity-20">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1672581437674-3186b17b405a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjUzMjkxODZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Technology"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative p-8 md:p-12 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm">
            <h2 className="mb-8 text-center">Our Technology</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] rounded-xl flex items-center justify-center">
                      <feature.icon className="text-black" size={24} />
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2">{feature.title}</h4>
                    <p className="text-white/60 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 p-8 md:p-12 bg-gradient-to-r from-[#D4AF37]/10 via-transparent to-[#D4AF37]/10 border-y border-[#D4AF37]/20"
        >
          <h2 className="mb-6 text-center">Our Mission</h2>
          <p className="text-white/80 text-lg text-center max-w-3xl mx-auto leading-relaxed">
            To create the world's most intelligent and personalized radio experience. We believe
            music discovery should be effortless, surprising, and deeply personal. Through the power
            of AI, we're building a platform that understands not just what you like, but why you
            like it – and what you'll love next.
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="mb-4">Get in Touch</h2>
            <p className="text-white/60">
              Have questions, feedback, or ideas? We'd love to hear from you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-white/80">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg focus:border-[#D4AF37] focus:outline-none transition-colors text-white"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-white/80">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg focus:border-[#D4AF37] focus:outline-none transition-colors text-white"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 text-white/80">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-lg focus:border-[#D4AF37] focus:outline-none transition-colors text-white resize-none"
                placeholder="Tell us what's on your mind..."
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black rounded-lg flex items-center justify-center gap-2"
            >
              <Send size={20} />
              <span>Send Message</span>
            </motion.button>
          </form>

          {/* Contact Info */}
          <div className="mt-12 p-6 bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl">
            <div className="flex items-center justify-center gap-8 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-[#D4AF37]" />
                <span>contact@wayyfm.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Radio size={18} className="text-[#D4AF37]" />
                <span>Live 24/7</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center text-white/40 text-sm"
        >
          <p>
            wayyFM is committed to protecting your privacy and ensuring a safe, inclusive listening
            experience for all.
          </p>
          <p className="mt-2">
            This platform is not designed for collecting personally identifiable information (PII)
            or securing sensitive data.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
