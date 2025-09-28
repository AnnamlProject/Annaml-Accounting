import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, ...props }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-800 mb-1">{label}</label>
      <textarea
        {...props}
        className="w-full bg-white text-slate-900 px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    </div>
  );
};

export default Textarea;