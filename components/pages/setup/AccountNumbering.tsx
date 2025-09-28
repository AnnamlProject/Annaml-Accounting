import React, { useState } from 'react';
import Button from '../../ui/Button';
import { useData } from '../../../hooks/useData';
import { EyeIcon } from '../../icons/Icons';
import AddAccountNumberingForm from './AddAccountNumberingForm';
import { AccountNumberingRule } from '../../../types';

const AccountNumbering: React.FC = () => {
    const [view, setView] = useState<'list' | 'add'>('list');
    const { accountNumberingRules, addAccountNumberingRule } = useData();

    const handleSaveRules = (rules: Omit<AccountNumberingRule, 'id'>[]) => {
        addAccountNumberingRule(rules);
        setView('list');
    };

    if (view === 'add') {
        return <AddAccountNumberingForm onSave={handleSaveRules} onCancel={() => setView('list')} />;
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="bg-[#EBCB90] rounded-t-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <svg className="w-6 h-6 text-slate-700 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                    <h2 className="text-lg font-semibold text-slate-800">Numbering Account List</h2>
                </div>
                <Button onClick={() => setView('add')}>+ Add Numbering Account</Button>
            </div>
            <div className="bg-white p-6 rounded-b-lg shadow-sm border border-t-0 border-slate-200">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-800 font-semibold uppercase bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-slate-800">#</th>
                                <th className="px-6 py-3 text-slate-800">Nama Grup</th>
                                <th className="px-6 py-3 text-slate-800">Jumlah Digit</th>
                                <th className="px-6 py-3 text-slate-800">Nomor Akun Awal</th>
                                <th className="px-6 py-3 text-slate-800">Nomor Akun Akhir</th>
                                <th className="px-6 py-3 text-slate-800">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accountNumberingRules.map((rule, index) => (
                                <tr key={rule.id} className="border-b hover:bg-slate-50">
                                    <td className="px-6 py-4 text-slate-800">{index + 1}</td>
                                    <td className="px-6 py-4 font-medium text-slate-900">{rule.groupName}</td>
                                    <td className="px-6 py-4 text-slate-800">{rule.digits}</td>
                                    <td className="px-6 py-4 text-slate-800">{rule.start}</td>
                                    <td className="px-6 py-4 text-slate-800">{rule.end}</td>
                                    <td className="px-6 py-4">
                                        <button className="text-blue-500 hover:text-blue-700"><EyeIcon className="w-5 h-5"/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AccountNumbering;