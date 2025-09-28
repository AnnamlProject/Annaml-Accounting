import React, { useState } from 'react';
import Header from '../../layout/Header';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';

const TaxpayersProfile: React.FC = () => {
    const [formData, setFormData] = useState({
        namaWajibPajak: '',
        jalan: '',
        kelurahan: '',
        kecamatan: '',
        kota: '',
        provinsi: '',
        kodePos: '',
        noTlp: '',
        email: '',
        bentukBadanHukum: '',
        npwp: '',
        kluCode: '',
        kluDescription: '',
        taxOffice: '',
    });

    const [logoFile, setLogoFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        console.log('Logo File:', logoFile);
        alert('Taxpayer profile created!');
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <Header title="Taxpayers Profile" />
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Nama Wajib Pajak"
                        id="namaWajibPajak"
                        name="namaWajibPajak"
                        value={formData.namaWajibPajak}
                        onChange={handleChange}
                    />
                    <Textarea
                        label="Jalan"
                        id="jalan"
                        name="jalan"
                        rows={3}
                        value={formData.jalan}
                        onChange={handleChange}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Kelurahan" id="kelurahan" name="kelurahan" value={formData.kelurahan} onChange={handleChange} />
                        <Input label="Kecamatan" id="kecamatan" name="kecamatan" value={formData.kecamatan} onChange={handleChange} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Kota" id="kota" name="kota" value={formData.kota} onChange={handleChange} />
                        <Input label="Provinsi" id="provinsi" name="provinsi" value={formData.provinsi} onChange={handleChange} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Kode Pos" id="kodePos" name="kodePos" value={formData.kodePos} onChange={handleChange} />
                        <Textarea
                            label="No.Tlp/Hp (Tercatat di Coretax)"
                            id="noTlp"
                            name="noTlp"
                            rows={1}
                            value={formData.noTlp}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="Email (Tercatat di Coretax)" id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                        <Input label="Bentuk Badan Hukum" id="bentukBadanHukum" name="bentukBadanHukum" value={formData.bentukBadanHukum} onChange={handleChange} />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input label="NPWP" id="npwp" name="npwp" value={formData.npwp} onChange={handleChange} />
                        <Input label="KLU Code" id="kluCode" name="kluCode" value={formData.kluCode} onChange={handleChange} />
                    </div>
                    <Textarea
                        label="KLU Description"
                        id="kluDescription"
                        name="kluDescription"
                        rows={3}
                        value={formData.kluDescription}
                        onChange={handleChange}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                        <Input label="Tax Office" id="taxOffice" name="taxOffice" value={formData.taxOffice} onChange={handleChange} />
                        <FileInput label="Logo" id="logo" onChange={setLogoFile} accept="image/*" />
                    </div>
                    <div className="pt-4 flex justify-start gap-3">
                        <Button type="submit">Create</Button>
                        <Button type="button" variant="secondary">Cancel</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaxpayersProfile;