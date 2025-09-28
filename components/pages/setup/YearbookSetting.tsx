import React, { useState } from 'react';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import Input from '../../ui/Input';
import { useData } from '../../../hooks/useData';
import { YearbookStatus } from '../../../types';
import { EyeIcon, TrashIcon } from '../../icons/Icons';

const YearbookSetting: React.FC = () => {
    const { yearbooks, addYearbook } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [year, setYear] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        // Reset form fields
        setYear('');
        setStartDate('');
        setEndDate('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (year && startDate && endDate) {
            addYearbook({
                year: parseInt(year),
                startDate,
                endDate,
            });
            handleCloseModal();
        } else {
            alert("Please fill all fields.");
        }
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    const getStatusClass = (status: YearbookStatus) => {
        switch (status) {
            case YearbookStatus.Opening:
                return 'bg-green-100 text-green-800';
            case YearbookStatus.Closing:
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-slate-100 text-slate-800';
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="bg-[#EBCB90] rounded-t-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <svg className="w-6 h-6 text-slate-700 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9 6 9-6" />
                    </svg>
                    <h2 className="text-lg font-semibold text-slate-800">Year Book</h2>
                </div>
                <Button onClick={handleOpenModal}>+ Choose Year Book</Button>
            </div>
            <div className="bg-white p-6 rounded-b-lg shadow-sm border border-t-0 border-slate-200">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                            <tr>
                                <th className="px-6 py-3">#</th>
                                <th className="px-6 py-3">Tahun</th>
                                <th className="px-6 py-3">Awal Periode</th>
                                <th className="px-6 py-3">Akhir Periode</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {yearbooks.map((yb, index) => (
                                <tr key={yb.id} className="border-b hover:bg-slate-50">
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <td className="px-6 py-4 font-medium text-slate-900">{yb.year}</td>
                                    <td className="px-6 py-4">{formatDate(yb.startDate)}</td>
                                    <td className="px-6 py-4">{formatDate(yb.endDate)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(yb.status)}`}>
                                            {yb.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex items-center space-x-3">
                                        <button className="text-blue-500 hover:text-blue-700"><EyeIcon className="w-5 h-5"/></button>
                                        <button className="text-red-500 hover:text-red-700"><TrashIcon className="w-5 h-5"/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal title="Choose Year Book" isOpen={isModalOpen} onClose={handleCloseModal}>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Tahun"
                        id="tahun"
                        placeholder="Masukkan Tahun ...."
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        required
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <Input
                            label="Awal Periode"
                            id="awal-periode"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                         <Input
                            label="Akhir Periode"
                            id="akhir-periode"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="pt-4 flex justify-start gap-3">
                        <Button type="submit">Simpan</Button>
                        <Button type="button" variant="secondary" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default YearbookSetting;