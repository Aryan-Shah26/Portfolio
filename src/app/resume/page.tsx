import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { getResumeData } from '@/data/resume';
import { ResumeDownloadButton } from '@/components/resume-download-button';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'Resume',
};

export default async function ResumePage() {
  const resumeData = await getResumeData();
  const localResumePath = join(process.cwd(), 'public', 'resume.pdf');
  const configuredResumeUrl = process.env.RESUME_URL;
  const externalResumeUrl = configuredResumeUrl?.startsWith('http://') || configuredResumeUrl?.startsWith('https://')
    ? configuredResumeUrl
    : undefined;
  const resumeUrl = externalResumeUrl || (existsSync(localResumePath) ? '/resume.pdf' : undefined);

  return (
    <div className="flex flex-col gap-8 pb-10 print:gap-4 print:pb-0">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground print:text-black">{resumeData.name}</h1>
          <p className="text-lg text-muted print:text-gray-700">{resumeData.title}</p>
          <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground print:text-gray-600">
            <span>{resumeData.email}</span>
            <span>·</span>
            <span>{resumeData.location}</span>
          </div>
        </div>
        <ResumeDownloadButton resumeUrl={resumeUrl} />
      </header>

      <div className="text-muted leading-relaxed print:text-gray-800">
        {resumeData.summary}
      </div>

      <section className="glass-card p-6 print:p-0 print:bg-white print:text-black print:shadow-none print:border-none">
        <h2 className="text-xl font-semibold text-foreground mb-6 border-b border-white/10 pb-2 print:border-gray-300 print:text-black">Experience</h2>
        <div className="flex flex-col gap-6">
          {resumeData.experience.map((job, idx) => (
            <div key={idx} className="relative pl-4 border-l-2 border-white/10 print:border-gray-300">
              <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1.5 print:bg-gray-500" />
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                <div>
                  <h3 className="font-semibold text-foreground print:text-black">{job.role}</h3>
                  <div className="text-sm text-primary-light print:text-gray-700">{job.company}</div>
                </div>
                <div className="text-xs text-muted-foreground mt-1 md:mt-0 md:text-right print:text-gray-600">
                  <div>{job.startDate} - {job.endDate}</div>
                  <div>{job.location}</div>
                </div>
              </div>
              <p className="text-sm text-muted mb-3 print:text-gray-800">{job.description}</p>
              <ul className="list-disc list-outside ml-4 space-y-1 mb-3">
                {job.highlights.map((highlight, hIdx) => (
                  <li key={hIdx} className="text-sm text-muted print:text-gray-800">{highlight}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5">
                {job.technologies?.map((tech) => (
                  <span key={tech} className="text-[10px] px-2 py-0.5 rounded-none bg-card text-muted-foreground print:bg-gray-100 print:text-gray-800">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card p-6 print:p-0 print:bg-white print:text-black print:shadow-none print:border-none">
        <h2 className="text-xl font-semibold text-foreground mb-6 border-b border-white/10 pb-2 print:border-gray-300 print:text-black">Education</h2>
        <div className="flex flex-col gap-6">
          {resumeData.education.map((edu, idx) => (
            <div key={idx}>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                <div>
                  <h3 className="font-semibold text-foreground print:text-black">{edu.institution}</h3>
                  <div className="text-sm text-muted print:text-gray-700">{edu.degree} in {edu.field}</div>
                </div>
                <div className="text-xs text-muted-foreground mt-1 md:mt-0 md:text-right print:text-gray-600">
                  <div>{edu.startDate} - {edu.endDate}</div>
                  <div>GPA: {edu.gpa}</div>
                </div>
              </div>
              {edu.highlights && edu.highlights.length > 0 && (
                <ul className="list-disc list-outside ml-4 space-y-1 mt-2">
                  {edu.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="text-sm text-muted print:text-gray-800">{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card p-6 print:p-0 print:bg-white print:text-black print:shadow-none print:border-none">
        <h2 className="text-xl font-semibold text-foreground mb-6 border-b border-white/10 pb-2 print:border-gray-300 print:text-black">Technical Skills</h2>
        <div className="flex flex-col gap-4">
          {resumeData.skills.map((skillGroup) => (
            <div key={skillGroup.category}>
              <h3 className="text-sm font-medium text-foreground mb-2 print:text-black">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill) => (
                  <span key={skill} className="text-xs px-2.5 py-1 rounded bg-card/50 border-2 border-white/5 text-muted-foreground print:bg-gray-100 print:text-gray-800 print:border-gray-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className={cn('grid grid-cols-1 gap-8 print:block print:space-y-6', resumeData.leadership.length > 0 && 'md:grid-cols-2')}>
        <section className="glass-card p-6 print:p-0 print:bg-white print:text-black print:shadow-none print:border-none">
          <h2 className="text-xl font-semibold text-foreground mb-4 border-b border-white/10 pb-2 print:border-gray-300 print:text-black">Achievements</h2>
          <ul className="space-y-3">
            {resumeData.achievements.map((achievement, idx) => (
              <li key={idx} className="flex gap-3 items-start">
                <svg className="w-4 h-4 text-yellow-500 mt-1 shrink-0 print:text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
                <span className="text-sm text-muted print:text-gray-800">{achievement}</span>
              </li>
            ))}
          </ul>
        </section>

        {resumeData.leadership.length > 0 && (
          <section className="glass-card p-6 print:p-0 print:bg-white print:text-black print:shadow-none print:border-none">
            <h2 className="text-xl font-semibold text-foreground mb-4 border-b border-white/10 pb-2 print:border-gray-300 print:text-black">Leadership</h2>
            <div className="flex flex-col gap-4">
              {resumeData.leadership.map((item, idx) => (
                <div key={idx}>
                  <h3 className="font-medium text-sm text-foreground print:text-black">{item.role}</h3>
                  <div className="flex justify-between items-center text-xs text-muted-foreground mt-0.5 print:text-gray-600">
                    <span>{item.organization}</span>
                    <span>{item.period}</span>
                  </div>
                  <p className="text-xs text-muted mt-1 print:text-gray-800">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
