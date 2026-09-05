import type { ResumeData } from '@/lib/types';

const resumeData: ResumeData = {
  name: 'Aryan Shah',
  title: 'AI/ML Engineer & Data Scientist',
  email: 'aryan26110417@gmail.com',
  location: 'Kharagpur, India',
  summary:
    'Third-year B.Tech student in Ocean Engineering and Naval Architecture (Minor in Artificial Intelligence) at IIT Kharagpur, pivoting toward Agentic AI and Data Science. Builds production-grade agentic systems, RAG pipelines, and large-scale forecasting/ML pipelines, with a Codeforces Expert rating from a strong competitive programming background.',
  education: [
    {
      institution: 'Indian Institute of Technology Kharagpur',
      degree: 'B.Tech (Hons) in Ocean Engineering and Naval Architecture',
      field: 'Minor in Artificial Intelligence',
      startDate: '2024',
      endDate: '2028',
      gpa: '7.66 CGPA',
      highlights: [
        'Coursework: Foundations of Large Language Models, Programming and Data Structures, Essentials of Machine Learning',
        'Coursework: Probability and Statistics, Linear Algebra, Complex and Numerical Analysis, Applied Computational Methods',
      ],
    },
  ],
  experience: [
    {
      company: 'Cambridge Judge Business School',
      role: 'Research Intern (Data Analysis)',
      startDate: 'Mar 2025',
      endDate: 'Sept 2025',
      location: 'Remote (Cambridge, UK)',
      description: 'Built and validated a large-scale web-scraped dataset for a multidisciplinary research team.',
      highlights: [
        'Built a 20k+ entry, 30+ feature dataset using BeautifulSoup and LLM-assisted automation',
        'Leveraged ChatGPT to validate, enrich, and extract structured insights from large-scale web-scraped data',
        'Collaborated with a multidisciplinary team on preprocessing, feature engineering, and exploratory analysis',
      ],
      technologies: ['Python', 'BeautifulSoup', 'Pandas', 'LLM-assisted automation'],
    },
  ],
  skills: [
    { category: 'Languages & Core', items: ['Python', 'C++', 'C', 'SQL', 'Competitive Programming', 'Data Structures & Algorithms'] },
    { category: 'AI/ML Frameworks', items: ['PyTorch', 'TensorFlow', 'Keras', 'Scikit-Learn', 'Transformers', 'NumPy', 'Pandas', 'LangChain/LangGraph'] },
    { category: 'Development Tools', items: ['Git/GitHub', 'Jupyter Notebook', 'VS Code', 'DuckDB', 'FastAPI', 'Streamlit'] },
  ],
  achievements: [
    'All-time highest Codeforces rating of 1754 (Expert) — handle: aryan_shah26',
    'All India Rank 8170 among 250,000 candidates in JEE Advanced 2024',
    '99.14 percentile in JEE Mains 2024, among the top 1% of 1.4 million candidates',
  ],
  leadership: [],
};

export async function getResumeData(): Promise<ResumeData> {
  return resumeData;
}
