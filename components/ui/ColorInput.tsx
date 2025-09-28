import React, { useRef } from 'react';

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

const ColorInput: React.FC<ColorInputProps> = ({ label, value, onChange }) => {
  const colorInputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <label className="block text-sm font-medium text-slate-800 mb-1">{label}</label>
      <div className="flex items-center">
        <div
          className="w-10 h-10 rounded-md border border-slate-300 cursor-pointer"
          style={{ backgroundColor: value }}
          onClick={() => colorInputRef.current?.click()}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          className="w-full bg-white text-slate-900 px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ml-2"
        />
        <input
          type="color"
          ref={colorInputRef}
          value={value}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          className="sr-only"
        />
      </div>
    </div>
  );
};

export default ColorInput;