import React from 'react';
import { Construction } from 'lucide-react';
import { Link } from 'react-router-dom';

const Explainer: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="bg-cyan-50 p-6 rounded-full mb-6">
        <Construction className="h-12 w-12 text-cyan-600" />
      </div>
      <h1 className="text-3xl font-bold text-slate-900 mb-4">AI Explainer Coming Soon</h1>
      <p className="max-w-md text-slate-500 mb-8">
        We are building a deep-dive module that breaks down complex diagrams and equations into simple steps. Stay tuned!
      </p>
      <Link to="/dashboard" className="px-6 py-3 bg-white border border-slate-300 rounded-full font-medium text-slate-700 hover:bg-slate-50 transition-colors">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default Explainer;