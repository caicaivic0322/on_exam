import { generateQuiz } from '@/utils/quizGenerator';
import { QuizRunner } from '@/components/QuizRunner';
import { chapters } from '@/data/chapters';

// 静态导出必需的函数
export async function generateStaticParams() {
    // 为所有章节生成静态参数
    return chapters.map((chapter) => ({
        chapterId: chapter.id,
    }));
}

// 生成页面元数据
export async function generateMetadata({ params }: { params: { chapterId: string } }) {
    const chapter = chapters.find(ch => ch.id === params.chapterId);
    return {
        title: chapter ? `${chapter.title} - Quiz` : 'Quiz',
        description: `${chapter?.title || 'Chapter'} quiz questions`,
    };
}

export default function QuizPage({ params }: { params: { chapterId: string } }) {
    // 在构建时生成测验数据
    const quiz = generateQuiz(params.chapterId);

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
