import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Zap, ShieldCheck, ChevronRight } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-cyan-500/20 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Master Your Exams with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              AE GPT Intelligence
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-slate-300 mb-10">
            Upload your syllabus PDFs, ask questions, and get accurate, mark-specific answers instantly. 
            Test mode is currently <strong>FREE</strong> for all users.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/dashboard" className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center">
              Explore For Free <ChevronRight className="ml-2" />
            </Link>
            <Link to="/login" className="px-8 py-4 rounded-full bg-slate-800 border border-slate-700 text-white font-bold text-lg hover:bg-slate-700 transition-all">
              Log In
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">Why Students Love AE GPT</h2>
          <p className="text-slate-600 mt-4">Optimized for academic success with smart features.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <Zap className="text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Instant Answers</h3>
            <p className="text-slate-600">
              Get tailored answers based on mark allocation (2, 5, or 8 marks). No more guessing length or depth.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-6">
              <FileText className="text-cyan-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">PDF Context</h3>
            <p className="text-slate-600">
              Upload your specific subject material. The AI reads your syllabus to ensure accuracy.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <ShieldCheck className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Free Test Mode</h3>
            <p className="text-slate-600">
              Full access to all premium features without any credit card. Valid until 2099 for testing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;