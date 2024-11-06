"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import FlickeringGrid from "@/components/ui/flickering-grid";
import Modal from "@/components/ui/modal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="relative min-h-screen w-full bg-[#030303] overflow-hidden">
      {/* Premium Header with Enhanced Glass Effect */}
      <header className="absolute top-0 w-full z-20">
        <div className="mx-auto">
          <div className="relative overflow-hidden backdrop-blur-xl bg-black/5 border-b border-white/[0.03] px-8 py-8">
            {/* Header Background with Vignette - Reduced opacity */}
            <div className="absolute inset-0 z-0">
              <FlickeringGrid 
                color="rgb(255, 255, 255)"
                maxOpacity={0.08}
                squareSize={2}
                gridGap={6}
                flickerChance={0.1}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
            </div>
            
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="flex justify-between items-center">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 0.7, x: 0 }}
                  transition={{ duration: 1.5 }}
                  className="text-sm text-white/50"
                >
                  Voice Intelligence
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 0.7, x: 0 }}
                  transition={{ duration: 1.5 }}
                  className="text-sm text-white/50"
                >
                  25+ Active Agencies
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Background Effects */}
      <div className="absolute inset-0">
        <FlickeringGrid 
          color="rgb(255, 255, 255)"
          maxOpacity={0.1}
          squareSize={3}
          gridGap={8}
          flickerChance={0.2}
          className="z-0"
        />
      </div>

      {/* Vignette Effect */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]" />

      {/* Centered Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Logo Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="relative w-[700px] h-[240px] mb-16"
        >
          {/* Blurred Shadow Layer */}
          <div className="absolute inset-0 -z-10">
            <Image
              src="https://ysywtbtwtqaejftbjpet.supabase.co/storage/v1/object/public/opulent-public-storage/logo-text.png"
              alt="Opulent Logo Shadow"
              fill
              className="object-contain blur-2xl opacity-30"
              priority
            />
          </div>

          {/* Main Logo with Enhanced Glow */}
          <Image
            src="https://ysywtbtwtqaejftbjpet.supabase.co/storage/v1/object/public/opulent-public-storage/logo-text.png"
            alt="Opulent Logo"
            fill
            className="object-contain relative z-10"
            style={{ 
              filter: 'drop-shadow(0 0 25px rgba(255,255,255,0.3))'
            }}
            priority
          />
        </motion.div>

        {/* Premium Tagline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-5xl md:text-7xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50"
        >
          Reliable Voice Agents
        </motion.h1>

        {/* Enhanced Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="text-xl md:text-2xl text-center max-w-3xl text-white/40 leading-relaxed mb-16"
        >
          Accelerate your marketing efforts conversion with AI voice agents that actually work.
        </motion.p>

        {/* Premium CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1.2,
            delay: 0.9,
            ease: [0.23, 1, 0.32, 1]
          }}
          className="relative group"
        >
          <button 
            onClick={() => setIsModalOpen(true)}
            className="relative px-12 py-4 bg-black/20 backdrop-blur-sm border border-white/[0.05] rounded-lg text-white/70 group flex items-center gap-2 transition-all duration-500 overflow-hidden"
            onMouseMove={(e) => {
              const btn = e.currentTarget;
              const rect = btn.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              btn.style.setProperty('--mouse-x', `${x}px`);
              btn.style.setProperty('--mouse-y', `${y}px`);
            }}
          >
            <span className="relative z-10 text-lg group-hover:text-white/90 transition-colors duration-500">
              Book a Demo
            </span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10 inline-block"
            >
              →
            </motion.span>
            
            {/* Hover glass effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-xl bg-white/[0.02]"
              style={{
                background: `radial-gradient(
                  600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
                  rgba(255, 255, 255, 0.04),
                  transparent 40%
                )`
              }}
            />
          </button>
        </motion.div>

        {/* Modal with Cal Embed */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="mt-8 text-sm text-white/30 flex items-center gap-4"
        >
          <span>Rapid Deployment</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>1:1 Support</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>Proven Results</span>
        </motion.div>
      </div>

      {/* Premium Footer with Enhanced Glass Effect */}
      <footer className="absolute bottom-0 w-full z-20">
        <div className="mx-auto">
          <div className="relative overflow-hidden backdrop-blur-xl bg-black/5 border-t border-white/[0.03] px-8 py-8">
            {/* Footer Background with Vignette - Reduced opacity */}
            <div className="absolute inset-0 z-0">
              <FlickeringGrid 
                color="rgb(255, 255, 255)"
                maxOpacity={0.08}
                squareSize={2}
                gridGap={6}
                flickerChance={0.1}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
            </div>
            
            <div className="max-w-7xl mx-auto relative z-10">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="flex justify-center items-center text-sm text-white/30"
              >
                © 2024 Opulent Solutions LTD. All Rights Reserved.
              </motion.div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
