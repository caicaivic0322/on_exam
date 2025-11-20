import { Question } from '@/types';

const generateQuestionsForChapter = (chapterId: string, topic: string): Question[] => {
    const questions: Question[] = [];

    // 1. Generate 40 MCQs
    for (let i = 1; i <= 40; i++) {
        questions.push({
            id: `gen-ch${chapterId}-mcq-${i}`,
            type: 'MCQ',
            text: `[${topic}] 这是一个关于 ${topic} 的测试问题 #${i}。下列哪个选项是正确的？`,
            options: [
                `选项 A: ${topic} 的基本概念`,
                `选项 B: ${topic} 的错误描述`,
                `选项 C: 无关选项`,
                `选项 D: 以上都不对`
            ],
            correctAnswer: `选项 A: ${topic} 的基本概念`,
        });
    }

    // 2. Generate 20 True/False
    for (let i = 1; i <= 20; i++) {
        questions.push({
            id: `gen-ch${chapterId}-tf-${i}`,
            type: 'TF',
            text: `[${topic}] 关于 ${topic} 的这个说法是正确的吗？(测试点 #${i})`,
            correctAnswer: i % 2 === 0, // Alternate true/false
        });
    }

    // 3. Generate 12 Code Completion
    for (let i = 1; i <= 12; i++) {
        questions.push({
            id: `gen-ch${chapterId}-code-${i}`,
            type: 'CODE',
            text: `[${topic}] 请补全下列代码以实现功能 #${i}`,
            codeSnippet: `// ${topic} Example ${i}\n#include <iostream>\nusing namespace std;\n\nint main() {\n    // TODO: Implement logic\n    return 0;\n}`,
            correctAnswer: `// ${topic} Example ${i}\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Solved ${i}" << endl;\n    return 0;\n}`,
        });
    }

    return questions;
};

const chapters = [
    { id: '1', title: '初识 C++' },
    { id: '2', title: '数据类型' },
    { id: '3', title: '程序结构' },
    { id: '4', title: '条件分支' },
    { id: '5', title: 'switch' },
    { id: '6', title: 'while' },
    { id: '7', title: 'for' },
    { id: '8', title: '初识数组' },
    { id: '9', title: '循环嵌套' },
    { id: '10', title: '一维数组' },
    { id: '11', title: '字符串' },
    { id: '12', title: '二维数组' },
    { id: '13', title: '函数' },
    { id: '14', title: '指针' },
    { id: '15', title: '链表' },
];

export const generatedQuestions: Record<string, Question[]> = {};

chapters.forEach(ch => {
    generatedQuestions[ch.id] = generateQuestionsForChapter(ch.id, ch.title);
});
