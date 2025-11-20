export type QuestionType = 'MCQ' | 'TF' | 'CODE';

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[]; // For MCQ
  correctAnswer: string | boolean; // string for MCQ/CODE, boolean for TF
  codeSnippet?: string; // For CODE type, initial code
}

export interface Chapter {
  id: string;
  title: string;
  description?: string;
}

export interface Quiz {
  chapterId: string;
  questions: Question[];
}
