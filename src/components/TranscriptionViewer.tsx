import React from 'react';
import { Copy } from 'lucide-react';

interface TranscriptionViewerProps {
  transcription: string;
  timestamps: Array<{ time: number; text: string }>;
}

export function TranscriptionViewer({ transcription, timestamps }: TranscriptionViewerProps) {
  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(transcription);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="w-full max-w-3xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md rounded-[20px] border border-white/20 shadow-lg p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Transcription Result</h2>
        <button
          onClick={handleCopyToClipboard}
          className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-white/10 backdrop-blur-sm rounded-[12px] border border-white/20 hover:bg-white/20 transition-all duration-300"
        >
          <Copy className="w-4 h-4" />
          Copy
        </button>
      </div>
      
      <div className="h-[400px] overflow-y-auto rounded-[16px] bg-black/5 backdrop-blur-sm p-6 border border-white/10">
        {timestamps.map((item, index) => (
          <div key={index} className="mb-4">
            <span className="text-xs font-medium text-white/60">
              {new Date(item.time * 1000).toISOString().substr(11, 8)}
            </span>
            <p className="mt-1 text-white/90">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}