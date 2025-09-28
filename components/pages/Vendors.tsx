import React from 'react';
import Header from '../layout/Header';
import { useData } from '../../hooks/useData';
import Button from '../ui/Button';

const Vendors: React.FC = () => {
  const { vendors } = useData();

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-slate-100 min-h-full">
      <Header title="Vendors">
        <Button onClick={() => alert('Vendor creation form not implemented.')}>Add Vendor</Button>
      </Header>
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm text-left text-slate-500">
          <thead className="text-xs text-slate-700 uppercase bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3">Vendor ID</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Category</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor.id} className="bg-white border-b hover:bg-slate-50">
                <td className="px-6 py-4 font-mono text-xs text-slate-600">{vendor.id}</td>
                <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{vendor.name}</td>
                <td className="px-6 py-4">{vendor.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vendors;