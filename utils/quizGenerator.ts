import { Question, Quiz } from '@/types';
import { questionBank } from '@/data/chapters';

export const generateQuiz = (chapterId: string): Quiz | null => {
    const allQuestions = questionBank[chapterId];
    if (!allQuestions) return null;

    const mcqs = allQuestions.filter((q) => q.type === 'MCQ');
    const tfs = allQuestions.filter((q) => q.type === 'TF');
    const codes = allQuestions.filter((q) => q.type === 'CODE');

    const getRandom = (arr: Question[], count: number) => {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const selectedQuestions = [
        ...getRandom(mcqs, 5),
        ...getRandom(tfs, 3),
        ...getRandom(codes, 2),
    ];

    return {
        chapterId,
        questions: selectedQuestions,
    };
};
