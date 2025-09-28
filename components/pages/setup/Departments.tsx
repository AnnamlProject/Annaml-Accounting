import React, { useState } from 'react';
import Button from '../../ui/Button';
import { useData } from '../../../hooks/useData';
import { EyeIcon, PencilIcon, TrashIcon, FunnelIcon, DocumentDuplicateIcon } from '../../icons/Icons';
import AddDepartmentForm from './AddDepartmentForm';
import AssignAccounts from './AssignAccounts';
import { Department } from '../../../types';

const Departments: React.FC = () => {
    const { departments, addDepartment } = useData();
    const [view, setView] = useState<'list' | 'add' | 'assign'>('list');

    const handleSaveDepartment = (department: Omit<Department, 'id'>) => {
        addDepartment(department);
        setView('list');
    };

    if (view === 'add') {
        return <AddDepartmentForm onSave={handleSaveDepartment} onCancel={() => setView('list')} />;
    }
    
    if (view === 'assign') {
        return <AssignAccounts onCancel={() => setView('list')} />;
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="bg-[#EBCB90] rounded-t-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <svg className="w-6 h-6 text-slate-700 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    <h2 className="text-lg font-semibold text-slate-800">Departemen</h2>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="secondary" className="flex items-center gap-2">
                        <FunnelIcon className="w-4 h-4" /> Filter
                    </Button>
                    <Button variant="secondary" className="flex items-center gap-2">
                        <DocumentDuplicateIcon className="w-4 h-4" /> File
                    </Button>
                    <Button onClick={() => setView('add')}>+ Tambah Departement</Button>
                    <Button variant="success" onClick={() => setView('assign')}>+ Assign Accounts</Button>
                </div>
            </div>
            <div className="bg-white p-6 rounded-b-lg shadow-sm border border-t-0 border-slate-200">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-800 uppercase bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-slate-800">#</th>
                                <th className="px-6 py-3 text-slate-800">Kode</th>
                                <th className="px-6 py-3 text-slate-800">Deskripsi</th>
                                <th className="px-6 py-3 text-slate-800">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map((dep, index) => (
                                <tr key={dep.id} className="border-b hover:bg-slate-50">
                                    <td className="px-6 py-4 text-slate-800">{index + 1}</td>
                                    <td className="px-6 py-4 font-medium text-slate-900">{dep.kode}</td>
                                    <td className="px-6 py-4 text-slate-800">{dep.deskripsi}</td>
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

export default Departments;