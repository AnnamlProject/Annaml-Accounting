import React, { useState } from 'react';
import Header from '../../layout/Header';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import ColorInput from '../../ui/ColorInput';
import FileInput from '../../ui/FileInput';
import { LogoIcon } from '../../icons/Icons';

const CompanySettings: React.FC = () => {
  const [websiteTitle, setWebsiteTitle] = useState('RCA - PESONA');
  const [themeColor, setThemeColor] = useState('#EBCB90');
  const [secondaryColor, setSecondaryColor] = useState('#57564F');
  const [footerText, setFooterText] = useState('');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [backgroundPreview, setBackgroundPreview] = useState<string>('https://images.unsplash.com/photo-1542337839-514752538418?q=80&w=2070&auto=format&fit=crop');

  const handleLogoChange = (file: File | null) => {
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleBackgroundChange = (file: File | null) => {
    if (file) {
      setBackgroundPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    const settings = { websiteTitle, themeColor, secondaryColor, footerText, logo: logoPreview, background: backgroundPreview };
    console.log('Saving settings:', settings);
    alert('Settings saved!');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <Header title="Website Settings" />
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <Input 
            label="Judul Website" 
            value={websiteTitle} 
            onChange={(e) => setWebsiteTitle(e.target.value)} 
          />
          <ColorInput 
            label="Warna Tema" 
            value={themeColor} 
            onChange={setThemeColor} 
          />
          <ColorInput 
            label="Warna Secondary" 
            value={secondaryColor} 
            onChange={setSecondaryColor} 
          />
          <Input 
            label="Teks Footer" 
            value={footerText} 
            onChange={(e) => setFooterText(e.target.value)} 
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
            <div className="h-16 w-16 flex items-center justify-center border p-1 rounded-md mb-2 bg-slate-50">
              {logoPreview ? (
                <img src={logoPreview} alt="Logo preview" className="h-full w-full object-contain" />
              ) : (
                <LogoIcon className="h-12 w-12 text-slate-400"/>
              )}
            </div>
            <FileInput 
              id="logo-upload" 
              onChange={handleLogoChange}
              accept="image/*"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Background Website</label>
            {backgroundPreview && (
               <img src={backgroundPreview} alt="Background preview" className="h-24 w-auto object-cover border p-1 rounded-md mb-2" />
            )}
            <FileInput 
              id="background-upload" 
              onChange={handleBackgroundChange}
              accept="image/*"
            />
          </div>

          <div className="pt-4 flex justify-start gap-3">
            <Button type="submit">Save Changes</Button>
            <Button type="button" variant="secondary">Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySettings;
