import { Download, FilePenLine, RotateCcw, X } from 'lucide-react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { useEffect, useMemo, useRef, useState } from 'react'

type CoverLetterContent = {
  pageLabel: string
  name: string
  title: string
  education: string
  institution: string
  email: string
  phone: string
  recipientLabel: string
  recipientBlock: string
  roleLabel: string
  roleTitle: string
  roleSubtitle: string
  greeting: string
  body: string
  closing: string
  signature: string
}

const STORAGE_KEY = 'cover-letter-template-v1'

const defaultContent: CoverLetterContent = {
  pageLabel: 'Cover Letter',
  name: 'Nolan Cui',
  title: 'Software Engineer',
  education: 'Master of Information Technology',
  institution: 'University of Melbourne',
  email: 'ruipu@unimelb.edu.au',
  phone: '0472 567 745',
  recipientLabel: 'To',
  recipientBlock: 'Hiring Manager\nInformation and Technology Services\nUniversity of Western Australia',
  roleLabel: 'Role',
  roleTitle: 'Software Engineer',
  roleSubtitle: 'University of Western Australia',
  greeting: 'Dear Hiring Manager,',
  body:
    'I am writing to apply for the Software Engineer position at the University of Western Australia. As a Master of Information Technology student at the University of Melbourne, with hands-on experience developing and maintaining full-stack applications, I am excited by the opportunity to contribute to building scalable, enterprise-grade systems that support digital campus initiatives.\n\nIn my current role as a Research Assistant at the University of Melbourne, I work on a production-level platform where I design, develop, and maintain full-stack features across frontend and backend systems. This includes troubleshooting system issues, improving data consistency, and ensuring reliable integration between services. Through this, I have developed strong experience across the full Software Development Life Cycle, from design and implementation to testing and ongoing system improvement.\n\nIn addition, my experience as a Software Engineer has involved building scalable applications using modern technologies such as React, Node.js, and PostgreSQL, alongside working with cloud platforms including AWS. I have designed and implemented RESTful APIs, contributed to system architecture decisions, and continuously improved application performance and reliability. These experiences have strengthened my ability to deliver high-quality solutions while collaborating effectively with both technical and non-technical stakeholders.\n\nI am particularly drawn to this role at UWA due to its focus on modernising enterprise systems and supporting innovative teaching and research through technology. I value environments that emphasise continuous improvement, strong engineering practices, and collaboration across teams, and I am motivated to contribute to solutions that have a meaningful impact within the university community.\n\nThank you for your time and consideration. I look forward to the opportunity to discuss my application further.',
  closing: 'Kind regards,',
  signature: 'Nolan Cui',
}

function loadInitialContent(): CoverLetterContent {
  if (typeof window === 'undefined') return defaultContent

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultContent
    const parsed = JSON.parse(raw) as Partial<CoverLetterContent>
    return { ...defaultContent, ...parsed }
  } catch {
    return defaultContent
  }
}

function UnimelbCoverLetter() {
  const pageRef = useRef<HTMLDivElement | null>(null)
  const [content, setContent] = useState<CoverLetterContent>(() => loadInitialContent())
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const [isExportingPdf, setIsExportingPdf] = useState(false)

  const paragraphs = useMemo(
    () =>
      content.body
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean),
    [content.body]
  )

  const recipientLines = useMemo(
    () =>
      content.recipientBlock
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
    [content.recipientBlock]
  )

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
  }, [content])

  useEffect(() => {
    const checkOverflow = () => {
      if (!pageRef.current) return
      setIsOverflowing(pageRef.current.scrollHeight > pageRef.current.clientHeight + 2)
    }

    const frame = window.requestAnimationFrame(checkOverflow)
    window.addEventListener('resize', checkOverflow)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', checkOverflow)
    }
  }, [content, isEditorOpen])

  const handleFieldChange = <K extends keyof CoverLetterContent>(
    field: K,
    value: CoverLetterContent[K]
  ) => {
    setContent((prev) => ({ ...prev, [field]: value }))
  }

  const handleReset = () => {
    setContent(defaultContent)
  }

  const handleDownload = async () => {
    if (!pageRef.current || isExportingPdf) return

    setIsExportingPdf(true)

    try {
      const canvas = await html2canvas(pageRef.current, {
        backgroundColor: '#ffffff',
        scale: Math.min(window.devicePixelRatio || 2, 2),
        useCORS: true,
        width: pageRef.current.scrollWidth,
        height: pageRef.current.scrollHeight,
        windowWidth: pageRef.current.scrollWidth,
        windowHeight: pageRef.current.scrollHeight,
        scrollX: 0,
        scrollY: 0,
      })

      const imageData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      })

      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      pdf.addImage(imageData, 'PNG', 0, 0, pageWidth, pageHeight, undefined, 'FAST')

      const blob = pdf.output('blob')
      const blobUrl = URL.createObjectURL(blob)
      const previewWindow = window.open(blobUrl, '_blank')

      if (!previewWindow) {
        const link = document.createElement('a')
        link.href = blobUrl
        link.download = 'nolan-cui-cover-letter-uwa.pdf'
        link.click()
      }

      window.setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000)
    } catch (error) {
      console.error('Failed to generate PDF preview:', error)
      window.alert('Failed to generate PDF. Please try again.')
    } finally {
      setIsExportingPdf(false)
    }
  }

  return (
    <div className="cover-letter-shell min-h-screen overflow-x-auto bg-[linear-gradient(180deg,#edf4fb_0%,#f4f6f8_38%,#eef2f6_100%)] py-8 md:py-10 print:bg-white print:py-0">
      <div className="fixed right-6 top-6 z-50 flex gap-3 print:hidden">
        <button
          onClick={() => setIsEditorOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-[#0e5b9e]/20 bg-white px-4 py-2 text-sm font-semibold text-[#0e5b9e] shadow-lg transition-all hover:scale-[1.02] hover:bg-slate-50"
          aria-label="Edit cover letter content"
        >
          <FilePenLine size={16} />
          <span>Edit Content</span>
        </button>
        <button
          onClick={handleDownload}
          disabled={isExportingPdf}
          className="inline-flex items-center gap-2 rounded-full bg-[#0e5b9e] px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-[#0b4b83]"
          aria-label="Download cover letter as PDF"
        >
          <Download size={16} />
          <span>{isExportingPdf ? 'Preparing PDF...' : 'Preview PDF'}</span>
        </button>
      </div>

      {isEditorOpen && (
        <div className="fixed inset-0 z-40 flex justify-end bg-slate-950/40 backdrop-blur-[2px] print:hidden">
          <div className="flex h-full w-full max-w-[480px] flex-col overflow-hidden bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0e5b9e]">
                  Skeleton Editor
                </p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">
                  Cover letter content
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Update the fields below and the preview will refresh immediately.
                </p>
              </div>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                aria-label="Close editor"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {isOverflowing && (
                <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                  This content is longer than one A4 page. Shorten the body or recipient
                  details to avoid clipping when exporting the PDF.
                </div>
              )}

              <div className="space-y-5">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Name
                  </span>
                  <input
                    value={content.name}
                    onChange={(event) => handleFieldChange('name', event.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#0e5b9e] focus:ring-2 focus:ring-[#0e5b9e]/10"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Title
                  </span>
                  <input
                    value={content.title}
                    onChange={(event) => handleFieldChange('title', event.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#0e5b9e] focus:ring-2 focus:ring-[#0e5b9e]/10"
                  />
                </label>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-700">
                      Education
                    </span>
                    <input
                      value={content.education}
                      onChange={(event) =>
                        handleFieldChange('education', event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#0e5b9e] focus:ring-2 focus:ring-[#0e5b9e]/10"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-700">
                      Institution
                    </span>
                    <input
                      value={content.institution}
                      onChange={(event) =>
                        handleFieldChange('institution', event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#0e5b9e] focus:ring-2 focus:ring-[#0e5b9e]/10"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-700">
                      Email
                    </span>
                    <input
                      value={content.email}
                      onChange={(event) => handleFieldChange('email', event.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#0e5b9e] focus:ring-2 focus:ring-[#0e5b9e]/10"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-700">
                      Phone
                    </span>
                    <input
                      value={content.phone}
                      onChange={(event) => handleFieldChange('phone', event.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#0e5b9e] focus:ring-2 focus:ring-[#0e5b9e]/10"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Recipient block
                  </span>
                  <textarea
                    value={content.recipientBlock}
                    onChange={(event) =>
                      handleFieldChange('recipientBlock', event.target.value)
                    }
                    rows={4}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#0e5b9e] focus:ring-2 focus:ring-[#0e5b9e]/10"
                  />
                </label>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-700">
                      Role title
                    </span>
                    <input
                      value={content.roleTitle}
                      onChange={(event) =>
                        handleFieldChange('roleTitle', event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#0e5b9e] focus:ring-2 focus:ring-[#0e5b9e]/10"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-700">
                      Role subtitle
                    </span>
                    <input
                      value={content.roleSubtitle}
                      onChange={(event) =>
                        handleFieldChange('roleSubtitle', event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#0e5b9e] focus:ring-2 focus:ring-[#0e5b9e]/10"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Greeting
                  </span>
                  <input
                    value={content.greeting}
                    onChange={(event) => handleFieldChange('greeting', event.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#0e5b9e] focus:ring-2 focus:ring-[#0e5b9e]/10"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Body paragraphs
                  </span>
                  <textarea
                    value={content.body}
                    onChange={(event) => handleFieldChange('body', event.target.value)}
                    rows={14}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm leading-7 outline-none transition focus:border-[#0e5b9e] focus:ring-2 focus:ring-[#0e5b9e]/10"
                  />
                  <p className="mt-2 text-xs text-slate-500">
                    Separate paragraphs with a blank line.
                  </p>
                </label>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-700">
                      Closing
                    </span>
                    <input
                      value={content.closing}
                      onChange={(event) => handleFieldChange('closing', event.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#0e5b9e] focus:ring-2 focus:ring-[#0e5b9e]/10"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-700">
                      Signature
                    </span>
                    <input
                      value={content.signature}
                      onChange={(event) =>
                        handleFieldChange('signature', event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#0e5b9e] focus:ring-2 focus:ring-[#0e5b9e]/10"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <RotateCcw size={16} />
                <span>Reset</span>
              </button>

              <button
                onClick={() => setIsEditorOpen(false)}
                className="rounded-full bg-[#0e5b9e] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0b4b83]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        ref={pageRef}
        className="cover-letter-page mx-auto h-[297mm] min-w-[210mm] w-[210mm] overflow-hidden bg-white text-gray-800 shadow-lg print:h-[281mm] print:w-[210mm] print:shadow-none"
      >
        <header className="bg-[#0e5b9e] px-6 pb-7 pt-8 text-white print:bg-[#0e5b9e] print:text-white md:px-10">
          <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row print:flex-row print:items-start">
            <div>
              <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-blue-100">
                {content.pageLabel}
              </p>
              <h1 className="mb-2 text-4xl font-bold leading-none">{content.name}</h1>
              <p className="text-lg text-blue-100">{content.title}</p>
            </div>

            <div className="text-[12px] leading-relaxed text-blue-50 md:text-right print:ml-auto print:text-right">
              <p>{content.education}</p>
              <p>{content.institution}</p>
              <p>{content.email}</p>
              <p>{content.phone}</p>
            </div>
          </div>
        </header>

        <main className="px-6 pb-8 pt-5 print:px-10 print:pb-8 md:px-10 md:pb-10">
          <div className="mb-8 flex items-start justify-between gap-6">
            <div className="max-w-[420px] rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 print:bg-slate-50">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0e5b9e]">
                {content.recipientLabel}
              </p>
              <div className="text-[13px] leading-relaxed text-slate-700">
                {recipientLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>

            <div className="hidden text-right md:block print:block">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                {content.roleLabel}
              </p>
              <p className="text-[13px] font-semibold text-slate-700">{content.roleTitle}</p>
              <p className="text-[12px] text-slate-500">{content.roleSubtitle}</p>
            </div>
          </div>

          <div className="pl-0 md:border-l-2 md:border-slate-200 md:pl-5">
            <p className="mb-5 text-[15px] font-semibold text-slate-900">{content.greeting}</p>

            <div className="space-y-3 font-serif text-[14px] leading-[1.68] text-slate-700">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-7 border-t border-slate-200 pt-4">
              <p className="font-serif text-[14px] text-slate-700">{content.closing}</p>
              <p className="mt-6 text-[18px] font-semibold text-slate-900">
                {content.signature}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default UnimelbCoverLetter
