import React, { useState, useMemo, useEffect } from 'react';
import Button from '../../ui/Button';
import { useData } from '../../../hooks/useData';
import { ChartOfAccount } from '../../../types';

interface AssignAccountsProps {
    onCancel: () => void;
}

const AssignAccounts: React.FC<AssignAccountsProps> = ({ onCancel }) => {
    const { departments, chartOfAccounts, departmentAccountAssignments, updateDepartmentAssignments } = useData();
    const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>(departments.length > 0 ? departments[0].id : '');
    
    // State for the current list of assigned account IDs for the selected department
    const [assignedIds, setAssignedIds] = useState<Set<string>>(new Set());

    // State for checkbox selections
    const [selectedUnassigned, setSelectedUnassigned] = useState<Set<string>>(new Set());
    const [selectedAssigned, setSelectedAssigned] = useState<Set<string>>(new Set());
    
    // Update assignedIds when selected department changes
    useEffect(() => {
        if (selectedDepartmentId) {
            setAssignedIds(new Set(departmentAccountAssignments[selectedDepartmentId] || []));
            setSelectedUnassigned(new Set());
            setSelectedAssigned(new Set());
        }
    }, [selectedDepartmentId, departmentAccountAssignments]);
    
    const { unassignedAccounts, assignedAccounts } = useMemo(() => {
        const assigned = chartOfAccounts.filter(acc => assignedIds.has(acc.id));
        const unassigned = chartOfAccounts.filter(acc => !assignedIds.has(acc.id));
        return { unassignedAccounts: unassigned, assignedAccounts: assigned };
    }, [chartOfAccounts, assignedIds]);
    
    const handleSelectUnassigned = (id: string, checked: boolean) => {
        const newSelection = new Set(selectedUnassigned);
        if (checked) newSelection.add(id);
        else newSelection.delete(id);
        setSelectedUnassigned(newSelection);
    };

    const handleSelectAssigned = (id: string, checked: boolean) => {
        const newSelection = new Set(selectedAssigned);
        if (checked) newSelection.add(id);
        else newSelection.delete(id);
        setSelectedAssigned(newSelection);
    };

    const handleSelectAllUnassigned = () => {
        if (selectedUnassigned.size === unassignedAccounts.length) {
            setSelectedUnassigned(new Set());
        } else {
            setSelectedUnassigned(new Set(unassignedAccounts.map(a => a.id)));
        }
    };
    
    const moveToAssigned = () => {
        setAssignedIds(prev => new Set([...prev, ...selectedUnassigned]));
        setSelectedUnassigned(new Set());
    };

    const removeFromAssigned = () => {
        const newAssignedIds = new Set(assignedIds);
        selectedAssigned.forEach(id => newAssignedIds.delete(id));
        setAssignedIds(newAssignedIds);
        setSelectedAssigned(new Set());
    };

    const handleSave = () => {
        if (!selectedDepartmentId) {
            alert('Please select a department.');
            return;
        }
        updateDepartmentAssignments(selectedDepartmentId, Array.from(assignedIds));
        alert('Assignments saved!');
        onCancel(); // Go back to the list view
    };
    
    const AccountList = ({ accounts, selection, onSelect }: { accounts: ChartOfAccount[], selection: Set<string>, onSelect: (id: string, checked: boolean) => void }) => (
         <div className="border border-slate-300 rounded-md h-96 overflow-y-auto">
            {accounts.map(acc => (
                <div key={acc.id} className="flex items-center p-2 border-b border-slate-200">
                    <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selection.has(acc.id)}
                        onChange={(e) => onSelect(acc.id, e.target.checked)}
                    />
                    <label className="ml-3 text-sm text-slate-700">{`${acc.kodeAkun} ${acc.namaAkun}`}</label>
                </div>
            ))}
        </div>
    );
    
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h2 className="text-xl font-semibold text-slate-800 mb-6">Assign Accounts to Department</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Pilih Departemen</label>
                    <select
                        value={selectedDepartmentId}
                        onChange={(e) => setSelectedDepartmentId(e.target.value)}
                        className="w-full max-w-xs px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                         {departments.map(dep => <option key={dep.id} value={dep.id}>{dep.deskripsi}</option>)}
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                             <h3 className="font-semibold text-slate-800">Akun Non-Department</h3>
                             <button onClick={handleSelectAllUnassigned} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                                {selectedUnassigned.size === unassignedAccounts.length ? 'Deselect All' : 'Select All'}
                             </button>
                        </div>
                        <AccountList accounts={unassignedAccounts} selection={selectedUnassigned} onSelect={handleSelectUnassigned} />
                    </div>
                     <div>
                        <h3 className="font-semibold text-slate-800 mb-2">Akun Department</h3>
                        <div className="border border-slate-300 rounded-md h-96 overflow-y-auto">
                           {assignedAccounts.map(acc => (
                                <div key={acc.id} className="flex items-center justify-between p-2 border-b border-slate-200">
                                    <span className="text-sm text-slate-700">{`${acc.kodeAkun} - ${acc.namaAkun}`}</span>
                                    <button
                                        onClick={() => {
                                            const newIds = new Set(assignedIds);
                                            newIds.delete(acc.id);
                                            setAssignedIds(newIds);
                                        }}
                                        className="text-sm font-medium text-red-600 hover:text-red-800"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-center my-4">
                    <Button onClick={moveToAssigned} disabled={selectedUnassigned.size === 0}>
                        Assign to Department &rarr;
                    </Button>
                </div>

                <div className="pt-6 border-t flex justify-start gap-3">
                    <Button type="button" variant="secondary" onClick={onCancel}>
                        Batal
                    </Button>
                    <Button onClick={handleSave}>
                        Assign
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AssignAccounts;