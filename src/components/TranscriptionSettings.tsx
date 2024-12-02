import React from 'react';
import { Volume2, Globe, Cpu, Server, Download, Info, Languages } from 'lucide-react';
import { Select } from './ui/Select';
import { useModelStore } from '../store/modelStore';

export function TranscriptionSettings() {
  const {
    modelType,
    setModelType,
    downloadProgress,
    downloadModel,
    selectedModel,
    setSelectedModel,
    availableModels
  } = useModelStore();

  return (
    <div className="space-y-6 bg-white/10 backdrop-blur-md rounded-[20px] p-6 border border-white/20">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-[#A2AD1E]/20 rounded-full">
            <Cpu className="w-5 h-5 text-[#A2AD1E]" />
          </div>
          <h3 className="text-lg font-semibold text-white">Model Configuration</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2 flex items-center gap-2">
              Processing Location
              <div className="group relative">
                <Info className="w-4 h-4 text-white/50" />
                <div className="absolute left-full ml-2 w-64 p-2 bg-black/80 backdrop-blur-md rounded-lg text-xs text-white/90 invisible group-hover:visible z-50">
                  Cloud API requires an API key but is faster. Local processing works offline but requires downloading the model.
                </div>
              </div>
            </label>
            <Select
              icon={<Server className="w-5 h-5" />}
              options={[
                { value: 'api', label: 'Cloud API (Requires Key)' },
                { value: 'local', label: 'Local Model' }
              ]}
              value={modelType}
              onChange={setModelType}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Whisper Model
            </label>
            <Select
              icon={<Cpu className="w-5 h-5" />}
              options={availableModels
                .filter(model => modelType === 'api' || model.parameters !== '1550M')
                .map(model => ({
                  value: model.id,
                  label: `${model.name} (${model.parameters} params, ${model.size})`
                }))}
              value={selectedModel}
              onChange={setSelectedModel}
            />
            <p className="mt-2 text-sm text-white/70 flex items-center gap-2">
              <span className={availableModels.find(m => m.id === selectedModel)?.isEnglishOnly ? 'text-[#A2AD1E]' : 'text-[#F98128]'}>●</span>
              {availableModels.find(m => m.id === selectedModel)?.isEnglishOnly
                ? 'Optimized for English transcription'
                : 'Full multilingual support'}
            </p>
          </div>
          
          {modelType === 'local' && (
            <div>
              <button
                onClick={downloadModel}
                disabled={downloadProgress > 0}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#A2AD1E] to-[#F98128] text-white rounded-lg hover:from-[#F96C57] hover:to-[#F98128] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                <Download className="w-5 h-5" />
                {downloadProgress > 0 ? `Downloading... ${downloadProgress}%` : 'Download Model'}
              </button>
              <p className="mt-2 text-sm text-white/70 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Downloads and runs the model locally for offline use
              </p>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-[#F96C57]/20 rounded-full">
            <Languages className="w-5 h-5 text-[#F96C57]" />
          </div>
          <h3 className="text-lg font-semibold text-white">Language Settings</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Primary Language
            </label>
            <Select
              icon={<Globe className="w-5 h-5" />}
              options={[
                { value: 'en', label: 'English' },
                { value: 'es', label: 'Spanish' },
                { value: 'fr', label: 'French' },
                { value: 'de', label: 'German' },
                { value: 'auto', label: 'Auto Detect' }
              ]}
              value="auto"
              onChange={() => {}}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Processing Quality
            </label>
            <Select
              icon={<Volume2 className="w-5 h-5" />}
              options={[
                { value: 'high', label: 'High Quality (Slower)' },
                { value: 'balanced', label: 'Balanced' },
                { value: 'fast', label: 'Fast (Lower Quality)' }
              ]}
              value="balanced"
              onChange={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}