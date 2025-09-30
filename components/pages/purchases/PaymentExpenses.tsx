import React, { useState, useMemo } from 'react';
import Header from '../../layout/Header';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import Textarea from '../../ui/Textarea';
import { useData } from '../../../hooks/useData';
import { DocumentDuplicateIcon, TrashIcon, PencilIcon, EyeIcon } from '../../icons/Icons';

// Interface untuk data Payment Expense yang disimpan
interface PaymentExpense {
  id: number;
  fromAccountId: string;
  chequeNo: string;
  date: string;
  totalAmount: number;
  comment: string;
  lines: ExpenseLine[];
}

// Interface untuk setiap baris di dalam tabel expense
interface ExpenseLine {
    id: number;
    accountId: string;
    description: string;
    amount: number;
    taxId: string;
}

const PaymentExpenses: React.FC = () => {
    const { chartOfAccounts, taxes } = useData();
    const [view, setView] = useState<'list' | 'form'>('list');
    const [payments, setPayments] = useState<PaymentExpense[]>([]);
    
    // State untuk form
    const [fromAccountId, setFromAccountId] = useState('');
    const [chequeNo, setChequeNo] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [comment, setComment] = useState('');
    const [lines, setLines] = useState<ExpenseLine[]>([
        { id: Date.now(), accountId: '', description: '', amount: 0, taxId: '' }
    ]);

    const bankAndCashAccounts = useMemo(() => 
        chartOfAccounts.filter(acc => 
            acc.klasifikasiAkun === 'Cash' || acc.klasifikasiAkun === 'Bank'
        ), [chartOfAccounts]);

    const { subtotal, totalTax, total } = useMemo(() => {
        const sub = lines.reduce((acc, line) => acc + line.amount, 0);
        // Implementasi pajak sederhana, asumsi rate dari mock
        const tax = 0; // Ganti dengan logika pajak jika diperlukan
        return { subtotal: sub, totalTax: tax, total: sub + tax };
    }, [lines]);

    const handleAddNew = () => {
        setFromAccountId(bankAndCashAccounts.length > 0 ? bankAndCashAccounts[0].id : '');
        setChequeNo('');
        setDate(new Date().toISOString().split('T')[0]);
        setComment('');
        setLines([{ id: Date.now(), accountId: '', description: '', amount: 0, taxId: '' }]);
        setView('form');
    }
    const handleCancel = () => setView('list');

    const handleLineChange = (id: number, field: keyof ExpenseLine, value: any) => {
        setLines(prev => prev.map(line => line.id === id ? { ...line, [field]: value } : line));
    };

    const addLine = () => {
        setLines(prev => [...prev, { id: Date.now(), accountId: '', description: '', amount: 0, taxId: '' }]);
    };

    const removeLine = (id: number) => {
        setLines(prev => prev.filter(line => line.id !== id));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!fromAccountId || total <= 0) {
            alert("Harap lengkapi From Account dan detail pembayaran.");
            return;
        }
        
        const newPayment: PaymentExpense = {
            id: Date.now(),
            fromAccountId,
            chequeNo,
            date,
            totalAmount: total,
            comment,
            lines
        };

        setPayments(prev => [...prev, newPayment]);
        alert("Payment Expense berhasil dibuat!");
        setView('list');
    };
    
    const getAccountName = (id: string) => chartOfAccounts.find(acc => acc.id === id)?.namaAkun || 'N/A';
    const formatCurrency = (value: number) => new Intl.NumberFormat('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);

    // Karena view default 'list', dan kita ingin langsung ke form, kita set view ke 'form' di sini
    if (view === 'list' && payments.length === 0) {
        handleAddNew(); // Otomatis buka form jika list kosong
    }

    if (view === 'form') {
        return (
            <div className="p-4 sm:p-6 lg:p-8">
                <Header title="Create Payment Expense" />
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-slate-50 rounded-lg border">
                        <Select label="From Account *" value={fromAccountId} onChange={e => setFromAccountId(e.target.value)} required>
                            <option value="" disabled>-- Pilih Akun Bank/Kas --</option>
                            {bankAndCashAccounts.map(acc => <option key={acc.id} value={acc.id}>{acc.kodeAkun} - {acc.namaAkun}</option>)}
                        </Select>
                        <Input label="Cheque No." value={chequeNo} onChange={e => setChequeNo(e.target.value)} />
                        <Input label="Date" type="date" value={date} onChange={e => setDate(e.target.value)} required/>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="text-left text-slate-500">
                                <tr>
                                    <th className="pb-2 font-medium w-[30%]">Acct</th>
                                    <th className="pb-2 font-medium w-[40%]">Description</th>
                                    <th className="pb-2 font-medium w-[15%]">Amount</th>
                                    <th className="pb-2 font-medium w-[10%]">Tax</th>
                                    <th className="pb-2 font-medium w-[5%] text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lines.map(line => (
                                    <tr key={line.id}>
                                        <td className="py-1 pr-2"><Select value={line.accountId} onChange={e => handleLineChange(line.id, 'accountId', e.target.value)}><option value="">Pilih Akun</option>{chartOfAccounts.map(a => <option key={a.id} value={a.id}>{a.kodeAkun} - {a.namaAkun}</option>)}</Select></td>
                                        <td className="py-1 pr-2"><Input label="" value={line.description} onChange={e => handleLineChange(line.id, 'description', e.target.value)} /></td>
                                        <td className="py-1 pr-2"><Input label="" type="number" value={line.amount} onChange={e => handleLineChange(line.id, 'amount', Number(e.target.value))} className="text-right" /></td>
                                        <td className="py-1 pr-2"><Select value={line.taxId} onChange={e => handleLineChange(line.id, 'taxId', e.target.value)}><option value="">None</option>{taxes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}</Select></td>
                                        <td className="py-1 text-center"><Button type="button" onClick={() => removeLine(line.id)} className="!p-2 mt-1 bg-red-500 hover:bg-red-600"><TrashIcon className="w-4 h-4 text-white" /></Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Button type="button" variant="secondary" onClick={addLine}>+ Add Line</Button>
                    
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t items-start">
                        <Textarea label="Comment" value={comment} onChange={e => setComment(e.target.value)} rows={4} />
                         <div className="space-y-2 flex flex-col items-end">
                             <div className="flex justify-between w-full max-w-xs"><span className="font-semibold text-slate-600">Subtotal :</span><span className="text-slate-800">{formatCurrency(subtotal)}</span></div>
                             <div className="flex justify-between w-full max-w-xs"><span className="font-semibold text-slate-600">Tax :</span><span className="text-slate-800">{formatCurrency(totalTax)}</span></div>
                             <div className="flex justify-between w-full max-w-xs pt-2 border-t mt-2"><span className="font-bold text-lg">Total :</span><span className="font-bold text-lg">{formatCurrency(total)}</span></div>
                         </div>
                    </div>

                    <div className="pt-6 flex justify-end gap-3">
                        <Button type="button" variant="secondary" onClick={handleCancel}>Cancel</Button>
                        <Button type="submit">Process</Button>
                    </div>
                </form>
            </div>
        );
    }
    
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="bg-blue-600 rounded-t-lg p-4 flex items-center justify-between">
                <div className="flex items-center"><h2 className="text-lg font-semibold text-white">Payment Expenses</h2></div>
                <div className="flex items-center gap-2">
                    <Button variant="secondary" className="bg-white/90 text-blue-600 hover:bg-white"><DocumentDuplicateIcon className="w-4 h-4 mr-2" /> File</Button>
                    <Button onClick={handleAddNew} variant="secondary" className="bg-white/90 text-blue-600 hover:bg-white">+ Add Payment Expense</Button>
                </div>
            </div>
            <div className="bg-white p-6 rounded-b-lg shadow-sm border border-t-0 border-slate-200">
                {payments.length === 0 ? (
                    <div className="text-center py-16">
                        <h3 className="mt-4 text-lg font-semibold text-slate-800">Belum ada Payment Expenses</h3>
                        <div className="mt-6"><Button onClick={handleAddNew}>+ Tambah</Button></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-800 uppercase bg-slate-50">
                                <tr>
                                    {['#', 'From Account', 'Date', 'Description', 'Amount', 'Aksi'].map(h => <th key={h} className="px-6 py-3">{h}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((p, index) => (
                                    <tr key={p.id} className="border-b hover:bg-slate-50">
                                        <td className="px-6 py-4">{index + 1}</td>
                                        <td className="px-6 py-4">{getAccountName(p.fromAccountId)}</td>
                                        <td className="px-6 py-4">{p.date}</td>
                                        <td className="px-6 py-4 truncate max-w-xs">{p.comment}</td>
                                        <td className="px-6 py-4 font-semibold text-right">{formatCurrency(p.totalAmount)}</td>
                                        <td className="px-6 py-4 flex items-center space-x-3">
                                            <button className="text-blue-500 hover:text-blue-700"><EyeIcon className="w-5 h-5"/></button>
                                            <button className="text-yellow-500 hover:text-yellow-700"><PencilIcon className="w-5 h-5"/></button>
                                            <button className="text-red-500 hover:text-red-700"><TrashIcon className="w-5 h-5"/></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentExpenses;