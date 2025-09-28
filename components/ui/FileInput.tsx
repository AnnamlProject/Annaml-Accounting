import React, { useState, useRef } from 'react';

interface FileInputProps {
  label?: string;
  id: string;
  onChange?: (file: File | null) => void;
  accept?: string;
}

const FileInput: React.FC<FileInputProps> = ({ label, id, onChange, accept }) => {
  const [fileName, setFileName] = useState('Tidak ada file yang dipilih');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('Tidak ada file yang dipilih');
    }
    if (onChange) {
      onChange(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>}
      <div className="mt-1 flex rounded-md shadow-sm">
        <div className="relative flex items-stretch flex-grow focus-within:z-10">
          <button
            type="button"
            onClick={handleClick}
            className="relative -ml-px inline-flex items-center space-x-2 rounded-l-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            Pilih File
          </button>
          <div className="block w-full rounded-none rounded-r-md border-l-0 border border-gray-300 py-2 px-3 sm:text-sm text-gray-500 truncate">
            {fileName}
          </div>
        </div>
        <input
          ref={fileInputRef}
          id={id}
          name={id}
          type="file"
          className="sr-only"
          onChange={handleFileChange}
          accept={accept}
        />
      </div>
    </div>
  );
};

export default FileInput;
