import React, { useState, useMemo } from 'react';
import Button from '../../ui/Button';
import { AccountNumberingRule } from '../../../types';

interface AddAccountNumberingFormProps {
    onSave: (rules: Omit<AccountNumberingRule, 'id'>[]) => void;
    onCancel: () => void;
}

const ACCOUNT_GROUPS = [
    { name: 'Aset', base: 1 },
    { name: 'Kewajiban', base: 2 },
    { name: 'Ekuitas', base: 3 },
    { name: 'Pendapatan', base: 4 },
    { name: 'Beban', base: 5 },
];

const AddAccountNumberingForm: React.FC<AddAccountNumberingFormProps> = ({ onSave, onCancel }) => {
    const [digitCount, setDigitCount] = useState(5);

    const generatedRules = useMemo(() => {
        const multiplier = Math.pow(10, digitCount - 1);
        return ACCOUNT_GROUPS.map(group => {
            const start = group.base * multiplier;
            const end = ((group.base + 1) * multiplier) - 1;
            return {
                groupName: group.name,
                digits: digitCount,
                start,
                end,
            };
        });
    }, [digitCount]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(generatedRules);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="bg-slate-800 text-white rounded-lg shadow-xl">
                <div className="p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="digit-count" className="block text-sm font-medium text-slate-300 mb-1">Jumlah Digit Akun</label>
                            <select
                                id="digit-count"
                                value={digitCount}
                                onChange={(e) => setDigitCount(parseInt(e.target.value, 10))}
                                className="w-48 px-3 py-2 border border-slate-600 bg-slate-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                            </select>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-900">
                                    <tr>
                                        <th className="px-6 py-3 font-medium text-slate-300">Nama Grup</th>
                                        <th className="px-6 py-3 font-medium text-slate-300">Nomor Akun Awal</th>
                                        <th className="px-6 py-3 font-medium text-slate-300">Nomor Akun Akhir</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-slate-800">
                                    {generatedRules.map(rule => (
                                        <tr key={rule.groupName} className="border-b border-slate-700">
                                            <td className="px-6 py-4">
                                                <div className="w-full px-4 py-2 bg-slate-700 rounded-md font-semibold">{rule.groupName}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                 <div className="w-full px-4 py-2 bg-slate-700 rounded-md">{rule.start}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="w-full px-4 py-2 bg-slate-700 rounded-md">{rule.end}</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-8 flex justify-start gap-3">
                            <Button type="submit">Create Numbering Account</Button>
                            <Button type="button" variant="secondary" onClick={onCancel}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAccountNumberingForm;
