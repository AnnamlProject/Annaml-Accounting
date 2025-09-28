import React, { createContext, useState, ReactNode, useCallback } from 'react';
import { Transaction, Account, TransactionType, Customer, Vendor, Yearbook, YearbookStatus, AccountNumberingRule } from '../types';
import { MOCK_ACCOUNTS, MOCK_TRANSACTIONS, MOCK_CUSTOMERS, MOCK_VENDORS, MOCK_YEARBOOKS, MOCK_ACCOUNT_NUMBERING_RULES } from '../data/mockData';

interface DataContextProps {
  accounts: Account[];
  transactions: Transaction[];
  customers: Customer[];
  vendors: Vendor[];
  yearbooks: Yearbook[];
  accountNumberingRules: AccountNumberingRule[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  addAccount: (account: Omit<Account, 'id'>) => void;
  addYearbook: (yearbook: Omit<Yearbook, 'id' | 'status'>) => void;
  addAccountNumberingRule: (rules: Omit<AccountNumberingRule, 'id'>[]) => void;
}

export const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<Account[]>(MOCK_ACCOUNTS);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [vendors, setVendors] = useState<Vendor[]>(MOCK_VENDORS);
  const [yearbooks, setYearbooks] = useState<Yearbook[]>(MOCK_YEARBOOKS);
  const [accountNumberingRules, setAccountNumberingRules] = useState<AccountNumberingRule[]>(MOCK_ACCOUNT_NUMBERING_RULES);

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id'>) => {
    setTransactions(prev => {
      const newTransactions = [{ ...transaction, id: new Date().toISOString() }, ...prev];
      // Update account balance
      setAccounts(accs => accs.map(acc => {
        if (acc.id === transaction.accountId) {
          const newBalance = transaction.type === TransactionType.Income 
            ? acc.balance + transaction.amount 
            : acc.balance - transaction.amount;
          return { ...acc, balance: newBalance };
        }
        return acc;
      }));
      return newTransactions;
    });
  }, []);

  const addAccount = useCallback((account: Omit<Account, 'id'>) => {
    setAccounts(prev => [{ ...account, id: new Date().toISOString() }, ...prev]);
  }, []);
  
  const addYearbook = useCallback((yearbook: Omit<Yearbook, 'id' | 'status'>) => {
    setYearbooks(prev => {
        const updatedYearbooks = prev.map(yb => 
            yb.status === YearbookStatus.Opening ? { ...yb, status: YearbookStatus.Closing } : yb
        );
        const newYearbook: Yearbook = {
            ...yearbook,
            id: `yb${prev.length + 1}`,
            status: YearbookStatus.Opening
        };
        return [...updatedYearbooks, newYearbook];
    });
  }, []);
  
  const addAccountNumberingRule = useCallback((rules: Omit<AccountNumberingRule, 'id'>[]) => {
    const newRules = rules.map((rule, index) => ({
      ...rule,
      id: `anr-${new Date().getTime()}-${index}`
    }));
    // Replace existing rules with the same digit count
    setAccountNumberingRules(prev => {
      const digits = newRules[0].digits;
      const filteredPrev = prev.filter(r => r.digits !== digits);
      return [...filteredPrev, ...newRules].sort((a,b) => a.start - b.start);
    });
  }, []);

  const value = { accounts, transactions, customers, vendors, yearbooks, accountNumberingRules, addTransaction, addAccount, addYearbook, addAccountNumberingRule };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};