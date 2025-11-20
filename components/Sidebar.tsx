'use client';

import Link from 'next/link';
import { BookOpen, Code, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export function Sidebar() {
    const pathname = usePathname();

    const links = [
        { href: '/', label: 'Dashboard', icon: Home },
        { href: '/practice', label: 'Practice', icon: Code },
        { href: '/resources', label: 'Resources', icon: BookOpen },
    ];

    return (
        <div className="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 flex flex-col p-4">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-blue-400">DevQuiz</h1>
            </div>
            <nav className="space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={clsx(
                                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                                isActive
                                    ? 'bg-blue-600 text-white'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            )}
                        >
                            <Icon size={20} />
                            <span>{link.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
