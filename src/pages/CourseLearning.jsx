import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, CheckCircle, Circle, ChevronDown, ChevronUp, Menu, X, Award } from 'lucide-react'
import VideoPlayer from '../components/VideoPlayer'
import ProgressBar from '../components/ProgressBar'
import { MOCK_COURSES, formatSeconds } from '../lib/mockData'

export default function CourseLearning() {
  const { slug } = useParams()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentLesson, setCurrentLesson] = useState(null)
  const [completedLessons, setCompletedLessons] = useState(new Set())
  const [openSections, setOpenSections] = useState({})
  const [activeTab, setActiveTab] = useState('overview')

  const course = MOCK_COURSES.find((c) => c.slug === slug)
  if (!course) return <div className="min-h-screen flex items-center justify-center"><Link to="/catalog" className="btn-primary">Browse Courses</Link></div>

  const allLessons = course.sections?.flatMap((s) => s.lessons?.map((l) => ({ ...l, sectionTitle: s.title }))) || []
  const activeLesson = currentLesson || allLessons[0]
  const progress = allLessons.length > 0 ? (completedLessons.size / allLessons.length) * 100 : 0

  const toggleComplete = (id) => setCompletedLessons((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n })
  const goToNext = () => {
    const idx = allLessons.findIndex((l) => l.id === activeLesson?.id)
    if (idx < allLessons.length - 1) { toggleComplete(activeLesson.id); setCurrentLesson(allLessons[idx + 1]) }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-gray-800 border-b border-gray-700 flex-shrink-0">
        <Link to={`/courses/${slug}`} className="text-gray-400 hover:text-white flex items-center gap-1 text-sm">
          <ChevronLeft className="w-4 h-4" /> Back
        </Link>
        <p className="text-white font-semibold text-sm truncate hidden sm:block flex-1 mx-4">{course.title}</p>
        <div className="flex items-center gap-3 ml-auto">
          <div className="w-32"><ProgressBar value={progress} size="sm" color="green" /></div>
          <span className="text-xs text-gray-400">{completedLessons.size}/{allLessons.length}</span>
          {progress === 100 && <span className="flex items-center gap-1 text-xs text-green-400"><Award className="w-4 h-4" /> Certificate Ready</span>}
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white p-1.5">
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="bg-black"><VideoPlayer url={activeLesson?.videoUrl} onEnded={goToNext} /></div>
          <div className="max-w-3xl mx-auto px-6 py-6">
            <div className="flex gap-0 border-b border-gray-200 mb-6">
              {['overview', 'notes', 'q&a', 'resources'].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-sm font-medium capitalize border-b-2 transition-colors ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 'overview' && (
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{activeLesson?.sectionTitle}</p>
                    <h2 className="text-xl font-bold text-gray-900">{activeLesson?.title}</h2>
                  </div>
                  <button onClick={() => toggleComplete(activeLesson?.id)}
                    className={`flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-lg flex-shrink-0 ${completedLessons.has(activeLesson?.id) ? 'bg-green-100 text-green-700' : 'border border-gray-300 text-gray-700 hover:bg-gray-100'}`}>
                    {completedLessons.has(activeLesson?.id) ? <><CheckCircle className="w-4 h-4" /> Completed</> : <><Circle className="w-4 h-4" /> Mark Complete</>}
                  </button>
                </div>
                <p className="text-gray-600">In this lesson, you'll learn the fundamentals covered in this section. Follow along with the video and practice the exercises provided.</p>
                <button onClick={goToNext} className="btn-primary mt-6">Next Lesson →</button>
              </div>
            )}
            {activeTab === 'notes' && (
              <div>
                <textarea className="input-field h-48 resize-none" placeholder="Take notes for this lesson..." />
                <button className="btn-primary mt-3">Save Notes</button>
              </div>
            )}
            {activeTab === 'q&a' && (
              <div>
                <textarea className="input-field h-24 resize-none mb-3" placeholder="Ask a question..." />
                <button className="btn-primary">Post Question</button>
              </div>
            )}
            {activeTab === 'resources' && (
              <div className="space-y-3">
                {['Course Slides.pdf', 'Starter Code.zip', 'Cheat Sheet.pdf'].map((r) => (
                  <div key={r} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <span className="text-sm text-gray-700">📎 {r}</span>
                    <button className="text-blue-600 text-sm hover:underline">Download</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {sidebarOpen && (
          <aside className="w-72 xl:w-80 bg-white border-l border-gray-200 overflow-y-auto flex-shrink-0">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-900 text-sm mb-2">Course Content</h3>
              <ProgressBar value={progress} label={`${Math.round(progress)}% complete`} size="sm" color="green" />
            </div>
            <div className="divide-y divide-gray-100">
              {course.sections?.map((section) => (
                <div key={section.id}>
                  <button onClick={() => setOpenSections((p) => ({ ...p, [section.id]: !p[section.id] }))}
                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50">
                    <span className="text-xs font-semibold text-gray-900 uppercase tracking-wide">{section.title}</span>
                    {openSections[section.id] ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>
                  {openSections[section.id] !== false && section.lessons?.map((lesson) => {
                    const isActive = activeLesson?.id === lesson.id
                    const isDone = completedLessons.has(lesson.id)
                    return (
                      <button key={lesson.id} onClick={() => setCurrentLesson(lesson)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left text-xs hover:bg-blue-50 transition-colors ${isActive ? 'bg-blue-50 border-l-2 border-blue-600' : ''}`}>
                        {isDone ? <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" /> : <Circle className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-300'}`} />}
                        <span className={`flex-1 leading-snug ${isActive ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>{lesson.title}</span>
                        <span className="text-gray-400">{formatSeconds(lesson.duration)}</span>
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
