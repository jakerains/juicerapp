import React from 'react';
import { FileText, FileVideo, FileSpreadsheet, FileDown } from 'lucide-react';

interface ExportOptionsProps {
  onExport: (format: 'txt' | 'srt' | 'docx' | 'pdf') => void;
  disabled: boolean;
}

export function ExportOptions({ onExport, disabled }: ExportOptionsProps) {
  return (
    <div className="flex gap-3 bg-white/10 backdrop-blur-md rounded-[16px] p-2">
      <button
        onClick={() => onExport('txt')}
        disabled={disabled}
        className={`flex items-center gap-2 px-6 py-3 rounded-[12px] ${
          disabled 
            ? 'bg-white/5 text-white/40 backdrop-blur-sm cursor-not-allowed border border-white/10'
            : 'bg-[#A2AD1E] text-white hover:bg-[#F96C57] shadow-lg hover:shadow-xl transition-all duration-300'
        }`}
      >
        <FileText className="w-4 h-4" />
        Export TXT
      </button>
      
      <button
        onClick={() => onExport('srt')}
        disabled={disabled}
        className={`flex items-center gap-2 px-6 py-3 rounded-[12px] ${
          disabled 
            ? 'bg-white/5 text-white/40 backdrop-blur-sm cursor-not-allowed border border-white/10'
            : 'bg-[#F98128]/10 backdrop-blur-sm text-white border border-[#F98128]/20 hover:bg-[#F98128]/20 shadow-lg hover:shadow-xl transition-all duration-300'
        }
        `}
      >
        <FileVideo className="w-4 h-4" />
        Export SRT
      </button>
      
      <button
        onClick={() => onExport('docx')}
        disabled={disabled}
        className={`flex items-center gap-2 px-6 py-3 rounded-[12px] ${
          disabled 
            ? 'bg-white/5 text-white/40 backdrop-blur-sm cursor-not-allowed border border-white/10'
            : 'bg-[#F96C57]/10 backdrop-blur-sm text-white border border-[#F96C57]/20 hover:bg-[#F96C57]/20 shadow-lg hover:shadow-xl transition-all duration-300'
        }
        `}
      >
        <FileSpreadsheet className="w-4 h-4" />
        Export DOCX
      </button>
      
      <button
        onClick={() => onExport('pdf')}
        disabled={disabled}
        className={`flex items-center gap-2 px-6 py-3 rounded-[12px] ${
          disabled 
            ? 'bg-white/5 text-white/40 backdrop-blur-sm cursor-not-allowed border border-white/10'
            : 'bg-[#E1C94B]/10 backdrop-blur-sm text-white border border-[#E1C94B]/20 hover:bg-[#E1C94B]/20 shadow-lg hover:shadow-xl transition-all duration-300'
        }
        `}
      >
        <FileDown className="w-4 h-4" />
        Export PDF
      </button>
    </div>
  );
}