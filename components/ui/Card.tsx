import React from 'react';

interface CardProps {
  title: string;
  value: string;
  color?: string;
  subtitle?: string;
}

const Card: React.FC<CardProps> = ({ title, value, color = 'text-slate-900', subtitle }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
      <h3 className="text-sm font-medium text-slate-500">{title}</h3>
      <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
      {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
    </div>
  );
};

export default Card;