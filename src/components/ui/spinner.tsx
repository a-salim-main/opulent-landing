"use client";

import { motion } from "framer-motion";

export default function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Single spinning circle */}
      <motion.div
        className="w-12 h-12 rounded-full border-2 border-white/[0.08]"
        style={{ borderTopColor: 'rgba(255, 255, 255, 0.3)' }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Simple loading text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm text-white/30"
      >
        Loading
      </motion.p>
    </div>
  );
} 