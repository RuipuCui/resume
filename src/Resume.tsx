import { type ReactNode, useEffect, useRef, useState } from 'react';
import {
  Award,
  Briefcase,
  Code,
  Github,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  Phone,
  Trophy,
  Zap,
} from 'lucide-react';

export type ResumeVariant = 'default' | 'ai' | 'data' | 'cloud' | 'c';

type LinkItem = {
  label: string;
  href: string;
  icon?: 'github' | 'globe';
};

type TimelineItem = {
  title: string;
  role?: string;
  date?: string;
  organization?: string;
  meta?: string;
  links?: LinkItem[];
  tags: string[];
  bullets?: string[];
  description?: string;
};

type ResumeCopy = {
  title: string;
  summary: string;
  skills: {
    languages: string[];
    frontend: string[];
    backend: string[];
    devops: string[];
  };
  capabilities: string[];
  work: {
    researchAssistant: string[];
    receipt: string[];
    freelance: string[];
    smartchip: string[];
  };
  projects: TimelineItem[];
  cProjects?: TimelineItem[];
};

const baseProjects: TimelineItem[] = [
  {
    title: 'Quantum Max Learning Platform',
    role: 'AI Engineer',
    date: '01/2026 ~ 03/2026',
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'OpenAI API'],
    description:
      'Built AI-powered learning workflows for a university platform, including slide-to-knowledge-unit generation, AI-assisted quiz creation, and contextual student chat over course content.',
  },
  {
    title: 'University Major Prospects Analysis',
    role: 'Cloud Developer',
    date: '03/2025 ~ 06/2025',
    links: [
      {
        label: 'View Code',
        href: 'https://github.com/RuipuCui/Univerisity-major-prospects-for-Engineering-and-IT-in-Australia',
        icon: 'github',
      },
    ],
    tags: ['Python', 'Kubernetes', 'Fission', 'Docker', 'ElasticSearch', 'PyTorch'],
    description:
      'Built a cloud-native data pipeline to analyse social media sentiment (Mastodon/Reddit) regarding IT majors. Implemented serverless harvesters, an NLP sentiment analysis service, and an interactive frontend using Jupyter/Voila on Kubernetes.',
  },
  {
    title: 'Shared Whiteboard (Java RMI)',
    role: 'Java Developer',
    date: '03/2025 ~ 06/2025',
    links: [
      {
        label: 'View Code',
        href: 'https://github.com/RuipuCui/Share_Canva_Board',
        icon: 'github',
      },
    ],
    tags: ['Java', 'RMI', 'Swing', 'Multithreading'],
    description:
      'Built a distributed real-time collaborative system using Java RMI, implementing concurrency control and synchronized multi-user state management. Features include synchronized multi-user drawing, chat functionality, and administrative controls with robust state synchronization.',
  },
];

const cProjects: TimelineItem[] = [
  {
    title: 'Image Processing',
    tags: ['C', 'BMP', 'Binary Data', 'Bit Depth', 'Bit-wise Operations', 'Image Filters'],
    links: [{ label: 'View Code', href: 'https://github.com/RuipuCui', icon: 'github' }],
    bullets: [
      'Built a BMP image-processing library in C that reads/writes raw binary image data, parses headers and bit depth, and manages 8-bit grayscale and 24-bit RGB pixel buffers.',
      'Implemented pixel-level transformations including blur, brightness adjustment, grayscale conversion, black-white thresholding, sepia filtering, and 90-degree rotation using low-level byte and bit-wise operations.',
    ],
  },
  {
    title: 'Systems Programming Projects',
    tags: ['C', 'Systems Programming', 'Memory Management', 'IMAP', 'TLS'],
    links: [{ label: 'View Code', href: 'https://github.com/RuipuCui', icon: 'github' }],
    bullets: [
      'Completed a computer systems project involving memory management, data representation, and low-level operations.',
      'Built a command-line IMAP email client in C, supporting both plain and TLS-encrypted connections.',
    ],
  },
  { ...baseProjects[2], role: undefined },
];

const defaultCopy: ResumeCopy = {
  title: 'Software Engineer',
  summary:
    'MIT student at the University of Melbourne with strong hands-on industry experience building full-stack products. Strong focus on scalable systems, practical problem-solving, and delivering polished user-facing solutions.',
  skills: {
    languages: ['Python', 'Java', 'C/C++', 'JavaScript', 'TypeScript', 'SQL'],
    frontend: ['React', 'React Native', 'Vue.js'],
    backend: ['Node.js', 'Express.js', 'Flask', 'PostgreSQL', 'Redis', 'ElasticSearch'],
    devops: ['AWS', 'Docker', 'Kubernetes', 'OpenAI API'],
  },
  capabilities: [
    'Full-Stack Architecture',
    'Cloud-Native Development',
    'Multi-Agent AI Systems',
    'UI/UX Design',
    'Agile Leadership',
    'System Optimization',
    'Cross-Platform Development',
  ],
  work: {
    researchAssistant: [
      'Developed and maintained a full-stack educational assessment platform (Vue.js, Vite, Python, Flask) for creating, delivering, and grading interactive logic-based questions.',
      'Built and integrated frontend-backend workflows for autograding, rubric editing, student answer retrieval, and ExNet/ExFlow question management.',
      'Investigated and fixed cross-repository bugs involving API contracts, malformed data handling, and graph rendering/state synchronization.',
    ],
    receipt: [
      'Built and maintained core business logic in the 1Receipt Node.js/Express API and the React Native shopper app, supporting receipt retrieval, tagging, local receipt sync, file/PDF upload, loyalty-card barcode flows, and wallet-ready user experiences.',
      'Worked across AWS-backed platform services and mobile authentication/integration layers, using EC2, Lambda, DynamoDB, Cognito, S3, and SQS for receipt/media handling, async processing, and backend workflows.',
      'Continued as a part-time contractor to extend the API and shopper app while adding the retailer tablet POS Manager for digital receipt processing and retailer operations.',
      'Contributed retailer-facing features spanning retailer onboarding, ABN validation, receipt creation, shopper ID validation, and Clover POS integration through a custom native module.',
    ],
    freelance: [
      'Delivered custom React/Vite platforms for furniture, building materials, and AI/education clients.',
      'Built catalog and CMS systems with admin dashboards, Express APIs, and Supabase-backed data and media workflows.',
      'Implemented product discovery, gated portals, contact flows, AI chat/voice features, and bilingual responsive UI systems.',
    ],
    smartchip: [
      'Designed and simulated EV Charging Load Management algorithms, ensuring stable performance under infrastructure capacity limits and contributing to patent applications.',
      'Collaborated with senior developers to implement C programs to simulate LMS algorithms.',
      'Participated in multiple formal documents including patent applications and technical proposals.',
    ],
  },
  projects: baseProjects,
};

const variantCopy: Record<ResumeVariant, ResumeCopy> = {
  default: defaultCopy,
  ai: {
    ...defaultCopy,
    title: 'Software Engineer',
    summary:
      'MIT student and full-stack engineer focused on AI-enabled products, LLM workflows, NLP-backed analysis, and practical automation. Strong experience connecting model-driven features with production web, mobile, and backend systems.',
    skills: {
      ...defaultCopy.skills,
      languages: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'Java', 'C/C++'],
      devops: ['OpenAI API', 'Python NLP', 'PyTorch', 'AWS', 'Docker', 'Kubernetes'],
    },
    capabilities: [
      'LLM Product Integration',
      'AI-Assisted Learning Systems',
      'NLP Sentiment Analysis',
      'Full-Stack Architecture',
      'Cloud-Native Development',
      'System Optimization',
      'Cross-Platform Development',
    ],
    work: {
      ...defaultCopy.work,
      researchAssistant: [
        'Developed a full-stack educational assessment platform where structured question models, autograding flows, and graph-based logic exercises support intelligent learning workflows.',
        'Built frontend-backend workflows for rubric editing, student answer retrieval, ExNet/ExFlow question management, and automated grading feedback.',
        'Debugged malformed assessment data, graph rendering, and state synchronization issues across repositories to improve reliability of model-driven learning content.',
      ],
      receipt: [
        'Built Node.js/Express and React Native features for receipt capture, tagging, PDF upload, loyalty-card barcode flows, and structured transaction data.',
        'Implemented LLM-based PDF OCR workflows to extract receipt information from uploaded PDF receipts and turn unstructured documents into usable transaction data.',
        'Integrated AWS-backed services including Lambda, DynamoDB, Cognito, S3, and SQS to support asynchronous receipt/media processing and production backend workflows.',
        'Extended shopper and retailer tablet apps with operational flows for receipt creation, shopper validation, and Clover POS integration.',
      ],
      freelance: [
        'Delivered React/Vite products for AI/education and commercial clients, including AI chat/voice features and responsive bilingual interfaces.',
        'Built admin dashboards, Express APIs, and Supabase-backed content/data workflows to support AI-assisted product discovery and customer interaction flows.',
        'Translated ambiguous client requirements into polished web experiences with gated portals, CMS tooling, and model-backed interaction patterns.',
      ],
    },
    projects: [
      {
        ...baseProjects[0],
        tags: ['React', 'TypeScript', 'Node.js', 'FastAPI', 'OpenAI API', 'Gemini', 'Supabase'],
        bullets: [
          'Built the AI kernel that converts lecture-slide PDFs into structured Knowledge Units using pypdf extraction, prompt templates, OpenAI Responses API, strict JSON validation, and source page metadata.',
          'Implemented AI-assisted course authoring flows where teachers upload raw materials, generate editable KUs, approve/publish weekly content, and persist generated outputs through the Node API and Supabase.',
          'Added AI quiz and media generation pipelines from approved KUs, including OpenAI-generated quizzes, Gemini visual generation, Minimax TTS, ffmpeg video composition, task tracking, and Supabase image/video storage.',
        ],
      },
      {
        ...baseProjects[1],
        description:
          'Built an NLP sentiment-analysis pipeline over Mastodon/Reddit data, combining Python harvesters, PyTorch-based analysis, ElasticSearch indexing, and an interactive Jupyter/Voila frontend.',
      },
      baseProjects[2],
    ],
  },
  data: {
    ...defaultCopy,
    title: 'Software Engineer',
    summary:
      'MIT student and full-stack engineer focused on data-intensive applications, ETL-style processing, database-backed products, and reliable data flows across web, mobile, and cloud services.',
    skills: {
      ...defaultCopy.skills,
      languages: ['Python', 'SQL', 'JavaScript', 'TypeScript', 'Java', 'C/C++'],
      backend: ['PostgreSQL', 'ElasticSearch', 'DynamoDB', 'Node.js', 'Express.js', 'Flask'],
      devops: ['AWS', 'S3', 'SQS', 'Docker', 'Kubernetes', 'OpenAI API'],
    },
    capabilities: [
      'Data Processing Pipelines',
      'Database-Backed Systems',
      'Search and Indexing',
      'Backend API Design',
      'Cloud-Native Development',
      'System Optimization',
      'Cross-Platform Development',
    ],
    work: {
      ...defaultCopy.work,
      researchAssistant: [
        'Maintained a full-stack assessment platform with structured question data, student answer retrieval, rubric storage, and reliable frontend-backend data contracts.',
        'Built workflows for autograding, ExNet/ExFlow question management, and graph/state data synchronization across Vue, Flask, and Python services.',
        'Investigated malformed data handling and cross-repository API issues to improve consistency of assessment records and rendered graph outputs.',
      ],
      receipt: [
        'Built receipt retrieval, tagging, local sync, file/PDF upload, and shopper validation flows that move structured receipt and retailer data through mobile and backend systems.',
        'Used DynamoDB, S3, SQS, Lambda, Cognito, and Node.js services to support receipt/media storage, asynchronous processing, authentication, and production data workflows.',
        'Extended retailer operations with ABN validation, receipt creation, Clover POS integration, and tablet workflows for reliable transaction capture.',
      ],
      freelance: [
        'Built catalog, CMS, and admin dashboard systems with structured product data, media management, Supabase storage, and Express API workflows.',
        'Implemented product discovery, gated portals, contact flows, and bilingual responsive interfaces backed by maintainable data models.',
        'Delivered client platforms where content updates, media assets, and customer interactions could be managed without developer intervention.',
      ],
    },
    projects: [
      {
        ...baseProjects[1],
        role: 'Data Engineer',
        description:
          'Built a data pipeline to collect, process, index, and analyse Mastodon/Reddit sentiment about IT majors, using Python harvesters, ElasticSearch, NLP analysis, and Jupyter/Voila visualisation.',
      },
      {
        ...baseProjects[0],
        description:
          'Built course-content processing workflows that transform slide material into structured knowledge units, quizzes, and contextual chat data for students.',
      },
      baseProjects[2],
    ],
  },
  cloud: {
    ...defaultCopy,
    title: 'Software Engineer',
    summary:
      'MIT student and software engineer focused on cloud-native systems, backend infrastructure, serverless workflows, and scalable product delivery across AWS, Docker, and Kubernetes environments.',
    skills: {
      ...defaultCopy.skills,
      backend: ['Node.js', 'Express.js', 'Flask', 'PostgreSQL', 'DynamoDB', 'ElasticSearch'],
      devops: ['AWS', 'Lambda', 'S3', 'SQS', 'Cognito', 'Docker', 'Kubernetes', 'Fission'],
    },
    capabilities: [
      'Cloud-Native Development',
      'Serverless Workflows',
      'AWS Service Integration',
      'Containerized Deployment',
      'Backend API Design',
      'System Optimization',
      'Cross-Platform Development',
    ],
    work: {
      ...defaultCopy.work,
      researchAssistant: [
        'Maintained a Dockerized Vue/Python/Flask assessment platform with clear API boundaries between frontend workflows and backend grading services.',
        'Built and integrated backend workflows for autograding, student answer retrieval, rubric editing, and question management with reliability across repositories.',
        'Resolved API contract, data handling, and graph synchronization issues that affected platform stability and deployment confidence.',
      ],
      receipt: [
        'Built backend and mobile features on top of AWS-backed services, using EC2, Lambda, DynamoDB, Cognito, S3, and SQS for authentication, receipt/media handling, and async processing.',
        'Maintained Node.js/Express APIs and React Native apps that supported receipt retrieval, file/PDF upload, loyalty-card flows, and retailer operations at production scale.',
        'Extended the retailer tablet POS Manager with onboarding, ABN validation, receipt creation, shopper validation, and Clover POS integration.',
      ],
      freelance: [
        'Delivered React/Vite and Express platforms deployed through modern web hosting and backend service workflows.',
        'Built Supabase-backed catalog, CMS, and admin dashboard systems with structured media handling and maintainable API boundaries.',
        'Implemented client-facing portals, contact workflows, and AI chat/voice features with pragmatic deployment and support practices.',
      ],
    },
    projects: [
      {
        ...baseProjects[1],
        tags: ['Python', 'Kubernetes', 'Fission', 'Docker', 'Redis', 'KEDA', 'ElasticSearch', 'PyTorch'],
        bullets: [
          'Designed a Kubernetes/Fission data pipeline with scheduled Reddit and Mastodon harvesters, Kubernetes secrets, and Fission routes/timers for historical and daily social-media collection.',
          'Connected serverless functions through Redis queues and KEDA MQ triggers: raw posts were enqueued, enriched by a custom Docker/PyTorch Fission environment, then indexed into Elasticsearch observations.',
          'Built Elasticsearch-backed API functions for top mentions, sentiment-ranked majors, topic associations, and a Jupyter/Voila frontend for interactive cloud-hosted analytics.',
        ],
      },
      baseProjects[0],
      baseProjects[2],
    ],
  },
  c: {
    ...defaultCopy,
    title: 'Software Engineer',
    summary:
      'MIT student at the University of Melbourne with hands-on experience across systems programming, full-stack products, distributed systems, and practical software delivery.',
    skills: {
      ...defaultCopy.skills,
      languages: ['Python', 'Java', 'C/C++', 'JavaScript', 'TypeScript', 'SQL'],
      devops: ['AWS', 'Docker', 'Kubernetes', 'OpenAI API'],
    },
    capabilities: [
      'Systems Programming',
      'Memory Management',
      'Distributed Systems',
      'Full-Stack Architecture',
      'Cloud-Native Development',
      'System Optimization',
      'Cross-Platform Development',
    ],
    work: {
      ...defaultCopy.work,
      smartchip: [
        'Designed and simulated EV Charging Load Management algorithms with C/C++-oriented simulation work under infrastructure capacity limits.',
        'Collaborated with senior developers to implement C programs for LMS algorithm simulation and technical validation.',
        'Contributed to patent application and technical proposal documentation for algorithmic load-management work.',
      ],
    },
    projects: baseProjects,
    cProjects,
  },
};

const getCopy = (variant: ResumeVariant) => variantCopy[variant] || variantCopy.default;

const renderIcon = (icon?: LinkItem['icon']) => {
  if (icon === 'github') return <Github size={10} />;
  return <Globe size={10} />;
};

const SectionTitle = ({
  icon,
  children,
  className = '',
}: {
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}) => (
  <div className={`flex items-center gap-2 mb-3 text-[#0e5b9e] ${className}`}>
    {icon}
    <h3 className="text-lg font-bold uppercase tracking-wide">{children}</h3>
  </div>
);

const TagList = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-wrap gap-1.5 mb-1">
    {tags.map((tag) => (
      <span
        key={tag}
        className="bg-blue-50 text-blue-700 text-[10px] px-1.5 py-0.5 rounded border border-blue-100"
      >
        {tag}
      </span>
    ))}
  </div>
);

const TimelineEntry = ({ item }: { item: TimelineItem }) => (
  <div className="relative">
    <div className="absolute -left-[31px] top-1.5 bg-white border-2 border-[#0e5b9e] w-4 h-4 rounded-full"></div>
    <div className="flex justify-between items-baseline mb-1 gap-2">
      <div>
        <h4 className="font-bold text-gray-900 leading-tight text-[15px]">{item.title}</h4>
        {item.role && (
          <div className="mt-0.5 text-[13px] font-semibold leading-tight text-gray-700">
            {item.role}
          </div>
        )}
      </div>
      {item.date && (
        <span className="text-[13px] text-[#0e5b9e] font-semibold whitespace-nowrap">
          {item.date}
        </span>
      )}
    </div>
    {item.organization && (
      <h5 className="font-semibold text-gray-700 mb-1 text-[13px]">{item.organization}</h5>
    )}
    {item.meta && <div className="text-[11px] text-slate-500 mb-1 font-medium">{item.meta}</div>}
    {item.links && (
      <div className="flex gap-2 flex-wrap mb-1">
        {item.links.map((link) => (
          <a
            key={`${link.label}-${link.href}`}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"
          >
            {renderIcon(link.icon)}
            {link.label}
          </a>
        ))}
      </div>
    )}
    <TagList tags={item.tags} />
    {item.bullets ? (
      <ul className="list-disc list-outside ml-4 text-[13px] text-gray-600 space-y-0.5 leading-snug">
        {item.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    ) : (
      <p className="text-[13px] text-gray-600">{item.description}</p>
    )}
  </div>
);

const Timeline = ({ items }: { items: TimelineItem[] }) => (
  <div className="space-y-4 relative border-l-2 border-slate-200 ml-3 pl-6 pb-2">
    {items.map((item) => (
      <TimelineEntry key={item.title} item={item} />
    ))}
  </div>
);

const SkillGroup = ({
  title,
  items,
  className,
}: {
  title: string;
  items: string[];
  className: string;
}) => (
  <div>
    <h4 className="font-semibold text-gray-800 mb-1 text-[13px]">{title}</h4>
    <div className="flex flex-wrap gap-2">
      {items.map((skill) => (
        <span key={skill} className={`${className} text-white text-[11px] px-2 py-1 rounded`}>
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const buildWorkItems = (copy: ResumeCopy): Record<
  'researchAssistant' | 'receipt' | 'freelance' | 'smartchip',
  TimelineItem
> => ({
  researchAssistant: {
    title: 'Research Assistant (Full-Stack Developer)',
    date: '12/2025 ~ Now',
    organization: 'University of Melbourne - Part-Time',
    links: [{ label: 'View Project', href: 'https://biologic.substack.com/', icon: 'globe' }],
    tags: ['Vue.js', 'JavaScript', 'Python', 'Flask', 'HTML/CSS', 'Docker'],
    bullets: copy.work.researchAssistant,
  },
  receipt: {
    title: 'Full-Stack Developer',
    date: '07/2025 ~ 05/2026',
    organization: '1Receipt - Melbourne, Australia',
    meta: 'Internship (07/2025 ~ Now) - Part-Time Contractor (12/2025 ~ 05/2026)',
    tags: ['React Native', 'Javascript', 'Node.js', 'AWS', 'Python', 'Clover SDK'],
    bullets: copy.work.receipt,
  },
  freelance: {
    title: 'Freelance Full-Stack Developer',
    date: '11/2025 ~ 01/2026',
    organization: 'Self-Employed - Freelance',
    links: [
      { label: 'Solidoro', href: 'https://www.solidoro.com.au/', icon: 'globe' },
      { label: 'Solidoro App', href: 'https://solidoro-web-iota.vercel.app/', icon: 'globe' },
      { label: 'Mirror Studio', href: 'https://mirror-studio-jade.vercel.app/', icon: 'globe' },
    ],
    tags: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'Express.js', 'HTML/CSS'],
    bullets: copy.work.freelance,
  },
  smartchip: {
    title: 'Software Development Internship',
    date: '12/2024 ~ 02/2025',
    organization: 'Beijing Smartchip Microelectronics Technology - Beijing, China',
    tags: ['C/C++'],
    bullets: copy.work.smartchip,
  },
});

const Sidebar = ({ copy }: { copy: ResumeCopy }) => (
  <div className="w-full md:w-1/3 space-y-6 print:w-1/3 print:text-sm">
    <section>
      <SectionTitle icon={<Code size={20} />}>Skills</SectionTitle>
      <div className="space-y-4">
        <SkillGroup title="Programming Languages" items={copy.skills.languages} className="bg-[#0e5b9e]" />
        <SkillGroup title="Front-end" items={copy.skills.frontend} className="bg-sky-600" />
        <SkillGroup title="Back-end & Databases" items={copy.skills.backend} className="bg-sky-700" />
        <SkillGroup title="DevOps & AI" items={copy.skills.devops} className="bg-slate-600" />
      </div>
    </section>

    <section className="mt-8">
      <SectionTitle icon={<Zap size={20} />}>Proven Capability</SectionTitle>
      <div className="flex flex-wrap gap-2">
        {copy.capabilities.map((skill) => (
          <span key={skill} className="bg-indigo-500 text-white text-[11px] px-2 py-1 rounded">
            {skill}
          </span>
        ))}
      </div>
    </section>

    <section className="mt-6">
      <SectionTitle icon={<Trophy size={20} />}>Certifications</SectionTitle>
      <div className="space-y-2">
        <div className="bg-amber-50 border border-amber-200 rounded p-2">
          <p className="font-semibold text-gray-900 text-[12px]">AWS Certified Cloud Practitioner</p>
          <p className="text-[11px] text-gray-600">Amazon Web Services</p>
        </div>
      </div>
    </section>
  </div>
);

const EducationAndActivities = () => (
  <div className="w-full md:w-1/3 space-y-6 print:w-1/3 print:text-sm">
    <section>
      <SectionTitle icon={<GraduationCap size={20} />}>Education</SectionTitle>
      <div className="space-y-4">
        <div>
          <h4 className="font-bold text-gray-900 text-[15px]">Master of Information Technology</h4>
          <div className="text-[13px] text-gray-600">University of Melbourne</div>
          <div className="text-[11px] text-[#0e5b9e] font-semibold mt-1 mb-2">03/2025 ~ 07/2026</div>
          <div className="text-[11px] text-gray-500 italic leading-relaxed">
            Relevant Coursework: Distributed Systems, Cluster and Cloud Computing, Distributed Algorithms, NLP, Machine Learning, Advanced Database, Mobile Computing, Software Processes.
          </div>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-[15px]">Bachelor of Science</h4>
          <div className="text-[13px] text-gray-600">University of Melbourne</div>
          <div className="text-[11px] text-[#0e5b9e] font-semibold mt-1 mb-2">02/2022 ~ 12/2024</div>
          <div className="text-[11px] text-gray-500 italic leading-relaxed">
            Relevant Coursework: Artificial Intelligence, Models of Computation, Software Modelling and Design, Computer Systems, Algorithms and Data Structures, Object Oriented Software Development.
          </div>
        </div>
      </div>
    </section>

    <section>
      <SectionTitle icon={<Award size={20} />}>Extra-Curricular</SectionTitle>
      <div className="space-y-4">
        <div>
          <h4 className="font-bold text-gray-900 text-[15px]">HackMelbourne Club</h4>
          <div className="text-[13px] text-gray-800 italic">Hackathon Officer</div>
          <div className="text-[11px] text-[#0e5b9e] font-semibold mt-1 mb-2">07/2025 ~ 11/2025</div>
          <ul className="text-[13px] text-gray-600 list-disc ml-4 space-y-0.5 leading-snug">
            <li>Collaborated and communicated with cross-functional teams.</li>
            <li>Co-organised university hackathon with 150+ participants, managing platform development and event logistics.</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-[15px]">AWS User Group Melbourne</h4>
          <div className="text-[13px] text-gray-800 italic">Community Member & Presenter</div>
          <div className="text-[11px] text-[#0e5b9e] font-semibold mt-1 mb-2">06/2026 ~ Now</div>
          <ul className="text-[13px] text-gray-600 list-disc ml-4 space-y-0.5 leading-snug">
            <li>Attend monthly meetups to exchange AWS ecosystem knowledge with Melbourne cloud practitioners.</li>
            <li>Volunteer as a one-time presenter, contributing to community knowledge sharing and technical discussion.</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
);

const Resume = ({ variant = 'default' }: { variant?: ResumeVariant }) => {
  const copy = getCopy(variant);
  const workItems = buildWorkItems(copy);
  const [page, setPage] = useState(1);
  const wheelDeltaRef = useRef(0);
  const isSwitchingRef = useRef(false);
  const scrollBoundaryBuffer = 4;
  const pageSwitchThreshold = 80;
  const isCVariant = variant === 'c';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    wheelDeltaRef.current = 0;
  }, [page]);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (isSwitchingRef.current) {
      event.preventDefault();
      return;
    }

    const scrollElement = document.scrollingElement || document.documentElement;
    const scrollTop = scrollElement.scrollTop;
    const maxScrollTop = scrollElement.scrollHeight - scrollElement.clientHeight;
    const isAtTop = scrollTop <= scrollBoundaryBuffer;
    const isAtBottom = scrollTop >= maxScrollTop - scrollBoundaryBuffer;
    const isScrollingDown = event.deltaY > 0;
    const isScrollingUp = event.deltaY < 0;
    const canSwitchDown = page === 1 && isScrollingDown && isAtBottom;
    const canSwitchUp = page === 2 && isScrollingUp && isAtTop;

    if (!canSwitchDown && !canSwitchUp) {
      wheelDeltaRef.current = 0;
      return;
    }

    wheelDeltaRef.current += event.deltaY;

    if (Math.abs(wheelDeltaRef.current) < pageSwitchThreshold) {
      return;
    }

    if (canSwitchDown) {
      event.preventDefault();
      isSwitchingRef.current = true;
      setPage(2);
    } else if (canSwitchUp) {
      event.preventDefault();
      isSwitchingRef.current = true;
      setPage(1);
    }

    window.setTimeout(() => {
      isSwitchingRef.current = false;
      wheelDeltaRef.current = 0;
    }, 520);
  };

  const page1Main = isCVariant ? (
    <>
      <section>
        <SectionTitle icon={<Briefcase size={20} />}>Project Experience</SectionTitle>
        <Timeline items={copy.cProjects || cProjects} />
      </section>
      <section>
        <SectionTitle icon={<Briefcase size={20} />}>Work Experience</SectionTitle>
        <Timeline items={[workItems.researchAssistant]} />
      </section>
    </>
  ) : (
    <section>
      <SectionTitle icon={<Briefcase size={20} />}>Work Experience</SectionTitle>
      <Timeline items={[workItems.researchAssistant, workItems.receipt, workItems.freelance]} />
    </section>
  );

  const page2Main = isCVariant ? (
    <>
      <section>
        <Timeline items={[workItems.receipt, workItems.freelance, workItems.smartchip]} />
      </section>
    </>
  ) : (
    <>
      <section>
        <Timeline items={[workItems.smartchip]} />
      </section>
      <section>
        <SectionTitle icon={<Briefcase size={20} />}>Project Experience</SectionTitle>
        <Timeline items={copy.projects} />
      </section>
    </>
  );

  return (
    <div onWheel={handleWheel} className="relative w-full min-h-screen overflow-hidden overflow-x-auto bg-gray-100 print:bg-white print:pb-0 md:min-h-[calc(297mm+4rem)]">
      <div className={`${page === 1 ? 'opacity-100 translate-y-0 scale-100 z-10' : 'pointer-events-none opacity-0 -translate-y-8 scale-[0.985] z-0'} absolute inset-0 w-full flex items-start justify-center px-0 py-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:px-6 md:py-8 print:relative print:inset-auto print:flex print:transform-none print:opacity-100 print:pointer-events-auto print:z-auto print:p-0`}>
        <div className="w-full md:w-[210mm] h-auto md:h-[297mm] min-h-screen md:min-h-[297mm] mx-auto bg-white shadow-lg print:shadow-none print:w-[210mm] print:h-[296mm] overflow-hidden text-gray-800 font-sans mb-0 print:mb-0 relative custom-page-break">
          <header className="bg-[#0e5b9e] text-white px-6 pt-6 pb-6 relative print:bg-[#0e5b9e] print:text-white print:-webkit-print-color-adjust: exact">
            <div className="flex flex-col md:flex-row justify-between items-start">
              <div className="mb-4 md:mb-0">
                <h1 className="text-4xl font-bold mb-2">Nolan Cui</h1>
                <h2 className="text-xl text-blue-100 mb-3">{copy.title}</h2>
                <p className="max-w-lg text-blue-50 text-[13px] leading-relaxed mb-2">{copy.summary}</p>
              </div>

              <div className="text-left md:text-right text-[12px] space-y-1.5 flex flex-col items-start md:items-end w-full md:w-auto">
                <div className="flex items-center gap-2">
                  <span>0472 567 745</span>
                  <Phone size={16} />
                </div>
                <div className="flex items-center gap-2">
                  <a href="mailto:ruipucui@gmail.com" className="hover:text-blue-200 break-all">ruipucui@gmail.com</a>
                  <Mail size={16} />
                </div>
                <div className="flex items-center gap-2 max-w-full">
                  <a href="https://www.linkedin.com/in/ruipu-cui-56bb831b8/" className="hover:text-blue-200 truncate md:whitespace-nowrap max-w-[280px] md:max-w-none" target="_blank" rel="noopener noreferrer">www.linkedin.com/in/ruipu-cui-56bb831b8/</a>
                  <Linkedin size={16} />
                </div>
                <div className="flex items-center gap-2">
                  <a href="https://github.com/RuipuCui" className="hover:text-blue-200" target="_blank" rel="noopener noreferrer">github.com/RuipuCui</a>
                  <Github size={16} />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-white" style={{ clipPath: 'ellipse(70% 60% at 50% 100%)' }}></div>
          </header>

          <div className="flex flex-col md:flex-row px-4 md:px-8 pb-20 md:pb-8 pt-6 md:pt-2 gap-6 md:gap-8 print:flex-row print:gap-6">
            <div className="w-full md:w-2/3 space-y-6 print:w-2/3">{page1Main}</div>
            <Sidebar copy={copy} />
          </div>

          <div className="absolute bottom-4 left-4 md:left-auto md:right-8 text-left md:text-right text-[13px] text-gray-400">
            Page 1 of 2
          </div>
        </div>
      </div>

      <div className={`${page === 2 ? 'opacity-100 translate-y-0 scale-100 z-10' : 'pointer-events-none opacity-0 translate-y-8 scale-[0.985] z-0'} absolute inset-0 w-full flex items-start justify-center px-0 py-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:px-6 md:py-8 print:relative print:inset-auto print:flex print:transform-none print:opacity-100 print:pointer-events-auto print:z-auto print:p-0`}>
        <div className="w-full md:w-[210mm] h-auto md:h-[297mm] min-h-screen md:min-h-[297mm] mx-auto bg-white shadow-lg print:shadow-none print:w-[210mm] print:h-[296mm] overflow-hidden text-gray-800 font-sans relative">
          <div className="h-16 w-full hidden md:block print:block"></div>

          <div className="flex flex-col md:flex-row px-4 md:px-8 pb-20 md:pb-8 pt-6 md:pt-0 gap-6 md:gap-8 print:flex-row print:gap-6">
            <div className="w-full md:w-2/3 space-y-6 print:w-2/3">{page2Main}</div>
            <EducationAndActivities />
          </div>

          <div className="absolute bottom-4 left-4 md:left-auto md:right-8 text-left md:text-right text-[13px] text-gray-400">
            Page 2 of 2
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
