export enum TransactionType {
  Income = 'income',
  Expense = 'expense',
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  accountId: string;
  customerId?: string;
  vendorId?: string;
}

export interface Account {
  id: string;
  name: string;
  type: 'Checking' | 'Savings' | 'Credit Card';
  balance: number;
}

export interface Customer {
    id: string;
    name: string;
    email: string;
}

export interface Vendor {
    id: string;
    name: string;
    category: string;
    kode?: string;
    contactPerson?: string;
    alamat?: string;
    telepon?: string;
    email?: string;
    paymentTerms?: string;
}

export enum YearbookStatus {
  Opening = 'Opening',
  Closing = 'Closing',
}

export interface Yearbook {
  id: string;
  year: number;
  startDate: string;
  endDate: string;
  status: YearbookStatus;
}

export interface AccountNumberingRule {
  id: string;
  groupName: string;
  digits: number;
  start: number;
  end: number;
}

export interface AccountClassification {
  id: number;
  group: string;
  name: string;
  status: 'Aktif' | 'Non-Aktif';
  description: string;
}

export enum AccountLevel {
  HEADER = 'HEADER',
  GROUP_ACCOUNT = 'GROUP ACCOUNT',
  ACCOUNT = 'ACCOUNT',
  SUB_ACCOUNT = 'SUB ACCOUNT'
}

export interface ChartOfAccount {
  id: string;
  kodeAkun: number;
  namaAkun: string;
  tipeAkun: string;
  levelAkun: AccountLevel;
  klasifikasiAkun: string;
}

export enum DepartmentStatus {
    Aktif = 'Aktif',
    NonAktif = 'Non-Aktif'
}

export interface Department {
    id: string;
    kode: string;
    deskripsi: string;
    status: DepartmentStatus;
}

export interface LinkedAccount {
  id: string;
  kode: string; // e.g., 'retained_earnings'
  namaAkunId: string; // Corresponds to a ChartOfAccount id
}

export interface Tax {
  id: string;
  name: string;
  taxId: string;
  isExempt: boolean;
  isTaxable: boolean;
  purchaseAccountId: string;
  salesAccountId: string;
}


export type Page = 
  // Core
  | 'dashboard' 
  | 'transactions' 
  | 'reports' // This is now a category, income-statement is the specific page
  | 'customers' 
  | 'vendors'
  // A. Setup
  | 'company-settings'
  | 'company-profile'
  | 'taxpayers-profile'
  | 'yearbook-setting'
  | 'account-numbering'
  | 'account-classification'
  | 'fiscal-accounts'
  | 'fiscal-accounts-reconciliation'
  | 'departments'
  | 'linked-accounts-setup'
  | 'taxes-setting'
  | 'account-classification-list'
  | 'account-list'
  | 'department-list'
  | 'users-roles'
  // B. Sales
  | 'linked-account-sales'
  | 'sales-discount'
  // FIX: Add 'sales-taxes' to the Page type
  | 'sales-taxes'
  | 'payment-method-sales'
  | 'sales-person'
  | 'sales-orders'
  | 'sales-invoices'
  | 'deposits'
  | 'receipts'
  // C. Purchases
  | 'linked-account-purchases'
  | 'purchase-discount'
  | 'purchase-taxes'
  | 'payment-method-purchases'
  | 'purchase-requests'
  | 'purchase-orders'
  | 'purchase-invoices'
  | 'prepayments'
  | 'payments'
  | 'payment-expenses'
  // D. Inventory
  | 'linked-account-inventory'
  | 'service-items'
  // E. General Journals
  | 'create-general-journals'
  | 'fiscal-correction-tickbox'
  | 'fiscal-correction-option'
  | 'general-journal-lists'
  | 'edit-general-journals'
  | 'edit-fiscal-correction'
  // F. Reports
  | 'general-ledgers'
  | 'trial-balance'
  | 'income-statement'
  | 'balance-sheet'
  | 'cashflow'
  // G. Maintenance
  | 'start-new-yearbook'
  | 'log-activities'
  // H. Fisrec
  | 'fiscal-reconciliation-report'
  | 'fiscal-reconciliation-list'
  | 'company-income-tax-calculation'
  | 'fiscal-income-statement'
  ;