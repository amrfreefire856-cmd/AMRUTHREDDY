import { PdfDocument, SavedAnswer } from '../types';

const PDF_KEY = 'aegpt_pdfs';
const ANSWER_KEY = 'aegpt_answers';

export const storageService = {
  savePdf: (pdf: PdfDocument) => {
    const existing = storageService.getPdfs();
    const updated = [pdf, ...existing];
    localStorage.setItem(PDF_KEY, JSON.stringify(updated));
  },

  getPdfs: (): PdfDocument[] => {
    const data = localStorage.getItem(PDF_KEY);
    return data ? JSON.parse(data) : [];
  },

  deletePdf: (id: string) => {
    const existing = storageService.getPdfs();
    const updated = existing.filter(p => p.id !== id);
    localStorage.setItem(PDF_KEY, JSON.stringify(updated));
  },

  saveAnswer: (answer: SavedAnswer) => {
    const existing = storageService.getAnswers();
    const updated = [answer, ...existing];
    localStorage.setItem(ANSWER_KEY, JSON.stringify(updated));
  },

  getAnswers: (): SavedAnswer[] => {
    const data = localStorage.getItem(ANSWER_KEY);
    return data ? JSON.parse(data) : [];
  }
};