import React, { useState } from 'react';
import Header from '../layout/Header';
import { useData } from '../../hooks/useData';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Checkbox from '../ui/Checkbox';
import { EyeIcon, PencilIcon, TrashIcon, DocumentDuplicateIcon } from '../icons/Icons';
import { Vendor } from '../../types';

const AddVendorForm: React.FC<{ onSave: (vendor: Omit<Vendor, 'id'>) => void; onCancel: () => void; }> = ({ onSave, onCancel }) => {
    const [kode, setKode] = useState('');
    const [autoGenerate, setAutoGenerate] = useState(true);
    const [nama, setNama] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [alamat, setAlamat] = useState('');
    const [telepon, setTelepon] = useState('');
    const [email, setEmail] = useState('');
    const [paymentTerms, setPaymentTerms] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            name: nama,
            category: '', // This field is not in the new form, but the type requires it.
            ...(!autoGenerate && { kode }),
            contactPerson,
            alamat,
            telepon,
            email,
            paymentTerms,
        });
    };
    
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <Header title="Create Vendor" />
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <Input label="Kode vendors" value={kode} onChange={e => setKode(e.target.value)} disabled={autoGenerate} />
                        <div className="mt-2">
                             <Checkbox id="auto-generate-code" label="Generate kode vendors secara otomatis" checked={autoGenerate} onChange={e => setAutoGenerate(e.target.checked)} />
                        </div>
                    </div>
                    <Input label="Nama vendors" value={nama} onChange={e => setNama(e.target.value)} required />
                    <Input label="Contact Person" value={contactPerson} onChange={e => setContactPerson(e.target.value)} />
                </div>
                <Textarea label="Alamat" value={alamat} onChange={e => setAlamat(e.target.value)} rows={4} />
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Input label="Telepon" value={telepon} onChange={e => setTelepon(e.target.value)} />
                    <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    <Input label="Payment Terms" value={paymentTerms} onChange={e => setPaymentTerms(e.target.value)} />
                </div>
                <div className="pt-4 flex justify-start gap-3">
                    <Button type="submit">Create vendors</Button>
                    <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
                </div>
            </form>
        </div>
    )
};


const Vendors: React.FC = () => {
  const { vendors, addVendor } = useData();
  const [view, setView] = useState<'list' | 'form'>('list');

  const handleSaveVendor = (vendor: Omit<Vendor, 'id'>) => {
      addVendor(vendor);
      alert('Vendor berhasil dibuat!');
      setView('list');
  };

  if (view === 'form') {
      return <AddVendorForm onSave={handleSaveVendor} onCancel={() => setView('list')} />;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="bg-blue-600 rounded-t-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
                <h2 className="text-lg font-semibold text-white">Vendors</h2>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="secondary" className="bg-white/90 text-blue-600 hover:bg-white flex items-center gap-2">
                    <DocumentDuplicateIcon className="w-4 h-4" /> File
                </Button>
                <Button onClick={() => setView('form')} variant="secondary" className="bg-white/90 text-blue-600 hover:bg-white">
                    + Add Vendors
                </Button>
            </div>
      </div>
      <div className="bg-white p-6 rounded-b-lg shadow-sm border border-t-0 border-slate-200">
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-800 uppercase bg-slate-50">
                <tr>
                  {['#', 'Kode Vendors', 'Nama Vendors', 'Contact Person', 'Alamat', 'Telepon', 'Email', 'Payment Terms', 'Aksi'].map(h => <th key={h} className="px-6 py-3">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {vendors.map((vendor, index) => (
                  <tr key={vendor.id} className="border-b hover:bg-slate-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 font-mono">{vendor.kode || '-'}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{vendor.name}</td>
                    <td className="px-6 py-4">{vendor.contactPerson || vendor.category}</td>
                    <td className="px-6 py-4">{vendor.alamat || '-'}</td>
                    <td className="px-6 py-4">{vendor.telepon || '-'}</td>
                    <td className="px-6 py-4">{vendor.email || '-'}</td>
                    <td className="px-6 py-4">{vendor.paymentTerms || '-'}</td>
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

export default Vendors;