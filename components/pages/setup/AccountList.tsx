import React, { useState, useMemo } from 'react';
import Button from '../../ui/Button';
import { useData } from '../../../hooks/useData';
import { AccountLevel } from '../../../types';
import { EyeIcon, PencilIcon, TrashIcon, FunnelIcon, DocumentDuplicateIcon } from '../../icons/Icons';

const AccountList: React.FC = () => {
    const { chartOfAccounts } = useData();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * itemsPerPage;
        const lastPageIndex = firstPageIndex + itemsPerPage;
        return chartOfAccounts.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, chartOfAccounts]);

    const totalPages = Math.ceil(chartOfAccounts.length / itemsPerPage);

    const paginate = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / 10) * 10;
        const pageCount = Math.min(start + 10, totalPages);
        const pages = [];
        for (let i = start + 1; i <= pageCount; i++) {
            pages.push(i);
        }
        return pages;
    };

    const getAccountLevelStyle = (level: AccountLevel) => {
        switch (level) {
            case AccountLevel.HEADER:
                return { icon: '📁', indent: 'pl-0', font: 'font-bold' };
            case AccountLevel.GROUP_ACCOUNT:
                return { icon: '📂', indent: 'pl-4', font: 'font-semibold' };
            case AccountLevel.ACCOUNT:
                return { icon: '📄', indent: 'pl-8', font: '' };
            case AccountLevel.SUB_ACCOUNT:
                return { icon: '🔸', indent: 'pl-12', font: '' };
            default:
                return { icon: '', indent: '', font: '' };
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="bg-[#EBCB90] rounded-t-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <svg className="w-6 h-6 text-slate-700 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    <h2 className="text-lg font-semibold text-slate-800">Account List</h2>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="secondary" className="flex items-center gap-2">
                        <FunnelIcon className="w-4 h-4" /> Filter
                    </Button>
                    <Button variant="secondary" className="flex items-center gap-2">
                        <DocumentDuplicateIcon className="w-4 h-4" /> File
                    </Button>
                    <Button onClick={() => alert('Add Account form not implemented yet.')}>+ Add Account</Button>
                </div>
            </div>
            <div className="bg-white p-6 rounded-b-lg shadow-sm border border-t-0 border-slate-200">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-800 uppercase bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-slate-800">Kode Akun</th>
                                <th className="px-6 py-3 text-slate-800">Nama Akun</th>
                                <th className="px-6 py-3 text-slate-800">Tipe Akun</th>
                                <th className="px-6 py-3 text-slate-800">Level Akun</th>
                                <th className="px-6 py-3 text-slate-800">Klasifikasi Akun</th>
                                <th className="px-6 py-3 text-slate-800">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTableData.map(item => {
                                const { icon, indent, font } = getAccountLevelStyle(item.levelAkun);
                                return (
                                    <tr key={item.id} className="border-b hover:bg-slate-50">
                                        <td className="px-6 py-4 text-slate-800">{item.kodeAkun}</td>
                                        <td className={`px-6 py-4 text-slate-900 ${font}`}>
                                            <div className={`flex items-center gap-2 ${indent}`}>
                                                <span>{icon}</span>
                                                <span>{item.namaAkun}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-800">{item.tipeAkun}</td>
                                        <td className="px-6 py-4 text-slate-800">{item.levelAkun}</td>
                                        <td className="px-6 py-4 text-slate-800">{item.klasifikasiAkun}</td>
                                        <td className="px-6 py-4 flex items-center space-x-3">
                                            <button className="text-blue-500 hover:text-blue-700"><EyeIcon className="w-5 h-5"/></button>
                                            <button className="text-yellow-500 hover:text-yellow-700"><PencilIcon className="w-5 h-5"/></button>
                                            <button className="text-red-500 hover:text-red-700"><TrashIcon className="w-5 h-5"/></button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end items-center pt-4">
                     <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                         <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                        >
                            <span>&lsaquo;</span>
                        </button>
                        {getPaginationGroup().map(pageNumber => (
                             <button
                                key={pageNumber}
                                onClick={() => paginate(pageNumber)}
                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === pageNumber ? 'bg-blue-600 text-white' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'}`}
                            >
                                {pageNumber}
                            </button>
                        ))}
                        {totalPages > 10 && currentPage < totalPages - 5 && <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300">...</span>}
                        {totalPages > 10 && currentPage < totalPages - 4 && (
                            <button onClick={() => paginate(totalPages)} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                {totalPages}
                            </button>
                        )}
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                        >
                            <span>&rsaquo;</span>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default AccountList;