import React, { useState, useMemo } from 'react';
import Button from '../../ui/Button';
import { useData } from '../../../hooks/useData';
import { EyeIcon, PencilIcon, TrashIcon, FunnelIcon, DocumentDuplicateIcon } from '../../icons/Icons';

const AccountClassification: React.FC = () => {
    const { accountClassifications } = useData();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * itemsPerPage;
        const lastPageIndex = firstPageIndex + itemsPerPage;
        return accountClassifications.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, accountClassifications]);

    const totalPages = Math.ceil(accountClassifications.length / itemsPerPage);

    const paginate = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };
    
    // Generate page numbers for pagination control
    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / 5) * 5;
        const pageCount = Math.min(start + 5, totalPages);
        const pages = [];
        for (let i = start + 1; i <= pageCount; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="bg-[#EBCB90] rounded-t-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <svg className="w-6 h-6 text-slate-700 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    <h2 className="text-lg font-semibold text-slate-800">Classification Account</h2>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="secondary" className="flex items-center gap-2">
                        <FunnelIcon className="w-4 h-4" /> Filter
                    </Button>
                    <Button variant="secondary" className="flex items-center gap-2">
                        <DocumentDuplicateIcon className="w-4 h-4" /> File
                    </Button>
                    <Button>+ Add Klasifikasi Akun</Button>
                </div>
            </div>
            <div className="bg-white p-6 rounded-b-lg shadow-sm border border-t-0 border-slate-200">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-800 uppercase bg-slate-50">
                            <tr>
                                <th className="px-6 py-3">No</th>
                                <th className="px-6 py-3">Grup</th>
                                <th className="px-6 py-3">Nama</th>
                                <th className="px-6 py-3">Aktif</th>
                                <th className="px-6 py-3">Deskripsi</th>
                                <th className="px-6 py-3">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTableData.map((item, index) => (
                                <tr key={item.id} className="border-b hover:bg-slate-50">
                                    <td className="px-6 py-4">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                    <td className="px-6 py-4 font-medium text-slate-900">{item.group}</td>
                                    <td className="px-6 py-4 text-slate-900">{item.name}</td>
                                    <td className="px-6 py-4">
                                        <span className="font-semibold text-green-600">{item.status}</span>
                                    </td>
                                    <td className="px-6 py-4">{item.description}</td>
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

export default AccountClassification;