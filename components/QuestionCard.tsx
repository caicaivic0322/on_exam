import { Question } from '@/types';
import { CheckCircle, XCircle, Play, Loader2 } from 'lucide-react';
import clsx from 'clsx';
import Editor from '@monaco-editor/react';
import { useState } from 'react';

interface QuestionCardProps {
    question: Question;
    selectedAnswer: string | boolean | undefined;
    onAnswer: (answer: string | boolean) => void;
    showResult: boolean;
}

export function QuestionCard({
    question,
    selectedAnswer,
    onAnswer,
    showResult,
}: QuestionCardProps) {
    const isCorrect = showResult && selectedAnswer === question.correctAnswer;
    const [isRunning, setIsRunning] = useState(false);
    const [output, setOutput] = useState<string | null>(null);

    const handleRunCode = async () => {
        setIsRunning(true);
        setOutput(null);

        try {
            const response = await fetch('https://emkc.org/api/v2/piston/execute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    language: 'cpp',
                    version: '10.2.0',
                    files: [
                        {
                            content: selectedAnswer as string || question.codeSnippet
                        }
                    ]
                }),
            });

            const data = await response.json();

            if (data.run) {
                const outputText = data.run.stdout || data.run.stderr || 'No output';
                setOutput(outputText);
            } else {
                setOutput('Error: Failed to execute code');
            }
        } catch (error) {
            setOutput('Error: Failed to connect to compilation server');
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-600 mb-2">
                    {question.type}
                </span>
                <h3 className="text-lg font-medium text-slate-900">{question.text}</h3>
            </div>

            <div className="space-y-3">
                {question.type === 'MCQ' && question.options?.map((option) => (
                    <button
                        key={option}
                        onClick={() => !showResult && onAnswer(option)}
                        disabled={showResult}
                        className={clsx(
                            'w-full text-left p-4 rounded-lg border transition-all',
                            selectedAnswer === option
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-slate-200 hover:bg-slate-50',
                            showResult && option === question.correctAnswer && 'border-green-500 bg-green-50 text-green-700',
                            showResult && selectedAnswer === option && selectedAnswer !== question.correctAnswer && 'border-red-500 bg-red-50 text-red-700'
                        )}
                    >
                        {option}
                    </button>
                ))}

                {question.type === 'TF' && (
                    <div className="flex gap-4">
                        {[true, false].map((val) => (
                            <button
                                key={String(val)}
                                onClick={() => !showResult && onAnswer(val)}
                                disabled={showResult}
                                className={clsx(
                                    'flex-1 p-4 rounded-lg border transition-all text-center font-medium',
                                    selectedAnswer === val
                                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                                        : 'border-slate-200 hover:bg-slate-50',
                                    showResult && val === question.correctAnswer && 'border-green-500 bg-green-50 text-green-700',
                                    showResult && selectedAnswer === val && selectedAnswer !== question.correctAnswer && 'border-red-500 bg-red-50 text-red-700'
                                )}
                            >
                                {val ? 'True' : 'False'}
                            </button>
                        ))}
                    </div>
                )}

                {question.type === 'CODE' && (
                    <div className="space-y-4">
                        <div className="border border-slate-200 rounded-lg overflow-hidden">
                            <div className="bg-slate-50 border-b border-slate-200 p-2 flex justify-between items-center">
                                <span className="text-xs font-medium text-slate-500 px-2">main.cpp</span>
                                <button
                                    onClick={handleRunCode}
                                    disabled={isRunning || showResult}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 transition-colors disabled:opacity-50"
                                >
                                    {isRunning ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
                                    Run Code
                                </button>
                            </div>
                            <div className="h-64">
                                <Editor
                                    height="100%"
                                    defaultLanguage="cpp"
                                    defaultValue={question.codeSnippet}
                                    value={selectedAnswer as string || question.codeSnippet}
                                    onChange={(value) => !showResult && onAnswer(value || '')}
                                    options={{
                                        minimap: { enabled: false },
                                        fontSize: 14,
                                        scrollBeyondLastLine: false,
                                        readOnly: showResult,
                                    }}
                                />
                            </div>
                        </div>

                        {output && (
                            <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm">
                                <div className="text-xs text-slate-400 mb-2 border-b border-slate-700 pb-1">Terminal Output</div>
                                <pre>{output}</pre>
                            </div>
                        )}

                        {showResult && (
                            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm font-mono">
                                <strong>Correct Solution:</strong>
                                <pre className="mt-2 whitespace-pre-wrap">{question.correctAnswer as string}</pre>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {showResult && (
                <div className={clsx("mt-6 flex items-center gap-2 font-medium", isCorrect ? "text-green-600" : "text-red-600")}>
                    {isCorrect ? <CheckCircle size={20} /> : <XCircle size={20} />}
                    {isCorrect ? "Correct!" : "Incorrect"}
                </div>
            )}
        </div>
    );
}
