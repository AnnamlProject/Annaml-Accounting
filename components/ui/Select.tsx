import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

const Select: React.FC<SelectProps> = ({ label, children, ...props }) => {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>}
      <select
        {...props}
        className="w-full px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        {children}
      </select>
    </div>
  );
};

export default Select;