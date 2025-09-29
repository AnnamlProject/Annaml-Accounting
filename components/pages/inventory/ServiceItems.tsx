import React, { useState } from 'react';
import Header from '../../layout/Header';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import { useData } from '../../../hooks/useData';
import { EyeIcon, PencilIcon, TrashIcon } from '../../icons/Icons';
import { ServiceItem } from '../../../types';

// Tipe untuk Tab di form
type ServiceFormTab = 'Units' | 'Pricing' | 'Linked' | 'Taxes' | 'Vendors';

const ServiceItems: React.FC = () => {
    const { chartOfAccounts, serviceItems, addServiceItem } = useData();
    const [view, setView] = useState<'list' | 'form'>('list');
    const [currentItem, setCurrentItem] = useState<Partial<ServiceItem>>({});
    const [activeTab, setActiveTab] = useState<ServiceFormTab>('Units');

    const handleAddNew = () => {
        setCurrentItem({
            type: 'Service',
            itemNumber: `SRV-00${serviceItems.length + 1}`,
            unitOfMeasure: 'Each',
        });
        setActiveTab('Units');
        setView('form');
    };

    const handleCancel = () => {
        setView('list');
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentItem.itemNumber || !currentItem.itemDescription || !currentItem.revenueAccountId || !currentItem.expenseAccountId) {
            alert('Harap lengkapi semua field yang wajib diisi (*).');
            return;
        }

        addServiceItem(currentItem as Omit<ServiceItem, 'id'>);
        alert('Service Item berhasil disimpan!');
        setView('list');
    };
    
    const handleChange = (field: keyof ServiceItem, value: any) => {
        setCurrentItem(prev => ({...prev, [field]: value}));
    };

    // Form View
    if (view === 'form') {
        const TabButton: React.FC<{tabName: ServiceFormTab, label: string}> = ({tabName, label}) => (
            <button
                type="button"
                onClick={() => setActiveTab(tabName)}
                className={`py-2 px-4 text-sm font-medium border-b-2 ${activeTab === tabName ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}
            >
                {label}
            </button>
        );

        return (
            <div className="p-4 sm:p-6 lg:p-8">
                <Header title="Create Service Record" />
                <form onSubmit={handleSave} className="bg-white rounded-lg shadow-sm border border-slate-200">
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="Item Number *" value={currentItem.itemNumber ?? ''} onChange={(e) => handleChange('itemNumber', e.target.value)} required />
                            <Input label="Description *" value={currentItem.itemDescription ?? ''} onChange={(e) => handleChange('itemDescription', e.target.value)} required />
                        </div>
                    </div>
                    
                    <div className="border-b border-slate-200">
                        <nav className="-mb-px flex space-x-6 px-6">
                            <TabButton tabName="Units" label="Units" />
                            <TabButton tabName="Pricing" label="Pricing" />
                            <TabButton tabName="Linked" label="Linked" />
                            <TabButton tabName="Taxes" label="Taxes" />
                            <TabButton tabName="Vendors" label="Vendors" />
                        </nav>
                    </div>

                    <div className="p-6 min-h-[250px]">
                        {activeTab === 'Units' && (
                            <div className="max-w-md">
                                <Input label="Unit of Measure" value={currentItem.unitOfMeasure ?? ''} onChange={(e) => handleChange('unitOfMeasure', e.target.value)} />
                                <p className="text-xs text-slate-500 mt-1">Contoh: Jam, Proyek, Sesi.</p>
                            </div>
                        )}
                        {activeTab === 'Pricing' && (
                             <div>
                                <h3 className="text-md font-semibold mb-2">Price List</h3>
                                <p className="text-slate-500 text-sm">Fungsionalitas daftar harga untuk jasa belum diimplementasikan di UI ini.</p>
                            </div>
                        )}
                        {activeTab === 'Linked' && (
                            <div className="max-w-md space-y-4">
                                <Select label="Revenue Account *" value={currentItem.revenueAccountId ?? ''} onChange={(e) => handleChange('revenueAccountId', e.target.value)} required>
                                    <option value="" disabled>-- Pilih Akun Pendapatan --</option>
                                    {chartOfAccounts.filter(a => a.tipeAkun === 'Pendapatan').map(acc => 
                                        <option key={acc.id} value={acc.id}>{acc.kodeAkun} - {acc.namaAkun}</option>
                                    )}
                                </Select>
                                <Select label="Expense Account *" value={currentItem.expenseAccountId ?? ''} onChange={(e) => handleChange('expenseAccountId', e.target.value)} required>
                                    <option value="" disabled>-- Pilih Akun Beban --</option>
                                    {chartOfAccounts.filter(a => a.tipeAkun === 'Beban').map(acc => 
                                        <option key={acc.id} value={acc.id}>{acc.kodeAkun} - {acc.namaAkun}</option>
                                    )}
                                </Select>
                            </div>
                        )}
                         {activeTab === 'Taxes' && (
                            <div>
                                <h3 className="text-md font-semibold mb-2">Tax Information</h3>
                                <p className="text-slate-500 text-sm">Fungsionalitas pengaturan pajak untuk jasa belum diimplementasikan di UI ini.</p>
                            </div>
                        )}
                         {activeTab === 'Vendors' && (
                            <div>
                                <h3 className="text-md font-semibold mb-2">Associated Vendors</h3>
                                <p className="text-slate-500 text-sm">Fungsionalitas vendor untuk jasa belum diimplementasikan di UI ini.</p>
                            </div>
                        )}
                    </div>

                    <div className="p-6 flex justify-start gap-3 border-t bg-slate-50 rounded-b-lg">
                        <Button type="submit">Save and Close</Button>
                        <Button type="button" variant="secondary" onClick={handleCancel}>Cancel</Button>
                    </div>
                </form>
            </div>
        );
    }

    // List View
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="bg-[#EBCB90] rounded-t-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <h2 className="text-lg font-semibold text-slate-800">Inventory & Service</h2>
                </div>
                <Button onClick={handleAddNew}>+ Add Inventory & Service</Button>
            </div>
            <div className="bg-white p-6 rounded-b-lg shadow-sm border border-t-0 border-slate-200">
                {serviceItems.length === 0 ? (
                     <div className="text-center py-16">
                        <h3 className="mt-4 text-lg font-semibold text-slate-800">Belum ada Service Item</h3>
                        <p className="mt-1 text-sm text-slate-500">Mulai dengan membuat data jasa baru.</p>
                        <div className="mt-6"><Button onClick={handleAddNew}>+ Tambah Service Item</Button></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-800 uppercase bg-slate-50">
                                <tr>
                                    {['Item Number', 'Item Description', 'Type', 'Aksi'].map(h => <th key={h} className="px-6 py-3">{h}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {serviceItems.map(item => (
                                    <tr key={item.id} className="border-b hover:bg-slate-50">
                                        <td className="px-6 py-4 font-mono">{item.itemNumber}</td>
                                        <td className="px-6 py-4 font-medium">{item.itemDescription}</td>
                                        <td className="px-6 py-4"><span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">{item.type}</span></td>
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
        </div>
    );
};

export default ServiceItems;