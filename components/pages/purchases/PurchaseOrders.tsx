import React, { useState, useMemo } from 'react';
import Header from '../../layout/Header';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import Textarea from '../../ui/Textarea';
import Checkbox from '../../ui/Checkbox';
import { useData } from '../../../hooks/useData';
import { TrashIcon, DocumentDuplicateIcon, EyeIcon, PencilIcon } from '../../icons/Icons';

// Interface untuk setiap baris item dalam order
interface OrderItemLine {
  id: number;
  itemId: string;
  qty: number;
  order: number;
  backOrder: number;
  unit: string;
  description: string;
  price: number;
  tax: number; // Tax rate sebagai persentase
  accountId: string;
}

// Interface untuk data Purchase Order
interface PurchaseOrder {
    id: number;
    vendorId: string;
    orderNumber: string;
    orderDate: string;
    total: number;
}

// Mock data lokal
const MOCK_ITEMS = [
  { id: 'item-1', name: 'Jasa Konsultasi', price: 1000000 },
  { id: 'item-2', name: 'Sewa Peralatan', price: 500000 },
  { id: 'item-3', name: 'ATK Kantor', price: 150000 },
];

const PurchaseOrders: React.FC = () => {
  const { vendors, chartOfAccounts } = useData();
  const [view, setView] = useState<'list' | 'form'>('list');
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);

  // State untuk form
  const [vendorId, setVendorId] = useState('');
  const [orderNumber, setOrderNumber] = useState(`PO-${Date.now()}`);
  const [orderDate, setOrderDate] = useState(new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState<OrderItemLine[]>([
    { id: Date.now(), itemId: '', qty: 1, order: 1, backOrder: 0, unit: 'pcs', description: '', price: 0, tax: 0, accountId: '' },
  ]);
  const [freight, setFreight] = useState(0);

  const handleAddNew = () => {
    // Reset form
    setVendorId('');
    setOrderNumber(`PO-${Date.now()}`);
    setOrderDate(new Date().toISOString().split('T')[0]);
    setItems([{ id: Date.now(), itemId: '', qty: 1, order: 1, backOrder: 0, unit: 'pcs', description: '', price: 0, tax: 0, accountId: '' }]);
    setFreight(0);
    setView('form');
  }

  const handleItemChange = (id: number, field: keyof OrderItemLine, value: any) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'itemId') {
              const selectedItem = MOCK_ITEMS.find(i => i.id === value);
              if(selectedItem) {
                  updatedItem.description = selectedItem.name;
                  updatedItem.price = selectedItem.price;
              }
          }
          return updatedItem;
        }
        return item;
      })
    );
  };

  const addNewItem = () => {
    setItems(prev => [...prev, { id: Date.now(), itemId: '', qty: 1, order: 1, backOrder: 0, unit: 'pcs', description: '', price: 0, tax: 0, accountId: '' }]);
  };

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const { subtotal, totalTax, total } = useMemo(() => {
    let sub = 0;
    let tax = 0;
    items.forEach(item => {
      const amount = item.qty * item.price;
      const taxAmount = amount * (item.tax / 100);
      sub += amount;
      tax += taxAmount;
    });
    return { subtotal: sub, totalTax: tax, total: sub + tax + freight };
  }, [items, freight]);

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if(!vendorId) {
          alert("Harap pilih vendor terlebih dahulu.");
          return;
      }
      const newOrder: PurchaseOrder = {
          id: Date.now(),
          vendorId,
          orderNumber,
          orderDate,
          total,
      };
      setPurchaseOrders(prev => [...prev, newOrder]);
      alert("Purchase Order berhasil dibuat!");
      setView('list');
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
  const getVendorName = (id: string) => vendors.find(v => v.id === id)?.name || 'N/A';

  // Tampilan Form
  if (view === 'form') {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
          <Header title="Create Purchase Order" />
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-8">
            {/* Header Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                <Select label="Vendor *" value={vendorId} onChange={e => setVendorId(e.target.value)} required>
                    <option value="" disabled>-- Pilih Vendor --</option>
                    {vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                </Select>
                <Input label="Order Number" value={orderNumber} onChange={e => setOrderNumber(e.target.value)} disabled />
                <Input label="Date Order" type="date" value={orderDate} onChange={e => setOrderDate(e.target.value)} />
            </div>

            {/* Order Items Section */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Order Items</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left text-slate-500">
                    <tr>
                      {['Item', 'Qty', 'Description', 'Price', 'Tax', 'Amount', 'Account', 'Aksi'].map(h => <th key={h} className="pb-2 font-medium pr-2">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => {
                        const amount = item.qty * item.price;
                        return (
                            <tr key={item.id}>
                                <td className="pr-2 py-1"><Select label="" value={item.itemId} onChange={e => handleItemChange(item.id, 'itemId', e.target.value)}><option value="">Pilih Item</option>{MOCK_ITEMS.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}</Select></td>
                                <td className="pr-2 py-1"><Input label="" type="number" value={item.qty} onChange={e => handleItemChange(item.id, 'qty', parseInt(e.target.value))} /></td>
                                <td className="pr-2 py-1"><Input label="" value={item.description} onChange={e => handleItemChange(item.id, 'description', e.target.value)} /></td>
                                <td className="pr-2 py-1"><Input label="" type="number" value={item.price} onChange={e => handleItemChange(item.id, 'price', parseFloat(e.target.value))} /></td>
                                <td className="pr-2 py-1"><Select label="" value={item.tax} onChange={e => handleItemChange(item.id, 'tax', parseInt(e.target.value))}><option value="0">0%</option><option value="11">PPN 11%</option></Select></td>
                                <td className="pr-2 py-1"><Input label="" value={formatCurrency(amount)} disabled /></td>
                                <td className="pr-2 py-1"><Select label="" value={item.accountId} onChange={e => handleItemChange(item.id, 'accountId', e.target.value)} required><option value="">Pilih Akun</option>{chartOfAccounts.map(acc => <option key={acc.id} value={acc.id}>{acc.namaAkun}</option>)}</Select></td>
                                <td className="py-1"><Button type="button" onClick={() => removeItem(item.id)} className="!p-2 bg-red-500 hover:bg-red-600"><TrashIcon className="w-4 h-4 text-white" /></Button></td>
                            </tr>
                        )
                    })}
                  </tbody>
                </table>
              </div>
              <Button type="button" variant="secondary" onClick={addNewItem} className="mt-4">+ Tambah Baris</Button>
            </div>

            {/* Summary and Footer Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t">
                <div></div>
                <div className="space-y-2 flex flex-col items-end">
                    <div className="flex justify-between w-full max-w-xs"><span className="font-semibold">Subtotal :</span><span>{formatCurrency(subtotal)}</span></div>
                    <div className="flex justify-between w-full max-w-xs"><span className="font-semibold">Total Tax :</span><span>{formatCurrency(totalTax)}</span></div>
                    <div className="flex justify-between items-center w-full max-w-xs"><label className="font-semibold">Freight :</label><Input label="" type="number" className="!w-32 text-right" value={freight} onChange={e => setFreight(parseFloat(e.target.value) || 0)} /></div>
                    <div className="flex justify-between w-full max-w-xs pt-2 border-t mt-2"><span className="font-bold text-lg">Total :</span><span className="font-bold text-lg">{formatCurrency(total)}</span></div>
                </div>
            </div>
            
            <div className="pt-6 flex justify-end gap-3 border-t">
              <Button type="button" variant="secondary" onClick={() => setView('list')}>Cancel</Button>
              <Button type="submit">Create Purchase Order</Button>
            </div>
          </form>
        </div>
      );
  }

  // Tampilan Daftar
  return (
    <div className="p-4 sm:p-6 lg:p-8">
        <div className="bg-blue-600 rounded-t-lg p-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Purchase Orders</h2>
            <Button onClick={handleAddNew} variant="secondary" className="bg-white/90 text-blue-600 hover:bg-white">
                + Add Purchase Order
            </Button>
        </div>
        <div className="bg-white p-6 rounded-b-lg shadow-sm border border-t-0 border-slate-200">
            {purchaseOrders.length === 0 ? (
                <p className="text-center py-10 text-slate-500">Belum ada Purchase Order.</p>
            ) : (
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-800 uppercase bg-slate-50">
                        <tr>
                            <th className="px-6 py-3">Order Number</th>
                            <th className="px-6 py-3">Vendor</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3 text-right">Total Amount</th>
                            <th className="px-6 py-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchaseOrders.map(po => (
                            <tr key={po.id} className="border-b hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium">{po.orderNumber}</td>
                                <td className="px-6 py-4">{getVendorName(po.vendorId)}</td>
                                <td className="px-6 py-4">{po.orderDate}</td>
                                <td className="px-6 py-4 text-right font-semibold">{formatCurrency(po.total)}</td>
                                <td className="px-6 py-4 flex items-center justify-center space-x-3">
                                    <button className="text-blue-500 hover:text-blue-700"><EyeIcon className="w-5 h-5"/></button>
                                    <button className="text-yellow-500 hover:text-yellow-700"><PencilIcon className="w-5 h-5"/></button>
                                    <button className="text-red-500 hover:text-red-700"><TrashIcon className="w-5 h-5"/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    </div>
  );
};

export default PurchaseOrders;
