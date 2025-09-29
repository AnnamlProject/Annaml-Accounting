import { Account, Transaction, TransactionType, Customer, Vendor, Yearbook, YearbookStatus, AccountNumberingRule, AccountClassification, ChartOfAccount, AccountLevel, Department, DepartmentStatus, LinkedAccount, Tax, ServiceItem, JournalEntry } from '../types';

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

export const MOCK_ACCOUNT_CLASSIFICATIONS: AccountClassification[] = [
  { id: 1, group: 'Aset', name: 'Asset', status: 'Aktif', description: '' },
  { id: 2, group: 'Aset', name: 'Cash', status: 'Aktif', description: '' },
  { id: 3, group: 'Aset', name: 'Bank', status: 'Aktif', description: '' },
  { id: 4, group: 'Aset', name: 'Credit Card Receivable', status: 'Aktif', description: '' },
  { id: 5, group: 'Aset', name: 'Cash Equivalents', status: 'Aktif', description: '' },
  { id: 6, group: 'Aset', name: 'Marketable Securities', status: 'Aktif', description: '' },
  { id: 7, group: 'Aset', name: 'Accounts Receivable', status: 'Aktif', description: '' },
  { id: 8, group: 'Aset', name: 'Other Receivables', status: 'Aktif', description: '' },
  { id: 9, group: 'Aset', name: 'Allowance for Bad Debts', status: 'Aktif', description: '' },
  { id: 10, group: 'Aset', name: 'Inventory', status: 'Aktif', description: '' },
  { id: 11, group: 'Aset', name: 'Current Asset', status: 'Aktif', description: '' },
  { id: 12, group: 'Aset', name: 'Other Current Asset', status: 'Aktif', description: '' },
  { id: 13, group: 'Aset', name: 'Long Term Receivables', status: 'Aktif', description: '' },
  { id: 14, group: 'Aset', name: 'Other Long Term Investments', status: 'Aktif', description: '' },
  { id: 15, group: 'Aset', name: 'Capital Asset', status: 'Aktif', description: '' },
  { id: 16, group: 'Aset', name: 'Accum. Amort./Depreciation', status: 'Aktif', description: '' },
  { id: 17, group: 'Aset', name: 'Other Non-Current Asset', status: 'Aktif', description: '' },
  { id: 18, group: 'Aset', name: 'Other Asset', status: 'Aktif', description: '' },
  { id: 19, group: 'Liability', name: 'Liability', status: 'Aktif', description: '' },
  { id: 20, group: 'Liability', name: 'Cash', status: 'Aktif', description: '' },
  { id: 21, group: 'Liability', name: 'Bank', status: 'Aktif', description: '' },
  { id: 22, group: 'Liability', name: 'Credit Card Payable', status: 'Aktif', description: '' },
  { id: 23, group: 'Liability', name: 'Accounts Payable', status: 'Aktif', description: '' },
  { id: 24, group: 'Liability', name: 'Other Payable', status: 'Aktif', description: '' },
  { id: 25, group: 'Liability', name: 'Sales Tax Payable', status: 'Aktif', description: '' },
  { id: 26, group: 'Liability', name: 'Payroll Tax Payable', status: 'Aktif', description: '' },
  { id: 27, group: 'Liability', name: 'Employee Deductions Payable', status: 'Aktif', description: '' },
  { id: 28, group: 'Liability', name: 'Income Tax Payable', status: 'Aktif', description: '' },
  { id: 29, group: 'Liability', name: 'Short Term Debt', status: 'Aktif', description: '' },
  { id: 30, group: 'Liability', name: 'Current Liability', status: 'Aktif', description: '' },
  { id: 31, group: 'Liability', name: 'Other Current Liability', status: 'Aktif', description: '' },
  { id: 32, group: 'Liability', name: 'Other Non-Current Liability', status: 'Aktif', description: '' },
  { id: 33, group: 'Liability', name: 'Debt', status: 'Aktif', description: '' },
  { id: 34, group: 'Liability', name: 'Deferred Revenue', status: 'Aktif', description: '' },
  { id: 35, group: 'Liability', name: 'Long Term Debt', status: 'Aktif', description: '' },
  { id: 36, group: 'Liability', name: 'Deferred Income Taxes', status: 'Aktif', description: '' },
  { id: 37, group: 'Liability', name: 'Long Term Liability', status: 'Aktif', description: '' },
  { id: 38, group: 'Liability', name: 'Other Liability', status: 'Aktif', description: '' },
  { id: 39, group: 'Equity', name: 'Equity', status: 'Aktif', description: '' },
  { id: 40, group: 'Equity', name: 'Cash', status: 'Aktif', description: '' },
  { id: 41, group: 'Equity', name: 'Bank', status: 'Aktif', description: '' },
  { id: 42, group: 'Equity', name: 'Credit Card Payable', status: 'Aktif', description: '' },
  { id: 43, group: 'Equity', name: 'Owner/Partner Contributions', status: 'Aktif', description: '' },
  { id: 44, group: 'Equity', name: 'Owner/Partner Withdrawals', status: 'Aktif', description: '' },
  { id: 45, group: 'Equity', name: 'Share Capital', status: 'Aktif', description: '' },
  { id: 46, group: 'Equity', name: 'Dividends', status: 'Aktif', description: '' },
  { id: 47, group: 'Equity', name: 'Retained Earnings', status: 'Aktif', description: '' },
  { id: 48, group: 'Equity', name: 'Current Earnings', status: 'Aktif', description: '' },
  { id: 49, group: 'Revenue', name: 'Revenue', status: 'Aktif', description: '' },
  { id: 50, group: 'Revenue', name: 'Operating Revenue', status: 'Aktif', description: '' },
  { id: 51, group: 'Revenue', name: 'Non-Operating Revenue', status: 'Aktif', description: '' },
  { id: 52, group: 'Revenue', name: 'Other Revenue', status: 'Aktif', description: '' },
  { id: 53, group: 'Revenue', name: 'Gain', status: 'Aktif', description: '' },
  { id: 54, group: 'Revenue', name: 'Extraordinary Gain', status: 'Aktif', description: '' },
  { id: 55, group: 'Expense', name: 'Expense', status: 'Aktif', description: '' },
  { id: 56, group: 'Expense', name: 'Cost of Goods Sold', status: 'Aktif', description: '' },
  { id: 57, group: 'Expense', name: 'Operating Expense', status: 'Aktif', description: '' },
  { id: 58, group: 'Expense', name: 'General & Admin. Expense', status: 'Aktif', description: '' },
  { id: 59, group: 'Expense', name: 'Amort./Depreciation Expense', status: 'Aktif', description: '' },
  { id: 60, group: 'Expense', name: 'Bad Debt Expense', status: 'Aktif', description: '' },
  { id: 61, group: 'Expense', name: 'Employee Benefits', status: 'Aktif', description: '' },
  { id: 62, group: 'Expense', name: 'Payroll Expense', status: 'Aktif', description: '' },
  { id: 63, group: 'Expense', name: 'Interest Expense', status: 'Aktif', description: '' },
  { id: 64, group: 'Expense', name: 'Income Tax Expense', status: 'Aktif', description: '' },
  { id: 65, group: 'Expense', name: 'Non-Operating Expense', status: 'Aktif', description: '' },
  { id: 66, group: 'Expense', name: 'Loss', status: 'Aktif', description: '' },
  { id: 67, group: 'Expense', name: 'Extraordinary Loss', status: 'Aktif', description: '' },
];

export const MOCK_CHART_OF_ACCOUNTS: ChartOfAccount[] = [
    { id: 'coa-1', kodeAkun: 1000000, namaAkun: 'ASSET', tipeAkun: 'Aset', levelAkun: AccountLevel.HEADER, klasifikasiAkun: '-' },
    { id: 'coa-2', kodeAkun: 1100000, namaAkun: 'ASET LANCAR', tipeAkun: 'Aset', levelAkun: AccountLevel.GROUP_ACCOUNT, klasifikasiAkun: '-' },
    { id: 'coa-3', kodeAkun: 1101000, namaAkun: 'KAS', tipeAkun: 'Aset', levelAkun: AccountLevel.ACCOUNT, klasifikasiAkun: '-' },
    { id: 'coa-4', kodeAkun: 1101001, namaAkun: 'KAS OPERASIONAL', tipeAkun: 'Aset', levelAkun: AccountLevel.SUB_ACCOUNT, klasifikasiAkun: '-' },
    { id: 'coa-5', kodeAkun: 1101002, namaAkun: 'KAS OMSET', tipeAkun: 'Aset', levelAkun: AccountLevel.SUB_ACCOUNT, klasifikasiAkun: '-' },
    { id: 'coa-6', kodeAkun: 1101003, namaAkun: 'KAS FIRMAN', tipeAkun: 'Aset', levelAkun: AccountLevel.SUB_ACCOUNT, klasifikasiAkun: '-' },
    { id: 'coa-7', kodeAkun: 1101004, namaAkun: 'KAS RISKI', tipeAkun: 'Aset', levelAkun: AccountLevel.SUB_ACCOUNT, klasifikasiAkun: '-' },
    { id: 'coa-8', kodeAkun: 1101005, namaAkun: 'KAS PESON - IMAN', tipeAkun: 'Aset', levelAkun: AccountLevel.SUB_ACCOUNT, klasifikasiAkun: 'Cash' },
    { id: 'coa-9', kodeAkun: 1102000, namaAkun: 'BANK', tipeAkun: 'Aset', levelAkun: AccountLevel.ACCOUNT, klasifikasiAkun: '-' },
    { id: 'coa-10', kodeAkun: 1102001, namaAkun: 'MANDIRI 1310062136215_OPERASIONAL', tipeAkun: 'Aset', levelAkun: AccountLevel.SUB_ACCOUNT, klasifikasiAkun: '-' },
    { id: 'coa-11', kodeAkun: 1102002, namaAkun: 'MANDIRI 1310000650012_QRIS ODS', tipeAkun: 'Aset', levelAkun: AccountLevel.SUB_ACCOUNT, klasifikasiAkun: '-' },
    { id: 'coa-12', kodeAkun: 1102003, namaAkun: 'MANDIRI 1310062156213_QRIS AWA', tipeAkun: 'Aset', levelAkun: AccountLevel.SUB_ACCOUNT, klasifikasiAkun: '-' },
    { id: 'coa-13', kodeAkun: 1102004, namaAkun: 'MANDIRI 1310062146214_QRIS JBL', tipeAkun: 'Aset', levelAkun: AccountLevel.SUB_ACCOUNT, klasifikasiAkun: '-' },
    { id: 'coa-14', kodeAkun: 1102005, namaAkun: 'MANDIRI 1310000620015_QRIS DUFAN', tipeAkun: 'Aset', levelAkun: AccountLevel.SUB_ACCOUNT, klasifikasiAkun: '-' },
    { id: 'coa-15', kodeAkun: 1102006, namaAkun: 'MANDIRI AMEL 1200014486646_TRANS QR', tipeAkun: 'Aset', levelAkun: AccountLevel.SUB_ACCOUNT, klasifikasiAkun: '-' },
    { id: 'coa-16', kodeAkun: 1102007, namaAkun: 'BNI AMEL 1907207884_KAS OPS ANCOL', tipeAkun: 'Aset', levelAkun: AccountLevel.SUB_ACCOUNT, klasifikasiAkun: '-' },
    { id: 'coa-17', kodeAkun: 1102021, namaAkun: 'MANDIRI 1310019787797_RISKI A.', tipeAkun: 'Aset', levelAkun: AccountLevel.SUB_ACCOUNT, klasifikasiAkun: '-' },
    { id: 'coa-18', kodeAkun: 1102022, namaAkun: 'MANDIRI 1320571799999_PESONA', tipeAkun: 'Aset', levelAkun: AccountLevel.SUB_ACCOUNT, klasifikasiAkun: '-' },
    { id: 'coa-19', kodeAkun: 1102023, namaAkun: 'MANDIRI 1320077379999_PESONA GIRO', tipeAkun: 'Aset', levelAkun: AccountLevel.SUB_ACCOUNT, klasifikasiAkun: '-' },
    { id: 'coa-20', kodeAkun: 1102024, namaAkun: 'MANDIRI_EVI', tipeAkun: 'Aset', levelAkun: AccountLevel.SUB_ACCOUNT, klasifikasiAkun: '-' },
    { id: 'coa-21', kodeAkun: 1103000, namaAkun: 'PIUTANG USAHA', tipeAkun: 'Aset', levelAkun: AccountLevel.ACCOUNT, klasifikasiAkun: '-' },
    { id: 'coa-22', kodeAkun: 1103001, namaAkun: 'PIUTANG QRIS', tipeAkun: 'Aset', levelAkun: AccountLevel.SUB_ACCOUNT, klasifikasiAkun: '-' },
    { id: 'coa-23', kodeAkun: 1103051, namaAkun: 'CAD PENGHAPUSAN PIUTANG', tipeAkun: 'Aset', levelAkun: AccountLevel.SUB_ACCOUNT, klasifikasiAkun: '-' },
    { id: 'coa-24', kodeAkun: 3102000, namaAkun: 'LABA DITAHAN', tipeAkun: 'Ekuitas', levelAkun: AccountLevel.ACCOUNT, klasifikasiAkun: '-' },
    { id: 'coa-25', kodeAkun: 4101001, namaAkun: 'PENDAPATAN JASA', tipeAkun: 'Pendapatan', levelAkun: AccountLevel.SUB_ACCOUNT, klasifikasiAkun: 'Operating Revenue' },
    { id: 'coa-26', kodeAkun: 5101001, namaAkun: 'BEBAN POKOK PENJUALAN', tipeAkun: 'Beban', levelAkun: AccountLevel.SUB_ACCOUNT, klasifikasiAkun: 'Cost of Goods Sold' },
];

export const MOCK_DEPARTMENTS: Department[] = [
    { id: 'dep1', kode: '0001', deskripsi: 'PUSAT BANDUNG', status: DepartmentStatus.Aktif },
    { id: 'dep2', kode: '0002', deskripsi: 'DUFAN', status: DepartmentStatus.Aktif },
    { id: 'dep3', kode: '0003', deskripsi: 'ODS', status: DepartmentStatus.Aktif },
    { id: 'dep4', kode: '0004', deskripsi: 'AWA', status: DepartmentStatus.Aktif },
    { id: 'dep5', kode: '0005', deskripsi: 'JBL', status: DepartmentStatus.Aktif },
];

export const MOCK_DEPARTMENT_ASSIGNMENTS: { [key: string]: string[] } = {
    'dep2': [ // DUFAN
        'coa-3',
        'coa-4',
        'coa-5',
        'coa-6',
        'coa-9',
        'coa-15',
        'coa-16',
        'coa-21',
        'coa-22',
        'coa-23',
    ]
};

export const MOCK_LINKED_ACCOUNTS: LinkedAccount[] = [
    { id: 'la1', kode: 'retained_earnings', namaAkunId: 'coa-24' }
];

export const MOCK_TAXES: Tax[] = [];

export const MOCK_SERVICE_ITEMS: ServiceItem[] = [];

export const MOCK_JOURNAL_ENTRIES: JournalEntry[] = [];