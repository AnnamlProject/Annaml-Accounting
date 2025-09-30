import React, { useMemo, useState } from 'react';
import Header from '../../layout/Header';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import Textarea from '../../ui/Textarea';
import { useData } from '../../../hooks/useData';

// --- TYPE DEFINITIONS ---
interface ExpenseLine {
  id: number;
  accountId: string;
  description: string;
  amount: number;
  taxType: 'None' | 'PPN' | 'PPh 21' | 'PPh 23';
}

interface PaymentExpense {
  id: number;
  fromAccountId: string;
  vendorId: string;
  source: string;
  date: string;
  totalAmount: number;
  comment: string;
  lines: ExpenseLine[];
}

type View = 'list' | 'form';

type FormTab = 'entry' | 'journal';

const PaymentExpenses: React.FC = () => {
  const { chartOfAccounts, vendors } = useData();
  const [view, setView] = useState<View>('list');
  const [formTab, setFormTab] = useState<FormTab>('entry');
  const [payments, setPayments] = useState<PaymentExpense[]>([]);

  // --- FORM STATE ---
  const [fromAccountId, setFromAccountId] = useState('');
  const [source, setSource] = useState('');
  const [vendorId, setVendorId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [comment, setComment] = useState('');
  const [lines, setLines] = useState<ExpenseLine[]>([
    { id: Date.now(), accountId: '', description: '', amount: 0, taxType: 'None' },
  ]);

  const bankAndCashAccounts = useMemo(
    () => chartOfAccounts.filter((acc: any) => acc.klasifikasiAkun === 'Cash' || acc.klasifikasiAkun === 'Bank'),
    [chartOfAccounts]
  );

  const { subtotal, totalTax, total } = useMemo(() => {
    const sub = lines.reduce((acc, line) => acc + Number(line.amount || 0), 0);
    const tax = 0; // Placeholder kalkulasi pajak
    return { subtotal: sub, totalTax: tax, total: sub + tax };
  }, [lines]);

  // --- HELPERS ---
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(value || 0));

  const getAccount = (id: string) => chartOfAccounts.find((a: any) => a.id === id);
  const getAccountName = (id: string) => getAccount(id)?.namaAkun || 'N/A';
  const getAccountCode = (id: string) => getAccount(id)?.kodeAkun || '-';
  const getVendorName = (id: string) => vendors.find((v: any) => v.id === id)?.name || 'N/A';

  // --- HANDLERS ---
  const handleAddNew = () => {
    setFromAccountId(bankAndCashAccounts.length > 0 ? bankAndCashAccounts[0].id : '');
    setSource('');
    setVendorId('');
    setDate(new Date().toISOString().split('T')[0]);
    setComment('');
    setLines([{ id: Date.now(), accountId: '', description: '', amount: 0, taxType: 'None' }]);
    setFormTab('entry');
    setView('form');
  };

  const handleLineChange = (id: number, field: keyof ExpenseLine, value: any) => {
    setLines((prev) => prev.map((ln) => (ln.id === id ? { ...ln, [field]: value } : ln)));
  };

  const addLine = () => setLines((prev) => [...prev, { id: Date.now(), accountId: '', description: '', amount: 0, taxType: 'None' }]);

  const removeLine = (id: number) => {
    if (lines.length > 1) setLines((prev) => prev.filter((ln) => ln.id !== id));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!fromAccountId || !vendorId || total <= 0) {
      alert("Harap lengkapi 'From Account', 'Vendor', dan detail pembayaran.");
      return;
    }
    const payload: PaymentExpense = {
      id: Date.now(),
      fromAccountId,
      vendorId,
      source,
      date,
      totalAmount: total,
      comment,
      lines,
    };
    setPayments((prev) => [payload, ...prev]);
    alert('Payment Expense berhasil diproses!');
    setView('list');
  };

  // --- VIEWS ---
  const renderListView = () => (
    <>
      <div className="bg-blue-600 rounded-t-lg p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Payment Expenses</h2>
        <Button onClick={handleAddNew} variant="secondary" className="bg-white/90 text-blue-600 hover:bg-white">
          + Add Payment Expense
        </Button>
      </div>
      <div className="bg-white p-6 rounded-b-lg shadow-sm border border-t-0 border-slate-200">
        {payments.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="mt-2 text-lg font-semibold text-slate-800">Belum ada Payment Expenses</h3>
            <div className="mt-6">
              <Button onClick={handleAddNew}>+ Tambah</Button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-800 uppercase bg-slate-50">
                <tr>
                  {['#', 'From Account', 'Vendor', 'Date', 'Source', 'Amount'].map((h) => (
                    <th key={h} className="px-6 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {payments.map((p, idx) => (
                  <tr key={p.id} className="border-b hover:bg-slate-50">
                    <td className="px-6 py-4">{idx + 1}</td>
                    <td className="px-6 py-4">{getAccountName(p.fromAccountId)}</td>
                    <td className="px-6 py-4 font-medium">{getVendorName(p.vendorId)}</td>
                    <td className="px-6 py-4">{p.date}</td>
                    <td className="px-6 py-4 truncate max-w-xs">{p.source}</td>
                    <td className="px-6 py-4 font-semibold text-right">{formatCurrency(p.totalAmount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );

  const renderFormView = () => (
    <>
      <Header title="Process Payment Expenses" subtitle="Input Payment Expenses & Live Display Journal" />

      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        {/* Tabs inside PROCESS page */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            <button
              onClick={() => setFormTab('entry')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                formTab === 'entry' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Input Payment Expenses
            </button>
            <button
              onClick={() => setFormTab('journal')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                formTab === 'journal' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Display Journal Transaction Detail (Live)
            </button>
          </nav>
        </div>

        {/* ENTRY TAB */}
        {formTab === 'entry' && (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="p-4 bg-slate-50 rounded-lg border space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select label="From Account *" value={fromAccountId} onChange={(e) => setFromAccountId(e.target.value)} required>
                  <option value="" disabled>-- Pilih Akun Bank/Kas --</option>
                  {bankAndCashAccounts.map((acc: any) => (
                    <option key={acc.id} value={acc.id}>{acc.kodeAkun} - {acc.namaAkun}</option>
                  ))}
                </Select>
                <Input label="Source" value={source} onChange={(e) => setSource(e.target.value)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select label="Vendor *" value={vendorId} onChange={(e) => setVendorId(e.target.value)} required>
                  <option value="" disabled>-- Pilih Vendor --</option>
                  {vendors.map((v: any) => (
                    <option key={v.id} value={v.id}>{v.name}</option>
                  ))}
                </Select>
                <Input label="Date *" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
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
                  {lines.map((line) => (
                    <tr key={line.id} className="align-top">
                      <td className="py-1 pr-2">
                        <Select value={line.accountId} onChange={(e) => handleLineChange(line.id, 'accountId', e.target.value)}>
                          <option value="">-- Pilih Akun Beban --</option>
                          {chartOfAccounts
                            .filter((a: any) => a.tipeAkun === 'Beban')
                            .map((a: any) => (
                              <option key={a.id} value={a.id}>{a.kodeAkun} - {a.namaAkun}</option>
                            ))}
                        </Select>
                      </td>
                      <td className="py-1 pr-2">
                        <Input label="" value={line.description} onChange={(e) => handleLineChange(line.id, 'description', e.target.value)} />
                      </td>
                      <td className="py-1 pr-2">
                        <Input label="" type="number" value={line.amount} onChange={(e) => handleLineChange(line.id, 'amount', Number(e.target.value))} className="text-right" />
                      </td>
                      <td className="py-1 pr-2">
                        <Select value={line.taxType} onChange={(e) => handleLineChange(line.id, 'taxType', e.target.value)}>
                          <option value="None">None</option>
                          <option value="PPN">PPN</option>
                          <option value="PPh 21">PPh 21</option>
                          <option value="PPh 23">PPh 23</option>
                        </Select>
                      </td>
                      <td className="py-1 text-center">
                        <Button type="button" onClick={() => removeLine(line.id)} className="!p-2 mt-1 bg-red-500 hover:bg-red-600">Hapus</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Button type="button" variant="secondary" onClick={addLine}>+ Add Line</Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t items-start">
              <Textarea label="Comment" value={comment} onChange={(e) => setComment(e.target.value)} rows={4} />
              <div className="space-y-2 flex flex-col items-end">
                <div className="flex justify-between w-full max-w-xs"><span className="font-semibold text-slate-600">Subtotal :</span><span className="text-slate-800">{formatCurrency(subtotal)}</span></div>
                <div className="flex justify-between w-full max-w-xs"><span className="font-semibold text-slate-600">Tax :</span><span className="text-slate-800">{formatCurrency(totalTax)}</span></div>
                <div className="flex justify-between w-full max-w-xs pt-2 border-t mt-2"><span className="font-bold text-lg">Total :</span><span className="font-bold text-lg">{formatCurrency(total)}</span></div>
              </div>
            </div>

            <div className="pt-6 flex justify-end gap-3 border-t">
              <Button type="button" variant="secondary" onClick={() => setView('list')}>Cancel</Button>
              <Button type="submit">Process</Button>
            </div>
          </form>
        )}

        {/* JOURNAL PREVIEW (LIVE) */}
        {formTab === 'journal' && (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-3 gap-4 text-sm p-4 bg-slate-50 rounded-lg">
              <div><span className="font-semibold text-slate-600">Date:</span><p className="text-black">{date}</p></div>
              <div><span className="font-semibold text-slate-600">Source:</span><p className="text-black">{source || '-'}</p></div>
              <div><span className="font-semibold text-slate-600">Comment:</span><p className="text-black">{comment || '-'}</p></div>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-700">
                  <tr>
                    <th className="px-4 py-2 text-left">Account Number</th>
                    <th className="px-4 py-2 text-left">Account Description</th>
                    <th className="px-4 py-2 text-right">Debits</th>
                    <th className="px-4 py-2 text-right">Credits</th>
                  </tr>
                </thead>
                <tbody className="text-black">
                  {lines.map((ln) => (
                    <tr key={`jrn-deb-${ln.id}`} className="border-b">
                      <td className="px-4 py-2">{getAccountCode(ln.accountId)}</td>
                      <td className="px-4 py-2">{getAccountName(ln.accountId)}{ln.description ? ` — ${ln.description}` : ''}</td>
                      <td className="px-4 py-2 text-right">{formatCurrency(Number(ln.amount || 0))}</td>
                      <td className="px-4 py-2 text-right">{formatCurrency(0)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="px-4 py-2">{getAccountCode(fromAccountId)}</td>
                    <td className="px-4 py-2">{getAccountName(fromAccountId)}</td>
                    <td className="px-4 py-2 text-right">{formatCurrency(0)}</td>
                    <td className="px-4 py-2 text-right">{formatCurrency(total)}</td>
                  </tr>
                </tbody>
                <tfoot className="bg-slate-50 font-semibold text-black">
                  <tr>
                    <td colSpan={2} className="px-4 py-2 text-right">Total</td>
                    <td className="px-4 py-2 text-right">{formatCurrency(total)}</td>
                    <td className="px-4 py-2 text-right">{formatCurrency(total)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <small className="text-slate-500">Preview jurnal selalu mengikuti input di tab sebelah.</small>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => setFormTab('entry')}>Kembali ke Entry</Button>
                <Button onClick={() => handleSubmit()}>Process</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {view === 'list' && renderListView()}
      {view === 'form' && renderFormView()}
    </div>
  );
};

export default PaymentExpenses;
