"use client";

import { useState } from "react";

type IconPickerProps = {
  name: string;
  defaultValue?: string;
  options: string[];
};

export default function IconPicker({ name, defaultValue, options }: IconPickerProps) {
  const [selected, setSelected] = useState(defaultValue || options[0] || "");
  const [custom, setCustom] = useState(defaultValue && !options.includes(defaultValue) ? defaultValue : "");

  // If custom is not empty, use custom, otherwise use selected from grid
  const currentValue = custom || selected;

  return (
    <div className="flex flex-col gap-4">
      <input type="hidden" name={name} value={currentValue} />
      
      <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 max-h-48 overflow-y-auto p-2 border border-zinc-800 bg-[#0a0a0a]">
        {options.map((iconClass) => (
          <button
            key={iconClass}
            type="button"
            onClick={() => {
              setSelected(iconClass);
              setCustom(""); // clear custom if picking from grid
            }}
            className={`p-2 flex items-center justify-center text-2xl rounded transition-colors ${
              selected === iconClass && !custom
                ? "bg-[var(--color-terminal-green)] text-black"
                : "text-zinc-400 hover:text-[var(--color-terminal-green)] hover:bg-zinc-800"
            }`}
            title={iconClass}
          >
            <i className={iconClass}></i>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-bold text-zinc-500">Or enter custom icon class:</label>
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            value={custom}
            onChange={(e) => {
              setCustom(e.target.value);
            }}
            placeholder="e.g. devicon-react-original" 
            className="bg-transparent border border-zinc-700 p-2 text-white font-bold focus:outline-none focus:border-[var(--color-terminal-green)] flex-grow" 
          />
          {currentValue && (
            <div className="w-10 h-10 flex items-center justify-center border border-[var(--color-terminal-green)] text-[var(--color-terminal-green)] text-xl">
              <i className={currentValue}></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
