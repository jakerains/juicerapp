import React from 'react';
import { FileAudio, Download, Trash2 } from 'lucide-react';
import { useTranscriptionStore } from '../store/transcriptionStore';
import { formatDuration } from '../utils/formatters';

export function History() {
  const transcriptions = useTranscriptionStore((state) => state.transcriptions);
  const removeTranscription = useTranscriptionStore((state) => state.removeTranscription);

  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-md rounded-[20px] p-6 border border-white/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Transcription History</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-colors">
              Filter
            </button>
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-colors">
              Sort
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {transcriptions.map((record) => (
            <div
              key={record.id}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-[#A2AD1E]/20 rounded-full">
                  <FileAudio className="w-5 h-5 text-[#A2AD1E]" />
                </div>
                <div>
                  <p className="text-white font-medium">{record.filename}</p>
                  <p className="text-sm text-white/70"> 
                    {(record.size / (1024 * 1024)).toFixed(1)}MB • {formatDuration(record.duration)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-white/70">
                  {new Date(record.date).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <Download className="w-5 h-5 text-white/70" />
                  </button>
                  <button
                    onClick={() => removeTranscription(record.id)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-white/70" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}