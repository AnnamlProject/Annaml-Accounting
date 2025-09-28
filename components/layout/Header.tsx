import React from 'react';

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, children }) => {
  return (
    <header className="mb-6 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{title}</h1>
      {children && <div>{children}</div>}
    </header>
  );
};

export default Header;