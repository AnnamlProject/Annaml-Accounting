import React, { useState } from 'react';
import Button from '../../ui/Button';
import Select from '../../ui/Select';
import { useData } from '../../../hooks/useData';
import { LinkedAccount } from '../../../types';

interface AddLinkedAccountFormProps {
    onSave: (linkedAccount: Omit<LinkedAccount, 'id'>) => void;
    onCancel: () => void;
}

const AddLinkedAccountForm: React.FC<AddLinkedAccountFormProps> = ({ onSave, onCancel }) => {
    const { chartOfAccounts, linkedAccounts } = useData();
    const existingRetainedEarnings = linkedAccounts.find(la => la.kode === 'retained_earnings');
    const [selectedAccountId, setSelectedAccountId] = useState(existingRetainedEarnings?.namaAkunId || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedAccountId) {
            onSave({
                kode: 'retained_earnings',
                namaAkunId: selectedAccountId,
            });
        } else {
            alert('Please select an account.');
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 flex justify-center items-start">
            <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-sm border border-slate-200 mt-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Select
                        label="Retained Earnings *"
                        value={selectedAccountId}
                        onChange={(e) => setSelectedAccountId(e.target.value)}
                        required
                    >
                        <option value="" disabled>-- Pilih Akun --</option>
                        {chartOfAccounts.map(acc => (
                            <option key={acc.id} value={acc.id}>
                                {acc.kodeAkun} - {acc.namaAkun}
                            </option>
                        ))}
                    </Select>
                    <div className="pt-4 flex justify-start gap-3">
                        <Button type="submit">
                            Simpan
                        </Button>
                         <Button type="button" variant="secondary" onClick={onCancel}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLinkedAccountForm;
