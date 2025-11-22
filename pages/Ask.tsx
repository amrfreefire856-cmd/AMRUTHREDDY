import React, { useState, useEffect } from 'react';
import { generateAnswer } from '../services/geminiService';
import { storageService } from '../services/storageService';
import { PdfDocument, MarkOption, SavedAnswer } from '../types';
import { Loader2, Save, Send, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const Ask: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [marks, setMarks] = useState<MarkOption>(2);
  const [contextSource, setContextSource] = useState<string>('none');
  const [customContext, setCustomContext] = useState('');
  const [availablePdfs, setAvailablePdfs] = useState<PdfDocument[]>([]);
  const [generatedAnswer, setGeneratedAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setAvailablePdfs(storageService.getPdfs());
  }, []);

  useEffect(() => {
    // Update custom context when a PDF is selected
    if (contextSource !== 'none') {
      const pdf = availablePdfs.find(p => p.id === contextSource);
      if (pdf) {
        setCustomContext(pdf.content);
      }
    } else {
      setCustomContext('');
    }
  }, [contextSource, availablePdfs]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setGeneratedAnswer('');
    setIsSaved(false);

    try {
      const contextToUse = contextSource !== 'none' ? customContext : customContext; // Use custom text if provided or pdf content
      const answer = await generateAnswer(question, marks, contextToUse);
      setGeneratedAnswer(answer);
    } catch (err) {
      setGeneratedAnswer("Error generating answer. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (!generatedAnswer) return;
    const newAnswer: SavedAnswer = {
      id: Date.now().toString(),
      question,
      answer: generatedAnswer,
      marks,
      date: new Date().toISOString(),
      contextSource: contextSource === 'none' ? 'General' : availablePdfs.find(p => p.id === contextSource)?.name
    };
    storageService.saveAnswer(newAnswer);
    setIsSaved(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Configure Answer</h2>
            <form onSubmit={handleGenerate} className="space-y-5">
              {/* Marks */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Marks Weightage</label>
                <select
                  value={marks}
                  onChange={(e) => setMarks(Number(e.target.value) as MarkOption)}
                  className="w-full rounded-lg border-gray-300 border shadow-sm px-4 py-2 focus:ring-cyan-500 focus:border-cyan-500"
                >
                  <option value={2}>2 Marks (Definition/Short)</option>
                  <option value={5}>5 Marks (Structured/Medium)</option>
                  <option value={8}>8 Marks (Long/Essay + Diagram)</option>
                </select>
              </div>

              {/* Context Source */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Context / Syllabus</label>
                <select
                  value={contextSource}
                  onChange={(e) => setContextSource(e.target.value)}
                  className="w-full rounded-lg border-gray-300 border shadow-sm px-4 py-2 focus:ring-cyan-500 focus:border-cyan-500 mb-2"
                >
                  <option value="none">General Knowledge (No Context)</option>
                  {availablePdfs.map(pdf => (
                    <option key={pdf.id} value={pdf.id}>PDF: {pdf.name}</option>
                  ))}
                </select>
                
                <textarea
                  value={customContext}
                  onChange={(e) => {
                    setContextSource('none'); // Switch to general if typing manually
                    setCustomContext(e.target.value);
                  }}
                  placeholder="Or paste context text here manually..."
                  className="w-full h-32 rounded-lg border-gray-300 border shadow-sm p-3 text-sm focus:ring-cyan-500 focus:border-cyan-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-70 transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" /> Generating...
                  </>
                ) : (
                  <>
                    <Send className="-ml-1 mr-2 h-4 w-4" /> Generate Answer
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Output Section */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 min-h-[500px] flex flex-col">
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">Your Question</label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g., Explain the architecture of a Transformer model."
                className="w-full rounded-lg border-gray-300 border shadow-sm px-4 py-3 focus:ring-cyan-500 focus:border-cyan-500 text-lg font-medium placeholder-gray-400"
              />
            </div>

            <div className="flex-grow border-t border-slate-100 pt-6 relative">
               {!generatedAnswer && !isLoading && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                   <FileText className="h-16 w-16 mb-4 opacity-20" />
                   <p>Answer will appear here</p>
                 </div>
               )}

               {isLoading && (
                 <div className="space-y-4 animate-pulse">
                   <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                   <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                   <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                   <div className="h-32 bg-slate-50 rounded w-full mt-4 border border-slate-100"></div>
                 </div>
               )}

               {generatedAnswer && !isLoading && (
                 <div className="prose prose-slate max-w-none">
                   <ReactMarkdown>{generatedAnswer}</ReactMarkdown>
                 </div>
               )}
            </div>

            {generatedAnswer && (
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={isSaved}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isSaved ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >
                  {isSaved ? (
                    <>Saved Successfully</>
                  ) : (
                    <><Save className="mr-2 h-4 w-4" /> Save to Dashboard</>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ask;