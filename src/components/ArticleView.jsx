import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Target, BookOpen } from 'lucide-react';
import { articlesData } from '../data/graphData';

const iconMap = { Zap: Zap, Target: Target, BookOpen: BookOpen };

export default function ArticleView({ articleId, onBack }) {
  const article = articlesData[articleId];
  const Icon = iconMap[article.icon];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-8 md:p-16 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full flex flex-col gap-8 bg-white p-10 rounded-3xl shadow-lg border border-slate-200"
      >
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-sm transition-colors w-max">
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
        
        <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl"><Icon size={32} /></div>
          <h1 className="text-4xl font-black text-slate-900">{article.title}</h1>
        </div>

        <div className="prose prose-slate prose-lg max-w-none whitespace-pre-wrap font-medium text-slate-600 leading-relaxed">
          {article.content}
        </div>
      </motion.div>
    </div>
  );
}
