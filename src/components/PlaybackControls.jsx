import React from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PlaybackControls({ currentStep, totalSteps, isPlaying, setIsPlaying, setStep, playbackSpeed, setPlaybackSpeed }) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-slate-200 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button onClick={() => setStep(0)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors">
            <RotateCcw size={18} />
          </button>
          <button onClick={() => setStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0} className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-30 text-slate-600 transition-colors">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => setIsPlaying(!isPlaying)} className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-colors w-10 flex justify-center">
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button onClick={() => setStep(Math.min(totalSteps, currentStep + 1))} disabled={currentStep === totalSteps} className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-30 text-slate-600 transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>
        
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span>Speed:</span>
          <select 
            value={playbackSpeed} 
            onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
            className="bg-slate-100 border border-slate-200 rounded px-2 py-1 outline-none focus:ring-2 ring-blue-500"
          >
            <option value={1500}>Slow</option>
            <option value={800}>Normal</option>
            <option value={300}>Fast</option>
          </select>
        </div>
      </div>
    </div>
  );
}
