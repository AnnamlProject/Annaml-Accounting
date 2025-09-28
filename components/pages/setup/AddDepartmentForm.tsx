import React, { useState } from 'react';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import { Department, DepartmentStatus } from '../../../types';

interface AddDepartmentFormProps {
    onSave: (department: Omit<Department, 'id'>) => void;
    onCancel: () => void;
}

const AddDepartmentForm: React.FC<AddDepartmentFormProps> = ({ onSave, onCancel }) => {
    const [kode, setKode] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [status, setStatus] = useState<DepartmentStatus>(DepartmentStatus.Aktif);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (kode && deskripsi) {
            onSave({ kode, deskripsi, status });
        } else {
            alert('Please fill all fields.');
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h2 className="text-xl font-semibold text-slate-800 mb-6">Create Department</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="sm:col-span-1">
                             <Input 
                                label="Kode"
                                value={kode}
                                onChange={(e) => setKode(e.target.value)}
                                required
                            />
                        </div>
                        <div className="sm:col-span-2">
                             <Input 
                                label="Deskripsi"
                                value={deskripsi}
                                onChange={(e) => setDeskripsi(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <Select
                        label="Status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value as DepartmentStatus)}
                    >
                        <option value={DepartmentStatus.Aktif}>Aktif</option>
                        <option value={DepartmentStatus.NonAktif}>Non-Aktif</option>
                    </Select>
                    <div className="pt-4 flex justify-start gap-3">
                        <Button type="button" variant="secondary" onClick={onCancel}>
                            Batal
                        </Button>
                        <Button type="submit">
                            Simpan
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddDepartmentForm;