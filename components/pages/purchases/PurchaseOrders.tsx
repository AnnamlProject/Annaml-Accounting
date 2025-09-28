import React, { useState, useMemo } from 'react';
import Header from '../../layout/Header';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import Textarea from '../../ui/Textarea';
import Checkbox from '../../ui/Checkbox';
import { useData } from '../../../hooks/useData';
import { TrashIcon } from '../../icons/Icons';

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
  tax: number; // Tax rate as a percentage, e.g., 10 for 10%
  accountId: string;
}

// Mock data lokal karena belum ada di DataContext
const MOCK_PAYMENT_METHODS = [
  { id: 'pm-1', name: 'Cash' },
  { id: 'pm-2', name: 'Bank Transfer' },
  { id: 'pm-3', name: 'Credit Card' },
];

const MOCK_ITEMS = [
  { id: 'item-1', name: 'Jasa Konsultasi', price: 1000000 },
  { id: 'item-2', name: 'Sewa Peralatan', price: 500000 },
  { id: 'item-3', name: 'ATK Kantor', price: 150000 },
];

const PurchaseOrders: React.FC = () => {
  const { vendors, chartOfAccounts, taxes } = useData();

  // State untuk header form
  const [vendorId, setVendorId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [autoGenerate, setAutoGenerate] = useState(true);
  const [orderDate, setOrderDate] = useState(new Date().toISOString().split('T')[0]);
  const [shippingDate, setShippingDate] = useState('');

  // State untuk baris item yang dinamis
  const [items, setItems] = useState<OrderItemLine[]>([
    { id: Date.now(), itemId: '', qty: 1, order: 1, backOrder: 0, unit: 'pcs', description: '', price: 0, tax: 0, accountId: '' },
  ]);

  // State untuk footer
  const [freight, setFreight] = useState(0);
  const [earlyPaymentTerms, setEarlyPaymentTerms] = useState('');
  const [messages, setMessages] = useState('');

  const handleItemChange = (id: number, field: keyof OrderItemLine, value: any) => {
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          // Jika item diubah, deskripsi dan harga diperbarui
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
    const finalTotal = sub + tax + freight;
    return { subtotal: sub, totalTax: tax, total: finalTotal };
  }, [items, freight]);

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if(!vendorId) {
          alert("Harap pilih vendor terlebih dahulu.");
          return;
      }
      const purchaseOrderData = {
          vendorId, paymentMethod, shippingAddress, orderNumber, autoGenerate, orderDate, shippingDate,
          items,
          freight, earlyPaymentTerms, messages,
          summary: { subtotal, totalTax, total }
      };
      console.log("Purchase Order Data to be submitted:", purchaseOrderData);
      alert("Purchase Order berhasil dibuat! (lihat console untuk data)");
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('id-ID').format(value);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Header title="Purchase Order" />
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-8">
        
        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Select label="Vendor" value={vendorId} onChange={e => setVendorId(e.target.value)} required>
            <option value="" disabled>-- Vendor --</option>
            {vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
          </Select>
          <Select label="Payment Method" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
            <option value="" disabled>-- Payment Method --</option>
            {MOCK_PAYMENT_METHODS.map(pm => <option key={pm.id} value={pm.id}>{pm.name}</option>)}
          </Select>
          <Textarea label="Shipping Address" value={shippingAddress} onChange={e => setShippingAddress(e.target.value)} rows={3} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div>
                <Input label="Order Number" value={orderNumber} onChange={e => setOrderNumber(e.target.value)} disabled={autoGenerate} />
                <div className="mt-2">
                    <Checkbox label="Generate Order Number secara otomatis" checked={autoGenerate} onChange={e => setAutoGenerate(e.target.checked)} />
                </div>
            </div>
            <Input label="Date Order" type="date" value={orderDate} onChange={e => setOrderDate(e.target.value)} />
            <Input label="Shipping Date" type="date" value={shippingDate} onChange={e => setShippingDate(e.target.value)} />
        </div>

        {/* Order Items Section */}
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Order Items</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-slate-500">
                <tr>
                  {['Item', 'Qty', 'Order', 'Back Order', 'Unit', 'Description', 'Price', 'Tax', 'Tax Amt', 'Amount', 'Account', 'Aksi'].map(h => <th key={h} className="pb-2 font-medium pr-2">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                    const amount = item.qty * item.price;
                    const taxAmt = amount * (item.tax / 100);
                    return (
                        <tr key={item.id}>
                            <td className="pr-2 py-1"><Select label="" value={item.itemId} onChange={e => handleItemChange(item.id, 'itemId', e.target.value)}><option value="">Pilih Item</option>{MOCK_ITEMS.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}</Select></td>
                            <td className="pr-2 py-1"><Input label="" type="number" value={item.qty} onChange={e => handleItemChange(item.id, 'qty', parseInt(e.target.value))} /></td>
                            <td className="pr-2 py-1"><Input label="" type="number" value={item.order} onChange={e => handleItemChange(item.id, 'order', parseInt(e.target.value))} /></td>
                            <td className="pr-2 py-1"><Input label="" type="number" value={item.backOrder} onChange={e => handleItemChange(item.id, 'backOrder', parseInt(e.target.value))} /></td>
                            <td className="pr-2 py-1"><Input label="" value={item.unit} onChange={e => handleItemChange(item.id, 'unit', e.target.value)} /></td>
                            <td className="pr-2 py-1"><Input label="" value={item.description} onChange={e => handleItemChange(item.id, 'description', e.target.value)} /></td>
                            <td className="pr-2 py-1"><Input label="" type="number" value={item.price} onChange={e => handleItemChange(item.id, 'price', parseFloat(e.target.value))} /></td>
                            <td className="pr-2 py-1"><Select label="" value={item.tax} onChange={e => handleItemChange(item.id, 'tax', parseInt(e.target.value))}><option value="0">0%</option>{taxes.map(t => <option key={t.id} value={t.taxId}>{t.name}</option>)}</Select></td>
                            <td className="pr-2 py-1"><Input label="" value={formatCurrency(taxAmt)} disabled /></td>
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
            <div>
                <Input label="Early Payments Terms" value={earlyPaymentTerms} onChange={e => setEarlyPaymentTerms(e.target.value)} />
                <Textarea label="Messages" className="mt-4" value={messages} onChange={e => setMessages(e.target.value)} rows={4} />
            </div>
            <div className="space-y-2 flex flex-col items-end">
                <div className="flex justify-between w-full max-w-xs"><span className="font-semibold">Subtotal :</span><span>{formatCurrency(subtotal)}</span></div>
                <div className="flex justify-between w-full max-w-xs"><span className="font-semibold">Total Tax :</span><span>{formatCurrency(totalTax)}</span></div>
                <div className="flex justify-between items-center w-full max-w-xs"><label className="font-semibold">Freight :</label><Input label="" type="number" className="!w-32 text-right" value={freight} onChange={e => setFreight(parseFloat(e.target.value) || 0)} /></div>
                <div className="flex justify-between w-full max-w-xs pt-2 border-t mt-2"><span className="font-bold text-lg">Total :</span><span className="font-bold text-lg">{formatCurrency(total)}</span></div>
            </div>
        </div>
        
        {/* Actions */}
        <div className="pt-6 flex justify-start gap-3 border-t">
          <Button type="submit">Create Purchase Order</Button>
          <Button type="button" variant="secondary">Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default PurchaseOrders;