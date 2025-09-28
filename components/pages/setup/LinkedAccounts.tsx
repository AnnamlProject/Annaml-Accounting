import React, { useState } from 'react';
import Button from '../../ui/Button';
import { useData } from '../../../hooks/useData';
import { EyeIcon, PencilIcon, TrashIcon } from '../../icons/Icons';
import AddLinkedAccountForm from './AddLinkedAccountForm';
import { LinkedAccount } from '../../../types';

const LinkedAccountsSetup: React.FC = () => {
    const { linkedAccounts, chartOfAccounts, addLinkedAccount } = useData();
    const [view, setView] = useState<'list' | 'add'>('list');

    const getAccountName = (accountId: string) => {
        const account = chartOfAccounts.find(acc => acc.id === accountId);
        return account ? account.namaAkun : 'N/A';
    };

    const handleSave = (linkedAccount: Omit<LinkedAccount, 'id'>) => {
        addLinkedAccount(linkedAccount);
        setView('list');
    };

    if (view === 'add') {
        return <AddLinkedAccountForm onSave={handleSave} onCancel={() => setView('list')} />;
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="bg-blue-600 rounded-t-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <svg className="w-6 h-6 text-white mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <h2 className="text-lg font-semibold text-white">Linked Account</h2>
                </div>
                <Button onClick={() => setView('add')} variant="secondary" className="bg-white/90 hover:bg-white text-blue-600">
                    + Add Linked Account
                </Button>
            </div>
            <div className="bg-white p-6 rounded-b-lg shadow-sm border border-t-0 border-slate-200">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-800 uppercase bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-slate-800">#</th>
                                <th className="px-6 py-3 text-slate-800">Kode</th>
                                <th className="px-6 py-3 text-slate-800">Nama Akun</th>
                                <th className="px-6 py-3 text-slate-800">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {linkedAccounts.map((link, index) => (
                                <tr key={link.id} className="border-b hover:bg-slate-50">
                                    <td className="px-6 py-4 text-slate-800">{index + 1}</td>
                                    <td className="px-6 py-4 font-mono text-sm text-slate-900">{link.kode}</td>
                                    <td className="px-6 py-4 text-slate-800">{getAccountName(link.namaAkunId)}</td>
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
            </div>
        </div>
    );
};

export default LinkedAccountsSetup;
