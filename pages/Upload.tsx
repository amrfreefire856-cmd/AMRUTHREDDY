import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone'; // Note: Actually using input type="file" per instructions, implementing custom logic.
import { Upload as UploadIcon, FileText, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { storageService } from '../services/storageService';
import { PdfDocument } from '../types';
import { useNavigate } from 'react-router-dom';

const UploadPage: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Simulating extraction. In a real app, this would use PDF.js or a server.
  // Here, we use FileReader for text files, or warn about PDF binary content in this pure frontend demo.
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    setFileName(file.name);

    // Artificial delay for UX
    setTimeout(() => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        const text = e.target?.result;
        if (typeof text === 'string') {
            // If it's a text file, we are good.
            // If it's a PDF, the browser FileReader reads binary garbage if we treat it as text.
            // For this TEST DEMO, we will detect PDF extension and show a specific message if we can't parse it client-side easily without libs.
            
            if (file.type === 'application/pdf') {
                // In a browser-only environment without pdf.js loaded via script tag in head (which we didn't do for simplicity), 
                // we cannot extract PDF text reliably.
                // We will mock the extraction for "Demo.pdf" or generic.
                setExtractedText("Error: Browser-side PDF text extraction requires external libraries not loaded in this environment. \n\nFor this Test Demo, please upload a .txt file or copy-paste your syllabus content into the 'Ask' page directly.");
                setError("PDF parsing unavailable in this pure-React view. Please upload a .txt file or paste content.");
            } else {
                setExtractedText(text);
            }
        }
        setUploading(false);
      };

      if (file.type === 'text/plain') {
        reader.readAsText(file);
      } else {
        // Mock success for UI, but warn about content
        setExtractedText(`[Mock Extracted Content for ${file.name}]\n\n(In a real production environment, this would contain the parsed PDF text. Since we are running in a restricted frontend demo, please paste your syllabus text directly below or upload a .txt file.)`);
        setUploading(false);
      }
    }, 1500);
  };

  const handleSave = () => {
    if (!extractedText || !fileName) return;

    const newPdf: PdfDocument = {
      id: Date.now().toString(),
      name: fileName,
      content: extractedText,
      uploadDate: new Date().toLocaleDateString(),
      size: '1.2 MB' // Mock size
    };

    storageService.savePdf(newPdf);
    navigate('/ask');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <UploadIcon className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Upload Syllabus Context</h2>
        <p className="text-slate-500 mb-8">Upload a text file (or PDF for checking) to train the AI on your specific exam material.</p>

        <div className="border-2 border-dashed border-slate-300 rounded-xl p-10 hover:bg-slate-50 transition-colors relative">
           <input 
             type="file" 
             accept=".txt,.pdf"
             onChange={handleFileChange}
             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
           />
           <div className="space-y-2">
             <FileText className="h-10 w-10 text-slate-400 mx-auto" />
             <p className="text-sm font-medium text-slate-900">Click to select or drag file here</p>
             <p className="text-xs text-slate-500">Supported: TXT (Recommended for Demo), PDF</p>
           </div>
        </div>

        {uploading && (
          <div className="mt-6 flex items-center justify-center space-x-2 text-blue-600">
             <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
             <span className="font-medium">Extracting text...</span>
          </div>
        )}

        {error && (
            <div className="mt-6 p-4 bg-yellow-50 text-yellow-800 rounded-lg flex items-start text-left text-sm">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <p>{error}</p>
            </div>
        )}

        {extractedText && !uploading && (
          <div className="mt-8 text-left">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Extraction Preview
              </h3>
              <button onClick={() => { setExtractedText(''); setFileName(''); }} className="text-red-400 hover:text-red-500">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <textarea
              value={extractedText}
              onChange={(e) => setExtractedText(e.target.value)}
              className="w-full h-48 rounded-lg border-slate-300 text-sm p-3 bg-slate-50 font-mono"
            />
            <button
              onClick={handleSave}
              className="mt-6 w-full py-3 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold hover:shadow-lg transition-all"
            >
              Save & Ask Questions
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;