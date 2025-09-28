import React, { useState } from 'react';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import { useData } from '../../../hooks/useData';
import { EyeIcon, PencilIcon, TrashIcon, DocumentDuplicateIcon } from '../../icons/Icons';
import AddTaxForm from './AddTaxForm';
import { Tax } from '../../../types';

const TaxesSetting: React.FC = () => {
    const { taxes, chartOfAccounts } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getAccountName = (accountId: string) => {
        const account = chartOfAccounts.find(acc => acc.id === accountId);
        return account ? `${account.kodeAkun} - ${account.namaAkun}` : 'N/A';
    };
    
    const handleAddTax = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="bg-[#EBCB90] rounded-t-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <svg className="w-6 h-6 text-slate-700 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    <h2 className="text-lg font-semibold text-slate-800">Sales Taxes</h2>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="secondary" className="flex items-center gap-2">
                        <DocumentDuplicateIcon className="w-4 h-4" /> File
                    </Button>
                    <Button onClick={handleAddTax}>+ Add Sales Taxes</Button>
                </div>
            </div>
            <div className="bg-white p-6 rounded-b-lg shadow-sm border border-t-0 border-slate-200">
                {taxes.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="inline-block bg-slate-100 rounded-full p-3">
                           <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-slate-800">Belum ada Sales Taxes</h3>
                        <p className="mt-1 text-sm text-slate-500">Get started by creating your first sales tax.</p>
                        <div className="mt-6">
                            <Button onClick={handleAddTax}>
                                + Tambah
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-800 uppercase bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3 text-slate-800">#</th>
                                    <th className="px-6 py-3 text-slate-800">Tax</th>
                                    <th className="px-6 py-3 text-slate-800">Tax on Purchases</th>
                                    <th className="px-6 py-3 text-slate-800">Tax on Sales</th>
                                    <th className="px-6 py-3 text-slate-800">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {taxes.map((tax, index) => (
                                    <tr key={tax.id} className="border-b hover:bg-slate-50">
                                        <td className="px-6 py-4 text-slate-800">{index + 1}</td>
                                        <td className="px-6 py-4 font-medium text-slate-900">{tax.name}</td>
                                        <td className="px-6 py-4 text-slate-800">{getAccountName(tax.purchaseAccountId)}</td>
                                        <td className="px-6 py-4 text-slate-800">{getAccountName(tax.salesAccountId)}</td>
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
                )}
            </div>
            <Modal title="Add Sales Tax" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <AddTaxForm onClose={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default TaxesSetting;
