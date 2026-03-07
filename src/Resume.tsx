import { useState, useEffect } from 'react';
import { Mail, Phone, Linkedin, Github, Briefcase, GraduationCap, Award, Code, Globe, Zap, ChevronRight, ChevronLeft } from 'lucide-react';

const Resume = () => {
  const [page, setPage] = useState(1);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-100 pb-10 print:bg-white print:pb-0 overflow-x-auto">
      
      {/* Navigation Controls - Screen Only */}
      <div className="fixed bottom-8 right-8 z-50 flex gap-4 print:hidden">
          <button 
            onClick={() => setPage(1)}
            className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all ${page === 1 ? 'bg-[#0e5b9e] text-white scale-110' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
             <span className="font-bold text-lg">1</span>
          </button>
           <button 
            onClick={() => setPage(2)}
            className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all ${page === 2 ? 'bg-[#0e5b9e] text-white scale-110' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
             <span className="font-bold text-lg">2</span>
          </button>
      </div>

      {/* Floating Arrow Navigation */}
      {page === 1 && (
         <button 
            onClick={() => setPage(2)}
            className="fixed top-1/2 right-4 md:right-10 z-50 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-xl text-[#0e5b9e] print:hidden transition-all hover:scale-110 border border-gray-100"
            aria-label="Next Page"
         >
            <ChevronRight size={32} />
         </button>
       )}
        {page === 2 && (
         <button 
            onClick={() => setPage(1)}
            className="fixed top-1/2 left-4 md:left-10 z-50 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-xl text-[#0e5b9e] print:hidden transition-all hover:scale-110 border border-gray-100"
            aria-label="Previous Page"
         >
            <ChevronLeft size={32} />
         </button>
       )}


    {/* PAGE 1 */}
    <div className={`${page === 1 ? 'block' : 'hidden'} print:block w-[210mm] min-w-[210mm] h-[297mm] mx-auto bg-white shadow-lg print:shadow-none print:w-[210mm] print:h-[296mm] overflow-hidden text-gray-800 font-sans mb-8 print:mb-0 relative custom-page-break`}>
      {/* Header Section */}
      <header className="bg-[#0e5b9e] text-white px-6 pt-6 pb-6 relative print:bg-[#0e5b9e] print:text-white print:-webkit-print-color-adjust: exact">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2">Nolan Cui</h1>
            <h2 className="text-xl text-blue-100 mb-3">Full-Stack Developer</h2>
            
            <p className="max-w-2xl text-blue-50 text-[13px] leading-relaxed mb-2">
              MIT student at the University of Melbourne with strong hands-on industry experience building real-world full-stack products. Strong focus on scalable systems, practical problem-solving, and delivering polished user-facing solutions.
            </p>
          </div>
          
          <div className="text-right text-[13px] space-y-1.5 flex flex-col items-end">
            <div className="flex items-center gap-2">
              <span>0472 567 745</span>
              <Phone size={16} />
            </div>
            <div className="flex items-center gap-2">
              <a href="mailto:ruipuc@student.unimelb.edu.au" className="hover:text-blue-200">ruipuc@student.unimelb.edu.au</a>
              <Mail size={16} />
            </div>
            <div className="flex items-center gap-2">
              <a href="https://www.linkedin.com/in/ruipu-cui-56bb831b8/" className="hover:text-blue-200" target="_blank" rel="noopener noreferrer">LinkedIn</a> 
              <Linkedin size={16} />
            </div>
            <div className="flex items-center gap-2">
              <a href="https://github.com/RuipuCui" className="hover:text-blue-200" target="_blank" rel="noopener noreferrer">GitHub</a>
              <Github size={16} />
            </div>
          </div>
        </div>
        
        {/* Decorative curve */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-white" style={{ clipPath: 'ellipse(70% 60% at 50% 100%)' }}></div>
      </header>

      {/* Main Content Page 1 */}
      <div className="flex flex-col md:flex-row px-8 pb-8 pt-2 gap-8 print:flex-row print:gap-6">
        
        {/* Left Column (Main) */}
        <div className="w-full md:w-2/3 space-y-6 print:w-2/3">
          
          {/* Work Experience Part 1 */}
          <section>
            <div className="flex items-center gap-2 mb-3 text-[#0e5b9e]">
              <Briefcase size={20} />
              <h3 className="text-lg font-bold uppercase tracking-wide">Work Experience</h3>
            </div>
            
            <div className="space-y-4 relative border-l-2 border-slate-200 ml-3 pl-6 pb-2">
              
              {/* Research Assistant */}
              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 bg-white border-2 border-[#0e5b9e] w-4 h-4 rounded-full"></div>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-gray-900 text-[15px]">Research Assistant (Full-Stack Developer)</h4>
                  <span className="text-[13px] text-[#0e5b9e] font-semibold whitespace-nowrap">12/2025 ~ Now</span>
                </div>
                <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-gray-700 text-[13px]">University of Melbourne - <span className="font-normal text-gray-600">Part-Time</span></span>
                    <a href="https://biologic.substack.com/" target="_blank" rel="noopener noreferrer" className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"><Globe size={10}/> View Project</a>
                </div>
                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 mb-1">
                    {['Vue.js', 'JavaScript', 'Python', 'Flask', 'HTML/CSS', 'Docker'].map(tech => (
                        <span key={tech} className="bg-blue-50 text-blue-700 text-[10px] px-1.5 py-0.5 rounded border border-blue-100">{tech}</span>
                    ))}
                </div>
                <ul className="list-disc list-outside ml-4 text-[13px] text-gray-600 space-y-0.5 leading-snug">
                  <li>Developed and maintained a full-stack educational assessment platform (Vue.js, Vite, Python, Flask) for creating, delivering, and grading interactive logic-based questions.</li>
                  <li>Built and integrated frontend-backend workflows for autograding, rubric editing, student answer retrieval, and ExNet/ExFlow question management.</li>
                  <li>Investigated and fixed cross-repository bugs involving API contracts, malformed data handling, and graph rendering/state synchronization.</li>
                </ul>
              </div>

              {/* Quantum Max */}
              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 bg-white border-2 border-[#0e5b9e] w-4 h-4 rounded-full"></div>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-gray-900 text-[15px]">Software Engineer</h4>
                   <span className="text-[13px] text-[#0e5b9e] font-semibold whitespace-nowrap">01/2026 ~ Now</span>
                </div>
                <h5 className="font-semibold text-gray-700 mb-1 text-[13px]">Quantum Max - <span className="font-normal text-gray-600">Part-Time Contractor</span></h5>
                {/* Tech Stack Tags - Filler */}
                <div className="flex flex-wrap gap-1.5 mb-1">
                    {['React', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'OpenAI API', 'JavaScript', 'HTML/CSS', 'AI Integration'].map(tech => (
                        <span key={tech} className="bg-blue-50 text-blue-700 text-[10px] px-1.5 py-0.5 rounded border border-blue-100">{tech}</span>
                    ))}
                </div>
                <ul className="list-disc list-outside ml-4 text-[13px] text-gray-600 space-y-0.5 leading-snug">
                  <li>Built an AI-powered university learning platform with separate student, teacher, and admin experiences, covering course publishing, weekly content delivery, quizzes, and progress tracking.</li>
                  <li>Developed full-stack features using React/Vite, Node.js, PostgreSQL, and Supabase, including role-based access, media storage, notifications, analytics, and profile management.</li>
                  <li>Implemented AI workflows for converting lecture slides into structured knowledge units, generating quizzes and learning media, and providing contextual chat assistance for students.</li>
                  <li>Designed interactive learning UX such as inline notes/highlights, AI actions on selected text, responsive dashboards, and course management tools for educators.</li>
                </ul>
              </div>

               {/* Freelance */}
              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 bg-white border-2 border-[#0e5b9e] w-4 h-4 rounded-full"></div>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-gray-900 text-[15px]">Freelance Full-Stack Developer</h4>
                   <span className="text-[13px] text-[#0e5b9e] font-semibold whitespace-nowrap">11/2025 ~ 01/2026</span>
                </div>
                <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-gray-700 text-[13px]">Self-Employed - <span className="font-normal text-gray-600">Freelance</span></span>
                    <div className="flex gap-2 flex-wrap justify-end">
                        <a href="https://www.solidoro.com.au/" target="_blank" rel="noopener noreferrer" className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"><Globe size={10}/> Solidoro</a>
                        <a href="https://solidoro-web-iota.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"><Globe size={10}/> Solidoro (App)</a>
                        <a href="https://mirror-studio-jade.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"><Globe size={10}/> Mirror Studio</a>
                    </div>
                </div>
                 {/* Tech Stack Tags - Filler */}
                 <div className="flex flex-wrap gap-1.5 mb-1">
                    {['React', 'TypeScript', 'JavaScript', 'Node.js', 'Express.js', 'HTML/CSS'].map(tech => (
                        <span key={tech} className="bg-blue-50 text-blue-700 text-[10px] px-1.5 py-0.5 rounded border border-blue-100">{tech}</span>
                    ))}
                </div>
                <ul className="list-disc list-outside ml-4 text-[13px] text-gray-600 space-y-0.5 leading-snug">
                  <li>Delivered custom React/Vite web platforms for clients across premium furniture, building materials, and AI/education brands.</li>
                  <li>Built full-stack catalog and CMS systems with admin dashboards, Express APIs, and Supabase-backed data, media, and content workflows.</li>
                  <li>Implemented customer-facing features including product discovery, gated account portals, contact pipelines, and AI chat/voice integrations.</li>
                  <li>Designed responsive bilingual marketing sites with polished UI, animation, and reusable component systems.</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
        
        {/* Right Column Page 1 (Skills) */}
        <div className="w-full md:w-1/3 space-y-6 print:w-1/3 print:text-sm">
            {/* Skills */}
            <section>
                <div className="flex items-center gap-2 mb-3 text-[#0e5b9e]">
                <Code size={20} />
                <h3 className="text-lg font-bold uppercase tracking-wide">Skills</h3>
                </div>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-1 text-[13px]">Programming Languages</h4>
                        <div className="flex flex-wrap gap-2">
                            {['Python', 'Java', 'C/C++', 'JavaScript', 'TypeScript', 'SQL'].map(skill => (
                                <span key={skill} className="bg-[#0e5b9e] text-white text-[11px] px-2 py-1 rounded">{skill}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-1 text-[13px]">Front-end</h4>
                        <div className="flex flex-wrap gap-2">
                            {['React', 'React Native', 'Vue.js', 'HTML5/CSS3'].map(skill => (
                                <span key={skill} className="bg-sky-600 text-white text-[11px] px-2 py-1 rounded">{skill}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-1 text-[13px]">Back-end & Databases</h4>
                        <div className="flex flex-wrap gap-2">
                            {['Node.js', 'Express.js', 'Flask', 'PostgreSQL', 'Redis', 'ElasticSearch'].map(skill => (
                                <span key={skill} className="bg-sky-700 text-white text-[11px] px-2 py-1 rounded">{skill}</span>
                            ))}
                        </div>
                    </div>
                     <div>
                        <h4 className="font-semibold text-gray-800 mb-1 text-[13px]">DevOps & AI</h4>
                        <div className="flex flex-wrap gap-2">
                            {['AWS', 'Docker', 'Kubernetes', 'PyTorch', 'OpenAI API'].map(skill => (
                                <span key={skill} className="bg-slate-600 text-white text-[11px] px-2 py-1 rounded">{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

             {/* Proven Capability */}
             <section className="mt-8">
                <div className="flex items-center gap-2 mb-3 text-[#0e5b9e]">
                    <Zap size={20} />
                    <h3 className="text-lg font-bold uppercase tracking-wide">Proven Capability</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                    {[
                        'Full-Stack Architecture', 
                        'Cloud-Native Development',
                        'Multi-Agent AI Systems', 
                        'UI/UX Design', 
                        'Agile Leadership',
                        'System Optimization',
                        'Cross-Platform Development'
                    ].map(skill => (
                        <span key={skill} className="bg-indigo-500 text-white text-[11px] px-2 py-1 rounded">{skill}</span>
                    ))}
                </div>
            </section>
        </div>
      </div>
      
       {/* Footer Page 1 */}
        <div className="absolute bottom-4 text-right right-8 text-[13px] text-gray-400">
            Page 1 of 2
        </div>
    </div>


    {/* PAGE 2 */}
    <div className={`${page === 2 ? 'block' : 'hidden'} print:block w-[210mm] min-w-[210mm] h-[297mm] mx-auto bg-white shadow-lg print:shadow-none print:w-[210mm] print:h-[296mm] overflow-hidden text-gray-800 font-sans relative`}>
      
      {/* Optional Top Margin/Spacer for Page 2 */}
      <div className="h-16 w-full hidden md:block print:block"></div>

      {/* Main Content Page 2 */}
      <div className="flex flex-col md:flex-row px-8 pb-8 gap-8 print:flex-row print:gap-6 pt-0">
        
        {/* Left Column (Main) */}
        <div className="w-full md:w-2/3 space-y-6 print:w-2/3">
          
          {/* Work Experience Continued */}
          <section>
             {/* Continue visual line from previous page if needed, but separate block is fine */}
             <div className="space-y-4 relative border-l-2 border-slate-200 ml-3 pl-6 pb-2">
              
              {/* 1Receipt */}
              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 bg-white border-2 border-[#0e5b9e] w-4 h-4 rounded-full"></div>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-gray-900 text-[15px]">Full-Stack Developer</h4>
                   <span className="text-[13px] text-[#0e5b9e] font-semibold whitespace-nowrap">07/2025 ~ Now</span>
                </div>
                <h5 className="font-semibold text-gray-700 mb-1 text-[13px]">1Receipt - Melbourne, Australia</h5>
                <div className="text-[11px] text-slate-500 mb-1 font-medium">
                  Internship <span className="text-slate-400 font-normal">(07/2025 ~ 11/2025)</span> • Part-Time Contractor <span className="text-slate-400 font-normal">(12/2025 ~ Now)</span>
                </div>
                 {/* Tech Stack Tags - Filler */}
                 <div className="flex flex-wrap gap-1.5 mb-1">
                    {['React Native', 'JavaScript', 'Node.js', 'Express.js', 'Python', 'AWS'].map(tech => (
                        <span key={tech} className="bg-blue-50 text-blue-700 text-[10px] px-1.5 py-0.5 rounded border border-blue-100">{tech}</span>
                    ))}
                </div>
                <ul className="list-disc list-outside ml-4 text-[13px] text-gray-600 space-y-0.5 leading-snug">
                  <li>Developed and optimised full-stack features (Express.js, React Native, Node.js), reducing page load times by 30% and improving user experience.</li>
                  <li>Improved performance and scalability of web/mobile apps through clean, maintainable code.</li>
                  <li>Integrated APIs and contributed to cloud-based solutions using AWS.</li>
                  <li>Followed Agile workflows, using Git and participated in code review.</li>
                </ul>
              </div>
              
              {/* Beijing Smartchip */}
              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 bg-white border-2 border-[#0e5b9e] w-4 h-4 rounded-full"></div>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-gray-900 text-[15px]">Software Development Internship</h4>
                   <span className="text-[13px] text-[#0e5b9e] font-semibold whitespace-nowrap">12/2024 ~ 02/2025</span>
                </div>
                <h5 className="font-semibold text-gray-700 mb-1 text-[13px]">Beijing Smartchip Microelectronics Technology - Beijing, China</h5>
                 {/* Tech Stack Tags - Filler */}
                 <div className="flex flex-wrap gap-1.5 mb-1">
                    {['C/C++'].map(tech => (
                        <span key={tech} className="bg-blue-50 text-blue-700 text-[10px] px-1.5 py-0.5 rounded border border-blue-100">{tech}</span>
                    ))}
                </div>
                <ul className="list-disc list-outside ml-4 text-[13px] text-gray-600 space-y-0.5 leading-snug">
                  <li>Designed and simulated EV Charging Load Management algorithms, ensuring stable performance under infrastructure capacity limits and contributing to patent applications.</li>
                  <li>Collaborated with senior developers to implement C programs to simulate LMS algorithms.</li>
                  <li>Participated in multiple formal documents including Patent Application, technical proposals.</li>
                </ul>
              </div>

            </div>
          </section>

          {/* Project Experience */}
          <section>
            <div className="flex items-center gap-2 mb-3 text-[#0e5b9e]">
              <Briefcase size={20} /> 
              <h3 className="text-lg font-bold uppercase tracking-wide">Project Experience</h3>
            </div>
             <div className="space-y-4 relative border-l-2 border-slate-200 ml-3 pl-6 pb-2">
                {/* University Major Prospects */}
                <div className="relative">
                    <div className="absolute -left-[31px] top-1.5 bg-white border-2 border-[#0e5b9e] w-4 h-4 rounded-full"></div>
                    <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-gray-900 leading-tight text-[15px]">
                        University Major Prospects Analysis <span className="whitespace-nowrap">Cloud Developer</span>
                    </h4>
                    <span className="text-[13px] text-[#0e5b9e] font-semibold whitespace-nowrap ml-2">03/2025 ~ 06/2025</span>
                    </div>
                    <a href="https://github.com/RuipuCui/Univerisity-major-prospects-for-Engineering-and-IT-in-Australia" target="_blank" rel="noopener noreferrer" className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 mb-1">
                        <Github size={10} /> View Code
                    </a>
                    <div className="flex flex-wrap gap-1 mb-1">
                        {['Python', 'Kubernetes', 'Fission', 'Docker', 'ElasticSearch', 'Redis', 'PyTorch'].map((tech) => (
                            <span key={tech} className="bg-blue-50 text-blue-700 text-[10px] px-1.5 py-0.5 rounded border border-blue-100">{tech}</span>
                        ))}
                    </div>
                    <p className="text-[13px] text-gray-600">
                    Built a cloud-native data pipeline to analyse social media sentiment (Mastodon/Reddit) regarding IT majors. Implemented serverless harvesters, an NLP sentiment analysis service, and an interactive frontend using Jupyter/Voila on Kubernetes.
                    </p>
                </div>

                {/* Shared Whiteboard */}
                <div className="relative">
                    <div className="absolute -left-[31px] top-1.5 bg-white border-2 border-[#0e5b9e] w-4 h-4 rounded-full"></div>
                    <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-gray-900 leading-tight text-[15px]">
                        Shared Whiteboard (Java RMI) <span className="whitespace-nowrap">Java Developer</span>
                    </h4>
                    <span className="text-[13px] text-[#0e5b9e] font-semibold whitespace-nowrap ml-2">03/2025 ~ 06/2025</span>
                    </div>
                    <a href="https://github.com/RuipuCui/Share_Canva_Board" target="_blank" rel="noopener noreferrer" className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 mb-1">
                        <Github size={10} /> View Code
                    </a>
                    <div className="flex flex-wrap gap-1 mb-1">
                        {['Java', 'RMI', 'Swing', 'Multithreading'].map((tech) => (
                            <span key={tech} className="bg-blue-50 text-blue-700 text-[10px] px-1.5 py-0.5 rounded border border-blue-100">{tech}</span>
                        ))}
                    </div>
                    <p className="text-[13px] text-gray-600">
                    Developed a real-time collaborative whiteboard application using Java RMI. Features include synchronized multi-user drawing, chat functionality, and administrative controls (manager/participant roles) with robust state synchronization.
                    </p>
                </div>
             </div>
          </section>

        </div>
        
        {/* Right Column Page 2 */}
        <div className="w-full md:w-1/3 space-y-6 print:w-1/3 print:text-sm">
            
            {/* Education */}
            <section>
                <div className="flex items-center gap-2 mb-3 text-[#0e5b9e]">
                <GraduationCap size={20} />
                <h3 className="text-lg font-bold uppercase tracking-wide">Education</h3>
                </div>
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

             {/* Awards / Extra-curricular */}
             <section>
                <div className="flex items-center gap-2 mb-3 text-[#0e5b9e]">
                <Award size={20} />
                <h3 className="text-lg font-bold uppercase tracking-wide">Extra-Curricular</h3>
                </div>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-bold text-gray-900 text-[15px]">HackMelbourne Club</h4>
                        <div className="text-[13px] text-gray-800 italic">Hackathon Officer</div>
                         <div className="text-[11px] text-[#0e5b9e] font-semibold mt-1 mb-2">07/2025 ~ 11/2025</div>
                        <ul className="text-[13px] text-gray-600 list-disc ml-4 space-y-0.5 leading-snug">
                            <li>Collaborated and communicated with cross-functional teams</li>
                            <li>Co-organise university hackathon with 150+ participants, managing platform development and event logistics.</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
      </div>

       {/* Footer Page 2 */}
        <div className="absolute bottom-4 text-right right-8 text-[13px] text-gray-400">
            Page 2 of 2
        </div>
    </div>
    </div>
  );
};

export default Resume;

