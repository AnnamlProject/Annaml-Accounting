import React, { useEffect, useMemo, useState } from 'react';
import Header from '../../layout/Header';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import Textarea from '../../ui/Textarea';
import { useData } from '../../../hooks/useData';

/** =============================
 *  Types
 *  ============================= */
interface PrepaymentRecord {
  id: number;
  counterpartyType: 'vendor'; // Only vendor is supported now
  counterpartyId: string;
  bankAccountId: string;
  reference: string;
  date: string;
  amount: number;
  remainingAmount: number;
  comment: string;
}

interface PurchaseInvoice {
  id: string;
  vendorId: string;
  invoiceNo: string;
  date: string;
  dueDate: string;
  originalAmount: number;
  outstandingAmount: number;
}

interface ProcessLogEntry {
  id: number;
  action: 'record' | 'allocation';
  counterpartyType: 'vendor';
  counterpartyName: string;
  reference: string;
  invoiceNo?: string;
  date: string;
  amount: number;
  debitAccount: string;
  creditAccount: string;
  journalType: string;
  note?: string;
}

/** =============================
 *  Unified Page Component
 *  ============================= */
const Prepayments: React.FC = () => {
  const { vendors, chartOfAccounts } = useData();

  // Data states
  const [prepayments, setPrepayments] = useState<PrepaymentRecord[]>([]);
  const [purchaseInvoices, setPurchaseInvoices] = useState<PurchaseInvoice[]>(() => [
    {
      id: 'pinv-1',
      vendorId: 'ven1',
      invoiceNo: 'PINV-1001',
      date: '2024-07-05',
      dueDate: '2024-08-04',
      originalAmount: 12000000,
      outstandingAmount: 12000000,
    },
    {
      id: 'pinv-2',
      vendorId: 'ven2',
      invoiceNo: 'PINV-1005',
      date: '2024-07-12',
      dueDate: '2024-08-11',
      originalAmount: 5800000,
      outstandingAmount: 5800000,
    },
  ]);

  const [processLog, setProcessLog] = useState<ProcessLogEntry[]>([]);

  // Derived lists
  const bankAndCashAccounts = useMemo(
    () => chartOfAccounts.filter((acc) => acc.klasifikasiAkun === 'Cash' || acc.klasifikasiAkun === 'Bank'),
    [chartOfAccounts]
  );

  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  // Form: Record Vendor Prepayment
  const [vendorForm, setVendorForm] = useState({
    bankAccountId: '',
    vendorId: '',
    reference: '',
    date: today,
    amount: '',
    comment: '',
  });

  // Form: Allocation
  const [purchasePrepaymentId, setPurchasePrepaymentId] = useState('');
  const [purchaseInvoiceId, setPurchaseInvoiceId] = useState('');
  const [purchaseAllocationAmount, setPurchaseAllocationAmount] = useState('');

  // Initialize default bank account
  useEffect(() => {
    if (!vendorForm.bankAccountId && bankAndCashAccounts.length > 0) {
      setVendorForm((prev) => ({ ...prev, bankAccountId: bankAndCashAccounts[0].id }));
    }
  }, [bankAndCashAccounts, vendorForm.bankAccountId]);

  // Auto-suggest allocation amount
  useEffect(() => {
    if (purchasePrepaymentId && purchaseInvoiceId) {
      const prepayment = prepayments.find((p) => p.id.toString() === purchasePrepaymentId);
      const invoice = purchaseInvoices.find((inv) => inv.id === purchaseInvoiceId);
      if (prepayment && invoice) {
        const maxAllowed = Math.min(prepayment.remainingAmount, invoice.outstandingAmount);
        if (!purchaseAllocationAmount || Number(purchaseAllocationAmount) > maxAllowed) {
          setPurchaseAllocationAmount(maxAllowed > 0 ? maxAllowed.toString() : '');
        }
      }
    } else if (purchaseAllocationAmount) {
      setPurchaseAllocationAmount('');
    }
  }, [purchasePrepaymentId, purchaseInvoiceId, prepayments, purchaseInvoices, purchaseAllocationAmount]);

  // Helpers
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);

  const getAccountName = (id: string) => chartOfAccounts.find((acc) => acc.id === id)?.namaAkun || 'N/A';
  const getVendorName = (id: string) => vendors.find((v) => v.id === id)?.name || 'Vendor';

  const handleVendorFormChange = (field: keyof typeof vendorForm, value: string) => {
    setVendorForm((prev) => ({ ...prev, [field]: value }));
  };

  const appendProcessLog = (entry: ProcessLogEntry) => setProcessLog((prev) => [entry, ...prev]);

  // Actions
  const handleSubmitVendorPrepayment = (event: React.FormEvent) => {
    event.preventDefault();
    const amountValue = Number(vendorForm.amount);

    if (!vendorForm.bankAccountId || !vendorForm.vendorId || amountValue <= 0 || Number.isNaN(amountValue)) {
      alert('Harap lengkapi akun, vendor, dan nominal prepayment.');
      return;
    }

    const id = Date.now();

    const newPrepayment: PrepaymentRecord = {
      id,
      counterpartyType: 'vendor',
      counterpartyId: vendorForm.vendorId,
      bankAccountId: vendorForm.bankAccountId,
      reference: vendorForm.reference || `PRE-${id}`,
      date: vendorForm.date,
      amount: amountValue,
      remainingAmount: amountValue,
      comment: vendorForm.comment,
    };

    setPrepayments((prev) => [...prev, newPrepayment]);

    appendProcessLog({
      id: id + 1,
      action: 'record',
      counterpartyType: 'vendor',
      counterpartyName: getVendorName(newPrepayment.counterpartyId),
      reference: newPrepayment.reference,
      date: newPrepayment.date,
      amount: newPrepayment.amount,
      debitAccount: 'Prepayments & Deposits (Asset)',
      creditAccount: getAccountName(newPrepayment.bankAccountId),
      journalType: 'Vendor Prepayment Recorded',
      note: newPrepayment.comment,
    });

    alert('Prepayment vendor berhasil dicatat.');
    setVendorForm((prev) => ({ ...prev, vendorId: '', reference: '', amount: '', comment: '' }));
  };

  const handleAllocateVendorPrepayment = (event: React.FormEvent) => {
    event.preventDefault();
    const allocationAmount = Number(purchaseAllocationAmount);
    const prepayment = prepayments.find((p) => p.id.toString() === purchasePrepaymentId && p.counterpartyType === 'vendor');
    const invoice = purchaseInvoices.find((inv) => inv.id === purchaseInvoiceId);

    if (!prepayment || !invoice || allocationAmount <= 0 || Number.isNaN(allocationAmount)) {
      alert('Harap pilih prepayment, invoice, dan nominal yang valid.');
      return;
    }

    const maxAllowed = Math.min(prepayment.remainingAmount, invoice.outstandingAmount);
    if (allocationAmount > maxAllowed) {
      alert('Nominal alokasi melebihi saldo prepayment atau hutang invoice.');
      return;
    }

    setPrepayments((prev) =>
      prev.map((p) => (p.id === prepayment.id ? { ...p, remainingAmount: Number((p.remainingAmount - allocationAmount).toFixed(2)) } : p))
    );

    setPurchaseInvoices((prev) =>
      prev.map((inv) => (inv.id === invoice.id ? { ...inv, outstandingAmount: Number((inv.outstandingAmount - allocationAmount).toFixed(2)) } : inv))
    );

    appendProcessLog({
      id: Date.now() + 3,
      action: 'allocation',
      counterpartyType: 'vendor',
      counterpartyName: getVendorName(prepayment.counterpartyId),
      reference: prepayment.reference,
      invoiceNo: invoice.invoiceNo,
      date: today,
      amount: allocationAmount,
      debitAccount: 'Accounts Payable',
      creditAccount: 'Prepayments & Deposits (Asset)',
      journalType: 'Prepayment Applied to Purchase Invoice',
      note: `Alokasi ke invoice ${invoice.invoiceNo}`,
    });

    alert('Prepayment berhasil dialokasikan ke invoice.');
    setPurchasePrepaymentId('');
    setPurchaseInvoiceId('');
    setPurchaseAllocationAmount('');
  };

  // Derived views
  const vendorPrepayments = useMemo(() => prepayments.filter((p) => p.counterpartyType === 'vendor'), [prepayments]);
  const availableVendorPrepayments = vendorPrepayments.filter((p) => p.remainingAmount > 0);

  const totals = useMemo(() => {
    const totalPrepay = vendorPrepayments.reduce((sum, p) => sum + p.remainingAmount, 0);
    const totalOutstanding = purchaseInvoices.reduce((sum, i) => sum + i.outstandingAmount, 0);
    return { totalPrepay, totalOutstanding };
  }, [vendorPrepayments, purchaseInvoices]);

  // Local UI helpers
  const SectionCard: React.FC<{ title: string; subtitle?: string; id?: string; right?: React.ReactNode; className?: string, children: React.ReactNode }>
    = ({ title, subtitle, id, right, className, children }) => (
      <section id={id} className={`border border-slate-200 rounded-lg p-5 bg-white ${className || ''}`}>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-base font-semibold text-slate-800">{title}</h3>
            {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
          </div>
          {right}
        </div>
        {children}
      </section>
    );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <Header
        title="Vendor Prepayments — Unified"
        subtitle="Satu halaman untuk Pencatatan Prepayment, Alokasi ke Invoice, dan Monitoring & Jurnal."
      />

      {/* Top quick nav & summary */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 sticky top-0 z-10">
        <nav className="flex flex-wrap gap-2 text-sm">
          <a href="#record" className="px-3 py-1.5 rounded-md bg-white border border-slate-200 hover:bg-slate-100">Pencatatan</a>
          <a href="#allocation" className="px-3 py-1.5 rounded-md bg-white border border-slate-200 hover:bg-slate-100">Alokasi ke Invoice</a>
          <a href="#monitoring" className="px-3 py-1.5 rounded-md bg-white border border-slate-200 hover:bg-slate-100">Monitoring</a>
          <a href="#journals" className="px-3 py-1.5 rounded-md bg-white border border-slate-200 hover:bg-slate-100">Jurnal</a>
        </nav>
        <div className="grid grid-cols-2 gap-4 text-xs md:text-sm">
          <div className="bg-white rounded-md border border-slate-200 px-3 py-2">
            <p className="text-slate-500">Sisa Prepayment</p>
            <p className="font-semibold">{formatCurrency(totals.totalPrepay)}</p>
          </div>
          <div className="bg-white rounded-md border border-slate-200 px-3 py-2">
            <p className="text-slate-500">Outstanding Invoices</p>
            <p className="font-semibold">{formatCurrency(totals.totalOutstanding)}</p>
          </div>
        </div>
      </div>

      {/* 1) Record Prepayment */}
      <SectionCard id="record" title="Pencatatan Prepayment Vendor" subtitle="Catat uang muka ke vendor sebagai aset sementara (Prepayments & Deposits)">
        <form onSubmit={handleSubmitVendorPrepayment} className="grid gap-4 md:grid-cols-2">
          <Select label="From Account (Kas/Bank) *" value={vendorForm.bankAccountId} onChange={(e) => handleVendorFormChange('bankAccountId', e.target.value)} required>
            <option value="" disabled>
              -- Pilih Akun --
            </option>
            {bankAndCashAccounts.map((acc: any) => (
              <option key={acc.id} value={acc.id}>
                {acc.kodeAkun} - {acc.namaAkun}
              </option>
            ))}
          </Select>

          <Select label="Vendor *" value={vendorForm.vendorId} onChange={(e) => handleVendorFormChange('vendorId', e.target.value)} required>
            <option value="" disabled>
              -- Pilih Vendor --
            </option>
            {vendors.map((v: any) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </Select>

          <Input label="Reference / Source" value={vendorForm.reference} onChange={(e) => handleVendorFormChange('reference', e.target.value)} placeholder="No. transfer / cek" />
          <Input label="Date" type="date" value={vendorForm.date} onChange={(e) => handleVendorFormChange('date', e.target.value)} required />

          <div className="md:col-span-2">
            <Input
              label="Amount *"
              type="number"
              min="0"
              step="0.01"
              value={vendorForm.amount}
              onChange={(e) => handleVendorFormChange('amount', e.target.value)}
              required
              className="text-xl font-semibold"
            />
          </div>

          <div className="md:col-span-2">
            <Textarea label="Comment / Bukti" rows={3} value={vendorForm.comment} onChange={(e) => handleVendorFormChange('comment', e.target.value)} placeholder="Catatan internal, nomor memo, dll." />
          </div>

          <div className="md:col-span-2 flex items-center justify-between text-xs text-slate-500">
            <span>
              Posting jurnal: <span className="font-semibold">Dr Prepayments &amp; Deposits</span> / Cr {getAccountName(vendorForm.bankAccountId)}
            </span>
            <Button type="submit">Process</Button>
          </div>
        </form>
      </SectionCard>

      {/* 2) Allocate to Invoice */}
      <SectionCard id="allocation" title="Alokasi Prepayment ke Invoice" subtitle="Gunakan saldo prepayment untuk mengurangi hutang invoice (pseudo-invoice method)">
        <form onSubmit={handleAllocateVendorPrepayment} className="grid gap-4 md:grid-cols-2">
          <Select label="Prepayment Tersedia *" value={purchasePrepaymentId} onChange={(e) => setPurchasePrepaymentId(e.target.value)} required>
            <option value="" disabled>
              -- Pilih Prepayment --
            </option>
            {availableVendorPrepayments.map((p) => (
              <option key={p.id} value={p.id.toString()}>
                {getVendorName(p.counterpartyId)} • {p.reference} • Sisa {formatCurrency(p.remainingAmount)}
              </option>
            ))}
          </Select>

          <Select label="Invoice Vendor *" value={purchaseInvoiceId} onChange={(e) => setPurchaseInvoiceId(e.target.value)} required>
            <option value="" disabled>
              -- Pilih Invoice --
            </option>
            {purchaseInvoices
              .filter((inv) => inv.outstandingAmount > 0)
              .map((inv) => (
                <option key={inv.id} value={inv.id}>
                  {inv.invoiceNo} • {getVendorName(inv.vendorId)} • Sisa {formatCurrency(inv.outstandingAmount)}
                </option>
              ))}
          </Select>

          <Input label="Nominal Alokasi *" type="number" min="0" step="0.01" value={purchaseAllocationAmount} onChange={(e) => setPurchaseAllocationAmount(e.target.value)} required />

          <div className="md:col-span-2 flex items-center justify-between text-xs text-slate-500">
            <span>
              Jurnal: <span className="font-semibold">Dr Accounts Payable</span> / Cr Prepayments &amp; Deposits
            </span>
            <Button type="submit">Process</Button>
          </div>
        </form>
        <p className="text-xs text-slate-500 mt-3">Jika saldo prepayment habis, baris pseudo-invoice akan hilang dari daftar pembayaran.</p>
      </SectionCard>

      {/* 3) Monitoring */}
      <SectionCard id="monitoring" title="Monitoring Prepayment" subtitle="Pantau remaining balance setiap vendor">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 uppercase">
              <tr>
                <th className="px-4 py-2">Jenis</th>
                <th className="px-4 py-2">Vendor</th>
                <th className="px-4 py-2">Referensi</th>
                <th className="px-4 py-2">Tanggal</th>
                <th className="px-4 py-2">Original</th>
                <th className="px-4 py-2">Sisa</th>
                <th className="px-4 py-2">Komentar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {prepayments.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-slate-500">
                    Belum ada prepayment yang tercatat.
                  </td>
                </tr>
              )}
              {prepayments.map((record) => (
                <tr key={record.id}>
                  <td className="px-4 py-3 font-semibold text-slate-700">Vendor Prepayment</td>
                  <td className="px-4 py-3">{getVendorName(record.counterpartyId)}</td>
                  <td className="px-4 py-3">{record.reference}</td>
                  <td className="px-4 py-3">{record.date}</td>
                  <td className="px-4 py-3">{formatCurrency(record.amount)}</td>
                  <td className={`px-4 py-3 font-semibold ${record.remainingAmount === 0 ? 'text-green-600' : 'text-blue-600'}`}>{formatCurrency(record.remainingAmount)}</td>
                  <td className="px-4 py-3 max-w-xs truncate" title={record.comment}>
                    {record.comment || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* 4) Outstanding Invoices */}
      <SectionCard title="Outstanding Purchase Invoices" subtitle="Daftar tagihan yang masih memiliki saldo">
        <div className="grid gap-2 text-sm">
          {purchaseInvoices.map((inv) => (
            <div key={inv.id} className="flex items-center justify-between border border-slate-200 rounded-md px-3 py-2">
              <div>
                <p className="font-semibold">{inv.invoiceNo}</p>
                <p className="text-xs text-slate-500">{getVendorName(inv.vendorId)} • Due {inv.dueDate}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">Original</p>
                <p className="font-semibold">{formatCurrency(inv.originalAmount)}</p>
                <p className="text-xs text-slate-500">Sisa {formatCurrency(inv.outstandingAmount)}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* 5) Journal Timeline */}
      <SectionCard id="journals" title="Journal Timeline" subtitle="Rekam jejak posting otomatis">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 uppercase">
              <tr>
                <th className="px-4 py-2">Tanggal</th>
                <th className="px-4 py-2">Tahap</th>
                <th className="px-4 py-2">Vendor</th>
                <th className="px-4 py-2">Referensi</th>
                <th className="px-4 py-2">Invoice</th>
                <th className="px-4 py-2">Debit</th>
                <th className="px-4 py-2">Kredit</th>
                <th className="px-4 py-2 text-right">Nominal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {processLog.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-6 text-center text-slate-500">
                    Belum ada jurnal yang tercatat.
                  </td>
                </tr>
              )}
              {processLog.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-4 py-3">{entry.date}</td>
                  <td className="px-4 py-3 font-semibold">{entry.journalType}</td>
                  <td className="px-4 py-3">{entry.counterpartyName}</td>
                  <td className="px-4 py-3">{entry.reference}</td>
                  <td className="px-4 py-3">{entry.invoiceNo || '-'}</td>
                  <td className="px-4 py-3">{entry.debitAccount}</td>
                  <td className="px-4 py-3">{entry.creditAccount}</td>
                  <td className="px-4 py-3 text-right font-semibold">{formatCurrency(entry.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
};

export default Prepayments;