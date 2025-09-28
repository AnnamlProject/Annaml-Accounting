import React, { useState, useMemo } from 'react';
import Header from '../../layout/Header';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { useData } from '../../../hooks/useData';
import { TrashIcon } from '../../icons/Icons';

// Interface for a single journal entry line
interface JournalEntryLine {
  id: number;
  accountId: string;
  description: string;
  debit: string;
  credit: string;
}

const CreateGeneralJournal: React.FC = () => {
  const { accounts } = useData();
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [reference, setReference] = useState('');
  const [memo, setMemo] = useState('');
  const [lines, setLines] = useState<JournalEntryLine[]>([
    { id: 1, accountId: '', description: '', debit: '', credit: '' },
    { id: 2, accountId: '', description: '', debit: '', credit: '' },
  ]);

  const handleLineChange = (index: number, field: keyof JournalEntryLine, value: string) => {
    const newLines = [...lines];
    const line = newLines[index];
    
    const updatedLine = { ...line, [field]: value };

    // Ensure only one of debit or credit has a value
    if (field === 'debit' && value !== '') {
        updatedLine.credit = '';
    } else if (field === 'credit' && value !== '') {
        updatedLine.debit = '';
    }

    newLines[index] = updatedLine;
    setLines(newLines);
  };

  const addLine = () => {
    setLines([...lines, { id: Date.now(), accountId: '', description: '', debit: '', credit: '' }]);
  };

  const removeLine = (id: number) => {
    setLines(lines.filter(line => line.id !== id));
  };

  const { totalDebit, totalCredit, difference } = useMemo(() => {
    const totals = lines.reduce((acc, line) => {
      acc.debit += parseFloat(line.debit) || 0;
      acc.credit += parseFloat(line.credit) || 0;
      return acc;
    }, { debit: 0, credit: 0 });
    return {
      totalDebit: totals.debit,
      totalCredit: totals.credit,
      difference: totals.debit - totals.credit,
    };
  }, [lines]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (difference !== 0) {
      alert('Debits and Credits must be balanced.');
      return;
    }
    if (lines.some(line => !line.accountId)) {
      alert('Please select an account for each line.');
      return;
    }
    console.log({ date, reference, memo, lines });
    alert('Journal Entry Saved!');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Header title="Create General Journals" />
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 pb-6 border-b">
          <Input label="Date" type="date" value={date} onChange={e => setDate(e.target.value)} required />
          <Input label="Reference No." placeholder="e.g. GJ-001" value={reference} onChange={e => setReference(e.target.value)} />
          <Input label="Memo / Description" placeholder="Describe the purpose of this journal" value={memo} onChange={e => setMemo(e.target.value)} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-slate-500">
              <tr>
                <th className="pb-2 font-medium w-1/12">No.</th>
                <th className="pb-2 font-medium w-4/12">Account</th>
                <th className="pb-2 font-medium w-4/12">Description</th>
                <th className="pb-2 font-medium text-right w-2/12">Debit</th>
                <th className="pb-2 font-medium text-right w-2/12">Credit</th>
                <th className="pb-2 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {lines.map((line, index) => (
                <tr key={line.id}>
                  <td className="py-2 pr-2 align-top text-slate-500">{index + 1}</td>
                  <td className="py-2 pr-2 align-top">
                    <select
                      className="w-full px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={line.accountId}
                      onChange={e => handleLineChange(index, 'accountId', e.target.value)}
                      required
                    >
                      <option value="" disabled>Select Account</option>
                      {accounts.map(acc => (
                        <option key={acc.id} value={acc.id}>{acc.name}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2 pr-2 align-top">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Line description"
                      value={line.description}
                      onChange={e => handleLineChange(index, 'description', e.target.value)}
                    />
                  </td>
                  <td className="py-2 pr-2 align-top">
                    <input
                      type="number"
                      step="0.01"
                      className="w-full text-right px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="0.00"
                      value={line.debit}
                      onChange={e => handleLineChange(index, 'debit', e.target.value)}
                    />
                  </td>
                  <td className="py-2 pr-2 align-top">
                    <input
                      type="number"
                      step="0.01"
                      className="w-full text-right px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="0.00"
                      value={line.credit}
                      onChange={e => handleLineChange(index, 'credit', e.target.value)}
                    />
                  </td>
                  <td className="py-2 pl-2 align-top">
                    {lines.length > 2 && (
                       <button type="button" onClick={() => removeLine(line.id)} className="text-slate-400 hover:text-red-500 mt-2">
                         <TrashIcon className="w-5 h-5" />
                       </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4">
          <Button type="button" variant="secondary" onClick={addLine}>
            Add Line
          </Button>
        </div>
        
        <div className="mt-6 pt-6 border-t flex justify-end">
            <div className="w-full max-w-sm space-y-2">
                <div className="flex justify-between">
                    <span className="font-semibold text-slate-700">Total Debit:</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(totalDebit)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold text-slate-700">Total Credit:</span>
                    <span className="font-semibold text-slate-900">{formatCurrency(totalCredit)}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t mt-2">
                    <span className="font-semibold text-slate-500">Difference:</span>
                    <span className={`font-bold ${difference === 0 ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(difference)}</span>
                </div>
            </div>
        </div>

        <div className="mt-8 flex justify-start gap-3">
            <Button type="submit" disabled={difference !== 0 || lines.some(l => !l.accountId)}>
                Save Journal
            </Button>
            <Button type="button" variant="secondary">
                Cancel
            </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateGeneralJournal;