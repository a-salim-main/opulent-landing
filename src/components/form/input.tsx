"use client";

import React from "react";
import { InfoTooltip } from "@/components/ui";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helpText?: string;
  tooltip?: string;
}

export const Input = ({ label, helpText, tooltip, className = "", ...props }: InputProps) => {
  return (
    <div className="space-y-2">
      <label className="text-white/70 flex items-center gap-2">
        {label}
        {tooltip && <InfoTooltip content={tooltip} />}
      </label>
      <input
        {...props}
        className={`w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/90 
          focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200 
          placeholder:text-white/30 ${className}`}
      />
      {helpText && <p className="text-white/30 text-sm">{helpText}</p>}
    </div>
  );
}; 