import React from 'react';
import { Badge } from '../../components/ui/Badge';
import { BookOpen, Video, Heart, Activity } from 'lucide-react';

export const EducationHub: React.FC = () => {
  const articles = [
    { title: 'Post-Cardiac Bypass Diet & Recovery Guide', category: 'Nutrition', readTime: '5 min read' },
    { title: 'Understanding Your Complete Blood Count (CBC) Values', category: 'Diagnostics', readTime: '4 min read' },
    { title: '15-Minute Daily Gentle Cardiac Exercises', category: 'Rehabilitation', readTime: '6 min read' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Patient Health Education & Recovery Library
        </h2>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Physician-verified treatment guides, rehabilitation videos, and wellness articles
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((item, i) => (
          <div key={i} className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <Badge variant="info">{item.category}</Badge>
              <h3 className="text-base font-bold text-slate-900 dark:text-white my-2">{item.title}</h3>
              <p className="text-xs text-slate-500">{item.readTime}</p>
            </div>
            <button className="mt-4 rounded-xl bg-slate-100 dark:bg-slate-800 py-2 text-xs font-semibold text-sky-500 hover:bg-sky-500/10">
              Read Article
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
