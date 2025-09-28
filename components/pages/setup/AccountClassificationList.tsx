import React from 'react';
import { useData } from '../../../hooks/useData';
import Button from '../../ui/Button';
import { DocumentDuplicateIcon } from '../../icons/Icons';

const AccountClassificationList: React.FC = () => {
  const { accountClassifications } = useData();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="bg-white p-4 rounded-t-lg border border-slate-200 flex items-center">
        <Button variant="secondary" className="flex items-center">
          <DocumentDuplicateIcon className="w-4 h-4 mr-2" />
          File
        </Button>
      </div>
      <div className="bg-white rounded-b-lg shadow-sm border border-t-0 border-slate-200">
        {accountClassifications.length === 0 ? (
          <div className="text-center text-slate-500 py-16">
            Tidak ada data yang ditemukan.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-800 uppercase bg-slate-50">
                <tr>
                  <th className="px-6 py-3">NO</th>
                  <th className="px-6 py-3">DESCRIPTION</th>
                  <th className="px-6 py-3">TYPE</th>
                  <th className="px-6 py-3">ACCOUNT CLASS</th>
                </tr>
              </thead>
              <tbody>
                {accountClassifications.map((item, index) => (
                  <tr key={item.id} className="border-b hover:bg-slate-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.group}</td>
                    <td className="px-6 py-4">{item.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountClassificationList;
