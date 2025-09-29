import React, { useState, useMemo } from 'react';
import Header from '../../layout/Header';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import Textarea from '../../ui/Textarea';
import Checkbox from '../../ui/Checkbox';
import { useData } from '../../../hooks/useData';
import { DocumentDuplicateIcon, TrashIcon } from '../../icons/Icons';

// Interface for each line item in the invoice
interface InvoiceItemLine {
  id: number;
  itemNumber: string;
  quantity: number;
  order: number;
  backOrder: number;
  unit: string;
  description: string;
  price: number;
  tax: number;
  accountId: string;
  projects: string;
}

// Interface for Purchase Invoice data
interface PurchaseInvoice {
    id: number;
    vendorId: string;
    invoiceNumber: string;
    invoiceDate: string;
    items: InvoiceItemLine[];
    // add other properties as needed
}

// Local mock data
const MOCK_ITEMS = [
  { id: 'item-1', name: 'Jasa Konsultasi', price: 1000000 },
  { id: 'item-2', name: 'Sewa Peralatan', price: 500000 },
  { id: 'item-3', name: 'ATK Kantor', price: 150000 },
];
const MOCK_PROJECTS = [{id: 'proj-1', name: 'Proyek Internal'}, {id: 'proj-2', name: 'Proyek Klien A'}];
const MOCK_LOCATIONS = [{id: 'loc-1', name: 'Primary Location'}, {id: 'loc-2', name: 'Warehouse B'}];


const PurchaseInvoices: React.FC = () => {
    const { vendors, chartOfAccounts, taxes } = useData();
    const [view, setView] = useState<'list' | 'form'>('list');
    const [invoices, setInvoices] = useState<PurchaseInvoice[]>([]);
    
    // State for the form
    const [vendorId, setVendorId] = useState('');
    const [invoiceReceived, setInvoiceReceived] = useState(true);
    const [invoiceNo, setInvoiceNo] = useState('');
    const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
    const [quoteNo, setQuoteNo] = useState('');
    const [items, setItems] = useState<InvoiceItemLine[]>([
        { id: Date.now(), itemNumber: '', quantity: 1, order: 1, backOrder: 0, unit: 'pcs', description: '', price: 0, tax: 0, accountId: '', projects: '' },
    ]);
    const [freight, setFreight] = useState(0);
    const [earlyPaymentTerms, setEarlyPaymentTerms] = useState('');


    const handleAddNew = () => setView('form');
    const handleCancel = () => setView('list');

    const handleItemChange = (id: number, field: keyof InvoiceItemLine, value: any) => {
        setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const addNewItem = () => {
        setItems(prev => [...prev, { id: Date.now(), itemNumber: '', quantity: 1, order: 1, backOrder: 0, unit: 'pcs', description: '', price: 0, tax: 0, accountId: '', projects: '' }]);
    };
    
    const removeItem = (id: number) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const { subtotal, totalTax, total } = useMemo(() => {
        const sub = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
        const tax = items.reduce((acc, item) => acc + (item.quantity * item.price * (item.tax / 100)), 0);
        return { subtotal: sub, totalTax: tax, total: sub + tax + freight };
    }, [items, freight]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Form submission logic
        console.log("Submitting Invoice:", { vendorId, invoiceNo, items });
        alert("Purchase Invoice Created! (check data in console)");
        setView('list');
    };

    const formatCurrency = (value: number) => new Intl.NumberFormat('id-ID').format(value);


    if (view === 'form') {
        return (
            <div className="p-4 sm:p-6 lg:p-8">
                <Header title="Create Purchase Invoice" />
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-6">
                    {/* Header Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                        <Select label="Vendor *" value={vendorId} onChange={e => setVendorId(e.target.value)} required>
                            <option value="" disabled>-- Pilih Vendor --</option>
                            {vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                        </Select>
                        
                        <div className="md:col-span-2 grid grid-cols-2 gap-6">
                            <Input label="Invoice No.:" value={invoiceNo} onChange={e => setInvoiceNo(e.target.value)} />
                            <Input label="Date:" type="date" value={invoiceDate} onChange={e => setInvoiceDate(e.target.value)} />
                            <Input label="Order/Quote No.:" value={quoteNo} onChange={e => setQuoteNo(e.target.value)} />
                             <div className="flex items-center pt-6">
                                <Checkbox id="invoice-received" label="Invoice Received" checked={invoiceReceived} onChange={e => setInvoiceReceived(e.target.checked)} />
                             </div>
                        </div>
                    </div>

                     {/* Item Lines Table */}
                    <div>
                        <div className="overflow-x-auto">
                           <table className="w-full text-sm">
                                <thead className="text-left text-slate-500">
                                    <tr>
                                        {['Item Number', 'Quantity', 'Order', 'Back Order', 'Unit', 'Description', 'Price', 'Tax', 'Tax Amount', 'Amount', 'Account', 'Projects', 'Aksi'].map(h => <th key={h} className="pb-2 font-medium pr-2">{h}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map(item => {
                                        const amount = item.quantity * item.price;
                                        const taxAmount = amount * (item.tax / 100);
                                        return (
                                            <tr key={item.id}>
                                                <td className="pr-2 py-1"><Input label="" value={item.itemNumber} onChange={e => handleItemChange(item.id, 'itemNumber', e.target.value)} /></td>
                                                <td className="pr-2 py-1"><Input label="" type="number" value={item.quantity} onChange={e => handleItemChange(item.id, 'quantity', Number(e.target.value))} /></td>
                                                <td className="pr-2 py-1"><Input label="" type="number" value={item.order} onChange={e => handleItemChange(item.id, 'order', Number(e.target.value))} /></td>
                                                <td className="pr-2 py-1"><Input label="" type="number" value={item.backOrder} onChange={e => handleItemChange(item.id, 'backOrder', Number(e.target.value))} /></td>
                                                <td className="pr-2 py-1"><Input label="" value={item.unit} onChange={e => handleItemChange(item.id, 'unit', e.target.value)} /></td>
                                                <td className="pr-2 py-1"><Input label="" value={item.description} onChange={e => handleItemChange(item.id, 'description', e.target.value)} /></td>
                                                <td className="pr-2 py-1"><Input label="" type="number" value={item.price} onChange={e => handleItemChange(item.id, 'price', Number(e.target.value))} /></td>
                                                <td className="pr-2 py-1"><Select label="" value={item.tax} onChange={e => handleItemChange(item.id, 'tax', Number(e.target.value))}><option value={0}>0%</option></Select></td>
                                                <td className="pr-2 py-1"><Input label="" value={formatCurrency(taxAmount)} disabled /></td>
                                                <td className="pr-2 py-1"><Input label="" value={formatCurrency(amount)} disabled /></td>
                                                <td className="pr-2 py-1"><Select label="" value={item.accountId} onChange={e => handleItemChange(item.id, 'accountId', e.target.value)}><option value="">Pilih Akun</option>{chartOfAccounts.map(a => <option key={a.id} value={a.id}>{a.namaAkun}</option>)}</Select></td>
                                                <td className="pr-2 py-1"><Select label="" value={item.projects} onChange={e => handleItemChange(item.id, 'projects', e.target.value)}><option value="">Pilih Proyek</option>{MOCK_PROJECTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</Select></td>
                                                <td className="py-1"><Button type="button" onClick={() => removeItem(item.id)} className="!p-2 bg-red-500 hover:bg-red-600"><TrashIcon className="w-4 h-4 text-white" /></Button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                           </table>
                        </div>
                        <Button type="button" variant="secondary" onClick={addNewItem} className="mt-2">+ Add Line</Button>
                    </div>

                    {/* Footer and Summary */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t">
                        <div>
                           <Input label="Early Payment Terms" value={earlyPaymentTerms} onChange={e => setEarlyPaymentTerms(e.target.value)} />
                        </div>
                         <div className="space-y-2 flex flex-col items-end">
                            <div className="flex justify-between w-full max-w-xs"><span className="font-semibold">Subtotal :</span><span>{formatCurrency(subtotal)}</span></div>
                            <div className="flex justify-between items-center w-full max-w-xs"><label className="font-semibold">Freight :</label><Input label="" type="number" className="!w-32 text-right" value={freight} onChange={e => setFreight(parseFloat(e.target.value) || 0)} /></div>
                             <div className="flex justify-between w-full max-w-xs"><span className="font-semibold">Tax :</span><span>{formatCurrency(totalTax)}</span></div>
                            <div className="flex justify-between w-full max-w-xs pt-2 border-t mt-2"><span className="font-bold text-lg">Total :</span><span className="font-bold text-lg">{formatCurrency(total)}</span></div>
                         </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="pt-6 flex justify-end gap-3 border-t">
                        <Button type="button" variant="secondary" onClick={handleCancel}>Cancel</Button>
                        <Button type="submit">Process</Button>
                    </div>
                </form>
            </div>
        );
    }
    
    // List View
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="bg-[#EBCB90] rounded-t-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <h2 className="text-lg font-semibold text-slate-800">Purchase Invoice</h2>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="secondary" className="flex items-center gap-2"><DocumentDuplicateIcon className="w-4 h-4" /> File</Button>
                    <Button onClick={handleAddNew}>+ Add Purchase Invoice</Button>
                </div>
            </div>
            <div className="bg-white p-6 rounded-b-lg shadow-sm border border-t-0 border-slate-200">
                {invoices.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="inline-block bg-slate-100 rounded-full p-4">
                            <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-slate-800">Belum ada purchase Invoice</h3>
                        <div className="mt-6">
                            <Button onClick={handleAddNew}>+ Tambah</Button>
                        </div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-800 uppercase bg-slate-50">
                                <tr>
                                    {['#', 'Invoice Number', 'Invoice Order', 'Shipping Date', 'Customer', 'Payment Method', 'Shipping Address', 'Freight', 'Early Payment Terms', 'Messages', 'Aksi'].map(h => <th key={h} className="px-6 py-3">{h}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Rows will be rendered here */}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PurchaseInvoices;
