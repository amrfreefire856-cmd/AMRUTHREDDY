export interface User {
  userId: string;
  email: string;
  name: string;
  subscriptionStatus: boolean;
  validUntil: string;
}

export interface PdfDocument {
  id: string;
  name: string;
  uploadDate: string;
  content: string; // Extracted text content
  size: string;
}

export interface SavedAnswer {
  id: string;
  question: string;
  answer: string;
  marks: 2 | 5 | 8;
  date: string;
  contextSource?: string;
}

export enum MarkOption {
  TWO = 2,
  FIVE = 5,
  EIGHT = 8
}

export const TEST_CREDENTIALS = {
  email: "aegpt@test.com",
  password: "AEtest@123"
};