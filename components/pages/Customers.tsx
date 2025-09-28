import React from 'react';
import Header from '../layout/Header';
import { useData } from '../../hooks/useData';
import Button from '../ui/Button';

const Customers: React.FC = () => {
  const { customers } = useData();

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-slate-100 min-h-full">
      <Header title="Customers">
        <Button onClick={() => alert('Customer creation form not implemented.')}>Add Customer</Button>
      </Header>
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm text-left text-slate-500">
          <thead className="text-xs text-slate-700 uppercase bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3">Customer ID</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Email</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="bg-white border-b hover:bg-slate-50">
                <td className="px-6 py-4 font-mono text-xs text-slate-600">{customer.id}</td>
                <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{customer.name}</td>
                <td className="px-6 py-4">{customer.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;