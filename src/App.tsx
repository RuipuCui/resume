import Resume from './Resume'
import UnimelbCoverLetter from './UnimelbCoverLetter'
import './App.css'

function App() {
  const pathname = window.location.pathname.replace(/\/+$/, '') || '/'

  if (pathname === '/coverletter') {
    return <UnimelbCoverLetter />
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 gap-8 print:bg-white print:p-0 print:block">
      <Resume />
    </div>
  )
}

export default App
