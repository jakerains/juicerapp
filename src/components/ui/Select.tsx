import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}

export function Select({ options, value, onChange, icon }: SelectProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70">
        {icon}
      </div>
      
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-white/10 backdrop-blur-md border border-white/20 rounded-lg pl-12 pr-10 py-2 text-white focus:outline-none focus:border-[#A2AD1E] transition-colors cursor-pointer"
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-[#1a1a1a]/95 backdrop-blur-md text-white py-3 px-4 hover:bg-white/20 cursor-pointer"
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-0 pointer-events-none rounded-lg bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 pointer-events-none">
        <ChevronDown className="w-5 h-5" />
      </div>
    </div>
  );
}