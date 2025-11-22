import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { storageService } from '../services/storageService';
import { SavedAnswer } from '../types';
import { PlusCircle, Upload, Book, Clock, HelpCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [recentAnswers, setRecentAnswers] = useState<SavedAnswer[]>([]);

  useEffect(() => {
    const answers = storageService.getAnswers();
    setRecentAnswers(answers.slice(0, 3)); // Get top 3 recent
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user?.name}!</h1>
        <div className="flex items-center space-x-2 mt-2 text-slate-500">
          <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-green-200">Test Mode Active</span>
          <span className="text-sm">Subscription valid until {user?.validUntil}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Action Card 1 */}
        <Link to="/ask" className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-cyan-300 transition-all">
          <div className="h-12 w-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <PlusCircle className="text-cyan-600 h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Ask Question</h3>
          <p className="text-slate-500 text-sm mt-2">Generate exam-style answers tailored to marks.</p>
        </Link>

        {/* Action Card 2 */}
        <Link to="/upload" className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-blue-300 transition-all">
          <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Upload className="text-blue-600 h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Upload PDF</h3>
          <p className="text-slate-500 text-sm mt-2">Extract text from syllabus to guide the AI.</p>
        </Link>

        {/* Action Card 3 */}
        <Link to="/explainer" className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-purple-300 transition-all">
          <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <HelpCircle className="text-purple-600 h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">AI Explainer</h3>
          <p className="text-slate-500 text-sm mt-2">Deep dive into complex topics. (Coming Soon)</p>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-slate-400" /> Recent Answers
          </h2>
          <Link to="/ask" className="text-sm text-cyan-600 hover:text-cyan-700 font-medium">View all</Link>
        </div>
        <div className="divide-y divide-slate-100">
          {recentAnswers.length > 0 ? (
            recentAnswers.map((ans) => (
              <div key={ans.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-slate-800">{ans.question}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                    {ans.marks} Marks
                  </span>
                </div>
                <p className="text-slate-500 text-sm line-clamp-2">{ans.answer.replace(/[#*]/g, '')}</p>
                <div className="mt-3 text-xs text-slate-400 flex items-center">
                  <Book className="h-3 w-3 mr-1" /> {ans.contextSource || 'General Knowledge'}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-500">
              No saved answers yet. Start by asking a question!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;