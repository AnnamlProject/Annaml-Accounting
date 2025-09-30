import React, { useState } from 'react';
import { DataProvider } from './context/DataContext';
import TopNavbar from './components/layout/TopNavbar';
import Dashboard from './components/pages/Dashboard';
import Transactions from './components/pages/Transactions';
import Customers from './components/pages/Customers';
import Vendors from './components/pages/Vendors';
import { Page } from './types';

// Setup
import CompanySettings from './components/pages/setup/CompanySettings';
import CompanyProfile from './components/pages/setup/CompanyProfile';
import TaxpayersProfile from './components/pages/setup/TaxpayersProfile';
import YearbookSetting from './components/pages/setup/YearbookSetting';
import AccountNumbering from './components/pages/setup/AccountNumbering';
import AccountClassification from './components/pages/setup/AccountClassification';
import FiscalAccounts from './components/pages/setup/FiscalAccounts';
import FiscalAccountsReconciliation from './components/pages/setup/FiscalAccountsReconciliation';
import Departments from './components/pages/setup/Departments';
import LinkedAccountsSetup from './components/pages/setup/LinkedAccounts';
import TaxesSetting from './components/pages/setup/TaxesSetting';
import AccountClassificationList from './components/pages/setup/AccountClassificationList';
import AccountList from './components/pages/setup/AccountList';
import DepartmentList from './components/pages/setup/DepartmentList';
import UsersAndRoles from './components/pages/setup/UsersAndRoles';

// Sales
import LinkedAccountSales from './components/pages/sales/LinkedAccount';
import SalesDiscount from './components/pages/sales/SalesDiscount';
import SalesTaxes from './components/pages/sales/SalesTaxes';
import PaymentMethodSales from './components/pages/sales/PaymentMethod';
import SalesPerson from './components/pages/sales/SalesPerson';
import SalesOrders from './components/pages/sales/SalesOrders';
import SalesInvoices from './components/pages/sales/SalesInvoices';
import Deposits from './components/pages/sales/Deposits';
import Receipts from './components/pages/sales/Receipts';

// Purchases
import LinkedAccountPurchases from './components/pages/purchases/LinkedAccount';
import PurchaseDiscount from './components/pages/purchases/PurchaseDiscount';
import PurchaseTaxes from './components/pages/purchases/PurchaseTaxes';
import PaymentMethodPurchases from './components/pages/purchases/PaymentMethod';
import PurchaseRequests from './components/pages/purchases/PurchaseRequests';
import PurchaseOrders from './components/pages/purchases/PurchaseOrders';
import PurchaseInvoices from './components/pages/purchases/PurchaseInvoices';
import Prepayments from './components/pages/purchases/Prepayments';
import Payments from './components/pages/purchases/Payments';
import PaymentExpenses from './components/pages/purchases/PaymentExpenses';

// Inventory
import LinkedAccountInventory from './components/pages/inventory/LinkedAccount';
import ServiceItems from './components/pages/inventory/ServiceItems';

// General Journals
import CreateGeneralJournal from './components/pages/generalJournal/CreateGeneralJournal';
import GeneralJournalLists from './components/pages/generalJournal/GeneralJournalLists';
import EditGeneralJournals from './components/pages/generalJournal/EditGeneralJournals';
import EditFiscalCorrection from './components/pages/generalJournal/EditFiscalCorrection';

// Reports
import GeneralLedgers from './components/pages/reports/GeneralLedgers';
import TrialBalance from './components/pages/reports/TrialBalance';
import IncomeStatement from './components/pages/reports/IncomeStatement';
import BalanceSheet from './components/pages/reports/BalanceSheet';
import Cashflow from './components/pages/reports/Cashflow';

// Maintenance
import StartNewYearbook from './components/pages/maintenance/StartNewYearbook';
import LogActivities from './components/pages/maintenance/LogActivities';

// Fisrec
import FiscalReconciliationReport from './components/pages/fisrec/FiscalReconciliationReport';
import FiscalReconciliationList from './components/pages/fisrec/FiscalReconciliationList';
import CompanyIncomeTaxCalculation from './components/pages/fisrec/CompanyIncomeTaxCalculation';
import FiscalIncomeStatement from './components/pages/fisrec/FiscalIncomeStatement';


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      
      // Existing mapped pages
      case 'transactions': return <Transactions />;
      case 'customers': return <Customers />;
      case 'vendors': return <Vendors />;

      // Setup
      case 'company-settings': return <CompanySettings />;
      case 'company-profile': return <CompanyProfile />;
      case 'taxpayers-profile': return <TaxpayersProfile />;
      case 'yearbook-setting': return <YearbookSetting />;
      case 'account-numbering': return <AccountNumbering />;
      case 'account-classification': return <AccountClassification />;
      case 'fiscal-accounts': return <FiscalAccounts />;
      case 'fiscal-accounts-reconciliation': return <FiscalAccountsReconciliation />;
      case 'departments': return <Departments />;
      case 'linked-accounts-setup': return <LinkedAccountsSetup />;
      case 'taxes-setting': return <TaxesSetting />;
      case 'account-classification-list': return <AccountClassificationList />;
      case 'account-list': return <AccountList />;
      case 'department-list': return <DepartmentList />;
      case 'users-roles': return <UsersAndRoles />;

      // Sales
      case 'linked-account-sales': return <LinkedAccountSales />;
      case 'sales-discount': return <SalesDiscount />;
      case 'sales-taxes': return <SalesTaxes />;
      case 'payment-method-sales': return <PaymentMethodSales />;
      case 'sales-person': return <SalesPerson />;
      case 'sales-orders': return <SalesOrders />;
      case 'sales-invoices': return <SalesInvoices />;
      case 'deposits': return <Deposits />;
      case 'receipts': return <Receipts />;
      
      // Purchases
      case 'linked-account-purchases': return <LinkedAccountPurchases />;
      case 'purchase-discount': return <PurchaseDiscount />;
      case 'purchase-taxes': return <PurchaseTaxes />;
      case 'payment-method-purchases': return <PaymentMethodPurchases />;
      case 'purchase-requests': return <PurchaseRequests />;
      case 'purchase-orders': return <PurchaseOrders />;
      case 'purchase-invoices': return <PurchaseInvoices />;
      case 'prepayments': return <Prepayments />;
      case 'payments': return <Payments />;
      case 'payment-expenses': return <PaymentExpenses />;
      
      // Inventory
      case 'linked-account-inventory': return <LinkedAccountInventory />;
      case 'inventory-and-services': return <ServiceItems />;
      
      // General Journals
      case 'create-general-journals': return <CreateGeneralJournal />;
      case 'general-journal-lists': return <GeneralJournalLists />;
      case 'edit-general-journals': return <EditGeneralJournals />;
      case 'edit-fiscal-correction': return <EditFiscalCorrection />;
      
      // Reports
      case 'general-ledgers': return <GeneralLedgers />;
      case 'trial-balance': return <TrialBalance />;
      case 'income-statement': return <IncomeStatement />;
      case 'balance-sheet': return <BalanceSheet />;
      case 'cashflow': return <Cashflow />;
      
      // Maintenance
      case 'start-new-yearbook': return <StartNewYearbook />;
      case 'log-activities': return <LogActivities />;
      
      // Fisrec
      case 'fiscal-reconciliation-report': return <FiscalReconciliationReport />;
      case 'fiscal-reconciliation-list': return <FiscalReconciliationList />;
      case 'company-income-tax-calculation': return <CompanyIncomeTaxCalculation />;
      case 'fiscal-income-statement': return <FiscalIncomeStatement />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <DataProvider>
      <div className="flex flex-col h-screen bg-slate-50 text-slate-800">
        <TopNavbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </DataProvider>
  );
};

export default App;
