import type { AIKnowledgeEntry } from '@/lib/types';

export const aiKnowledgeBase: AIKnowledgeEntry[] = [
  {
    patterns: ['strongest', 'best', 'top', 'impressive', 'notable', 'highlight'],
    response:
      "Aryan's strongest work is concentrated around agentic AI systems and large-scale ML pipelines. Top projects include:\n\n1. **EDA Agent** — A LangGraph-based agentic EDA platform built on DuckDB for out-of-core analysis, with AST-sandboxed code execution, human-in-the-loop checkpoints, and Optuna-driven model selection.\n\n2. **RAG Chat Engine** — A hybrid BM25 + dense retrieval system with reranking, a LangGraph agentic loop, citation verification, and a multi-tenant FastAPI service.\n\n3. **M5 Forecasting** — Gradient-boosting (XGBoost/LightGBM) and dual-input LSTM models for large-scale retail demand forecasting, with custom WRMSSE training metrics.\n\nThese reflect a consistent focus on production-shaped systems — memory efficiency, sandboxing, and evaluation — rather than notebook-only demos.",
    sources: [
      { title: 'EDA Agent', type: 'project', slug: 'eda-agent', snippet: 'LangGraph-based agentic EDA platform on DuckDB' },
      { title: 'RAG Chat Engine', type: 'project', slug: 'Chat-Engine', snippet: 'Hybrid retrieval RAG system with agentic loop' },
      { title: 'M5 Forecasting', type: 'project', slug: 'm5-forecasting', snippet: 'XGBoost/LSTM demand forecasting pipeline' },
    ],
  },
  {
    patterns: ['rag', 'retrieval', 'augmented', 'generation', 'chat engine'],
    response:
      "Aryan's RAG work centers on the **RAG Chat Engine** (grew out of an earlier Research Paper Bot). It combines BM25 sparse retrieval and dense embeddings via Reciprocal Rank Fusion, adds cross-encoder reranking, and runs a LangGraph retriever-critic agentic loop that retries low-confidence retrievals.\n\nKey details:\n- Citation-verification and hallucination-filtering pipeline to validate claims against retrieved sources\n- Multi-tenant FastAPI service with persistent document collections\n- A benchmark module for retrieval/generation evaluation, with ongoing work on latency measurement and regression detection",
    sources: [
      { title: 'RAG Chat Engine', type: 'project', slug: 'Chat-Engine', snippet: 'Hybrid retrieval, reranking, citation-verified generation' },
    ],
  },
  {
    patterns: ['technologies', 'tech stack', 'tools', 'languages', 'skills', 'what does aryan use'],
    response:
      "Aryan works primarily with:\n\n**Languages:** Python, C++, C, SQL\n\n**AI/ML:** PyTorch, TensorFlow, Keras, Scikit-Learn, Transformers, LangChain/LangGraph\n\n**Data & Infra:** DuckDB, FastAPI, Streamlit, NumPy, Pandas\n\n**Other:** Git/GitHub, Jupyter, VS Code, competitive programming (Codeforces Expert)\n\nPython is his primary language across nearly all projects, from agentic systems to large-scale forecasting pipelines.",
    sources: [
      { title: 'Resume — Technical Skills', type: 'resume', snippet: 'Full technical skill breakdown' },
    ],
  },
  {
    patterns: ['fraud', 'mastercard', 'payment', 'simulation'],
    response:
      "For the **Mastercard Innovation Challenge 2026**, Aryan is building a multi-phase payment fraud simulation system:\n\n- **Phase 1:** Pydantic schemas, a fraud taxonomy, and interface contracts\n- **Phase 2:** A PaymentBehaviorSimulator with behavioral archetypes, NHPP arrival modeling, and Polars/parquet output\n- **Phase 3 (in progress):** A red-team attack-generation engine built on top of the Phase 1 contracts and Phase 2 simulator",
    sources: [
      { title: 'Mastercard Fraud Simulation', type: 'project', slug: 'mastercard-fraud-sim', snippet: 'Multi-phase payment fraud simulation system' },
    ],
  },
  {
    patterns: ['compare', 'difference', 'vs', 'versus'],
    response:
      "Aryan's projects differ in focus and architecture:\n\n| Project | Focus | Key Element |\n|---------|-------|-----------|\n| RAG Chat Engine | Retrieval & Generation | Hybrid search + citation verification |\n| EDA Agent | Agentic Data Analysis | DuckDB + sandboxed LLM code execution |\n| M5 Forecasting | Time-Series ML | XGBoost + dual-input LSTM |\n| Mastercard Fraud Sim | Simulation & Security | Behavioral archetypes + red-team engine |\n| AI City Simulator | Multi-Agent Systems | Async multi-agent LLM orchestration |\n| Internship Tracker | Applied Automation | Hybrid search + CV matching |\n\nThe EDA Agent and RAG Chat Engine show the most engineering depth around agent reliability (sandboxing, HITL, citation checks); the AI City Simulator shows the deepest multi-agent orchestration work.",
    sources: [
      { title: 'RAG Chat Engine', type: 'project', slug: 'Chat-Engine', snippet: 'Retrieval-augmented generation' },
      { title: 'EDA Agent', type: 'project', slug: 'eda-agent', snippet: 'Agentic EDA platform' },
      { title: 'M5 Forecasting', type: 'project', slug: 'm5-forecasting', snippet: 'Demand forecasting' },
      { title: 'AI City Simulator', type: 'project', slug: 'AI-City-Simulator', snippet: 'Multi-agent orchestration' },
    ],
  },
  {
    patterns: ['agent', 'multi-agent', 'orchestration', 'city simulator'],
    response:
      "Aryan's multi-agent work is best represented by the **AI City Simulator** — an async multi-agent LLM orchestration system with a sliding-window rate limiter, API key pool, and batch scheduler. It uses ChromaDB for agent memory (RAG), implements Sheriff/jail mechanics, save/load persistence, and a Chart.js dashboard for observing simulated agent behavior.\n\nThe **EDA Agent** also uses a LangGraph tool-using agent architecture with human-in-the-loop checkpoints for a different domain — automated data analysis.",
    sources: [
      { title: 'AI City Simulator', type: 'project', slug: 'AI-City-Simulator', snippet: 'Async multi-agent LLM orchestration with ChromaDB memory' },
      { title: 'EDA Agent', type: 'project', slug: 'eda-agent', snippet: 'LangGraph tool-using data analysis agent' },
    ],
  },
  {
    patterns: ['experience', 'work', 'internship', 'job', 'career'],
    response:
      "Aryan's professional experience:\n\n**Research Intern (Data Analysis) at Cambridge Judge Business School** (Mar – Sept 2025, remote)\n- Built a 20k+ entry, 30+ feature dataset using BeautifulSoup and LLM-assisted automation\n- Used ChatGPT to validate, enrich, and extract structured insights from large-scale web-scraped data\n- Collaborated with a multidisciplinary team on preprocessing, feature engineering, and exploratory analysis\n\nHe's also actively applying to further internships, tracked via his own automated Internship Tracker agent.",
    sources: [
      { title: 'Resume — Experience', type: 'resume', snippet: 'Cambridge Judge Business School research internship' },
    ],
  },
  {
    patterns: ['education', 'school', 'university', 'degree', 'study'],
    response:
      "Aryan is a third-year **B.Tech (Hons) student in Ocean Engineering and Naval Architecture** at IIT Kharagpur (2024–2028), with a Minor in Artificial Intelligence, currently at a 7.66 CGPA. He's pivoting toward Agentic AI and Data Science.\n\nRelevant coursework includes Foundations of Large Language Models, Programming and Data Structures, Essentials of Machine Learning, Probability and Statistics, and Linear Algebra.",
    sources: [
      { title: 'Resume — Education', type: 'resume', snippet: 'B.Tech Ocean Engineering & Naval Architecture, AI Minor, IIT Kharagpur' },
    ],
  },
  {
    patterns: ['competitive programming', 'codeforces', 'dsa', 'algorithm'],
    response:
      "Aryan has a strong competitive programming background — an all-time highest Codeforces rating of **1754 (Expert)** under handle **aryan_shah26**. He's also worked specifically on building dynamic-programming intuition alongside his core DSA practice.",
    sources: [
      { title: 'Resume — Achievements', type: 'resume', snippet: 'Codeforces Expert, rating 1754' },
    ],
  },
];

export function findBestResponse(query: string): AIKnowledgeEntry | null {
  const queryTerms = tokenize(query);
  if (queryTerms.length === 0) return null;

  const documents = aiKnowledgeBase.map((entry) => tokenize([
    entry.patterns.join(' '),
    entry.response,
    entry.sources.map((source) => `${source.title} ${source.snippet}`).join(' '),
  ].join(' ')));
  const documentFrequency = new Map<string, number>();

  documents.forEach((terms) => {
    new Set(terms).forEach((term) => {
      documentFrequency.set(term, (documentFrequency.get(term) || 0) + 1);
    });
  });

  const averageDocumentLength = documents.reduce((total, terms) => total + terms.length, 0) / documents.length;
  const queryCounts = countTerms(queryTerms);
  let bestMatch: AIKnowledgeEntry | null = null;
  let bestScore = 0;

  documents.forEach((terms, index) => {
    const termCounts = countTerms(terms);
    const documentLength = terms.length;
    let score = 0;

    queryCounts.forEach((queryCount, term) => {
      const termFrequency = termCounts.get(term) || 0;
      if (!termFrequency) return;

      const frequency = Math.log(1 + termFrequency);
      const inverseDocumentFrequency = Math.log(
        1 + (documents.length - (documentFrequency.get(term) || 0) + 0.5) /
          ((documentFrequency.get(term) || 0) + 0.5)
      );
      const lengthNormalization = 1 - 0.75 + 0.75 * (documentLength / averageDocumentLength);
      score += inverseDocumentFrequency * ((frequency * 2.2) / lengthNormalization) * Math.min(queryCount, 2);
    });

    const matchedPatterns = aiKnowledgeBase[index].patterns.filter((pattern) => {
      const patternTerms = tokenize(pattern);
      return patternTerms.length > 0 && patternTerms.every((term) => queryTerms.includes(term));
    });
    score += matchedPatterns.length * 1.5;

    if (score > bestScore) {
      bestScore = score;
      bestMatch = aiKnowledgeBase[index];
    }
  });

  return bestScore >= 1.5 ? bestMatch : null;
}

const STOP_WORDS = new Set([
  'a', 'about', 'an', 'and', 'are', 'aryan', 'can', 'do', 'does', 'for',
  'his', 'how', 'i', 'in', 'is', 'me', 'of', 'on', 'or', 'tell', 'the',
  'their', 'this', 'to', 'use', 'what', 'which', 'who', 'with', 'would',
]);

function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9+#]+/g, ' ')
    .split(/\s+/)
    .map((term) => stem(term))
    .filter((term) => term.length > 1 && !STOP_WORDS.has(term));
}

function stem(term: string): string {
  if (term.endsWith('ies') && term.length > 4) return `${term.slice(0, -3)}y`;
  if (term.endsWith('ing') && term.length > 5) return term.slice(0, -3);
  if (term.endsWith('ed') && term.length > 4) return term.slice(0, -2);
  if (term.endsWith('s') && !term.endsWith('ss') && term.length > 3) return term.slice(0, -1);
  return term;
}

function countTerms(terms: string[]): Map<string, number> {
  return terms.reduce((counts, term) => {
    counts.set(term, (counts.get(term) || 0) + 1);
    return counts;
  }, new Map<string, number>());
}

export async function getAIKnowledgeBase(): Promise<AIKnowledgeEntry[]> {
  return aiKnowledgeBase;
}
