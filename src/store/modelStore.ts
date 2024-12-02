import { create } from 'zustand';

interface WhisperModel {
  id: string;
  name: string;
  size: string;
  parameters: string;
  isEnglishOnly: boolean;
}

interface ModelStore {
  modelType: 'api' | 'local';
  selectedModel: string;
  setModelType: (type: 'api' | 'local') => void;
  setSelectedModel: (modelId: string) => void;
  downloadProgress: number;
  downloadModel: () => Promise<void>;
  isDownloading: boolean;
  isModelReady: boolean;
  availableModels: WhisperModel[];
}

const whisperModels: WhisperModel[] = [
  {
    id: 'openai/whisper-tiny.en',
    name: 'Tiny (English)',
    size: '39 MB',
    parameters: '39M',
    isEnglishOnly: true
  },
  {
    id: 'openai/whisper-tiny',
    name: 'Tiny (Multilingual)',
    size: '39 MB',
    parameters: '39M',
    isEnglishOnly: false
  },
  {
    id: 'openai/whisper-base.en',
    name: 'Base (English)',
    size: '74 MB',
    parameters: '74M',
    isEnglishOnly: true
  },
  {
    id: 'openai/whisper-base',
    name: 'Base (Multilingual)',
    size: '74 MB',
    parameters: '74M',
    isEnglishOnly: false
  },
  {
    id: 'openai/whisper-small.en',
    name: 'Small (English)',
    size: '244 MB',
    parameters: '244M',
    isEnglishOnly: true
  },
  {
    id: 'openai/whisper-small',
    name: 'Small (Multilingual)',
    size: '244 MB',
    parameters: '244M',
    isEnglishOnly: false
  },
  {
    id: 'openai/whisper-medium.en',
    name: 'Medium (English)',
    size: '769 MB',
    parameters: '769M',
    isEnglishOnly: true
  },
  {
    id: 'openai/whisper-medium',
    name: 'Medium (Multilingual)',
    size: '769 MB',
    parameters: '769M',
    isEnglishOnly: false
  },
  {
    id: 'openai/whisper-large-v3-turbo',
    name: 'Large V3 Turbo',
    size: '809 MB',
    parameters: '809M',
    isEnglishOnly: false
  },
  {
    id: 'openai/whisper-large',
    name: 'Large',
    size: '1.5 GB',
    parameters: '1550M',
    isEnglishOnly: false
  },
  {
    id: 'openai/whisper-large-v2',
    name: 'Large V2',
    size: '1.5 GB',
    parameters: '1550M',
    isEnglishOnly: false
  },
  {
    id: 'openai/whisper-large-v3',
    name: 'Large V3',
    size: '1.5 GB',
    parameters: '1550M',
    isEnglishOnly: false
  }
];

export const useModelStore = create<ModelStore>((set, get) => ({
  modelType: 'api',
  selectedModel: 'openai/whisper-large-v3-turbo',
  downloadProgress: 0,
  isDownloading: false,
  isModelReady: false,
  availableModels: whisperModels,
  
  setModelType: (type) => set({ modelType: type }),
  setSelectedModel: (modelId) => set({ selectedModel: modelId }),
  
  downloadModel: async () => {
    set({ isDownloading: true });
    
    try {
      const { selectedModel } = get();
      const model = whisperModels.find(m => m.id === selectedModel);
      
      // Simulate download progress
      for (let i = 0; i <= 100; i += 5) {
        await new Promise(resolve => setTimeout(resolve, 500));
        set({ downloadProgress: i });
      }
      
      set({ isModelReady: true });
    } catch (error) {
      console.error('Failed to download model:', error);
      throw new Error('Failed to download model');
    } finally {
      set({ isDownloading: false, downloadProgress: 0 });
    }
  }
}));