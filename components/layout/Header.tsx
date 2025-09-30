import React from 'react';

interface HeaderProps {
  title: string;
  // FIX: Add optional subtitle prop to support subtitles.
  subtitle?: string;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, children }) => {
  return (
    <header className="mb-6 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
      </div>
      {children && <div>{children}</div>}
    </header>
  );
};

export default Header;
