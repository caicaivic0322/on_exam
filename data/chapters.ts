import { Chapter, Question } from '@/types';
import { cplusplusQuestions } from './questions/cplusplus';
import { cplusplusHardQuestions } from './questions/cplusplus_hard';

export const chapters: Chapter[] = [
    { id: '1', title: '1 初识 C++' },
    { id: '2', title: '2 数据类型' },
    { id: '3', title: '3 程序结构' },
    { id: '4', title: '4 条件分支' },
    { id: '5', title: '5 switch' },
    { id: '6', 'title': '6 while' },
    { id: '7', title: '7 for' },
    { id: '8', title: '8 初识数组' },
    { id: '9', title: '第9讲. 循环嵌套' },
    { id: '10', title: '第10讲 一维数组' },
    { id: '11', title: '第11讲 字符串' },
    { id: '12', title: '第12讲 二维数组' },
    { id: '13', title: '第13讲 函数' },
    { id: '14', title: '第14讲 指针' },
    { id: '15', title: '第15讲 链表' },
];

// Merge hard questions into the main question bank
const mergedQuestionBank: Record<string, Question[]> = { ...cplusplusQuestions };

// Helper to merge questions
const mergeQuestions = (target: Record<string, Question[]>, source: Record<string, Question[]>) => {
    Object.keys(source).forEach((key) => {
        if (target[key]) {
            target[key] = [...target[key], ...source[key]];
        } else {
            target[key] = source[key];
        }
    });
};

mergeQuestions(mergedQuestionBank, cplusplusHardQuestions);

// Export the real question bank
export const questionBank: Record<string, Question[]> = mergedQuestionBank;
