"use client";

import React, { useState, useRef, useEffect } from "react";
import { InfoTooltip } from "@/components/ui";
import { motion, AnimatePresence } from "framer-motion";

interface TimezoneSelectProps {
  label: string;
  name: string;
  required?: boolean;
  tooltip?: string;
}

const TIMEZONES = {
  "Americas": [
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Phoenix", label: "Mountain Time - Arizona (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "America/Anchorage", label: "Alaska Time (AKT)" },
    { value: "America/Halifax", label: "Atlantic Time (AT)" },
    { value: "America/Toronto", label: "Eastern Time - Toronto" },
    { value: "America/Vancouver", label: "Pacific Time - Vancouver" },
    { value: "America/Mexico_City", label: "Central Time - Mexico City" },
  ],
  "Europe": [
    { value: "Europe/London", label: "UK Time (GMT/BST)" },
    { value: "Europe/Paris", label: "Central European Time (CET)" },
    { value: "Europe/Berlin", label: "Central European Time - Berlin" },
    { value: "Europe/Madrid", label: "Central European Time - Madrid" },
    { value: "Europe/Rome", label: "Central European Time - Rome" },
    { value: "Europe/Amsterdam", label: "Central European Time - Amsterdam" },
    { value: "Europe/Stockholm", label: "Central European Time - Stockholm" },
    { value: "Europe/Athens", label: "Eastern European Time (EET)" },
    { value: "Europe/Helsinki", label: "Eastern European Time - Helsinki" },
    { value: "Europe/Dublin", label: "Irish Standard Time" },
  ]
};

export const TimezoneSelect = ({ label, name, required, tooltip }: TimezoneSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-2">
      <label className="text-white/70 flex items-center gap-2">
        {label}
        {tooltip && <InfoTooltip content={tooltip} />}
      </label>
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-left text-white/90 
            focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200"
        >
          {selectedValue ? 
            Object.values(TIMEZONES).flat().find(tz => tz.value === selectedValue)?.label 
            : "Select timezone..."}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-50 w-full mt-2 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl"
            >
              <div className="py-1 max-h-60 overflow-auto">
                {Object.entries(TIMEZONES).map(([region, zones]) => (
                  <div key={region}>
                    <div className="px-4 py-2 text-sm text-white/50 bg-white/5">{region}</div>
                    {zones.map(zone => (
                      <button
                        key={zone.value}
                        type="button"
                        className={`w-full px-4 py-2 text-left hover:bg-white/5 transition-colors
                          ${selectedValue === zone.value ? "text-white/90 bg-white/5" : "text-white/70"}`}
                        onClick={() => {
                          setSelectedValue(zone.value);
                          setIsOpen(false);
                        }}
                      >
                        {zone.label}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <input
          type="hidden"
          name={name}
          value={selectedValue}
          required={required}
        />
      </div>
    </div>
  );
}; 