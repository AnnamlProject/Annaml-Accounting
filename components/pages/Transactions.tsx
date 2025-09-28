import React, { useState, useEffect } from 'react';
import Header from '../layout/Header';
import { useData } from '../../hooks/useData';
import { Transaction, TransactionType } from '../../types';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { CATEGORIES } from '../../constants';
import { categorizeTransaction } from '../../services/geminiService';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
};

const NewTransactionForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { addTransaction, accounts, customers, vendors } = useData();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState<TransactionType>(TransactionType.Expense);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [accountId, setAccountId] = useState(accounts.length > 0 ? accounts[0].id : '');
  const [customerId, setCustomerId] = useState('');
  const [vendorId, setVendorId] = useState('');
  const [isCategorizing, setIsCategorizing] = useState(false);

  useEffect(() => {
    if (accounts.length > 0 && !accountId) {
      setAccountId(accounts[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts]);

  const handleDescriptionBlur = async () => {
    if (description.length > 3) {
      setIsCategorizing(true);
      const suggestedCategory = await categorizeTransaction(description);
      setCategory(suggestedCategory);
      setIsCategorizing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountId) {
      alert("Please add an account first.");
      return;
    }
    addTransaction({
      description,
      amount: parseFloat(amount),
      date,
      type,
      category,
      accountId,
      ...(type === TransactionType.Income && customerId && { customerId }),
      ...(type === TransactionType.Expense && vendorId && { vendorId }),
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Date" type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <Input
        label="Description"
        placeholder="e.g., Coffee with client"
        value={description}
        onChange={e => setDescription(e.target.value)}
        onBlur={handleDescriptionBlur}
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <Input label="Amount" type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} required />
        <Select label="Type" value={type} onChange={e => { setType(e.target.value as TransactionType); setCustomerId(''); setVendorId(''); }} required>
          <option value={TransactionType.Expense}>Expense</option>
          <option value={TransactionType.Income}>Income</option>
        </Select>
      </div>
       <div className="relative">
        <Select label="Category" value={category} onChange={e => setCategory(e.target.value)} required>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </Select>
        {isCategorizing && (
          <div className="absolute inset-y-0 right-0 top-6 flex items-center pr-3 text-sm text-slate-500">
            AI thinking...
          </div>
        )}
      </div>
      
      {type === TransactionType.Income && (
        <Select label="Customer (Optional)" value={customerId} onChange={e => setCustomerId(e.target.value)}>
            <option value="">Select a customer</option>
            {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </Select>
      )}

      {type === TransactionType.Expense && (
        <Select label="Vendor (Optional)" value={vendorId} onChange={e => setVendorId(e.target.value)}>
            <option value="">Select a vendor</option>
            {vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
        </Select>
      )}

      <Select label="Account" value={accountId} onChange={e => setAccountId(e.target.value)} required>
        {accounts.map(acc => <option key={acc.id} value={acc.id}>{acc.name} ({formatCurrency(acc.balance)})</option>)}
      </Select>
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
        <Button type="submit">Add Transaction</Button>
      </div>
    </form>
  );
};


const Transactions: React.FC = () => {
  const { transactions, customers, vendors } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getEntityName = (t: Transaction) => {
    if (t.customerId) {
      return customers.find(c => c.id === t.customerId)?.name;
    }
    if (t.vendorId) {
      return vendors.find(v => v.id === t.vendorId)?.name;
    }
    return 'N/A';
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-slate-100 min-h-full">
      <Header title="Transactions">
        <Button onClick={() => setIsModalOpen(true)}>Add Transaction</Button>
      </Header>
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm text-left text-slate-500">
          <thead className="text-xs text-slate-700 uppercase bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3">Customer/Vendor</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t: Transaction) => (
              <tr key={t.id} className="bg-white border-b hover:bg-slate-50">
                <td className="px-6 py-4">{t.date}</td>
                <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{t.description}</td>
                <td className="px-6 py-4">{getEntityName(t)}</td>
                <td className="px-6 py-4">{t.category}</td>
                <td className={`px-6 py-4 text-right font-semibold ${t.type === TransactionType.Income ? 'text-green-500' : 'text-red-500'}`}>
                   {t.type === TransactionType.Income ? '+' : '-'} {formatCurrency(t.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal title="New Transaction" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NewTransactionForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Transactions;