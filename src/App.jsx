import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Visualizer from './components/Visualizer';
import ArticleView from './components/ArticleView';

export default function App() {
  const [viewState, setViewState] = useState({ type: 'landing', payload: null });

  return (
    <>
      {viewState.type === 'landing' && (
        <LandingPage 
          onSelectProblem={(problem) => setViewState({ type: 'visualizer', payload: problem })} 
          onSelectArticle={(articleId) => setViewState({ type: 'article', payload: articleId })}
        />
      )}
      {viewState.type === 'visualizer' && (
        <Visualizer problem={viewState.payload} onBack={() => setViewState({ type: 'landing', payload: null })} />
      )}
      {viewState.type === 'article' && (
        <ArticleView articleId={viewState.payload} onBack={() => setViewState({ type: 'landing', payload: null })} />
      )}
    </>
  );
}
