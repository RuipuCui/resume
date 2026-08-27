import { type ReactNode, useEffect, useState } from 'react';
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
export type ResumeLanguage = 'en' | 'zh';

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
    atlastix: string[];
    researchAssistant: string[];
    receipt: string[];
    freelance: string[];
    smartchip: string[];
  };
  projects: TimelineItem[];
  cProjects?: TimelineItem[];
};

type ResumeUiText = {
  skills: string;
  programmingLanguages: string;
  frontend: string;
  backend: string;
  devops: string;
  provenCapability: string;
  certifications: string;
  workExperience: string;
  projectExperience: string;
  education: string;
  extracurricular: string;
  pageLabel: (page: number, total: number) => string;
  languageEnglish: string;
  languageChinese: string;
};

const uiText: Record<ResumeLanguage, ResumeUiText> = {
  en: {
    skills: 'Skills',
    programmingLanguages: 'Programming Languages',
    frontend: 'Front-end',
    backend: 'Back-end & Databases',
    devops: 'DevOps & AI',
    provenCapability: 'Proven Capability',
    certifications: 'Certifications',
    workExperience: 'Work Experience',
    projectExperience: 'Project Experience',
    education: 'Education',
    extracurricular: 'Extra-Curricular',
    pageLabel: (page, total) => `Page ${page} of ${total}`,
    languageEnglish: 'EN',
    languageChinese: '中文',
  },
  zh: {
    skills: '技能',
    programmingLanguages: '编程语言',
    frontend: '前端',
    backend: '后端与数据库',
    devops: 'DevOps 与 AI',
    provenCapability: '核心能力',
    certifications: '证书',
    workExperience: '工作经历',
    projectExperience: '项目经历',
    education: '教育背景',
    extracurricular: '课外活动',
    pageLabel: (page, total) => `第 ${page} 页，共 ${total} 页`,
    languageEnglish: 'EN',
    languageChinese: '中文',
  },
};

const zhText: Record<string, string> = {
  'AI Engineer': 'AI工程师',
  'Junior AI Engineer': '初级AI工程师',
  'Cloud Developer': '云开发工程师',
  'Java Developer': 'Java工程师',
  'Data Engineer': '数据工程师',
  'Research Assistant (Full-Stack Developer)': '研究助理（全栈开发）',
  'Full-Stack Developer': '全栈开发工程师',
  'Freelance Full-Stack Developer': '自由职业全栈开发工程师',
  'Software Development Internship': '软件开发实习生',
  'Quantum Max Learning Platform': 'Quantum Max 学习平台',
  'University Major Prospects Analysis': '大学专业前景分析',
  'Shared Whiteboard (Java RMI)': '共享白板（Java RMI）',
  'Image Processing': '图像处理',
  'Systems Programming Projects': '系统编程项目',
  'University of Melbourne': '墨尔本大学',
  'Atlastix - Melbourne, Australia': 'Atlastix - 澳大利亚墨尔本',
  '1Receipt - Melbourne, Australia': '1Receipt - 澳大利亚墨尔本',
  'Self-Employed - Freelance': '自由职业',
  'Beijing Smartchip Microelectronics Technology - Beijing, China': '北京智芯微电子科技有限公司 - 中国北京',
  'Master of Information Technology': '信息技术硕士',
  'Bachelor of Science': '理学学士',
  'HackMelbourne Club': 'HackMelbourne 社团',
  'Hackathon Officer': '黑客马拉松负责人',
  'AWS User Group Melbourne': '墨尔本 AWS 用户组',
  'Community Member & Presenter': '社区成员与分享者',
  'AWS Certified Cloud Practitioner': 'AWS 认证云从业者',
  'Amazon Web Services': '亚马逊云科技',
  'View Code': '查看代码',
  'View Project': '查看项目',
  'Internship (07/2025 ~ 07/2026) - junior software developer (12/2025 ~ 07/2026)':
    '实习（07/2025 ~ 07/2026）- 初级软件开发工程师（12/2025 ~ 07/2026）',
  'Recent Master of Information Technology graduate from the University of Melbourne with hands-on experience delivering enterprise AI platforms, client software solutions, and full-stack products. Strong in scalable systems, practical problem-solving, and translating complex requirements into polished user experiences.':
    '墨尔本大学信息技术硕士应届毕业生，具备企业级AI平台、客户软件解决方案与全栈产品交付经验。擅长可扩展系统开发、实际问题解决，以及将复杂需求转化为成熟用户体验。',
  'Recent Master of Information Technology graduate and software engineer focused on enterprise AI platforms, agent-assisted workflows, LLM integrations, and practical automation. Experienced in connecting AI capabilities with production web, mobile, and backend systems.':
    '信息技术硕士应届毕业生与软件工程师，专注于企业级AI平台、智能体辅助工作流、LLM集成与自动化落地，具备将AI能力接入生产级Web、移动端与后端系统的经验。',
  'Recent Master of Information Technology graduate and software engineer focused on data-intensive applications, processing pipelines, database-backed products, and reliable data flows across web, mobile, and cloud systems.':
    '信息技术硕士应届毕业生与软件工程师，专注于数据密集型应用、处理流水线、数据库驱动产品，以及跨Web、移动端与云系统的可靠数据流。',
  'Recent Master of Information Technology graduate and software engineer focused on cloud-native systems, backend infrastructure, serverless workflows, and scalable delivery across AWS, Docker, and Kubernetes environments.':
    '信息技术硕士应届毕业生与软件工程师，专注于云原生系统、后端基础设施、无服务器工作流，以及基于 AWS、Docker 和 Kubernetes 的可扩展交付。',
  'Recent Master of Information Technology graduate with hands-on experience across systems programming, full-stack products, distributed systems, and enterprise software delivery.':
    '信息技术硕士应届毕业生，具备系统编程、全栈产品、分布式系统与企业软件交付的实践经验。',
  'Full-Stack Architecture': '全栈架构',
  'Cloud-Native Development': '云原生开发',
  'Multi-Agent AI Systems': '多智能体 AI 系统',
  'Workflow Automation': '工作流自动化',
  'UI/UX Design': 'UI/UX 设计',
  'LLM Product Integration': 'LLM 产品集成',
  'AI-Assisted Learning Systems': 'AI 辅助学习系统',
  'NLP Sentiment Analysis': 'NLP 情感分析',
  'System Optimization': '系统优化',
  'Cross-Platform Development': '跨平台开发',
  'Data Processing Pipelines': '数据处理流水线',
  'Database-Backed Systems': '数据库驱动系统',
  'Search and Indexing': '搜索与索引',
  'Backend API Design': '后端 API 设计',
  'Serverless Workflows': '无服务器工作流',
  'AWS Service Integration': 'AWS 服务集成',
  'Containerized Deployment': '容器化部署',
  'Systems Programming': '系统编程',
  'Memory Management': '内存管理',
  'Distributed Systems': '分布式系统',
  'Develop automation workflows and AI-agent systems for an enterprise platform using React, TypeScript, FastAPI, PostgreSQL, Kafka, Temporal, Keycloak, and MCP.':
    '基于 React、TypeScript、FastAPI、PostgreSQL、Kafka、Temporal、Keycloak 和 MCP，为企业平台开发自动化工作流与 AI 智能体系统。',
  'Build agent-assisted workflow authoring across a visual canvas and custom DSL, including orchestration, validation, human approval, and reviewable execution changes.':
    '围绕可视化画布与自定义 DSL 构建智能体辅助工作流编排能力，覆盖调度编排、校验、人审流程与可审查的执行变更。',
  'Extend platform tooling with parser-backed autocomplete, variable tracing, reusable workflow components, execution overlays, and integrated AI chat to improve automation reliability and developer productivity.':
    '扩展平台工具链，包括基于解析器的自动补全、变量追踪、可复用工作流组件、执行态可视化与集成式 AI 对话，以提升自动化可靠性与开发效率。',
  'Work closely with customers and internal stakeholders to clarify requirements, communicate technical trade-offs, demonstrate progress, and translate operational needs into practical AI workflow solutions.':
    '与客户及内部相关方紧密协作，澄清需求、沟通技术权衡、展示阶段成果，并将业务流程需求转化为可落地的 AI 工作流方案。',
  'Developed and maintained a full-stack educational assessment platform (Vue.js, Vite, Python, Flask) for creating, delivering, and grading interactive logic-based questions.':
    '开发并维护基于 Vue.js、Vite、Python 与 Flask 的全栈教育评测平台，用于创建、发布和批改交互式逻辑题。',
  'Built and integrated frontend-backend workflows for autograding, rubric editing, student answer retrieval, and ExNet/ExFlow question management.':
    '构建并整合前后端工作流，支持自动评分、评分标准编辑、学生答案检索以及 ExNet/ExFlow 题目管理。',
  'Investigated and fixed cross-repository bugs involving API contracts, malformed data handling, and graph rendering/state synchronization.':
    '排查并修复跨仓库问题，包括 API 契约、异常数据处理以及图渲染与状态同步。',
  'Built and maintained core business logic in the 1Receipt Node.js/Express API and the React Native shopper app, supporting receipt retrieval, tagging, local receipt sync, file/PDF upload, loyalty-card barcode flows, and wallet-ready user experiences.':
    '在 1Receipt 的 Node.js/Express API 与 React Native 用户端中构建并维护核心业务逻辑，支持小票检索、标签管理、本地同步、文件/PDF 上传、会员卡条码流程与电子钱包体验。',
  'Worked across AWS-backed platform services and mobile authentication/integration layers, using EC2, Lambda, DynamoDB, Cognito, S3, and SQS for receipt/media handling, async processing, and backend workflows.':
    '参与基于 AWS 的平台服务与移动端认证/集成层开发，使用 EC2、Lambda、DynamoDB、Cognito、S3 与 SQS 支撑小票/媒体处理、异步任务与后端工作流。',
  'Continued as a junior software developer to extend the API and shopper app while adding the retailer tablet POS Manager for digital receipt processing and retailer operations.':
    '以初级软件开发工程师身份持续扩展 API 与用户端应用，并开发商户平板 POS 管理端以支持电子小票处理与运营流程。',
  'Contributed retailer-facing features spanning retailer onboarding, ABN validation, receipt creation, shopper ID validation, and Clover POS integration through a custom native module.':
    '参与商户侧功能开发，涵盖入驻流程、ABN 校验、小票创建、用户 ID 校验，以及通过自定义原生模块实现 Clover POS 集成。',
  'Delivered custom React/Vite platforms for furniture, building materials, and AI/education clients.':
    '为家具、建材及 AI/教育方向客户交付定制化 React/Vite 平台。',
  'Built catalog and CMS systems with admin dashboards, Express APIs, and Supabase-backed data and media workflows.':
    '构建目录与 CMS 系统，包含管理后台、Express API，以及基于 Supabase 的数据与媒体工作流。',
  'Implemented product discovery, gated portals, contact flows, AI chat/voice features, and bilingual responsive UI systems.':
    '实现产品检索、权限门户、线索联系流程、AI 聊天/语音功能，以及双语响应式 UI 系统。',
  'Designed and simulated EV Charging Load Management algorithms, ensuring stable performance under infrastructure capacity limits and contributing to patent applications.':
    '设计并仿真电动车充电负载管理算法，在基础设施容量限制下确保系统稳定，并参与专利申请工作。',
  'Collaborated with senior developers to implement C programs to simulate LMS algorithms.':
    '与高级开发人员合作，使用 C 语言实现 LMS 算法仿真程序。',
  'Participated in multiple formal documents including patent applications and technical proposals.':
    '参与多类正式技术文档编写，包括专利申请与技术方案。',
  'Developed a full-stack educational assessment platform where structured question models, autograding flows, and graph-based logic exercises support intelligent learning workflows.':
    '开发全栈教育评测平台，通过结构化题目模型、自动评分流程与图逻辑练习支持智能学习工作流。',
  'Built frontend-backend workflows for rubric editing, student answer retrieval, ExNet/ExFlow question management, and automated grading feedback.':
    '构建前后端工作流，支持评分标准编辑、学生答案检索、ExNet/ExFlow 题目管理与自动化反馈。',
  'Debugged malformed assessment data, graph rendering, and state synchronization issues across repositories to improve reliability of model-driven learning content.':
    '排查跨仓库中的异常评测数据、图渲染与状态同步问题，提升模型驱动学习内容的可靠性。',
  'Built Node.js/Express and React Native features for receipt capture, tagging, PDF upload, loyalty-card barcode flows, and structured transaction data.':
    '基于 Node.js/Express 与 React Native 开发小票采集、标签管理、PDF 上传、会员卡条码流程与结构化交易数据相关功能。',
  'Implemented LLM-based PDF OCR workflows to extract receipt information from uploaded PDF receipts and turn unstructured documents into usable transaction data.':
    '实现基于 LLM 的 PDF OCR 工作流，从上传的小票 PDF 中提取信息，并将非结构化文档转化为可用交易数据。',
  'Integrated AWS-backed services including Lambda, DynamoDB, Cognito, S3, and SQS to support asynchronous receipt/media processing and production backend workflows.':
    '集成 Lambda、DynamoDB、Cognito、S3 与 SQS 等 AWS 服务，支撑异步小票/媒体处理与生产级后端工作流。',
  'Extended shopper and retailer tablet apps with operational flows for receipt creation, shopper validation, and Clover POS integration.':
    '扩展用户端与商户平板应用，支持小票创建、用户校验与 Clover POS 集成等运营流程。',
  'Delivered React/Vite products for AI/education and commercial clients, including AI chat/voice features and responsive bilingual interfaces.':
    '为 AI/教育及商业客户交付 React/Vite 产品，包括 AI 聊天/语音功能与双语响应式界面。',
  'Built admin dashboards, Express APIs, and Supabase-backed content/data workflows to support AI-assisted product discovery and customer interaction flows.':
    '构建管理后台、Express API 与基于 Supabase 的内容/数据工作流，支撑 AI 辅助的产品检索与客户交互流程。',
  'Translated ambiguous client requirements into polished web experiences with gated portals, CMS tooling, and model-backed interaction patterns.':
    '将模糊的客户需求转化为成熟的 Web 体验，包括权限门户、CMS 工具与模型驱动的交互模式。',
  'Built the AI kernel that converts lecture-slide PDFs into structured Knowledge Units using pypdf extraction, prompt templates, OpenAI Responses API, strict JSON validation, and source page metadata.':
    '构建 AI 核心模块，使用 pypdf 提取、提示词模板、OpenAI Responses API、严格 JSON 校验与源页元数据，将课件 PDF 转换为结构化知识单元。',
  'Implemented AI-assisted course authoring flows where teachers upload raw materials, generate editable KUs, approve/publish weekly content, and persist generated outputs through the Node API and Supabase.':
    '实现 AI 辅助课程编写流程，支持教师上传原始资料、生成可编辑知识单元、审批/发布每周内容，并通过 Node API 与 Supabase 持久化生成结果。',
  'Added AI quiz and media generation pipelines from approved KUs, including OpenAI-generated quizzes, Gemini visual generation, Minimax TTS, ffmpeg video composition, task tracking, and Supabase image/video storage.':
    '基于已审批知识单元增加 AI 测验与媒体生成流水线，包括 OpenAI 生成测验、Gemini 图像生成、Minimax TTS、ffmpeg 视频合成、任务追踪与 Supabase 媒体存储。',
  'Built an NLP sentiment-analysis pipeline over Mastodon/Reddit data, combining Python harvesters, PyTorch-based analysis, ElasticSearch indexing, and an interactive Jupyter/Voila frontend.':
    '围绕 Mastodon/Reddit 数据构建 NLP 情感分析流水线，结合 Python 采集器、基于 PyTorch 的分析、ElasticSearch 索引与交互式 Jupyter/Voila 前端。',
  'Maintained a full-stack assessment platform with structured question data, student answer retrieval, rubric storage, and reliable frontend-backend data contracts.':
    '维护全栈评测平台，覆盖结构化题目数据、学生答案检索、评分标准存储，以及稳定的前后端数据契约。',
  'Built workflows for autograding, ExNet/ExFlow question management, and graph/state data synchronization across Vue, Flask, and Python services.':
    '在 Vue、Flask 与 Python 服务之间构建自动评分、ExNet/ExFlow 题目管理以及图/状态数据同步工作流。',
  'Investigated malformed data handling and cross-repository API issues to improve consistency of assessment records and rendered graph outputs.':
    '排查异常数据处理与跨仓库 API 问题，提升评测记录与图形渲染结果的一致性。',
  'Built receipt retrieval, tagging, local sync, file/PDF upload, and shopper validation flows that move structured receipt and retailer data through mobile and backend systems.':
    '构建小票检索、标签管理、本地同步、文件/PDF 上传与用户校验流程，在移动端与后端系统之间传递结构化小票与商户数据。',
  'Used DynamoDB, S3, SQS, Lambda, Cognito, and Node.js services to support receipt/media storage, asynchronous processing, authentication, and production data workflows.':
    '使用 DynamoDB、S3、SQS、Lambda、Cognito 与 Node.js 服务，支撑小票/媒体存储、异步处理、认证与生产数据工作流。',
  'Extended retailer operations with ABN validation, receipt creation, Clover POS integration, and tablet workflows for reliable transaction capture.':
    '扩展商户运营功能，包括 ABN 校验、小票创建、Clover POS 集成以及平板端交易录入流程。',
  'Built catalog, CMS, and admin dashboard systems with structured product data, media management, Supabase storage, and Express API workflows.':
    '构建目录、CMS 与管理后台系统，支持结构化商品数据、媒体管理、Supabase 存储与 Express API 工作流。',
  'Implemented product discovery, gated portals, contact flows, and bilingual responsive interfaces backed by maintainable data models.':
    '实现产品检索、权限门户、联系流程以及基于可维护数据模型的双语响应式界面。',
  'Delivered client platforms where content updates, media assets, and customer interactions could be managed without developer intervention.':
    '交付客户平台，使内容更新、媒体资源管理与客户交互可在无需开发者介入的情况下完成。',
  'Built a data pipeline to collect, process, index, and analyse Mastodon/Reddit sentiment about IT majors, using Python harvesters, ElasticSearch, NLP analysis, and Jupyter/Voila visualisation.':
    '构建数据流水线，采集、处理、索引并分析关于 IT 专业的 Mastodon/Reddit 情感数据，使用 Python 采集器、ElasticSearch、NLP 分析与 Jupyter/Voila 可视化。',
  'Built course-content processing workflows that transform slide material into structured knowledge units, quizzes, and contextual chat data for students.':
    '构建课程内容处理工作流，将课件资料转化为结构化知识单元、测验与面向学生的上下文对话数据。',
  'Maintained a Dockerized Vue/Python/Flask assessment platform with clear API boundaries between frontend workflows and backend grading services.':
    '维护基于 Docker 的 Vue/Python/Flask 评测平台，明确前端工作流与后端评分服务之间的 API 边界。',
  'Built and integrated backend workflows for autograding, student answer retrieval, rubric editing, and question management with reliability across repositories.':
    '构建并整合后端工作流，支持自动评分、学生答案检索、评分标准编辑与题目管理，并确保跨仓库可靠性。',
  'Resolved API contract, data handling, and graph synchronization issues that affected platform stability and deployment confidence.':
    '解决影响平台稳定性与部署可信度的 API 契约、数据处理与图同步问题。',
  'Built backend and mobile features on top of AWS-backed services, using EC2, Lambda, DynamoDB, Cognito, S3, and SQS for authentication, receipt/media handling, and async processing.':
    '基于 AWS 服务开发后端与移动端功能，使用 EC2、Lambda、DynamoDB、Cognito、S3 与 SQS 支撑认证、小票/媒体处理与异步任务。',
  'Maintained Node.js/Express APIs and React Native apps that supported receipt retrieval, file/PDF upload, loyalty-card flows, and retailer operations at production scale.':
    '维护 Node.js/Express API 与 React Native 应用，支持生产级的小票检索、文件/PDF 上传、会员卡流程与商户操作。',
  'Extended the retailer tablet POS Manager with onboarding, ABN validation, receipt creation, shopper validation, and Clover POS integration.':
    '扩展商户平板 POS 管理端，支持入驻流程、ABN 校验、小票创建、用户校验与 Clover POS 集成。',
  'Delivered React/Vite and Express platforms deployed through modern web hosting and backend service workflows.':
    '交付基于 React/Vite 与 Express 的平台，并通过现代 Web 托管与后端服务工作流完成部署。',
  'Built Supabase-backed catalog, CMS, and admin dashboard systems with structured media handling and maintainable API boundaries.':
    '构建基于 Supabase 的目录、CMS 与管理后台系统，具备结构化媒体处理与可维护的 API 边界。',
  'Implemented client-facing portals, contact workflows, and AI chat/voice features with pragmatic deployment and support practices.':
    '实现面向客户的门户、联系流程以及 AI 聊天/语音功能，并结合务实的部署与支持方案。',
  'Designed a Kubernetes/Fission data pipeline with scheduled Reddit and Mastodon harvesters, Kubernetes secrets, and Fission routes/timers for historical and daily social-media collection.':
    '设计基于 Kubernetes/Fission 的数据流水线，使用定时 Reddit 与 Mastodon 采集器、Kubernetes secrets 以及 Fission 路由/定时器进行历史与每日社交媒体采集。',
  'Connected serverless functions through Redis queues and KEDA MQ triggers: raw posts were enqueued, enriched by a custom Docker/PyTorch Fission environment, then indexed into Elasticsearch observations.':
    '通过 Redis 队列与 KEDA MQ 触发器连接无服务器函数：原始帖子入队后，经自定义 Docker/PyTorch Fission 环境增强，再索引到 Elasticsearch 观测数据中。',
  'Built Elasticsearch-backed API functions for top mentions, sentiment-ranked majors, topic associations, and a Jupyter/Voila frontend for interactive cloud-hosted analytics.':
    '构建基于 Elasticsearch 的 API 功能，用于热点提及、情感排序专业、主题关联分析，以及交互式云端 Jupyter/Voila 前端。',
  'Designed and simulated EV Charging Load Management algorithms with C/C++-oriented simulation work under infrastructure capacity limits.':
    '在基础设施容量限制下，围绕 C/C++ 仿真工作设计并实现电动车充电负载管理算法。',
  'Collaborated with senior developers to implement C programs for LMS algorithm simulation and technical validation.':
    '与高级开发人员合作，使用 C 语言实现 LMS 算法仿真与技术验证程序。',
  'Contributed to patent application and technical proposal documentation for algorithmic load-management work.':
    '参与算法负载管理相关的专利申请与技术方案文档编写。',
  'Built AI-powered learning workflows for a university platform, including slide-to-knowledge-unit generation, AI-assisted quiz creation, and contextual student chat over course content.':
    '为大学学习平台构建 AI 驱动的学习工作流，包括课件到知识单元的生成、AI 辅助测验创建以及面向课程内容的上下文学生对话。',
  'Built a cloud-native data pipeline to analyse social media sentiment (Mastodon/Reddit) regarding IT majors. Implemented serverless harvesters, an NLP sentiment analysis service, and an interactive frontend using Jupyter/Voila on Kubernetes.':
    '构建云原生数据流水线，用于分析 Mastodon/Reddit 上关于 IT 专业的社交媒体情感；实现无服务器采集器、NLP 情感分析服务，以及基于 Kubernetes 上 Jupyter/Voila 的交互式前端。',
  'Built a distributed real-time collaborative system using Java RMI, implementing concurrency control and synchronized multi-user state management. Features include synchronized multi-user drawing, chat functionality, and administrative controls with robust state synchronization.':
    '基于 Java RMI 构建分布式实时协作系统，实现并发控制与多用户状态同步，支持同步绘图、聊天功能及管理员控制。',
  'Built a BMP image-processing library in C that reads/writes raw binary image data, parses headers and bit depth, and manages 8-bit grayscale and 24-bit RGB pixel buffers.':
    '使用 C 语言构建 BMP 图像处理库，支持读写原始二进制图像数据、解析头信息与位深，并管理 8 位灰度与 24 位 RGB 像素缓冲区。',
  'Implemented pixel-level transformations including blur, brightness adjustment, grayscale conversion, black-white thresholding, sepia filtering, and 90-degree rotation using low-level byte and bit-wise operations.':
    '通过底层字节与位运算实现像素级图像变换，包括模糊、亮度调整、灰度化、黑白阈值、复古滤镜与 90 度旋转。',
  'Completed a computer systems project involving memory management, data representation, and low-level operations.':
    '完成一项计算机系统项目，涵盖内存管理、数据表示与底层操作。',
  'Built a command-line IMAP email client in C, supporting both plain and TLS-encrypted connections.':
    '使用 C 语言构建命令行 IMAP 邮件客户端，支持明文与 TLS 加密连接。',
  'Relevant Coursework: Distributed Systems, Cluster and Cloud Computing, Distributed Algorithms, NLP, Machine Learning, Advanced Database, Mobile Computing, Software Processes.':
    '相关课程：分布式系统、集群与云计算、分布式算法、自然语言处理、机器学习、高级数据库、移动计算、软件过程。',
  'Relevant Coursework: Artificial Intelligence, Models of Computation, Software Modelling and Design, Computer Systems, Algorithms and Data Structures, Object Oriented Software Development.':
    '相关课程：人工智能、计算模型、软件建模与设计、计算机系统、算法与数据结构、面向对象软件开发。',
  'Collaborated and communicated with cross-functional teams.':
    '与跨职能团队协作并高效沟通。',
  'Co-organised university hackathon with 150+ participants, managing platform development and event logistics.':
    '联合组织 150+ 人参与的校内黑客马拉松，负责平台开发与活动执行。',
  'Attend monthly meetups to exchange AWS ecosystem knowledge with Melbourne cloud practitioners.':
    '定期参加月度活动，与墨尔本云计算从业者交流 AWS 生态实践。',
  'Volunteer as a one-time presenter, contributing to community knowledge sharing and technical discussion.':
    '以分享者身份参与社区交流，贡献技术知识与讨论。',
};

const localizeText = (text: string, language: ResumeLanguage) =>
  language === 'zh' ? zhText[text] || text : text;

const localizeDate = (text: string, language: ResumeLanguage) =>
  language === 'zh' ? text.replaceAll('Now', '至今') : text;

const localizeTimelineItem = (item: TimelineItem, language: ResumeLanguage): TimelineItem => ({
  ...item,
  title: localizeText(item.title, language),
  role: item.role ? localizeText(item.role, language) : undefined,
  date: item.date ? localizeDate(item.date, language) : undefined,
  organization: item.organization ? localizeText(item.organization, language) : undefined,
  meta: item.meta ? localizeText(item.meta, language) : undefined,
  links: item.links?.map((link) => ({ ...link, label: localizeText(link.label, language) })),
  bullets: item.bullets?.map((bullet) => localizeText(bullet, language)),
  description: item.description ? localizeText(item.description, language) : undefined,
});

const localizeCopy = (copy: ResumeCopy, language: ResumeLanguage): ResumeCopy => {
  if (language === 'en') return copy;

  return {
    ...copy,
    title: localizeText(copy.title, language),
    summary: localizeText(copy.summary, language),
    capabilities: copy.capabilities.map((item) => localizeText(item, language)),
    work: {
      atlastix: copy.work.atlastix.map((item) => localizeText(item, language)),
      researchAssistant: copy.work.researchAssistant.map((item) => localizeText(item, language)),
      receipt: copy.work.receipt.map((item) => localizeText(item, language)),
      freelance: copy.work.freelance.map((item) => localizeText(item, language)),
      smartchip: copy.work.smartchip.map((item) => localizeText(item, language)),
    },
    projects: copy.projects.map((item) => localizeTimelineItem(item, language)),
    cProjects: copy.cProjects?.map((item) => localizeTimelineItem(item, language)),
  };
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
];

const aiQuantumMaxProject: TimelineItem = {
  ...baseProjects[0],
  tags: ['React', 'TypeScript', 'Node.js', 'FastAPI', 'OpenAI API', 'Gemini', 'Supabase'],
  bullets: [
    'Built the AI kernel that converts lecture-slide PDFs into structured Knowledge Units using pypdf extraction, prompt templates, OpenAI Responses API, strict JSON validation, and source page metadata.',
    'Implemented AI-assisted course authoring flows where teachers upload raw materials, generate editable KUs, approve/publish weekly content, and persist generated outputs through the Node API and Supabase.',
    'Added AI quiz and media generation pipelines from approved KUs, including OpenAI-generated quizzes, Gemini visual generation, Minimax TTS, ffmpeg video composition, task tracking, and Supabase image/video storage.',
  ],
};

const cloudMajorProspectsProject: TimelineItem = {
  ...baseProjects[1],
  tags: ['Python', 'Kubernetes', 'Fission', 'Docker', 'Redis', 'KEDA', 'ElasticSearch', 'PyTorch'],
  bullets: [
    'Designed a Kubernetes/Fission data pipeline with scheduled Reddit and Mastodon harvesters, Kubernetes secrets, and Fission routes/timers for historical and daily social-media collection.',
    'Connected serverless functions through Redis queues and KEDA MQ triggers: raw posts were enqueued, enriched by a custom Docker/PyTorch Fission environment, then indexed into Elasticsearch observations.',
    'Built Elasticsearch-backed API functions for top mentions, sentiment-ranked majors, topic associations, and a Jupyter/Voila frontend for interactive cloud-hosted analytics.',
  ],
};

const sharedWhiteboardProject: TimelineItem = {
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
};

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
  { ...sharedWhiteboardProject, role: undefined },
];

const defaultCopy: ResumeCopy = {
  title: 'AI Engineer',
  summary:
    'Recent Master of Information Technology graduate from the University of Melbourne with hands-on experience delivering enterprise AI platforms, client software solutions, and full-stack products. Strong in scalable systems, practical problem-solving, and translating complex requirements into polished user experiences.',
  skills: {
    languages: ['Python', 'Java', 'C/C++', 'JavaScript', 'TypeScript', 'SQL'],
    frontend: ['React', 'React Native', 'Vue.js'],
    backend: ['Node.js', 'FastAPI', 'Redis', 'ElasticSearch', 'PostgreSQL'],
    devops: ['AWS', 'Docker', 'Kubernetes', 'Azure', 'Pydantic'],
  },
  capabilities: [
    'Full-Stack Architecture',
    'Cloud-Native Development',
    'Multi-Agent AI Systems',
    'Workflow Automation',
    'UI/UX Design',
  ],
  work: {
    atlastix: [
      'Develop automation workflows and AI-agent systems for an enterprise platform using React, TypeScript, FastAPI, PostgreSQL, Kafka, Temporal, Keycloak, and MCP.',
      'Build agent-assisted workflow authoring across a visual canvas and custom DSL, including orchestration, validation, human approval, and reviewable execution changes.',
      'Extend platform tooling with parser-backed autocomplete, variable tracing, reusable workflow components, execution overlays, and integrated AI chat to improve automation reliability and developer productivity.',
      'Work closely with customers and internal stakeholders to clarify requirements, communicate technical trade-offs, demonstrate progress, and translate operational needs into practical AI workflow solutions.',
    ],
    researchAssistant: [
      'Developed and maintained a full-stack educational assessment platform (Vue.js, Vite, Python, Flask) for creating, delivering, and grading interactive logic-based questions.',
      'Built and integrated frontend-backend workflows for autograding, rubric editing, student answer retrieval, and ExNet/ExFlow question management.',
      'Investigated and fixed cross-repository bugs involving API contracts, malformed data handling, and graph rendering/state synchronization.',
    ],
    receipt: [
      'Built and maintained core business logic in the 1Receipt Node.js/Express API and the React Native shopper app, supporting receipt retrieval, tagging, local receipt sync, file/PDF upload, loyalty-card barcode flows, and wallet-ready user experiences.',
      'Worked across AWS-backed platform services and mobile authentication/integration layers, using EC2, Lambda, DynamoDB, Cognito, S3, and SQS for receipt/media handling, async processing, and backend workflows.',
      'Continued as a junior software developer to extend the API and shopper app while adding the retailer tablet POS Manager for digital receipt processing and retailer operations.',
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
  projects: [aiQuantumMaxProject, cloudMajorProspectsProject],
};

const variantCopy: Record<ResumeVariant, ResumeCopy> = {
  default: defaultCopy,
  ai: {
    ...defaultCopy,
    title: 'AI Engineer',
    summary:
      'Recent Master of Information Technology graduate and software engineer focused on enterprise AI platforms, agent-assisted workflows, LLM integrations, and practical automation. Experienced in connecting AI capabilities with production web, mobile, and backend systems.',
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
      aiQuantumMaxProject,
      {
        ...baseProjects[1],
        description:
          'Built an NLP sentiment-analysis pipeline over Mastodon/Reddit data, combining Python harvesters, PyTorch-based analysis, ElasticSearch indexing, and an interactive Jupyter/Voila frontend.',
      },
    ],
  },
  data: {
    ...defaultCopy,
    title: 'AI Engineer',
    summary:
      'Recent Master of Information Technology graduate and software engineer focused on data-intensive applications, processing pipelines, database-backed products, and reliable data flows across web, mobile, and cloud systems.',
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
    ],
  },
  cloud: {
    ...defaultCopy,
    title: 'AI Engineer',
    summary:
      'Recent Master of Information Technology graduate and software engineer focused on cloud-native systems, backend infrastructure, serverless workflows, and scalable delivery across AWS, Docker, and Kubernetes environments.',
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
      cloudMajorProspectsProject,
      baseProjects[0],
    ],
  },
  c: {
    ...defaultCopy,
    title: 'AI Engineer',
    summary:
      'Recent Master of Information Technology graduate with hands-on experience across systems programming, full-stack products, distributed systems, and enterprise software delivery.',
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
  dense = false,
}: {
  icon: ReactNode;
  children: ReactNode;
  className?: string;
  dense?: boolean;
}) => (
  <div className={`flex items-center gap-2 text-[#0e5b9e] ${dense ? 'mb-2' : 'mb-3'} ${className}`}>
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

const TimelineEntry = ({ item, dense = false }: { item: TimelineItem; dense?: boolean }) => (
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
      <ul className={`list-disc list-outside ml-4 text-[13px] text-gray-600 leading-snug ${dense ? 'space-y-0' : 'space-y-0.5'}`}>
        {item.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    ) : (
      <p className="text-[13px] text-gray-600">{item.description}</p>
    )}
  </div>
);

const Timeline = ({ items, dense = false }: { items: TimelineItem[]; dense?: boolean }) => (
  <div className={`relative border-l-2 border-slate-200 ml-3 pl-6 ${dense ? 'space-y-2 pb-0' : 'space-y-4 pb-2'}`}>
    {items.map((item) => (
      <TimelineEntry key={item.title} item={item} dense={dense} />
    ))}
  </div>
);

const SkillGroup = ({
  title,
  items,
  className,
  dense = false,
}: {
  title: string;
  items: string[];
  className: string;
  dense?: boolean;
}) => (
  <div>
    <h4 className={`font-semibold text-gray-800 text-[13px] ${dense ? 'mb-0.5' : 'mb-1'}`}>{title}</h4>
    <div className={`flex flex-wrap ${dense ? 'gap-1.5' : 'gap-2'}`}>
      {items.map((skill) => (
        <span key={skill} className={`${className} text-white text-[11px] px-2 py-1 rounded`}>
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const buildWorkItems = (copy: ResumeCopy): Record<
  'atlastix' | 'researchAssistant' | 'receipt' | 'freelance' | 'smartchip',
  TimelineItem
> => ({
  atlastix: {
    title: 'Junior AI Engineer',
    date: '07/2026 ~ Now',
    organization: 'Atlastix - Melbourne, Australia',
    tags: ['React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'AWS', 'Agent', 'Workflow'],
    bullets: copy.work.atlastix,
  },
  researchAssistant: {
    title: 'Research Assistant (Full-Stack Developer)',
    date: '12/2025 ~ 07/2026',
    organization: 'University of Melbourne',
    links: [{ label: 'View Project', href: 'https://biologic.substack.com/', icon: 'globe' }],
    tags: ['Vue.js', 'JavaScript', 'Python', 'Flask', 'HTML/CSS', 'Docker'],
    bullets: copy.work.researchAssistant,
  },
  receipt: {
    title: 'Full-Stack Developer',
    date: '07/2025 ~ 07/2026',
    organization: '1Receipt - Melbourne, Australia',
    meta: 'Internship (07/2025 ~ 07/2026) - junior software developer (12/2025 ~ 07/2026)',
    tags: ['React Native', 'Javascript', 'Node.js', 'AWS', 'Python'],
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

const Sidebar = ({
  copy,
  language,
  widthClass = 'md:w-1/3 print:w-1/3',
  dense = false,
}: {
  copy: ResumeCopy;
  language: ResumeLanguage;
  widthClass?: string;
  dense?: boolean;
}) => (
  <div className={`w-full ${widthClass} ${dense ? 'space-y-4' : 'space-y-6'} print:text-sm`}>
    <section>
      <SectionTitle icon={<Code size={20} />} dense={dense}>{uiText[language].skills}</SectionTitle>
      <div className={dense ? 'space-y-3' : 'space-y-4'}>
        <SkillGroup title={uiText[language].programmingLanguages} items={copy.skills.languages} className="bg-[#0e5b9e]" dense={dense} />
        <SkillGroup title={uiText[language].frontend} items={copy.skills.frontend} className="bg-sky-600" dense={dense} />
        <SkillGroup title={uiText[language].backend} items={copy.skills.backend} className="bg-sky-700" dense={dense} />
        <SkillGroup title={uiText[language].devops} items={copy.skills.devops} className="bg-slate-600" dense={dense} />
      </div>
    </section>

    <section className={dense ? 'mt-5' : 'mt-8'}>
      <SectionTitle icon={<Zap size={20} />} dense={dense}>{uiText[language].provenCapability}</SectionTitle>
      <div className={`flex flex-wrap ${dense ? 'gap-1.5' : 'gap-2'}`}>
        {copy.capabilities.map((skill) => (
          <span key={skill} className="bg-indigo-500 text-white text-[11px] px-2 py-1 rounded">
            {skill}
          </span>
        ))}
      </div>
    </section>

    <section className={dense ? 'mt-4' : 'mt-6'}>
      <SectionTitle icon={<Trophy size={20} />} dense={dense}>{uiText[language].certifications}</SectionTitle>
      <div className="space-y-2">
        <div className="bg-amber-50 border border-amber-200 rounded p-2">
          <p className="font-semibold text-gray-900 text-[12px]">{localizeText('AWS Certified Cloud Practitioner', language)}</p>
          <p className="text-[11px] text-gray-600">{localizeText('Amazon Web Services', language)}</p>
        </div>
      </div>
    </section>
  </div>
);

const EducationAndActivities = ({
  language,
  widthClass = 'md:w-1/3 print:w-1/3',
}: {
  language: ResumeLanguage;
  widthClass?: string;
}) => (
  <div className={`w-full ${widthClass} space-y-6 print:text-sm`}>
    <section>
      <SectionTitle icon={<GraduationCap size={20} />}>{uiText[language].education}</SectionTitle>
      <div className="space-y-4">
        <div>
          <h4 className="font-bold text-gray-900 text-[15px]">{localizeText('Master of Information Technology', language)}</h4>
          <div className="text-[13px] text-gray-600">{localizeText('University of Melbourne', language)}</div>
          <div className="text-[11px] text-[#0e5b9e] font-semibold mt-1 mb-2">03/2025 ~ 07/2026</div>
          <div className="text-[11px] text-gray-500 italic leading-relaxed">
            {localizeText('Relevant Coursework: Distributed Systems, Cluster and Cloud Computing, Distributed Algorithms, NLP, Machine Learning, Advanced Database, Mobile Computing, Software Processes.', language)}
          </div>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-[15px]">{localizeText('Bachelor of Science', language)}</h4>
          <div className="text-[13px] text-gray-600">{localizeText('University of Melbourne', language)}</div>
          <div className="text-[11px] text-[#0e5b9e] font-semibold mt-1 mb-2">02/2022 ~ 12/2024</div>
          <div className="text-[11px] text-gray-500 italic leading-relaxed">
            {localizeText('Relevant Coursework: Artificial Intelligence, Models of Computation, Software Modelling and Design, Computer Systems, Algorithms and Data Structures, Object Oriented Software Development.', language)}
          </div>
        </div>
      </div>
    </section>

    <section>
      <SectionTitle icon={<Award size={20} />}>{uiText[language].extracurricular}</SectionTitle>
      <div className="space-y-4">
        <div>
          <h4 className="font-bold text-gray-900 text-[15px]">{localizeText('HackMelbourne Club', language)}</h4>
          <div className="text-[13px] text-gray-800 italic">{localizeText('Hackathon Officer', language)}</div>
          <div className="text-[11px] text-[#0e5b9e] font-semibold mt-1 mb-2">07/2025 ~ 11/2025</div>
          <ul className="text-[13px] text-gray-600 list-disc ml-4 space-y-0.5 leading-snug">
            <li>{localizeText('Collaborated and communicated with cross-functional teams.', language)}</li>
            <li>{localizeText('Co-organised university hackathon with 150+ participants, managing platform development and event logistics.', language)}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-[15px]">{localizeText('AWS User Group Melbourne', language)}</h4>
          <div className="text-[13px] text-gray-800 italic">{localizeText('Community Member & Presenter', language)}</div>
          <div className="text-[11px] text-[#0e5b9e] font-semibold mt-1 mb-2">{localizeDate('06/2026 ~ Now', language)}</div>
          <ul className="text-[13px] text-gray-600 list-disc ml-4 space-y-0.5 leading-snug">
            <li>{localizeText('Attend monthly meetups to exchange AWS ecosystem knowledge with Melbourne cloud practitioners.', language)}</li>
            <li>{localizeText('Volunteer as a one-time presenter, contributing to community knowledge sharing and technical discussion.', language)}</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
);

const Resume = ({ variant = 'default' }: { variant?: ResumeVariant }) => {
  const [language, setLanguage] = useState<ResumeLanguage>('en');
  const copy = localizeCopy(getCopy(variant), language);
  const workItems = buildWorkItems(copy);
  const [page, setPage] = useState(1);
  const isCVariant = variant === 'c';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const page1Main = isCVariant ? (
    <>
      <section>
        <SectionTitle icon={<Briefcase size={20} />}>{uiText[language].projectExperience}</SectionTitle>
        <Timeline items={copy.cProjects || cProjects} />
      </section>
      <section>
        <SectionTitle icon={<Briefcase size={20} />}>{uiText[language].workExperience}</SectionTitle>
        <Timeline items={[workItems.researchAssistant]} />
      </section>
    </>
  ) : (
    <section>
      <SectionTitle icon={<Briefcase size={20} />}>{uiText[language].workExperience}</SectionTitle>
      <Timeline items={[workItems.atlastix, workItems.researchAssistant, workItems.receipt]} dense />
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
        <Timeline items={[workItems.freelance, workItems.smartchip]} />
      </section>
      <section>
        <SectionTitle icon={<Briefcase size={20} />}>{uiText[language].projectExperience}</SectionTitle>
        <Timeline items={copy.projects} />
      </section>
    </>
  );

  return (
    <div className="relative w-full min-h-screen overflow-hidden overflow-x-auto bg-gray-100 print:bg-white print:pb-0 md:min-h-[calc(297mm+4rem)]">
      <div className="fixed right-6 top-6 z-50 flex flex-col items-end gap-3 print:hidden">
        <div className="flex overflow-hidden rounded-full border border-gray-200 bg-white shadow-lg">
          {(['en', 'zh'] as const).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setLanguage(lang)}
              className={`px-4 py-2 text-sm font-semibold transition-colors ${
                language === lang ? 'bg-[#0e5b9e] text-white' : 'text-gray-600 hover:text-[#0e5b9e]'
              }`}
              aria-pressed={language === lang}
            >
              {lang === 'en' ? uiText.en.languageEnglish : uiText.zh.languageChinese}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
        {[1, 2].map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            onClick={() => setPage(pageNumber)}
            className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm font-bold shadow-lg transition-all ${
              page === pageNumber
                ? 'border-[#0e5b9e] bg-[#0e5b9e] text-white scale-105'
                : 'border-gray-200 bg-white text-gray-600 hover:border-[#0e5b9e] hover:text-[#0e5b9e]'
            }`}
            aria-label={`Go to page ${pageNumber}`}
            aria-current={page === pageNumber ? 'page' : undefined}
          >
            {pageNumber}
          </button>
        ))}
        </div>
      </div>

      <div className={`${page === 1 ? 'opacity-100 translate-y-0 scale-100 z-10' : 'pointer-events-none opacity-0 -translate-y-8 scale-[0.985] z-0'} absolute inset-0 w-full flex items-start justify-center px-0 py-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:px-6 md:py-8 print:relative print:inset-auto print:flex print:transform-none print:opacity-100 print:pointer-events-auto print:z-auto print:p-0`}>
        <div className="w-full md:w-[210mm] h-auto md:h-[297mm] min-h-screen md:min-h-[297mm] mx-auto bg-white shadow-lg print:shadow-none print:w-[210mm] print:h-[296mm] overflow-hidden text-gray-800 font-sans mb-0 print:mb-0 relative custom-page-break">
          <header className="bg-[#0e5b9e] text-white px-6 pt-6 pb-6 relative print:bg-[#0e5b9e] print:text-white print:-webkit-print-color-adjust: exact">
            <div className="flex flex-col md:flex-row justify-between items-start">
              <div className="mb-4 md:mb-0">
                <h1 className="text-4xl font-bold mb-2">Nolan Cui</h1>
                <h2 className="text-xl text-blue-100 mb-3">{copy.title}</h2>
                <p className="max-w-lg md:max-w-[720px] print:max-w-[720px] text-blue-50 text-[13px] leading-relaxed mb-2">{copy.summary}</p>
              </div>

              <div className="text-left md:text-right text-[12px] space-y-1.5 flex flex-col items-start md:items-end w-full md:w-auto md:absolute md:right-6 md:top-5 print:absolute print:right-6 print:top-5">
                <div className="flex items-center gap-2">
                  <span>0472 567 745</span>
                  <Phone size={16} />
                </div>
                <div className="flex items-center gap-2">
                  <a href="mailto:ruipu@unimelb.edu.au" className="hover:text-blue-200 break-all">ruipu@unimelb.edu.au</a>
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

          <div className={`flex flex-col md:flex-row pb-20 md:pb-8 pt-6 md:pt-2 print:flex-row ${isCVariant ? 'px-4 md:px-8 gap-6 md:gap-8 print:gap-6' : 'px-4 print:px-4 gap-5 md:gap-5 print:gap-5'}`}>
            <div className={`w-full space-y-6 ${isCVariant ? 'md:w-2/3 print:w-2/3' : 'md:w-[73%] print:w-[73%]'}`}>{page1Main}</div>
            <Sidebar copy={copy} language={language} widthClass={isCVariant ? 'md:w-1/3 print:w-1/3' : 'md:w-[27%] print:w-[27%]'} dense={!isCVariant} />
          </div>

          <div className="absolute bottom-4 left-4 md:left-auto md:right-8 text-left md:text-right text-[13px] text-gray-400">
            {uiText[language].pageLabel(1, 2)}
          </div>
        </div>
      </div>

      <div className={`${page === 2 ? 'opacity-100 translate-y-0 scale-100 z-10' : 'pointer-events-none opacity-0 translate-y-8 scale-[0.985] z-0'} absolute inset-0 w-full flex items-start justify-center px-0 py-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:px-6 md:py-8 print:relative print:inset-auto print:flex print:transform-none print:opacity-100 print:pointer-events-auto print:z-auto print:p-0`}>
        <div className="w-full md:w-[210mm] h-auto md:h-[297mm] min-h-screen md:min-h-[297mm] mx-auto bg-white shadow-lg print:shadow-none print:w-[210mm] print:h-[296mm] overflow-hidden text-gray-800 font-sans relative">
          <div className="h-16 w-full hidden md:block print:block"></div>

          <div className={`flex flex-col md:flex-row pb-20 md:pb-8 pt-6 md:pt-0 print:flex-row ${isCVariant ? 'px-4 md:px-8 gap-6 md:gap-8 print:gap-6' : 'px-4 print:px-4 gap-5 md:gap-5 print:gap-5'}`}>
            <div className={`w-full space-y-6 ${isCVariant ? 'md:w-2/3 print:w-2/3' : 'md:w-[73%] print:w-[73%]'}`}>{page2Main}</div>
            <EducationAndActivities language={language} widthClass={isCVariant ? 'md:w-1/3 print:w-1/3' : 'md:w-[27%] print:w-[27%]'} />
          </div>

          <div className="absolute bottom-4 left-4 md:left-auto md:right-8 text-left md:text-right text-[13px] text-gray-400">
            {uiText[language].pageLabel(2, 2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
