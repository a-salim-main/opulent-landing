"use client";

import React from "react";
import { motion } from "framer-motion";

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

export const FormSection = ({ title, children }: FormSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      {/* Glow effect */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-white/[0.08] via-white/[0.12] to-white/[0.08] rounded-xl blur-[2px] group-hover:blur-[3px] transition-all duration-500" />
      
      {/* Main content */}
      <div className="relative bg-[#0A0A0A] border border-white/[0.08] rounded-xl p-6 space-y-6 shadow-xl">
        <h2 className="text-xl font-semibold text-white/90">{title}</h2>
        {children}
      </div>
    </motion.div>
  );
}; 