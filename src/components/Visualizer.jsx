import React, { useState, useMemo, useEffect } from 'react';
import ReactFlow, { Background } from 'reactflow';
import { motion, AnimatePresence } from 'framer-motion';
import 'reactflow/dist/style.css';
import { generatePrimSteps } from '../utils/primEngine';
import PseudocodePanel from './PseudocodePanel';
import PlaybackControls from './PlaybackControls';
import { Info, ArrowLeft, Maximize2, Minimize2, FastForward } from 'lucide-react';

export default function Visualizer({ problem, onBack }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(800);
  const [isPanelExpanded, setIsPanelExpanded] = useState(false); // NEW STATE
  
  const steps = useMemo(() => generatePrimSteps(problem.nodes, problem.edges), [problem]);
  const activeState = steps[currentStep];

  useEffect(() => {
    let timer;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setInterval(() => setCurrentStep(prev => prev + 1), playbackSpeed);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentStep, steps.length, playbackSpeed]);

  const nodes = useMemo(() => {
    return problem.nodes.map((node) => {
      const isVisited = activeState.visited.includes(node.id);
      return {
        ...node, draggable: false, selectable: false,
        data: {
          label: (
            <div className={`w-12 h-12 flex items-center justify-center rounded-full border-2 text-base font-black transition-all duration-500 relative group ${
              isVisited ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-[0_0_15px_rgba(16,185,129,0.4)] scale-110 z-20' : 'bg-white border-slate-300 text-slate-500 shadow-sm z-10'
            }`}>
              {node.data.label}
            </div>
          ),
        },
        style: { background: 'none', border: 'none', padding: 0 }
      };
    });
  }, [activeState, problem.nodes]);

  const edges = useMemo(() => {
    return problem.edges.map((edge) => {
      const isMst = activeState.mstEdges.includes(edge.id);
      const isRejected = activeState.rejectedEdges.includes(edge.id);
      const isCandidate = activeState.candidates.includes(edge.id);
      const isActive = activeState.activeEdge === edge.id;
      
      let strokeColor = '#e2e8f0'; let strokeWidth = 2; let isAnimated = false; let edgeClass = '';
      let labelBg = '#f8fafc'; let labelColor = '#94a3b8';

      if (isMst) { strokeColor = '#10b981'; strokeWidth = 5; labelBg = '#d1fae5'; labelColor = '#047857'; } 
      else if (isActive) { strokeColor = '#3b82f6'; strokeWidth = 4; isAnimated = true; edgeClass = 'edge-scanning'; labelBg = '#dbeafe'; labelColor = '#1d4ed8'; } 
      else if (isCandidate) { strokeColor = '#93c5fd'; strokeWidth = 3; isAnimated = true; edgeClass = 'edge-candidate'; labelColor = '#3b82f6'; } 
      else if (isRejected) { strokeColor = '#ef4444'; strokeWidth = 2; edgeClass = 'opacity-30 border-dashed'; labelColor = '#ef4444'; }

      return {
        ...edge, animated: isAnimated, className: edgeClass,
        style: { stroke: strokeColor, strokeWidth, transition: 'all 0.4s ease' },
        labelStyle: { fill: labelColor, fontWeight: '800', fontSize: '13px' },
        labelBgStyle: { fill: labelBg, fillOpacity: 0.9, rx: 6, ry: 6 },
      };
    });
  }, [activeState, problem.edges]);

  const totalCost = problem.edges.filter(e => activeState.mstEdges.includes(e.id)).reduce((sum, e) => sum + e.weight, 0);

  return (
    <div className="h-screen w-screen flex overflow-hidden bg-[#f8fafc] text-slate-800 font-sans">
      
      {/* Canvas */}
      <div className="flex-1 relative">
        <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-10 pointer-events-none">
          <div className="flex flex-col gap-3 pointer-events-auto">
            <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold text-sm bg-white/80 px-4 py-2 rounded-xl border border-slate-200 shadow-sm backdrop-blur-md transition-all">
              <ArrowLeft size={16} /> Back to Modules
            </button>
            <div className="bg-white/80 backdrop-blur-md px-6 py-4 rounded-2xl shadow-sm border border-slate-200">
              <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600">{problem.title}</h1>
            </div>
          </div>
          
          <div className="bg-emerald-50 backdrop-blur-md px-6 py-4 rounded-2xl shadow-sm border border-emerald-100 flex flex-col items-end pointer-events-auto">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Current MST Cost</span>
            <span className="text-3xl font-black font-mono text-emerald-600">{totalCost}</span>
          </div>
        </header>

        <ReactFlow nodes={nodes} edges={edges} fitView className="bg-slate-50">
          <Background color="#cbd5e1" gap={24} size={2} />
        </ReactFlow>

        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md border border-slate-200 p-4 rounded-2xl shadow-lg flex flex-col gap-3 text-xs font-semibold text-slate-600 pointer-events-auto">
          <div className="flex items-center gap-3"><div className="w-4 h-4 rounded-full bg-emerald-500 shadow-md"></div> MST Edge / Visited</div>
          <div className="flex items-center gap-3"><div className="w-4 h-4 rounded-full bg-blue-400 animate-pulse"></div> Minimum Candidate</div>
          <div className="flex items-center gap-3"><div className="w-4 h-1 border-b-2 border-dashed border-blue-300"></div> Valid Candidates</div>
          <div className="flex items-center gap-3"><div className="w-4 h-1 bg-red-400 opacity-40"></div> Rejected Cycle</div>
        </div>
      </div>

      {/* Expandable Sidebar */}
      <motion.div 
        animate={{ width: isPanelExpanded ? '50%' : '420px' }}
        transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
        className="bg-white border-l border-slate-200 shadow-2xl z-20 flex flex-col overflow-hidden shrink-0 relative"
      >
        {/* Panel Header */}
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <span className="font-bold text-slate-600 text-sm">Lesson Dashboard</span>
          <button 
            onClick={() => setIsPanelExpanded(!isPanelExpanded)} 
            className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-600 flex items-center gap-2 text-xs font-bold transition-colors"
          >
            {isPanelExpanded ? <><Minimize2 size={14}/> Collapse</> : <><Maximize2 size={14}/> Read Theory</>}
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6 overflow-y-auto">
          <PlaybackControls 
            currentStep={currentStep} totalSteps={steps.length - 1}
            isPlaying={isPlaying} setIsPlaying={setIsPlaying}
            setStep={setCurrentStep}
            playbackSpeed={playbackSpeed} setPlaybackSpeed={setPlaybackSpeed}
          />

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-400">
              <span>Progress (Step {currentStep} / {steps.length - 1})</span>
              <button 
                onClick={() => setCurrentStep(steps.length - 1)}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <FastForward size={14} /> Skip to Final Tree
              </button>
            </div>
            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"
                animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100 flex flex-col gap-3 relative">
            <Info className="absolute top-4 right-4 text-blue-300" size={20} />
            <h2 className="text-sm font-extrabold text-blue-900">Algorithm Reasoning</h2>
            <div className={`text-sm text-blue-800 leading-relaxed font-medium ${isPanelExpanded ? 'text-base' : ''} whitespace-pre-wrap`}>
              {activeState.explanation}
            </div>
            
            {activeState.logs.length > 0 && (
              <div className="mt-2 pt-3 border-t border-blue-200/50 flex flex-col gap-1.5">
                {activeState.logs.map((log, i) => (
                  <div key={i} className="text-[11px] font-mono text-blue-700 bg-blue-100/50 px-2 py-1 rounded">> {log}</div>
                ))}
              </div>
            )}
          </div>

          <PseudocodePanel activeLine={activeState.pseudoLine} />
        </div>
      </motion.div>
    </div>
  );
}
