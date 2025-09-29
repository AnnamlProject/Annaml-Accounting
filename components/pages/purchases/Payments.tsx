import React, { useState, useMemo, useEffect } from 'react';
import Header from '../../layout/Header';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import Textarea from '../../ui/Textarea';
import { useData } from '../../../hooks/useData';
import { DocumentDuplicateIcon, TrashIcon, PencilIcon, EyeIcon } from '../../icons/Icons';

// Interface untuk data Payment yang disimpan
interface Payment {
  id: number;
  fromAccountId: string;
  vendorId: string;
  chequeNo: string;
  date: string;
  amount: number;
  comment: string;
}

// Interface untuk setiap baris di dalam tabel pembayaran invoice
interface PaymentLine {
    id: number;
    dueDate: string;
    invoiceNo: string;
    originalAmount: number;
    amountOwing: number;
    paymentAmount: number;
}

const Payments: React.FC = () => {
    const { vendors, chartOfAccounts } = useData();
    const [view, setView] = useState<'list' | 'form'>('list');
    const [payments, setPayments] = useState<Payment[]>([]);
    
    // State untuk form
    const [fromAccountId, setFromAccountId] = useState('');
    const [vendorId, setVendorId] = useState('');
    const [chequeNo, setChequeNo] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [lines, setLines] = useState<PaymentLine[]>([]);
    const [comment, setComment] = useState('');

    const bankAndCashAccounts = useMemo(() => 
        chartOfAccounts.filter(acc => 
            acc.klasifikasiAkun === 'Cash' || acc.klasifikasiAkun === 'Bank'
        ), [chartOfAccounts]);

    // EFEK: Muat data invoice palsu saat vendor dipilih
    useEffect(() => {
        if (vendorId) {
            // Simulasi pengambilan data invoice untuk vendor yang dipilih
            setLines([
                { id: 1, dueDate: '2025-09-30', invoiceNo: 'INV-001', originalAmount: 500000, amountOwing: 500000, paymentAmount: 0 },
                { id: 2, dueDate: '2025-10-15', invoiceNo: 'INV-002', originalAmount: 1250000, amountOwing: 1000000, paymentAmount: 0 },
            ]);
        } else {
            setLines([]);
        }
    }, [vendorId]);

    const handleLineChange = (id: number, field: keyof PaymentLine, value: any) => {
        setLines(prevLines =>
            prevLines.map(line =>
                line.id === id ? { ...line, [field]: Number(value) } : line
            )
        );
    };

    const totalPaymentAmount = useMemo(() => {
        return lines.reduce((total, line) => total + line.paymentAmount, 0);
    }, [lines]);

    const handleAddNew = () => {
        // Reset state form sebelum ditampilkan
        setFromAccountId(bankAndCashAccounts.length > 0 ? bankAndCashAccounts[0].id : '');
        setVendorId('');
        setChequeNo('');
        setDate(new Date().toISOString().split('T')[0]);
        setComment('');
        setLines([]);
        setView('form');
    }
    const handleCancel = () => setView('list');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!fromAccountId || !vendorId || totalPaymentAmount <= 0) {
            alert("Harap lengkapi From Account, Vendor, dan masukkan jumlah pembayaran pada salah satu tagihan.");
            return;
        }
        
        const newPayment: Payment = {
            id: Date.now(),
            fromAccountId,
            vendorId,
            chequeNo,
            date,
            amount: totalPaymentAmount,
            comment,
        };

        setPayments(prev => [...prev, newPayment]);
        alert("Payment berhasil dibuat!");
        setView('list');
    };
    
    const getAccountName = (id: string) => chartOfAccounts.find(acc => acc.id === id)?.namaAkun || 'N/A';
    const getVendorName = (id: string) => vendors.find(v => v.id === id)?.name || 'N/A';
    const formatCurrency = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);

    // Tampilan Form
    if (view === 'form') {
        return (
            <div className="p-4 sm:p-6 lg:p-8">
                <Header title="Create Payment" />
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-green-50/50 rounded-lg border">
                        <Select label="From Account *" value={fromAccountId} onChange={e => setFromAccountId(e.target.value)} required>
                            <option value="" disabled>-- Pilih Akun Bank/Kas --</option>
                            {bankAndCashAccounts.map(acc => <option key={acc.id} value={acc.id}>{acc.kodeAkun} - {acc.namaAkun}</option>)}
                        </Select>
                        <Select label="Pay to Vendor *" value={vendorId} onChange={e => setVendorId(e.target.value)} required>
                             <option value="" disabled>-- Pilih Vendor --</option>
                             {vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                        </Select>
                        <div className="grid grid-cols-2 gap-4">
                           <Input label="Cheque No." value={chequeNo} onChange={e => setChequeNo(e.target.value)} />
                           <Input label="Date" type="date" value={date} onChange={e => setDate(e.target.value)} required/>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="text-left text-slate-500 bg-slate-50">
                                <tr>
                                    {['Due Date', 'Invoice No.', 'Original Amount', 'Amount Owing', 'Payment Amount'].map(h => <th key={h} className="p-2 font-medium">{h}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {lines.length > 0 ? lines.map(line => (
                                    <tr key={line.id}>
                                        <td className="p-1">{line.dueDate}</td>
                                        <td className="p-1">{line.invoiceNo}</td>
                                        <td className="p-1">{formatCurrency(line.originalAmount)}</td>
                                        <td className="p-1">{formatCurrency(line.amountOwing)}</td>
                                        <td className="p-1">
                                            <Input 
                                                label="" 
                                                type="number" 
                                                value={line.paymentAmount} 
                                                onChange={(e) => handleLineChange(line.id, 'paymentAmount', e.target.value)} 
                                                className="text-right"
                                            />
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="text-center p-8 text-slate-500">
                                            Pilih vendor untuk melihat tagihan yang belum dibayar.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t items-start">
                        <Textarea label="Comment" value={comment} onChange={e => setComment(e.target.value)} rows={3} />
                         <div className="space-y-2 flex flex-col items-end">
                            <div className="flex justify-between w-full max-w-xs pt-2 border-t mt-2">
                                <span className="font-bold text-lg">Total Payment:</span>
                                <span className="font-bold text-lg">{formatCurrency(totalPaymentAmount)}</span>
                            </div>
                         </div>
                    </div>

                    <div className="pt-6 flex justify-end gap-3 border-t">
                        <Button type="button" variant="secondary" onClick={handleCancel}>Cancel</Button>
                        <Button type="submit">Process</Button>
                    </div>
                </form>
            </div>
        );
    }
    
    // Tampilan Daftar
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="bg-blue-600 rounded-t-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <h2 className="text-lg font-semibold text-white">Payment</h2>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="secondary" className="bg-white/90 text-blue-600 hover:bg-white flex items-center gap-2">
                        <DocumentDuplicateIcon className="w-4 h-4" /> File
                    </Button>
                    <Button onClick={handleAddNew} variant="secondary" className="bg-white/90 text-blue-600 hover:bg-white">
                        + Add Payment
                    </Button>
                </div>
            </div>
            <div className="bg-white p-6 rounded-b-lg shadow-sm border border-t-0 border-slate-200">
                {payments.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="inline-block bg-slate-100 rounded-full p-4">
                           <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-slate-800">Belum ada Payment</h3>
                        <div className="mt-6">
                            <Button onClick={handleAddNew}>+ Tambah</Button>
                        </div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-800 uppercase bg-slate-50">
                                <tr>
                                    {['#', 'Payment Method', 'From Account', 'Vendor', 'Payment Date', 'Comment', 'Amount', 'Aksi'].map(h => <th key={h} className="px-6 py-3">{h}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((p, index) => (
                                    <tr key={p.id} className="border-b hover:bg-slate-50">
                                        <td className="px-6 py-4">{index + 1}</td>
                                        <td className="px-6 py-4">{p.chequeNo ? `Cheque #${p.chequeNo}` : 'N/A'}</td>
                                        <td className="px-6 py-4">{getAccountName(p.fromAccountId)}</td>
                                        <td className="px-6 py-4 font-medium">{getVendorName(p.vendorId)}</td>
                                        <td className="px-6 py-4">{p.date}</td>
                                        <td className="px-6 py-4 truncate max-w-xs">{p.comment}</td>
                                        <td className="px-6 py-4 font-semibold text-right">{formatCurrency(p.amount)}</td>
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

export default Payments;