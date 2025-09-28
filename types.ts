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