"use client";

import React, { useState } from "react";
import { InfoTooltip } from "@/components/ui";
import { Select } from "@/components/ui/select";

interface TimeInputProps {
  label: string;
  name: string;
  required?: boolean;
  tooltip?: string;
}

const HOLIDAYS = [
  { label: "New Year's Day", value: "01-01" },
  { label: "Martin Luther King Jr. Day", value: "01-15" },
  { label: "Presidents' Day", value: "02-19" },
  { label: "Memorial Day", value: "05-27" },
  { label: "Independence Day", value: "07-04" },
  { label: "Labor Day", value: "09-02" },
  { label: "Columbus Day", value: "10-14" },
  { label: "Veterans Day", value: "11-11" },
  { label: "Thanksgiving Day", value: "11-28" },
  { label: "Christmas Day", value: "12-25" }
];

export const TimeInput = ({ label, name, required, tooltip }: TimeInputProps) => {
  const [timeSlots, setTimeSlots] = useState<{[key: string]: {start: string; end: string; closed: boolean}}>({
    monday: { start: "09:00", end: "17:00", closed: false },
    tuesday: { start: "09:00", end: "17:00", closed: false },
    wednesday: { start: "09:00", end: "17:00", closed: false },
    thursday: { start: "09:00", end: "17:00", closed: false },
    friday: { start: "09:00", end: "17:00", closed: false },
    saturday: { start: "09:00", end: "17:00", closed: false },
    sunday: { start: "09:00", end: "17:00", closed: false },
  });

  const [selectedHolidays, setSelectedHolidays] = useState<string[]>([]);

  const [customDate, setCustomDate] = useState("");
  const [customDateDescription, setCustomDateDescription] = useState("");

  const handleTimeChange = (
    day: string,
    field: "start" | "end",
    value: string
  ) => {
    setTimeSlots(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));
  };

  const handleClosedToggle = (day: string) => {
    setTimeSlots(prev => ({
      ...prev,
      [day]: { ...prev[day], closed: !prev[day].closed }
    }));
  };

  const handleHolidayChange = (value: string) => {
    setSelectedHolidays(prev => 
      prev.includes(value) 
        ? prev.filter(h => h !== value)
        : [...prev, value]
    );
  };

  const handleAddCustomDate = () => {
    if (!customDate) return;
    
    // Convert date to MM-DD format
    const date = new Date(customDate);
    const formattedDate = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    
    setSelectedHolidays(prev => [...prev, formattedDate]);
    setCustomDate("");
    setCustomDateDescription("");
  };

  // Hidden input for form submission
  const formValue = {
    working_hours: timeSlots,
    holidays: selectedHolidays
  };

  return (
    <div className="col-span-2 space-y-6">
      <div className="space-y-4">
        <label className="text-white/70 flex items-center gap-2">
          {label}
          {tooltip && <InfoTooltip content={tooltip} />}
        </label>
        
        {/* Regular working hours */}
        <div className="space-y-3">
          {Object.entries(timeSlots).map(([day, slot]) => (
            <div
              key={day}
              className="grid grid-cols-[1fr,auto,auto,auto] gap-4 items-center bg-black/20 p-3 rounded-lg border border-white/[0.08]"
            >
              <span className="text-white/70 capitalize">{day}</span>
              <input
                type="time"
                onChange={(e) => handleTimeChange(day, "start", e.target.value)}
                defaultValue={slot.start}
                disabled={slot.closed}
                className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white/90 
                  focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50
                  [color-scheme:dark] appearance-none"
                style={{ colorScheme: 'dark' }}
              />
              <input
                type="time"
                onChange={(e) => handleTimeChange(day, "end", e.target.value)}
                defaultValue={slot.end}
                disabled={slot.closed}
                className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white/90 
                  focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50
                  [color-scheme:dark] appearance-none"
                style={{ colorScheme: 'dark' }}
              />
              <button
                type="button"
                onClick={() => handleClosedToggle(day)}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 
                  ${slot.closed 
                    ? "bg-white/10 text-white/50 hover:bg-white/15" 
                    : "bg-black/40 text-white/70 hover:bg-black/60"
                  }`}
              >
                {slot.closed ? "Closed" : "Open"}
              </button>
            </div>
          ))}
        </div>

        {/* Enhanced Holidays section */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg text-white/80">Holidays</h3>
            <InfoTooltip content="Select holidays when your business will be closed. These dates will be automatically marked as closed in the AI system." />
          </div>
          
          {/* Standard Holidays */}
          <Select
            options={HOLIDAYS}
            value={selectedHolidays}
            onChange={handleHolidayChange}
            multiple
          />

          {/* Custom Date Input */}
          <div className="space-y-2">
            <label className="text-white/70">Add Custom Holiday</label>
            <div className="flex gap-4">
              <input
                type="date"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/90 
                  focus:outline-none focus:ring-2 focus:ring-white/20
                  [color-scheme:dark] appearance-none w-[200px]"
                style={{ colorScheme: 'dark' }}
              />
              <input
                type="text"
                value={customDateDescription}
                onChange={(e) => setCustomDateDescription(e.target.value)}
                placeholder="Description (optional)"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white/90 
                  focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <button
                type="button"
                onClick={handleAddCustomDate}
                className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white/90 rounded-lg 
                  transition-all duration-200 disabled:opacity-50"
                disabled={!customDate}
              >
                Add
              </button>
            </div>
          </div>

          {/* Selected Holidays Display */}
          {selectedHolidays.length > 0 && (
            <div className="mt-4 p-4 bg-white/5 rounded-lg space-y-2">
              <h4 className="text-sm text-white/60">Selected Holidays:</h4>
              <div className="space-y-2">
                {selectedHolidays.map(holiday => {
                  const holidayInfo = HOLIDAYS.find(h => h.value === holiday) || 
                    { label: `Custom Date (${holiday})`, value: holiday };
                  return (
                    <div key={holiday} className="flex items-center justify-between text-white/80">
                      <span>{holidayInfo.label}</span>
                      <button
                        type="button"
                        onClick={() => setSelectedHolidays(prev => prev.filter(h => h !== holiday))}
                        className="text-white/40 hover:text-white/60"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Hidden input for form submission */}
        <input
          type="hidden"
          name={name}
          value={JSON.stringify(formValue)}
          required={required}
        />
      </div>
    </div>
  );
}; 