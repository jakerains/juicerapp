import React, { useState, useEffect } from 'react';
import { Clock, FileAudio, CheckCircle } from 'lucide-react';
import { useTranscriptionStore } from '../store/transcriptionStore';
import { formatDuration } from '../utils/formatters';
import { Stats } from '../types';

export function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalTranscriptions: 0,
    totalDuration: 0,
    completedToday: 0
  });
  const transcriptions = useTranscriptionStore((state) => state.transcriptions);
  const getStats = useTranscriptionStore((state) => state.getStats);

  useEffect(() => {
    const loadStats = async () => {
      const newStats = await getStats();
      setStats(newStats);
    };
    loadStats();
  }, [getStats, transcriptions]);

  // Get the 5 most recent transcriptions
  const recentTranscriptions = transcriptions
    .slice(0, 5)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-md rounded-[20px] p-6 border border-white/20">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-[#A2AD1E]/20 rounded-full">
              <FileAudio className="w-6 h-6 text-[#A2AD1E]" />
            </div>
            <h3 className="text-lg font-medium text-white">Total Transcriptions</h3>
          </div>
          <p className="text-3xl font-bold text-white">{stats.totalTranscriptions}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-[20px] p-6 border border-white/20">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-[#F96C57]/20 rounded-full">
              <Clock className="w-6 h-6 text-[#F96C57]" />
            </div>
            <h3 className="text-lg font-medium text-white">Total Duration</h3>
          </div>
          <p className="text-3xl font-bold text-white">{formatDuration(stats.totalDuration)}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-[20px] p-6 border border-white/20">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-[#F98128]/20 rounded-full">
              <CheckCircle className="w-6 h-6 text-[#F98128]" />
            </div>
            <h3 className="text-lg font-medium text-white">Completed Today</h3>
          </div>
          <p className="text-3xl font-bold text-white">{stats.completedToday}</p>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-[20px] p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {recentTranscriptions.map((transcription) => (
            <div
              key={transcription.id}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <FileAudio className="w-5 h-5 text-white/70" />
                <div>
                  <p className="text-white font-medium">{transcription.filename}</p>
                  <p className="text-sm text-white/70">
                    {(transcription.size / (1024 * 1024)).toFixed(1)}MB • {formatDuration(transcription.duration)}
                  </p>
                </div>
              </div>
              <span className="text-sm text-white/70">
                {formatDuration((Date.now() - transcription.date.getTime()) / 60000)} ago
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}