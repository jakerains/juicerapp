import React from 'react';
import { HelpCircle, FileQuestion, Keyboard, Zap } from 'lucide-react';

export function Help() {
  const faqs = [
    {
      question: 'What audio formats are supported?',
      answer: 'WhisperZiest supports MP3, WAV, M4A, and OGG audio formats.',
    },
    {
      question: 'How accurate is the transcription?',
      answer: 'Our transcription service uses state-of-the-art Whisper model, providing high accuracy for clear audio recordings.',
    },
    {
      question: 'Is there a file size limit?',
      answer: 'Yes, the maximum file size is 25MB. For larger files, consider splitting them into smaller segments.',
    },
  ];

  const shortcuts = [
    { key: '⌘ + V', action: 'Paste audio file' },
    { key: '⌘ + E', action: 'Export transcription' },
    { key: '⌘ + S', action: 'Save settings' },
  ];

  return (
    <div className="max-w-4xl space-y-8">
      <div className="bg-white/10 backdrop-blur-md rounded-[20px] p-6 border border-white/20">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-[#A2AD1E]/20 rounded-full">
            <FileQuestion className="w-6 h-6 text-[#A2AD1E]" />
          </div>
          <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-[#F96C57]" />
                <h3 className="text-white font-medium">{faq.question}</h3>
              </div>
              <p className="mt-2 text-white/70 ml-8">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-[20px] p-6 border border-white/20">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-[#F98128]/20 rounded-full">
            <Keyboard className="w-6 h-6 text-[#F98128]" />
          </div>
          <h2 className="text-xl font-semibold text-white">Keyboard Shortcuts</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
            >
              <span className="text-white/70">{shortcut.action}</span>
              <kbd className="px-3 py-1 bg-white/10 rounded-lg text-white font-mono text-sm">
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-[20px] p-6 border border-white/20">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-[#F96C57]/20 rounded-full">
            <Zap className="w-6 h-6 text-[#F96C57]" />
          </div>
          <h2 className="text-xl font-semibold text-white">Quick Tips</h2>
        </div>

        <ul className="space-y-3 text-white/70">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#A2AD1E] rounded-full" />
            Use high-quality audio recordings for better transcription results
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#F96C57] rounded-full" />
            Export in multiple formats to suit your needs
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#F98128] rounded-full" />
            Check the transcription history for previous conversions
          </li>
        </ul>
      </div>
    </div>
  );
}