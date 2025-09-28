import React, { useState } from 'react';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import Select from '../../ui/Select';
import Checkbox from '../../ui/Checkbox';
import { useData } from '../../../hooks/useData';
import { Tax } from '../../../types';

interface AddTaxFormProps {
    onClose: () => void;
}

const AddTaxForm: React.FC<AddTaxFormProps> = ({ onClose }) => {
    const { chartOfAccounts, addTax } = useData();
    const [name, setName] = useState('');
    const [taxId, setTaxId] = useState('');
    const [isExempt, setIsExempt] = useState(false);
    const [isTaxable, setIsTaxable] = useState(false);
    const [purchaseAccountId, setPurchaseAccountId] = useState('');
    const [salesAccountId, setSalesAccountId] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && purchaseAccountId && salesAccountId) {
            addTax({
                name,
                taxId,
                isExempt,
                isTaxable,
                purchaseAccountId,
                salesAccountId
            });
            onClose();
        } else {
            alert('Please fill all required fields.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Input
                label="Tax Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <Input
                label="Tax ID Included on Forms"
                value={taxId}
                onChange={(e) => setTaxId(e.target.value)}
            />
            <div className="flex items-center space-x-6">
                <Checkbox
                    id="isExempt"
                    label="Exempt from this tax?"
                    checked={isExempt}
                    onChange={(e) => setIsExempt(e.target.checked)}
                />
                <Checkbox
                    id="isTaxable"
                    label="Is this tax taxable?"
                    checked={isTaxable}
                    onChange={(e) => setIsTaxable(e.target.checked)}
                />
            </div>
            <Select
                label="Account to track tax paid on purchases"
                value={purchaseAccountId}
                onChange={(e) => setPurchaseAccountId(e.target.value)}
                required
            >
                <option value="" disabled>Select an account</option>
                {chartOfAccounts.map(acc => (
                    <option key={acc.id} value={acc.id}>
                        {acc.kodeAkun} - {acc.namaAkun}
                    </option>
                ))}
            </Select>
            <Select
                label="Account to track tax charged on sales"
                value={salesAccountId}
                onChange={(e) => setSalesAccountId(e.target.value)}
                required
            >
                <option value="" disabled>Select an account</option>
                {chartOfAccounts.map(acc => (
                    <option key={acc.id} value={acc.id}>
                        {acc.kodeAkun} - {acc.namaAkun}
                    </option>
                ))}
            </Select>
            <div className="pt-4 flex justify-end gap-3">
                 <Button type="button" variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button type="submit">
                    Simpan
                </Button>
            </div>
        </form>
    );
};

export default AddTaxForm;
