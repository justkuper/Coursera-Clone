import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Play, Award, Search } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'
import { MOCK_COURSES } from '../lib/mockData'

const ENROLLED = [
  { ...MOCK_COURSES[0], progress: 68 },
  { ...MOCK_COURSES[1], progress: 23 },
  { ...MOCK_COURSES[2], progress: 0 },
  { ...MOCK_COURSES[3], progress: 100 },
]

export default function MyLearning() {
  const [tab, setTab] = useState('All Courses')
  const [search, setSearch] = useState('')

  const filtered = ENROLLED.filter((c) => {
    if (!c.title.toLowerCase().includes(search.toLowerCase())) return false
    if (tab === 'In Progress') return c.progress > 0 && c.progress < 100
    if (tab === 'Completed') return c.progress === 100
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Learning</h1>
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search my courses..." className="input-field pl-10 py-2.5 text-sm" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-0 border-b border-gray-200 mb-8">
          {['All Courses', 'In Progress', 'Completed'].map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${tab===t ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              {t}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">No courses found</p>
            <Link to="/catalog" className="btn-primary">Browse Courses</Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((course) => (
              <div key={course.id} className="card group">
                <Link to={`/learn/${course.slug}`} className="block relative">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover group-hover:opacity-90 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-5 h-5 text-gray-900 ml-0.5" />
                    </div>
                  </div>
                  {course.progress === 100 && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Award className="w-3 h-3" /> Done
                    </div>
                  )}
                </Link>
                <div className="p-4">
                  <Link to={`/learn/${course.slug}`}>
                    <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1 line-clamp-2 hover:text-blue-600">{course.title}</h3>
                  </Link>
                  <p className="text-xs text-gray-500 mb-3">{course.instructorName}</p>
                  <ProgressBar value={course.progress} size="sm" color={course.progress === 100 ? 'green' : 'blue'} />
                  <p className="text-xs text-gray-500 mt-1">{course.progress}% complete</p>
                  {course.progress === 100 && (
                    <button className="w-full mt-3 flex items-center justify-center gap-1.5 text-xs text-green-700 bg-green-100 hover:bg-green-200 font-medium py-1.5 rounded-lg transition-colors">
                      <Award className="w-3.5 h-3.5" /> Download Certificate
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
