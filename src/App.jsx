import React, { useState, useMemo } from 'react';
import ReactFlow, { Background } from 'reactflow';
import 'reactflow/dist/style.css';
import { initialNodes, initialEdges } from './data/graphData';
import { generatePrimSteps } from './utils/primEngine';

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = useMemo(() => generatePrimSteps(initialNodes, initialEdges), []);
  const activeStep = steps[currentStep];

  const nodes = useMemo(() => {
    return initialNodes.map((node) => {
      const isVisited = activeStep.visited.includes(node.id);
      return {
        ...node,
        draggable: false,
        selectable: false,
        data: {
          label: (
            <div className={`w-12 h-12 flex items-center justify-center rounded-full border-2 text-base font-black transition-all duration-300 ${
              isVisited 
                ? 'bg-emerald-500 border-emerald-600 text-white shadow-md scale-105' 
                : 'bg-white border-slate-300 text-slate-700 shadow-sm'
            }`}>
              {node.data.label}
            </div>
          ),
        },
        style: { background: 'none', border: 'none', padding: 0, width: 'auto' }
      };
    });
  }, [activeStep]);

  const edges = useMemo(() => {
    return initialEdges.map((edge) => {
      const isMst = activeStep.mstEdges.includes(edge.id);
      const isTraveling = activeStep.travelingEdge === edge.id;
      
      let strokeColor = '#cbd5e1';
      let width = 2;
      let isAnimated = false;

      if (isMst) {
        strokeColor = '#10b981';
        width = 4;
      } else if (isTraveling) {
        strokeColor = '#3b82f6';
        width = 4;
        isAnimated = true;
      }

      return {
        ...edge,
        animated: isAnimated,
        style: {
          stroke: strokeColor,
          strokeWidth: width,
          transition: 'stroke 0.2s, stroke-width 0.2s',
        },
        labelStyle: { 
          fill: isMst ? '#047857' : isTraveling ? '#1d4ed8' : '#64748b', 
          fontWeight: '900',
          fontSize: '14px'
        },
        labelBgStyle: { fill: '#f8fafc', fillOpacity: 0.9 },
      };
    });
  }, [activeStep]);

  const totalWeight = useMemo(() => {
    return initialEdges
      .filter((edge) => activeStep.mstEdges.includes(edge.id))
      .reduce((sum, edge) => sum + edge.weight, 0);
  }, [activeStep]);

  const progressPercentage = useMemo(() => {
    return (currentStep / (steps.length - 1)) * 100;
  }, [currentStep, steps.length]);

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased">
      <header className="p-4 border-b border-slate-200 bg-white shadow-sm flex justify-between items-center shrink-0">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Prim's Algorithm Interactive</h1>
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Concept Module</span>
        </div>
        <div className="text-sm font-bold bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
          MST Total Cost: <span className="text-emerald-600 font-mono text-base ml-1">{totalWeight}</span>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        <div className="flex-1 h-full relative bg-slate-50">
          <ReactFlow nodes={nodes} edges={edges} fitView>
            <Background color="#cbd5e1" gap={24} size={1} />
          </ReactFlow>
          
          <div className="absolute top-4 left-4 bg-white/90 border border-slate-200 p-4 rounded-xl flex flex-col gap-2.5 text-xs z-10 shadow-md backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-white border-2 border-slate-300" />
              <span className="text-slate-600 font-medium">Unvisited Target</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500 border border-blue-600 animate-pulse" />
              <span className="text-blue-600 font-semibold">Active Path Search</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-600" />
              <span className="text-emerald-600 font-semibold">Confirmed Tree Edge</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-96 p-6 bg-white border-t md:border-t-0 md:border-l border-slate-200 flex flex-col justify-between gap-6 shrink-0 shadow-xl">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xs font-bold tracking-wider text-slate-400 uppercase">Lesson Progress</h2>
              <span className="text-xs font-bold font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                Step {currentStep} / {steps.length - 1}
              </span>
            </div>
            
            <div className="w-full h-2 bg-slate-100 border border-slate-200/60 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-300" 
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-sm leading-relaxed font-medium text-slate-700 min-h-[140px] shadow-inner mt-2">
              {activeStep.explanation}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
                className="py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 disabled:opacity-30 shadow-sm transition-all active:scale-[0.99]"
              >
                Previous Step
              </button>
              
              <button
                onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
                disabled={currentStep === steps.length - 1}
                className="py-3 rounded-xl bg-blue-600 border border-blue-700 text-white font-bold hover:bg-blue-500 disabled:opacity-30 shadow-md transition-all active:scale-[0.99]"
              >
                Next Step
              </button>
            </div>

            <button
              onClick={() => setCurrentStep(0)}
              className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-400 font-semibold text-xs transition"
            >
              Reset Simulation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
