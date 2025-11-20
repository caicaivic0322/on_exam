'use client';

import { useState } from 'react';
import { Quiz } from '@/types';
import { QuestionCard } from '@/components/QuestionCard';
import { ChevronRight, RotateCcw } from 'lucide-react';
import Link from 'next/link';

interface QuizRunnerProps {
    quiz: Quiz;
}

export function QuizRunner({ quiz }: QuizRunnerProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string | boolean>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const totalQuestions = quiz.questions.length;

    // 安全检查：确保测验有题目
    if (!quiz || !quiz.questions || quiz.questions.length === 0) {
        return (
            <div className="max-w-3xl mx-auto py-12 px-4 text-center">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">No Questions Available</h2>
                    <p className="text-slate-600 mb-8">
                        This chapter doesn't have any quiz questions yet.
                    </p>
                    <Link
                        href="/"
                        className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    const handleAnswer = (answer: string | boolean) => {
        if (!currentQuestion) return;
        setAnswers((prev) => ({
            ...prev,
            [currentQuestion.id]: answer,
        }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            setIsSubmitted(true);
        }
    };

    const calculateScore = () => {
        let score = 0;
        quiz.questions.forEach((q) => {
            if (answers[q.id] === q.correctAnswer) {
                score += 1;
            }
        });
        return score;
    };

    if (isSubmitted) {
        const score = calculateScore();
        const percentage = Math.round((score / totalQuestions) * 100);
        const wrongAnswers = quiz.questions.filter(
            (q) => answers[q.id] !== q.correctAnswer
        );

        return (
            <div className="max-w-3xl mx-auto py-12 px-4">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Quiz Completed!</h2>
                    <div className="text-6xl font-bold text-blue-600 mb-4">{percentage}%</div>
                    <p className="text-slate-600 mb-8">
                        You scored {score} out of {totalQuestions} questions correctly.
                    </p>

                    <div className="flex justify-center gap-4">
                        <Link
                            href="/"
                            className="px-6 py-3 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
                        >
                            Back to Dashboard
                        </Link>
                        <button
                            onClick={() => window.location.reload()}
                            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                        >
                            <RotateCcw size={20} />
                            Try Again
                        </button>
                    </div>
                </div>

                {wrongAnswers.length > 0 && (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-slate-900">Review Incorrect Answers</h3>
                        {wrongAnswers.map((q) => (
                            <QuestionCard
                                key={q.id}
                                question={q}
                                selectedAnswer={answers[q.id]}
                                onAnswer={() => { }}
                                showResult={true}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                </span>
                <div className="w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-blue-600 transition-all duration-300"
                        style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                    />
                </div>
            </div>

            <QuestionCard
                question={currentQuestion}
                selectedAnswer={answers[currentQuestion.id]}
                onAnswer={handleAnswer}
                showResult={false}
            />

            <div className="mt-8 flex justify-end">
                <button
                    onClick={handleNext}
                    disabled={answers[currentQuestion.id] === undefined}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {currentQuestionIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}
