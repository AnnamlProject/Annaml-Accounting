import React, { useState } from 'react';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';

type Tab = 'company-data' | 'legal-document';

const CompanyProfile: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('company-data');

    const handleCancel = () => {
        // In a real app, this would likely navigate away or reset form state
        console.log("Form cancelled");
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would collect form data and submit it
        console.log("Form submitted");
        alert("Company Profile Created!");
    };

    return (
        <div className="bg-white h-full">
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8 px-8" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab('company-data')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'company-data' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                        Company Data
                    </button>
                    <button
                        onClick={() => setActiveTab('legal-document')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'legal-document' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                        Legal Document
                    </button>
                </nav>
            </div>
            <div className="p-8">
                <form onSubmit={handleSubmit}>
                    {activeTab === 'company-data' && (
                        <div className="space-y-8">
                            <div>
                                <Input label="Nama Perusahaan" id="nama-perusahaan" type="text" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Jalan</label>
                                <textarea id="jalan" rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <Input label="Kelurahan" id="kelurahan" type="text" />
                                <Input label="Kecamatan" id="kecamatan" type="text" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <Input label="Kota" id="kota" type="text" />
                                <Input label="Provinsi" id="provinsi" type="text" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <Input label="Kode Pos" id="kode-pos" type="text" />
                                <Input label="Nomor Handphone" id="nomor-handphone" type="tel" />
                            </div>
                        </div>
                    )}

                    {activeTab === 'legal-document' && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FileInput label="Data Pendirian" id="data-pendirian" />
                                <FileInput label="Akta Perubahan Terakhir" id="akta-perubahan" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FileInput label="SKKEMENKUMHAM" id="skkemenkumham" />
                                <FileInput label="BNRI" id="bnri" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FileInput label="NIB" id="nib" />
                                <FileInput label="NPWP Perusahaan" id="npwp-perusahaan" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FileInput label="SPPL" id="sppl" />
                                <FileInput label="SPT TAHUNAN" id="spt-tahunan" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FileInput label="KTP Pemegang Saham" id="ktp-pemegang-saham" />
                                <FileInput label="K3L" id="k3l" />
                            </div>
                        </div>
                    )}
                    
                    {activeTab === 'legal-document' && (
                        <div className="pt-8 flex justify-start gap-3">
                            <Button type="submit">Create</Button>
                            <Button type="button" variant="secondary" onClick={handleCancel}>Cancel</Button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default CompanyProfile;
