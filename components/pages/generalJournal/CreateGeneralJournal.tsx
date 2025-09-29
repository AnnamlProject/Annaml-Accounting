import React, { useState, useMemo } from 'react';
import Header from '../../layout/Header';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import Checkbox from '../../ui/Checkbox';
import { useData } from '../../../hooks/useData';
import { TrashIcon } from '../../icons/Icons';
import { JournalEntryDetail } from '../../../types';

const CreateGeneralJournal: React.FC = () => {
  const { chartOfAccounts, addJournalEntry, yearbooks } = useData();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [source, setSource] = useState('');
  const [comment, setComment] = useState('');
  const [yearbookId, setYearbookId] = useState(yearbooks.find(yb => yb.status === 'Opening')?.id || '');
  
  const [lines, setLines] = useState<Partial<JournalEntryDetail>[]>([
    { id: Date.now() + 1, accountId: '', comment: '', debit: 0, credit: 0, isFiscalCorrection: false },
    { id: Date.now() + 2, accountId: '', comment: '', debit: 0, credit: 0, isFiscalCorrection: false },
  ]);

  const handleLineChange = (id: number, field: keyof JournalEntryDetail, value: any) => {
    setLines(prevLines =>
      prevLines.map(line => {
        if (line.id === id) {
          const updatedLine = { ...line, [field]: value };
          
          if (field === 'debit' && Number(value) > 0) updatedLine.credit = 0;
          if (field === 'credit' && Number(value) > 0) updatedLine.debit = 0;
          if (field === 'isFiscalCorrection' && !value) {
            delete updatedLine.fiscalAdjustment;
            delete updatedLine.fiscalCode;
          }
          return updatedLine;
        }
        return line;
      })
    );
  };

  const addLine = () => {
    setLines([...lines, { id: Date.now(), accountId: '', comment: '', debit: 0, credit: 0, isFiscalCorrection: false }]);
  };

  const removeLine = (id: number) => {
    if (lines.length > 2) {
      setLines(lines.filter(line => line.id !== id));
    }
  };

  const { totalDebit, totalCredit, difference } = useMemo(() => {
    const totals = lines.reduce((acc, line) => {
      acc.debit += Number(line.debit) || 0;
      acc.credit += Number(line.credit) || 0;
      return acc;
    }, { debit: 0, credit: 0 });
    return {
      totalDebit: totals.debit,
      totalCredit: totals.credit,
      difference: totals.debit - totals.credit,
    };
  }, [lines]);

  const formatCurrency = (amount: number) => new Intl.NumberFormat('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Math.abs(difference) > 0.001) {
      alert('Total Debit dan Kredit harus seimbang (balance).');
      return;
    }
    if (lines.some(line => !line.accountId)) {
      alert('Harap pilih akun untuk setiap baris.');
      return;
    }
    
    addJournalEntry({
        date,
        source,
        comment,
        yearbookId,
        details: lines as JournalEntryDetail[],
    });

    alert('Journal Entry berhasil disimpan!');
    // Reset form
    setDate(new Date().toISOString().split('T')[0]);
    setSource('');
    setComment('');
    setLines([
        { id: Date.now() + 1, accountId: '', comment: '', debit: 0, credit: 0, isFiscalCorrection: false },
        { id: Date.now() + 2, accountId: '', comment: '', debit: 0, credit: 0, isFiscalCorrection: false },
    ]);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Header title="Journal Entry Create" />
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Select label="Periode Buku *" value={yearbookId} onChange={e => setYearbookId(e.target.value)} required>
            <option value="" disabled>-- Pilih --</option>
            {yearbooks.map(yb => <option key={yb.id} value={yb.id}>{yb.year} ({yb.status})</option>)}
          </Select>
          <Input label="Source *" placeholder="e.g., Penyesuaian Akhir Bulan" value={source} onChange={e => setSource(e.target.value)} required/>
          <Input label="Date *" type="date" value={date} onChange={e => setDate(e.target.value)} required />
          <Input label="Comment" placeholder="Deskripsi umum jurnal" value={comment} onChange={e => setComment(e.target.value)} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-slate-500">
              <tr>
                <th className="pb-2 font-medium w-[25%]">Accounts</th>
                <th className="pb-2 font-medium w-[15%]">Debits</th>
                <th className="pb-2 font-medium w-[15%]">Credits</th>
                <th className="pb-2 font-medium w-[25%]">Comment</th>
                <th className="pb-2 font-medium text-center">Fiscorr</th>
                <th className="pb-2 font-medium">Penyesuaian Fiskal</th>
                <th className="pb-2 font-medium text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((line) => (
                <tr key={line.id} className="align-top">
                  <td className="py-1 pr-2"><Select value={line.accountId} onChange={e => handleLineChange(line.id!, 'accountId', e.target.value)}><option value="">Cari Akun...</option>{chartOfAccounts.map(acc => (<option key={acc.id} value={acc.id}>{acc.kodeAkun} - {acc.namaAkun}</option>))}</Select></td>
                  <td className="py-1 pr-2"><Input label="" type="number" className="text-right" placeholder="0.00" value={line.debit} onChange={e => handleLineChange(line.id!, 'debit', e.target.value)}/></td>
                  <td className="py-1 pr-2"><Input label="" type="number" className="text-right" placeholder="0.00" value={line.credit} onChange={e => handleLineChange(line.id!, 'credit', e.target.value)}/></td>
                  <td className="py-1 pr-2"><Input label="" placeholder="Deskripsi baris" value={line.comment} onChange={e => handleLineChange(line.id!, 'comment', e.target.value)}/></td>
                  <td className="py-1 pr-2 text-center"><Checkbox id={`fisc-corr-${line.id}`} label="" checked={line.isFiscalCorrection ?? false} onChange={e => handleLineChange(line.id!, 'isFiscalCorrection', e.target.checked)}/></td>
                  <td className="py-1 pr-2">{line.isFiscalCorrection ? (<Select value={line.fiscalAdjustment ?? ''} onChange={e => handleLineChange(line.id!, 'fiscalAdjustment', e.target.value)}><option value="">Pilih</option><option value="non_tax">Non Tax Object</option><option value="pph_final">PPH Final</option><option value="koreksi_plus">Koreksi Positif</option><option value="koreksi_minus">Koreksi Negatif</option></Select>) : ('-')}</td>
                  <td className="py-1 pl-2 text-center">
                    <div className="flex items-center justify-center h-full space-x-1">
                        <Button type="button" onClick={addLine} className="!p-2 bg-green-500 hover:bg-green-600 text-white">+</Button>
                        {lines.length > 2 && <Button type="button" onClick={() => removeLine(line.id!)} className="!p-2 bg-red-500 hover:bg-red-600 text-white">X</Button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 pt-6 border-t flex justify-end">
            <div className="w-full max-w-sm space-y-2">
                <div className="flex justify-between font-medium"><span>Total Debit:</span><span>{formatCurrency(totalDebit)}</span></div>
                <div className="flex justify-between font-medium"><span>Total Credit:</span><span>{formatCurrency(totalCredit)}</span></div>
                <div className={`flex justify-between text-sm pt-2 font-bold ${Math.abs(difference) < 0.001 ? 'text-green-600' : 'text-red-600'}`}><span>Out of Balance:</span><span>{formatCurrency(difference)}</span></div>
            </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
            <Button type="button" variant="secondary">Cancel</Button>
            <Button type="submit" disabled={Math.abs(difference) > 0.001 || lines.some(l => !l.accountId)}>Save Journal</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateGeneralJournal;