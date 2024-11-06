"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Cal from "@calcom/embed-react";
import Spinner from "./spinner";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Reset visibility state and start timer when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="w-[1200px] h-[680px] hide-scrollbar"
            >
              {/* Glass Container with Glow */}
              <div className="relative w-full h-full">
                {/* Glow Effect */}
                <div className="absolute -inset-[1px] bg-white/10 rounded-xl blur-sm" />
                <div className="absolute -inset-[1px] bg-gradient-to-b from-white/10 to-white/5 rounded-xl" />
                
                {/* Main Content Container */}
                <div className="relative w-full h-full rounded-xl overflow-hidden backdrop-blur-xl bg-[#0A0A0A]/80 border border-white/[0.08] shadow-2xl">
                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/5 border border-white/[0.08] text-white/60 hover:text-white/90 transition-colors backdrop-blur-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>

                  {/* Content Container */}
                  <div className="w-full h-full pt-12 px-16 hide-scrollbar">
                    {/* Cal.com widget (always loaded, visibility controlled) */}
                    <div className={isVisible ? 'opacity-100' : 'opacity-0'} style={{ transition: 'opacity 0.5s ease' }}>
                      <Cal
                        calLink="a.salim/ai-discovery-call"
                        style={{ 
                          width: "100%", 
                          height: "100%",
                          margin: "0 auto",
                          borderRadius: "12px",
                          overflow: "hidden"
                        }}
                        config={{
                          theme: "dark",
                          hideEventTypeDetails: "false",
                          layout: "month_view"
                        }}
                      />
                    </div>

                    {/* Loading Spinner (shows during delay) */}
                    {!isVisible && (
                      <motion.div 
                        className="absolute inset-0 flex items-center justify-center bg-[#0A0A0A]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Spinner />
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
} 