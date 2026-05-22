import React from 'react';
import { motion } from 'framer-motion';
import { graphProblems } from '../data/graphData';
import { Network, ArrowRight, Zap, Target, BookOpen } from 'lucide-react';

export default function LandingPage({ onSelectProblem, onSelectArticle }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-8 md:p-16 flex flex-col items-center">
      <div className="max-w-6xl w-full flex flex-col gap-16">
        
        <header className="flex flex-col gap-6 text-center items-center">
          <div className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase flex items-center gap-2">
            <Network size={16} /> Data Structures & Algorithms
          </div>
          <h1 className="text-5xl font-black tracking-tight text-slate-900">
            Prim's Algorithm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Mastery</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl leading-relaxed font-medium">
            Prim's algorithm is a greedy approach to finding a minimum spanning tree. It guarantees the cheapest possible way to connect every point in a network without creating any redundant loops.
          </p>
          
          {/* Interactive Theory Articles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-6 text-left">
            <div onClick={() => onSelectArticle('greedy')} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-amber-400 hover:shadow-md cursor-pointer transition-all group">
              <Zap className="text-amber-500 mb-3 group-hover:scale-110 transition-transform" size={28} />
              <h3 className="font-bold text-slate-900 mb-2 flex items-center justify-between">Greedy Approach <ArrowRight size={16} className="text-slate-300 group-hover:text-amber-500"/></h3>
              <p className="text-sm text-slate-600">Read why making short-sighted choices actually creates mathematically perfect graphs.</p>
            </div>
            <div onClick={() => onSelectArticle('cycles')} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-400 hover:shadow-md cursor-pointer transition-all group">
              <Target className="text-blue-500 mb-3 group-hover:scale-110 transition-transform" size={28} />
              <h3 className="font-bold text-slate-900 mb-2 flex items-center justify-between">Cycle Prevention <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-500"/></h3>
              <p className="text-sm text-slate-600">Understand the 'Visited Set' and why Trees fundamentally cannot contain loops.</p>
            </div>
            <div onClick={() => onSelectArticle('usecases')} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group">
              <BookOpen className="text-emerald-500 mb-3 group-hover:scale-110 transition-transform" size={28} />
              <h3 className="font-bold text-slate-900 mb-2 flex items-center justify-between">Real Use Cases <ArrowRight size={16} className="text-slate-300 group-hover:text-emerald-500"/></h3>
              <p className="text-sm text-slate-600">See how fiber optic mapping and circuit board wiring rely on this algorithm.</p>
            </div>
          </div>
        </header>

        <hr className="border-slate-200" />

        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h2 className="text-3xl font-black text-slate-900">Practice Sandbox</h2>
            <p className="text-slate-500 font-medium text-sm">Choose a problem set to step through the algorithm visually.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {graphProblems.map((problem) => (
              <motion.div 
                key={problem.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => onSelectProblem(problem)}
                className="bg-white border border-slate-200 hover:border-blue-500 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col gap-4 group h-full"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">{problem.title}</h3>
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 ml-2 ${
                    problem.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700' : problem.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {problem.difficulty}
                  </span>
                </div>
                <p className="text-sm text-slate-500 font-medium flex-1">{problem.description}</p>
                <div className="mt-4 flex items-center justify-between text-blue-600 font-bold text-xs pt-4 border-t border-slate-100 uppercase tracking-wide">
                  <span>{problem.nodes.length} Nodes • {problem.edges.length} Edges</span>
                  <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform bg-blue-50 px-3 py-1.5 rounded-lg">
                    Launch <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
