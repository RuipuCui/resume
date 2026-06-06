import Resume, { type ResumeVariant } from './Resume'
import UnimelbCoverLetter from './UnimelbCoverLetter'
import './App.css'

const resumeRoutes: Record<string, ResumeVariant> = {
  '/ai': 'ai',
  '/data': 'data',
  '/cloud': 'cloud',
  '/c': 'c',
}

function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/'

  if (pathname === '/coverletter') {
    return <UnimelbCoverLetter />
  }

  const resumeVariant = resumeRoutes[pathname] || 'default'

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 gap-8 print:bg-white print:p-0 print:block">
      <Resume variant={resumeVariant} />
    </div>
  )
}

export default App
