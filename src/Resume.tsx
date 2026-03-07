import { Mail, Phone, Linkedin, Github, Briefcase, GraduationCap, Award, Code, Globe, Zap } from 'lucide-react';

const Resume = () => {
  return (
    <>
    {/* PAGE 1 */}
    <div className="max-w-[210mm] mx-auto bg-white shadow-lg print:shadow-none print:w-full min-h-[297mm] overflow-hidden text-gray-800 font-sans mb-8 print:mb-0 relative custom-page-break">
      {/* Header Section */}
      <header className="bg-[#0e5b9e] text-white px-6 pt-6 pb-8 relative print:bg-[#0e5b9e] print:text-white print:-webkit-print-color-adjust: exact">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2">Nolan Cui</h1>
            <h2 className="text-xl text-blue-100 mb-4">Full-Stack Developer</h2>
            
            <p className="max-w-2xl text-blue-50 text-sm leading-relaxed mb-3">
              MIT student at the University of Melbourne with strong hands-on industry experience building real-world full-stack products. Strong focus on scalable systems, practical problem-solving, and delivering polished user-facing solutions.
            </p>
          </div>
          
          <div className="text-right text-sm space-y-1.5 flex flex-col items-end">
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
        <div className="w-full md:w-2/3 space-y-8 print:w-2/3">
          
          {/* Work Experience Part 1 */}
          <section>
            <div className="flex items-center gap-2 mb-4 text-[#0e5b9e]">
              <Briefcase size={24} />
              <h3 className="text-xl font-bold uppercase tracking-wide">Work Experience</h3>
            </div>
            
            <div className="space-y-6 relative border-l-2 border-slate-200 ml-3 pl-6 pb-2">
              
              {/* Research Assistant */}
              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 bg-white border-2 border-[#0e5b9e] w-4 h-4 rounded-full"></div>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-gray-900">Research Assistant</h4>
                  <span className="text-sm text-[#0e5b9e] font-semibold whitespace-nowrap">12/2025 ~ Now</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-700">University of Melbourne - Melbourne, Australia</span>
                    <a href="https://biologic.substack.com/" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1"><Globe size={12}/> View Project</a>
                </div>
                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                    {['Vue.js', 'JavaScript', 'Python', 'Flask', 'HTML/CSS', 'Docker'].map(tech => (
                        <span key={tech} className="bg-blue-50 text-blue-700 text-[10px] px-1.5 py-0.5 rounded border border-blue-100">{tech}</span>
                    ))}
                </div>
                <ul className="list-disc list-outside ml-4 text-sm text-gray-600 space-y-1">
                  <li>Developed and maintained a full-stack educational assessment platform (Vue.js, Vite, Python, Flask) for creating, delivering, and grading interactive logic-based questions.</li>
                  <li>Built and integrated frontend-backend workflows for autograding, rubric editing, student answer retrieval, and ExNet/ExFlow question management.</li>
                  <li>Investigated and fixed cross-repository bugs involving API contracts, malformed data handling, and graph rendering/state synchronization.</li>
                </ul>
              </div>

              {/* Quantum Max */}
              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 bg-white border-2 border-[#0e5b9e] w-4 h-4 rounded-full"></div>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-gray-900">Full-Stack Developer</h4>
                   <span className="text-sm text-[#0e5b9e] font-semibold whitespace-nowrap">01/2026 ~ Now</span>
                </div>
                <h5 className="font-semibold text-gray-700 mb-2">Quantum Max - Melbourne, Australia</h5>
                {/* Tech Stack Tags - Filler */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                    {['React', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'OpenAI API', 'JavaScript', 'HTML/CSS', 'AI Integration'].map(tech => (
                        <span key={tech} className="bg-blue-50 text-blue-700 text-[10px] px-1.5 py-0.5 rounded border border-blue-100">{tech}</span>
                    ))}
                </div>
                <ul className="list-disc list-outside ml-4 text-sm text-gray-600 space-y-1">
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
                  <h4 className="font-bold text-gray-900">Freelance Full-Stack Developer</h4>
                   <span className="text-sm text-[#0e5b9e] font-semibold whitespace-nowrap">11/2025 ~ 01/2026</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-700">Self-Employed - Melbourne, Australia</span>
                    <div className="flex gap-2 flex-wrap justify-end">
                        <a href="https://www.solidoro.com.au/" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1"><Globe size={12}/> Solidoro</a>
                        <a href="https://solidoro-web-iota.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1"><Globe size={12}/> Solidoro (App)</a>
                        <a href="https://mirror-studio-jade.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1"><Globe size={12}/> Mirror Studio</a>
                    </div>
                </div>
                 {/* Tech Stack Tags - Filler */}
                 <div className="flex flex-wrap gap-1.5 mb-2">
                    {['React', 'TypeScript', 'JavaScript', 'Node.js', 'Express.js', 'HTML/CSS'].map(tech => (
                        <span key={tech} className="bg-blue-50 text-blue-700 text-[10px] px-1.5 py-0.5 rounded border border-blue-100">{tech}</span>
                    ))}
                </div>
                <ul className="list-disc list-outside ml-4 text-sm text-gray-600 space-y-1">
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
        <div className="w-full md:w-1/3 space-y-8 print:w-1/3 print:text-sm">
            {/* Skills */}
            <section>
                <div className="flex items-center gap-2 mb-4 text-[#0e5b9e]">
                <Code size={24} />
                <h3 className="text-xl font-bold uppercase tracking-wide">Skills</h3>
                </div>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Programming Languages</h4>
                        <div className="flex flex-wrap gap-2">
                            {['Python', 'Java', 'C/C++', 'JavaScript', 'TypeScript', 'SQL'].map(skill => (
                                <span key={skill} className="bg-[#0e5b9e] text-white text-xs px-2 py-1 rounded">{skill}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Front-end</h4>
                        <div className="flex flex-wrap gap-2">
                            {['React', 'React Native', 'Vue.js', 'HTML5/CSS3'].map(skill => (
                                <span key={skill} className="bg-sky-600 text-white text-xs px-2 py-1 rounded">{skill}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Back-end & Databases</h4>
                        <div className="flex flex-wrap gap-2">
                            {['Node.js', 'Express.js', 'Flask', 'PostgreSQL', 'Redis', 'ElasticSearch'].map(skill => (
                                <span key={skill} className="bg-sky-700 text-white text-xs px-2 py-1 rounded">{skill}</span>
                            ))}
                        </div>
                    </div>
                     <div>
                        <h4 className="font-semibold text-gray-800 mb-2">DevOps & AI</h4>
                        <div className="flex flex-wrap gap-2">
                            {['AWS', 'Docker', 'Kubernetes', 'PyTorch', 'OpenAI API'].map(skill => (
                                <span key={skill} className="bg-slate-600 text-white text-xs px-2 py-1 rounded">{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

             {/* Proven Capability */}
             <section className="mt-8">
                <div className="flex items-center gap-2 mb-4 text-[#0e5b9e]">
                    <Zap size={24} />
                    <h3 className="text-xl font-bold uppercase tracking-wide">Proven Capability</h3>
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
                        <span key={skill} className="bg-indigo-500 text-white text-xs px-2 py-1 rounded">{skill}</span>
                    ))}
                </div>
            </section>
        </div>
      </div>
      
       {/* Footer Page 1 */}
        <div className="absolute bottom-4 text-right right-8 text-xs text-gray-400">
            Page 1 of 2
        </div>
    </div>


    {/* PAGE 2 */}
    <div className="max-w-[210mm] mx-auto bg-white shadow-lg print:shadow-none print:w-full min-h-[297mm] overflow-hidden text-gray-800 font-sans relative">
      
      {/* Optional Top Margin/Spacer for Page 2 */}
      <div className="h-16 w-full"></div>

      {/* Main Content Page 2 */}
      <div className="flex flex-col md:flex-row p-8 gap-8 print:flex-row print:gap-6 pt-0">
        
        {/* Left Column (Main) */}
        <div className="w-full md:w-2/3 space-y-8 print:w-2/3">
          
          {/* Work Experience Continued */}
          <section>
             {/* Continue visual line from previous page if needed, but separate block is fine */}
             <div className="space-y-6 relative border-l-2 border-slate-200 ml-3 pl-6 pb-2">
              
              {/* 1Receipt */}
              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 bg-white border-2 border-[#0e5b9e] w-4 h-4 rounded-full"></div>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-gray-900">Full-Stack Developer (Internship & Contractor)</h4>
                   <span className="text-sm text-[#0e5b9e] font-semibold whitespace-nowrap">07/2025 ~ Now</span>
                </div>
                <h5 className="font-semibold text-gray-700 mb-2">1Receipt - Melbourne, Australia</h5>
                 {/* Tech Stack Tags - Filler */}
                 <div className="flex flex-wrap gap-1.5 mb-2">
                    {['React Native', 'JavaScript', 'Node.js', 'Express.js', 'Python', 'AWS'].map(tech => (
                        <span key={tech} className="bg-blue-50 text-blue-700 text-[10px] px-1.5 py-0.5 rounded border border-blue-100">{tech}</span>
                    ))}
                </div>
                <ul className="list-disc list-outside ml-4 text-sm text-gray-600 space-y-1">
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
                  <h4 className="font-bold text-gray-900">Software Development Internship</h4>
                   <span className="text-sm text-[#0e5b9e] font-semibold whitespace-nowrap">12/2024 ~ 02/2025</span>
                </div>
                <h5 className="font-semibold text-gray-700 mb-2">Beijing Smartchip Microelectronics Technology - Beijing, China</h5>
                 {/* Tech Stack Tags - Filler */}
                 <div className="flex flex-wrap gap-1.5 mb-2">
                    {['C/C++'].map(tech => (
                        <span key={tech} className="bg-blue-50 text-blue-700 text-[10px] px-1.5 py-0.5 rounded border border-blue-100">{tech}</span>
                    ))}
                </div>
                <ul className="list-disc list-outside ml-4 text-sm text-gray-600 space-y-1">
                  <li>Designed and simulated EV Charging Load Management algorithms, ensuring stable performance under infrastructure capacity limits and contributing to patent applications.</li>
                  <li>Collaborated with senior developers to implement C programs to simulate LMS algorithms.</li>
                  <li>Participated in multiple formal documents including Patent Application, technical proposals.</li>
                </ul>
              </div>

            </div>
          </section>

          {/* Project Experience */}
          <section>
            <div className="flex items-center gap-2 mb-4 text-[#0e5b9e]">
              <Briefcase size={24} /> 
              <h3 className="text-xl font-bold uppercase tracking-wide">Project Experience</h3>
            </div>
             <div className="space-y-6 relative border-l-2 border-slate-200 ml-3 pl-6 pb-2">
                {/* University Major Prospects */}
                <div className="relative">
                    <div className="absolute -left-[31px] top-1.5 bg-white border-2 border-[#0e5b9e] w-4 h-4 rounded-full"></div>
                    <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-gray-900 leading-tight">
                        University Major Prospects Analysis <span className="whitespace-nowrap">Cloud Developer</span>
                    </h4>
                    <span className="text-sm text-[#0e5b9e] font-semibold whitespace-nowrap ml-2">03/2025 ~ 06/2025</span>
                    </div>
                    <a href="https://github.com/RuipuCui/Univerisity-major-prospects-for-Engineering-and-IT-in-Australia" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1 mb-2">
                        <Github size={12} /> View Code
                    </a>
                    <div className="flex flex-wrap gap-1 mb-2">
                        {['Python', 'Kubernetes', 'Fission', 'Docker', 'ElasticSearch', 'Redis', 'PyTorch'].map((tech) => (
                            <span key={tech} className="bg-blue-50 text-blue-700 text-[10px] px-1.5 py-0.5 rounded border border-blue-100">{tech}</span>
                        ))}
                    </div>
                    <p className="text-sm text-gray-600">
                    Built a cloud-native data pipeline to analyse social media sentiment (Mastodon/Reddit) regarding IT majors. Implemented serverless harvesters, an NLP sentiment analysis service, and an interactive frontend using Jupyter/Voila on Kubernetes.
                    </p>
                </div>

                {/* Shared Whiteboard */}
                <div className="relative">
                    <div className="absolute -left-[31px] top-1.5 bg-white border-2 border-[#0e5b9e] w-4 h-4 rounded-full"></div>
                    <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-gray-900 leading-tight">
                        Shared Whiteboard (Java RMI) <span className="whitespace-nowrap">Java Developer</span>
                    </h4>
                    <span className="text-sm text-[#0e5b9e] font-semibold whitespace-nowrap ml-2">03/2025 ~ 06/2025</span>
                    </div>
                    <a href="https://github.com/RuipuCui/Share_Canva_Board" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1 mb-2">
                        <Github size={12} /> View Code
                    </a>
                    <div className="flex flex-wrap gap-1 mb-2">
                        {['Java', 'RMI', 'Swing', 'Multithreading'].map((tech) => (
                            <span key={tech} className="bg-blue-50 text-blue-700 text-[10px] px-1.5 py-0.5 rounded border border-blue-100">{tech}</span>
                        ))}
                    </div>
                    <p className="text-sm text-gray-600">
                    Developed a real-time collaborative whiteboard application using Java RMI. Features include synchronized multi-user drawing, chat functionality, and administrative controls (manager/participant roles) with robust state synchronization.
                    </p>
                </div>
             </div>
          </section>

        </div>
        
        {/* Right Column Page 2 */}
        <div className="w-full md:w-1/3 space-y-8 print:w-1/3 print:text-sm">
            
            {/* Education */}
            <section>
                <div className="flex items-center gap-2 mb-4 text-[#0e5b9e]">
                <GraduationCap size={24} />
                <h3 className="text-xl font-bold uppercase tracking-wide">Education</h3>
                </div>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-bold text-gray-900">Master of Information Technology</h4>
                        <div className="text-sm text-gray-600">University of Melbourne</div>
                        <div className="text-xs text-[#0e5b9e] font-semibold mt-1 mb-2">03/2025 ~ 07/2026</div>
                        <div className="text-xs text-gray-500 italic leading-relaxed">
                            Relevant Coursework: Distributed Systems, Cluster and Cloud Computing, Distributed Algorithms, NLP, Machine Learning, Advanced Database, Mobile Computing, Software Processes.
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900">Bachelor of Science</h4>
                        <div className="text-sm text-gray-600">University of Melbourne</div>
                        <div className="text-xs text-[#0e5b9e] font-semibold mt-1 mb-2">02/2022 ~ 12/2024</div>
                        <div className="text-xs text-gray-500 italic leading-relaxed">
                            Relevant Coursework: Artificial Intelligence, Models of Computation, Software Modelling and Design, Computer Systems, Algorithms and Data Structures, Object Oriented Software Development.
                        </div>
                    </div>
                </div>
            </section>

             {/* Awards / Extra-curricular */}
             <section>
                <div className="flex items-center gap-2 mb-4 text-[#0e5b9e]">
                <Award size={24} />
                <h3 className="text-xl font-bold uppercase tracking-wide">Extra-Curricular</h3>
                </div>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-bold text-gray-900">HackMelbourne Club</h4>
                        <div className="text-sm text-gray-800 italic">Hackathon Officer</div>
                         <div className="text-xs text-[#0e5b9e] font-semibold mt-1 mb-2">07/2025 ~ 11/2025</div>
                        <ul className="text-sm text-gray-600 list-disc ml-4 space-y-1">
                            <li>Collaborated and communicated with cross-functional teams</li>
                            <li>Co-organise university hackathon with 150+ participants, managing platform development and event logistics.</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
      </div>

       {/* Footer Page 2 */}
        <div className="absolute bottom-4 text-right right-8 text-xs text-gray-400">
            Page 2 of 2
        </div>
    </div>
    </>
  );
};

export default Resume;

