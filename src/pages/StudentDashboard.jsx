import { Link } from 'react-router-dom'
import { BookOpen, Clock, Award, TrendingUp, Play, ChevronRight } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'
import StarRating from '../components/StarRating'
import { MOCK_COURSES, formatDuration } from '../lib/mockData'
import { useAuth } from '../context/AuthContext'

const ENROLLED = [
  { ...MOCK_COURSES[0], progress: 68, lastLesson: 'Control Flow' },
  { ...MOCK_COURSES[1], progress: 23, lastLesson: 'Setting Up React' },
  { ...MOCK_COURSES[3], progress: 100, lastLesson: 'Final Project' },
]

export default function StudentDashboard() {
  const { user } = useAuth()
  const inProgress = ENROLLED.filter((c) => c.progress > 0 && c.progress < 100)
  const completed = ENROLLED.filter((c) => c.progress === 100)

  const stats = [
    { label: 'Enrolled', value: ENROLLED.length, icon: BookOpen, color: 'text-blue-600 bg-blue-100' },
    { label: 'Completed', value: completed.length, icon: Award, color: 'text-green-600 bg-green-100' },
    { label: 'Hours learned', value: '24h', icon: Clock, color: 'text-purple-600 bg-purple-100' },
    { label: 'Day streak', value: '7', icon: TrendingUp, color: 'text-amber-600 bg-amber-100' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.signInDetails?.loginId?.split('@')[0] || 'Learner'}! 👋</h1>
          <p className="text-gray-500 mt-1">You're on a 7-day streak. Keep it up!</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${color}`}><Icon className="w-5 h-5" /></div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-sm text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-gray-900 text-lg">Continue Learning</h2>
                <Link to="/my-learning" className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">View all <ChevronRight className="w-4 h-4" /></Link>
              </div>
              {inProgress.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 mb-4">No courses in progress</p>
                  <Link to="/catalog" className="btn-primary">Explore Courses</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {inProgress.map((course) => (
                    <div key={course.id} className="flex gap-4 p-4 border border-gray-100 rounded-xl hover:border-blue-200 transition-colors">
                      <img src={course.thumbnail} alt={course.title} className="w-20 h-14 object-cover rounded-lg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{course.title}</h3>
                        <p className="text-xs text-gray-500 mt-0.5 mb-2">Last: {course.lastLesson}</p>
                        <ProgressBar value={course.progress} size="sm" color="blue" />
                      </div>
                      <Link to={`/learn/${course.slug}`} className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700">
                        <Play className="w-4 h-4 text-white ml-0.5" />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {completed.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="font-bold text-gray-900 text-lg mb-5">Completed Courses 🎉</h2>
                <div className="space-y-3">
                  {completed.map((course) => (
                    <div key={course.id} className="flex items-center gap-4 p-3 border border-green-100 bg-green-50 rounded-xl">
                      <img src={course.thumbnail} alt={course.title} className="w-16 h-10 object-cover rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{course.title}</h3>
                        <StarRating rating={course.avgRating} size="sm" />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="badge bg-green-100 text-green-700">✓ Complete</span>
                        <button className="text-xs text-blue-600 hover:underline">Get Certificate</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-900 mb-4">Weekly Goal</h2>
              <div className="text-center mb-4">
                <div className="relative w-20 h-20 mx-auto">
                  <svg className="w-20 h-20 -rotate-90">
                    <circle cx="40" cy="40" r="32" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                    <circle cx="40" cy="40" r="32" fill="none" stroke="#2563eb" strokeWidth="8"
                      strokeDasharray={`${2*Math.PI*32}`} strokeDashoffset={`${2*Math.PI*32*0.4}`} strokeLinecap="round" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-gray-900">60%</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 text-center">3 of 5 hours this week</p>
              <div className="mt-4 bg-blue-50 rounded-lg p-3 text-center">
                <p className="text-xs text-blue-700">2 more hours to reach your weekly goal!</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-900 mb-4">Recommended</h2>
              <div className="space-y-3">
                {MOCK_COURSES.slice(4, 6).map((course) => (
                  <Link key={course.id} to={`/courses/${course.slug}`} className="flex gap-3 group">
                    <img src={course.thumbnail} alt={course.title} className="w-14 h-10 object-cover rounded-lg flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-gray-800 line-clamp-2 group-hover:text-blue-600 leading-snug">{course.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">${course.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link to="/catalog" className="btn-secondary w-full mt-4 py-2 text-sm text-center block">Explore More</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
