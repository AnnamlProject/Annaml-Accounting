import React, { useState, useEffect, useRef } from 'react';
import { Page } from '../../types';
import { ChevronDownIcon, LogoIcon } from '../icons/Icons';

interface NavItem {
    label: string;
    page: Page;
}

interface NavGroup {
    title: string;
    items: NavItem[];
}

interface NavMenu {
    title: string;
    page?: Page; // For direct links
    groups?: NavGroup[]; // For dropdowns
}


const navMenu: NavMenu[] = [
    { 
        title: 'Setup', 
        groups: [
            { title: 'COMPANY', items: [
                { label: 'Company Settings', page: 'company-settings' },
                { label: 'Company Profile', page: 'company-profile' },
                { label: 'Taxpayers Profile', page: 'taxpayers-profile' },
            ]},
            { title: 'GENERAL', items: [
                { label: 'Yearbook Setting', page: 'yearbook-setting' },
                { label: 'Account Numbering', page: 'account-numbering' },
                { label: 'Account Classification', page: 'account-classification' },
                { label: 'Account List', page: 'account-list' },
                { label: 'Fiscal Accounts', page: 'fiscal-accounts' },
                { label: 'Fiscal Accounts Reconciliation', page: 'fiscal-accounts-reconciliation' },
                { label: 'Departments', page: 'departments' },
                { label: 'Linked Accounts', page: 'linked-accounts-setup' },
                { label: 'Taxes Setting', page: 'taxes-setting' },
            ]},
            { title: 'SETUP REPORTS', items: [
                { label: 'Account Classification List', page: 'account-classification-list' },
                { label: 'Department List', page: 'department-list' },
            ]},
            { title: 'USERS & ROLES', items: [
                { label: 'Users & Roles', page: 'users-roles' },
            ]},
        ] 
    },
    { 
        title: 'Sales', 
        groups: [
            { title: 'SETUP', items: [
                { label: 'Linked Account', page: 'linked-account-sales' },
                { label: 'Sales Discount', page: 'sales-discount' },
                { label: 'Sales Taxes', page: 'sales-taxes' },
            ]},
            { title: 'DATA', items: [
                { label: 'Customers', page: 'customers' },
                { label: 'Payment Method', page: 'payment-method-sales' },
                { label: 'Sales Person', page: 'sales-person' },
            ]},
            { title: 'SALES', items: [
                { label: 'Sales Orders', page: 'sales-orders' },
                { label: 'Sales Invoices', page: 'sales-invoices' },
                { label: 'Deposits', page: 'deposits' },
                { label: 'Receipts', page: 'receipts' },
            ]},
        ] 
    },
    { 
        title: 'Purchases', 
        groups: [
            { title: 'SETUP', items: [
                { label: 'Linked Account', page: 'linked-account-purchases' },
                { label: 'Purchase Discount', page: 'purchase-discount' },
                { label: 'Purchase Taxes', page: 'purchase-taxes' },
            ]},
            { title: 'DATA', items: [
                { label: 'Vendors', page: 'vendors' },
                { label: 'Payment Method', page: 'payment-method-purchases' },
            ]},
            { title: 'PURCHASES', items: [
                { label: 'Purchase Requests', page: 'purchase-requests' },
                { label: 'Purchase Orders', page: 'purchase-orders' },
                { label: 'Purchase Invoices', page: 'purchase-invoices' },
                { label: 'Prepayments', page: 'prepayments' },
                { label: 'Payments', page: 'payments' },
                { label: 'Payment Expenses', page: 'payment-expenses' },
            ]},
        ] 
    },
    { 
        title: 'Inventory', 
        groups: [
            { title: 'SETUP', items: [
                { label: 'Linked Account', page: 'linked-account-inventory' },
            ]},
            { title: 'DATA', items: [
                { label: 'Service Items', page: 'service-items' },
            ]},
        ] 
    },
    { title: 'Budgeting', groups: [] },
    { title: 'Payroll', groups: [] },
    { title: 'Asset', groups: [] },
    { title: 'Specpose', groups: [] },
    { 
        title: 'General Journals', 
        groups: [
            { title: 'CREATE GENERAL JOURNALS', items: [
                { label: 'Create General Journals', page: 'create-general-journals' },
                { label: 'Fiscal Correction Tickbox', page: 'fiscal-correction-tickbox' },
                { label: 'Fiscal Correction Option', page: 'fiscal-correction-option' },
            ]},
            { title: 'GENERAL JOURNAL REPORTS', items: [
                { label: 'General Journal Lists', page: 'general-journal-lists' },
                { label: 'Edit General Journals', page: 'edit-general-journals' },
                { label: 'Edit Fiscal Correction', page: 'edit-fiscal-correction' },
            ]},
        ]
    },
    { 
        title: 'Fisrec',
        groups: [
            { title: 'FISREC (FISCAL RECONCILIATION)', items: [
                { label: 'Fiscal Reconciliation Report', page: 'fiscal-reconciliation-report' },
                { label: 'Fiscal Reconciliation List', page: 'fiscal-reconciliation-list' },
                { label: 'Company Income Tax Calculation', page: 'company-income-tax-calculation' },
                { label: 'Fiscal Income Statement', page: 'fiscal-income-statement' },
            ]},
        ]
    },
    { 
        title: 'Report', 
        groups: [
             { title: 'REPORTS', items: [
                { label: 'General Ledgers', page: 'general-ledgers' },
                { label: 'Trial Balance', page: 'trial-balance' },
                { label: 'Income Statement', page: 'income-statement' },
                { label: 'Balance Sheet', page: 'balance-sheet' },
                { label: 'Cashflow', page: 'cashflow' },
            ]},
        ]
    },
    { title: 'Documents', groups: [] },
    { 
        title: 'Maintenance', 
        groups: [
            { title: 'MAINTENANCE', items: [
                { label: 'Start New Yearbook', page: 'start-new-yearbook' },
                { label: 'Log Activities', page: 'log-activities' },
            ]},
        ]
    },
];

interface TopNavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}


const Dropdown: React.FC<{
  menu: NavMenu;
  isOpen: boolean;
  onClick: () => void;
  setCurrentPage: (page: Page) => void;
}> = ({ menu, isOpen, onClick, setCurrentPage }) => (
  <div className="relative">
    <button
      onClick={onClick}
      className="flex items-center space-x-1 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
    >
      <span>{menu.title}</span>
      {(menu.groups && menu.groups.length > 0) && <ChevronDownIcon className="w-3 h-3"/>}
    </button>
    {isOpen && menu.groups && menu.groups.length > 0 && (
      <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
        {menu.groups.map(group => (
            <div key={group.title} className="py-1">
                <span className="block px-4 pt-2 pb-1 text-xs font-bold text-gray-400 uppercase">{group.title}</span>
                {group.items.map(item => (
                  <a
                    key={item.label}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(item.page);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {item.label}
                  </a>
                ))}
                
            </div>
        ))}
      </div>
    )}
  </div>
);

const TopNavbar: React.FC<TopNavbarProps> = ({ setCurrentPage }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const handleMenuClick = (menu: NavMenu) => {
    if (menu.page) {
      setCurrentPage(menu.page);
      setOpenMenu(null);
    } else if (menu.groups) {
      setOpenMenu(openMenu === menu.title ? null : menu.title);
    }
  };
  
  const handleItemClick = (page: Page) => {
    setCurrentPage(page);
    setOpenMenu(null);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav ref={navRef} className="w-full bg-[#363636] text-white flex items-center justify-between px-4 shadow-md z-30">
        <div className="flex items-center">
            <button onClick={() => setCurrentPage('dashboard')} className="flex items-center space-x-2 mr-4">
                <LogoIcon className="w-9 h-9 text-white" />
            </button>
             <div className="hidden md:flex items-center">
                {navMenu.map(menu => (
                    <Dropdown 
                        key={menu.title}
                        menu={menu}
                        isOpen={openMenu === menu.title} 
                        onClick={() => handleMenuClick(menu)}
                        setCurrentPage={handleItemClick}
                    />
                ))}
             </div>
        </div>
        <div className="flex items-center space-x-4">
            <div className="text-sm text-right">
                <div>Hi, Admin</div>
            </div>
             <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white">
                A
            </div>
        </div>
    </nav>
  );
};

export default TopNavbar;