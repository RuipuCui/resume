import { Download } from 'lucide-react'

const paragraphs = [
  `I am writing to apply for the Software Engineer position in the Department of Microbiology & Immunology at the University of Melbourne. As a Master of Information Technology student with hands-on experience building full-stack platforms in academic and industry settings, I am keen to contribute to the Trakka platform through secure, reliable, and user-focused software.`,
  `My recent experience has centred on full-stack development across web interfaces, backend services, and cloud-supported systems. In my current role as a Research Assistant (Full-Stack Developer) at the University of Melbourne, I have developed and maintained a full-stack assessment platform using Vue.js, Python, and Flask, building interfaces and backend workflows for interactive, data-driven question delivery and grading. I have also worked closely with academic users to refine workflows, resolve issues across connected systems, and improve reliability and usability.`,
  `In addition, I have developed software using React, TypeScript, Node.js, PostgreSQL, and cloud technologies through both professional and project work. My experience includes building responsive user interfaces, designing and integrating APIs, working with SQL-backed data systems, and contributing to scalable cloud-based solutions using tools such as AWS, Docker, and Kubernetes. I am also comfortable working in Unix-like environments and using Git and GitHub for collaborative development.`,
  `What particularly attracts me to this opportunity is the combination of meaningful public impact and strong technical challenge. I am motivated by the opportunity to contribute to software that supports surveillance, outbreak investigation, and evidence-based public health response, and I would welcome the opportunity to contribute my technical skills and strong interest in research-focused software development to the Trakka team.`,
  `Thank you for considering my application. I would be pleased to further discuss my interest and suitability for the role.`,
]

const UnimelbCoverLetter = () => {
  const handleDownload = () => {
    window.print()
  }

  return (
    <div className="min-h-screen overflow-x-auto bg-[linear-gradient(180deg,#edf4fb_0%,#f4f6f8_38%,#eef2f6_100%)] py-8 md:py-10 print:bg-white print:py-0">
      <div className="fixed right-6 top-6 z-50 print:hidden">
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 rounded-full bg-[#0e5b9e] px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-[#0b4b83]"
          aria-label="Download cover letter as PDF"
        >
          <Download size={16} />
          <span>Download PDF</span>
        </button>
      </div>

      <div className="cover-letter-page w-[210mm] h-[297mm] min-w-[210mm] mx-auto bg-white shadow-lg print:shadow-none print:w-[210mm] print:h-[297mm] overflow-hidden text-gray-800 relative">
        <header className="bg-[#0e5b9e] text-white px-6 md:px-10 pt-8 pb-7 relative print:bg-[#0e5b9e] print:text-white print:-webkit-print-color-adjust: exact">
          <div className="flex flex-col md:flex-row print:flex-row justify-between items-start print:items-start gap-6">
            <div>
              <p className="text-[11px] tracking-[0.22em] uppercase text-blue-100 mb-2">
                Cover Letter
              </p>
              <h1 className="text-4xl font-bold leading-none mb-2">Nolan Cui</h1>
              <p className="text-lg text-blue-100">Software Engineer</p>
            </div>

            <div className="text-[12px] text-blue-50 leading-relaxed md:text-right print:text-right print:ml-auto">
              <p>Master of Information Technology</p>
              <p>University of Melbourne</p>
              <p>ruipu@unimelb.edu.au</p>
              <p>0472 567 745</p>
            </div>
          </div>

          <div
            className="absolute bottom-0 left-0 right-0 h-8 bg-white"
            style={{ clipPath: 'ellipse(70% 60% at 50% 100%)' }}
          />
        </header>

        <main className="px-6 md:px-10 pt-5 pb-8 md:pb-10 print:px-10 print:pb-8">
          <div className="flex items-start justify-between gap-6 mb-8">
            <div className="max-w-[420px] bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 print:bg-slate-50">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0e5b9e] mb-2">
                To
              </p>
              <div className="text-[13px] leading-relaxed text-slate-700">
                <p>Hiring Committee</p>
                <p>Department of Microbiology &amp; Immunology</p>
                <p>Faculty of Medicine, Dentistry and Health Sciences</p>
                <p>The University of Melbourne</p>
              </div>
            </div>

            <div className="hidden md:block print:block text-right">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 mb-2">
                Role
              </p>
              <p className="text-[13px] font-semibold text-slate-700">
                Software Engineer
              </p>
              <p className="text-[12px] text-slate-500">
                Department of Microbiology &amp; Immunology
              </p>
            </div>
          </div>

          <div className="pl-0 md:pl-5 md:border-l-2 md:border-slate-200">
            <p className="text-[15px] font-semibold text-slate-900 mb-5">
              Dear Hiring Committee,
            </p>

            <div className="space-y-3 text-[14px] leading-[1.68] text-slate-700 font-serif">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-7 pt-4 border-t border-slate-200">
              <p className="text-[14px] text-slate-700 font-serif">
                Yours sincerely,
              </p>
              <p className="mt-6 text-[18px] font-semibold text-slate-900">
                Nolan Cui
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default UnimelbCoverLetter
