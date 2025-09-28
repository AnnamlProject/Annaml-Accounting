import React from 'react';
import Header from '../../layout/Header';

const PurchaseRequests: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Header title="Purchase Requests" />
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <p className="text-center text-slate-500">
          This page is under construction. Functionality for Purchase Requests will be available soon.
        </p>
      </div>
    </div>
  );
};

export default PurchaseRequests;
