import { Account, Transaction, TransactionType, Customer, Vendor, Yearbook, YearbookStatus, AccountNumberingRule } from '../types';

export const MOCK_ACCOUNTS: Account[] = [
  { id: 'acc1', name: 'Main Checking', type: 'Checking', balance: 5210.55 },
  { id: 'acc2', name: 'Business Savings', type: 'Savings', balance: 25000.00 },
  { id: 'acc3', name: 'Company Card', type: 'Credit Card', balance: -450.25 },
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'cust1', name: 'Innovate LLC', email: 'contact@innovatellc.com' },
  { id: 'cust2', name: 'Solutions Inc.', email: 'billing@solutions.inc' },
  { id: 'cust3', name: 'Synergy Co.', email: 'accounts@synergy.co' },
];

export const MOCK_VENDORS: Vendor[] = [
    { id: 'ven1', name: 'Amazon Business', category: 'Office Supplies' },
    { id: 'ven2', name: 'DigitalOcean', category: 'Software/Hosting' },
    { id: 'ven3', name: 'Shell Fuel', category: 'Transportation' },
    { id: 'ven4', name: 'The Corner Cafe', category: 'Meals & Entertainment' },
];


export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', date: '2024-07-22', description: 'Client Payment - Project Alpha', amount: 3500, type: TransactionType.Income, category: 'Freelance', accountId: 'acc1', customerId: 'cust1' },
  { id: 't2', date: '2024-07-21', description: 'Office Supplies', amount: 125.50, type: TransactionType.Expense, category: 'Shopping', accountId: 'acc3', vendorId: 'ven1' },
  { id: 't3', date: '2024-07-20', description: 'Monthly Software Subscription', amount: 49.99, type: TransactionType.Expense, category: 'Utilities', accountId: 'acc3', vendorId: 'ven2' },
  { id: 't4', date: '2024-07-19', description: 'Gasoline', amount: 55.20, type: TransactionType.Expense, category: 'Transportation', accountId: 'acc1', vendorId: 'ven3' },
  { id: 't5', date: '2024-07-18', description: 'Lunch with Client', amount: 85.00, type: TransactionType.Expense, category: 'Dining Out', accountId: 'acc3', vendorId: 'ven4' },
  { id: 't6', date: '2024-07-15', description: 'Salary Deposit', amount: 2500, type: TransactionType.Income, category: 'Salary', accountId: 'acc1' },
  { id: 't7', date: '2024-06-25', description: 'Invoice #102 Payment', amount: 1800, type: TransactionType.Income, category: 'Freelance', accountId: 'acc1', customerId: 'cust2' },
  { id: 't8', date: '2024-06-15', description: 'Salary Deposit', amount: 2500, type: TransactionType.Income, category: 'Salary', accountId: 'acc1' },
  { id: 't9', date: '2024-05-15', description: 'Salary Deposit', amount: 2500, type: TransactionType.Income, category: 'Salary', accountId: 'acc1' },
];

export const MOCK_YEARBOOKS: Yearbook[] = [
    { id: 'yb1', year: 2024, startDate: '2024-01-01', endDate: '2024-12-31', status: YearbookStatus.Closing },
    { id: 'yb2', year: 2025, startDate: '2025-01-01', endDate: '2025-12-31', status: YearbookStatus.Opening },
];

export const MOCK_ACCOUNT_NUMBERING_RULES: AccountNumberingRule[] = [
    { id: 'anr1', groupName: 'Aset', digits: 7, start: 1000000, end: 1999999 },
    { id: 'anr2', groupName: 'Kewajiban', digits: 7, start: 2000000, end: 2999999 },
    { id: 'anr3', groupName: 'Ekuitas', digits: 7, start: 3000000, end: 3999999 },
    { id: 'anr4', groupName: 'Pendapatan', digits: 7, start: 4000000, end: 4999999 },
    { id: 'anr5', groupName: 'Beban', digits: 7, start: 5000000, end: 5999999 },
];