import React, { useState } from 'react';
import { useData } from '../../../hooks/useData';
import Button from '../../ui/Button';
import Select from '../../ui/Select';
import Header from '../../layout/Header';

// Definisikan tipe untuk data yang akan kita simpan secara lokal
interface LinkedPurchaseData {
  id: number;
  principalBankAccount: string;
  accountPayable: string;
  freightExpense: string;
  earlyPaymentDiscount: string;
  prepayments: string;
}

const LinkedAccount: React.FC = () => {
  const { chartOfAccounts } = useData();
  const [view, setView] = useState<'list' | 'form'>('list');
  
  // Karena data belum ada di DataContext, kita kelola di state lokal komponen ini
  const [linkedPurchaseAccounts, setLinkedPurchaseAccounts] = useState<LinkedPurchaseData[]>([]);

  // State untuk setiap field di dalam form
  const [principalBankAccount, setPrincipalBankAccount] = useState('');
  const [accountPayable, setAccountPayable] = useState('');
  const [freightExpense, setFreightExpense] = useState('');
  const [earlyPaymentDiscount, setEarlyPaymentDiscount] = useState('');
  const [prepayments, setPrepayments] = useState('');

  const getAccountDetails = (accountId: string) => {
    const account = chartOfAccounts.find(acc => acc.id === accountId);
    return account ? { kode: account.kodeAkun, nama: account.namaAkun } : { kode: 'N/A', nama: 'N/A' };
  };

  const handleAddNew = () => {
    // Reset form fields before showing
    setPrincipalBankAccount('');
    setAccountPayable('');
    setFreightExpense('');
    setEarlyPaymentDiscount('');
    setPrepayments('');
    setView('form');
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validasi sederhana
    if (!principalBankAccount || !accountPayable || !freightExpense || !earlyPaymentDiscount || !prepayments) {
      alert('Harap isi semua field yang wajib diisi.');
      return;
    }
    
    const newLinkedAccount: LinkedPurchaseData = {
      id: Date.now(), // ID unik sederhana
      principalBankAccount,
      accountPayable,
      freightExpense,
      earlyPaymentDiscount,
      prepayments,
    };

    setLinkedPurchaseAccounts([newLinkedAccount]); // Dalam contoh ini, kita hanya mengizinkan satu set linked accounts
    setView('list');
  };

  if (view === 'form') {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <Header title="Add Linked Account Purchase" />
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-6">
          <Select label="Principal Bank Account *" value={principalBankAccount} onChange={e => setPrincipalBankAccount(e.target.value)} required>
            <option value="" disabled>-- Pilih Akun --</option>
            {chartOfAccounts.map(acc => <option key={acc.id} value={acc.id}>{acc.kodeAkun} - {acc.namaAkun}</option>)}
          </Select>
          <Select label="Account Payable *" value={accountPayable} onChange={e => setAccountPayable(e.target.value)} required>
            <option value="" disabled>-- Pilih Akun --</option>
            {chartOfAccounts.map(acc => <option key={acc.id} value={acc.id}>{acc.kodeAkun} - {acc.namaAkun}</option>)}
          </Select>
          <Select label="Freight Expense *" value={freightExpense} onChange={e => setFreightExpense(e.target.value)} required>
            <option value="" disabled>-- Pilih Akun --</option>
            {chartOfAccounts.map(acc => <option key={acc.id} value={acc.id}>{acc.kodeAkun} - {acc.namaAkun}</option>)}
          </Select>
          <Select label="Early Payment Purchase Discount *" value={earlyPaymentDiscount} onChange={e => setEarlyPaymentDiscount(e.target.value)} required>
            <option value="" disabled>-- Pilih Akun --</option>
            {chartOfAccounts.map(acc => <option key={acc.id} value={acc.id}>{acc.kodeAkun} - {acc.namaAkun}</option>)}
          </Select>
          <Select label="Prepayments & Prepaid Orders *" value={prepayments} onChange={e => setPrepayments(e.target.value)} required>
            <option value="" disabled>-- Pilih Akun --</option>
            {chartOfAccounts.map(acc => <option key={acc.id} value={acc.id}>{acc.kodeAkun} - {acc.namaAkun}</option>)}
          </Select>

          <div className="pt-4 flex justify-start gap-3">
            <Button type="button" variant="secondary" onClick={() => setView('list')}>
              Kembali
            </Button>
            <Button type="submit">
              Simpan
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="bg-blue-600 rounded-t-lg p-4 flex items-center justify-between">
          <div className="flex items-center">
              <svg className="w-6 h-6 text-white mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <h2 className="text-lg font-semibold text-white">Linked Account Purchase</h2>
          </div>
          <Button onClick={handleAddNew} variant="secondary" className="bg-white/90 hover:bg-white text-blue-600">
              + Add Linked Account Purchase
          </Button>
      </div>
      <div className="bg-white p-6 rounded-b-lg shadow-sm border border-t-0 border-slate-200">
        {linkedPurchaseAccounts.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-block bg-slate-100 rounded-full p-4">
              <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-800">Belum ada Linked Account Purchase</h3>
            <p className="mt-1 text-sm text-slate-500">Mulai dengan membuat linked account baru.</p>
            <div className="mt-6">
                <Button onClick={handleAddNew}>
                    + Tambah Sekarang
                </Button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-800 uppercase bg-slate-50">
                <tr>
                  <th className="px-6 py-3">#</th>
                  <th className="px-6 py-3">KODE</th>
                  <th className="px-6 py-3">NAMA AKUN</th>
                  <th className="px-6 py-3">AKSI</th>
                </tr>
              </thead>
              <tbody>
                {linkedPurchaseAccounts.flatMap((item, index) => [
                    <tr key={`${item.id}-1`} className="border-b hover:bg-slate-50"><td className="px-6 py-4">{index * 5 + 1}</td><td className="px-6 py-4 font-mono text-sm">{getAccountDetails(item.principalBankAccount).kode}</td><td className="px-6 py-4">{getAccountDetails(item.principalBankAccount).nama}</td><td className="px-6 py-4"></td></tr>,
                    <tr key={`${item.id}-2`} className="border-b hover:bg-slate-50"><td className="px-6 py-4">{index * 5 + 2}</td><td className="px-6 py-4 font-mono text-sm">{getAccountDetails(item.accountPayable).kode}</td><td className="px-6 py-4">{getAccountDetails(item.accountPayable).nama}</td><td className="px-6 py-4"></td></tr>,
                    <tr key={`${item.id}-3`} className="border-b hover:bg-slate-50"><td className="px-6 py-4">{index * 5 + 3}</td><td className="px-6 py-4 font-mono text-sm">{getAccountDetails(item.freightExpense).kode}</td><td className="px-6 py-4">{getAccountDetails(item.freightExpense).nama}</td><td className="px-6 py-4"></td></tr>,
                    <tr key={`${item.id}-4`} className="border-b hover:bg-slate-50"><td className="px-6 py-4">{index * 5 + 4}</td><td className="px-6 py-4 font-mono text-sm">{getAccountDetails(item.earlyPaymentDiscount).kode}</td><td className="px-6 py-4">{getAccountDetails(item.earlyPaymentDiscount).nama}</td><td className="px-6 py-4"></td></tr>,
                    <tr key={`${item.id}-5`} className="border-b hover:bg-slate-50"><td className="px-6 py-4">{index * 5 + 5}</td><td className="px-6 py-4 font-mono text-sm">{getAccountDetails(item.prepayments).kode}</td><td className="px-6 py-4">{getAccountDetails(item.prepayments).nama}</td><td className="px-6 py-4"></td></tr>
                ])}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkedAccount;