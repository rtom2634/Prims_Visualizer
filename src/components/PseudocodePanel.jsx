import React from 'react';
import { pseudocode } from '../utils/primEngine';
import { motion } from 'framer-motion';

export default function PseudocodePanel({ activeLine }) {
  return (
    <div className="bg-slate-900 rounded-xl p-4 shadow-lg border border-slate-800">
      <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-3">Algorithm Execution</h3>
      <div className="font-mono text-xs flex flex-col gap-1.5">
        {pseudocode.map((code) => {
          const isActive = activeLine === code.line;
          return (
            <motion.div 
              key={code.line}
              animate={{
                backgroundColor: isActive ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                color: isActive ? '#60a5fa' : '#64748b',
                scale: isActive ? 1.02 : 1,
                paddingLeft: isActive ? '12px' : '4px'
              }}
              className="py-1 rounded-md transition-colors"
            >
              <span className="opacity-50 mr-2">{code.line}.</span>
              {code.text}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
