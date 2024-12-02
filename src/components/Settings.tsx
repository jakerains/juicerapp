import React from 'react';
import { Key, Save, Download, Upload, Server } from 'lucide-react';
import { useTranscriptionStore } from '../store/transcriptionStore';
import { TranscriptionSettings } from './TranscriptionSettings';

export function Settings() {
  const { exportData, importData, resetData } = useTranscriptionStore();

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          importData(data);
        } catch (err) {
          console.error('Failed to import data:', err);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-white/10 backdrop-blur-md rounded-[20px] p-6 border border-white/20">
        <h2 className="text-xl font-semibold text-white mb-6">API Configuration</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Hugging Face API Key
            </label>
            <div className="flex gap-2">
              <input
                type="password"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-[#A2AD1E]"
                placeholder="Enter your API key"
              />
              <button className="px-4 py-2 bg-[#A2AD1E] text-white rounded-lg hover:bg-[#F96C57] transition-colors">
                <Key className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-[20px] p-6 border border-white/20">
        <h2 className="text-xl font-semibold text-white mb-6">Model Configuration</h2>
        <TranscriptionSettings />
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-[20px] p-6 border border-white/20">
        <h2 className="text-xl font-semibold text-white mb-6">Dashboard Management</h2>
        <div className="space-y-6">
          <button
            onClick={exportData}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#A2AD1E]/10 backdrop-blur-sm text-white border border-[#A2AD1E]/20 rounded-lg hover:bg-[#A2AD1E]/20 transition-colors"
          >
            <Download className="w-5 h-5" />
            Export Dashboard Data
          </button>
          
          <label className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#F96C57]/10 backdrop-blur-sm text-white border border-[#F96C57]/20 rounded-lg hover:bg-[#F96C57]/20 transition-colors cursor-pointer">
            <Upload className="w-5 h-5" />
            Import Dashboard Data
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
          
          <button
            onClick={resetData}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-sm text-white/70 border border-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            Reset Dashboard Data
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-3 bg-[#A2AD1E] text-white rounded-lg hover:bg-[#F96C57] transition-colors flex items-center gap-2">
          <Save className="w-5 h-5" />
          Save Settings
        </button>
      </div>
    </div>
  );
}