import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '/Animation - 1733141028806.json';

interface TranscriptionProgressProps {
  progress: number;
}

export function TranscriptionProgress({ progress }: TranscriptionProgressProps) {
  return (
    <div className="w-full space-y-8">
      <div className="flex justify-center">
        <div className="w-64 h-64">
          <Player
            src={animationData}
            loop
            autoplay
            style={{ width: '100%', height: '100%' }}
            background="transparent"
            rendererSettings={{
              preserveAspectRatio: 'xMidYMid slice',
              clearCanvas: true,
            }}
          />
        </div>
      </div>
      
      <div className="w-full max-w-xl mx-auto">
        <div className="h-2 bg-white/10 backdrop-blur-sm rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#E1C94B] via-[#F98128] to-[#A2AD1E] transition-all duration-300 animate-pulse"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center mt-4 text-lg text-white/80">
          {progress < 100 
            ? `Transcribing your audio... ${progress}%`
            : 'Processing complete! Preparing results...'}
        </p>
      </div>
    </div>
  );
}