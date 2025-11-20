import Link from 'next/link';
import { chapters } from '@/data/chapters';
import { ArrowRight, Book } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Welcome back!</h1>
        <p className="text-slate-600 mt-2">Select a chapter to start practicing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chapters.map((chapter) => (
          <Link
            key={chapter.id}
            href={`/quiz/${chapter.id}`}
            className="group bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Book size={24} />
              </div>
              <ArrowRight className="text-slate-300 group-hover:text-blue-500 transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
              {chapter.title}
            </h3>
            <p className="text-sm text-slate-500">
              Start practice quiz &rarr;
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
