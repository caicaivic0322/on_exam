'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { generateQuiz } from '@/utils/quizGenerator';
import { Quiz } from '@/types';
import { QuizRunner } from '@/components/QuizRunner';
import { Loader2 } from 'lucide-react';

export default function QuizPage() {
    const params = useParams();
    const [quiz, setQuiz] = useState<Quiz | null>(null);

    useEffect(() => {
        if (params.chapterId) {
            const newQuiz = generateQuiz(params.chapterId as string);
            setQuiz(newQuiz);
        }
    }, [params.chapterId]);

    if (!quiz) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">
                    Chapter {quiz.chapterId} Quiz
                </h1>
            </div>
            <QuizRunner quiz={quiz} />
        </div>
    );
}
