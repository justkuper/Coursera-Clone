import { Link } from 'react-router-dom'
import { ArrowRight, Star, Users, BookOpen, Award, Play, CheckCircle } from 'lucide-react'
import CourseCard from '../components/CourseCard'
import { MOCK_COURSES, CATEGORIES, formatNumber } from '../lib/mockData'
import { useAuth } from '../context/AuthContext'

const STATS = [
  { label: 'Students', value: '10M+', icon: Users },
  { label: 'Courses', value: '100K+', icon: BookOpen },
  { label: 'Instructors', value: '68K+', icon: Star },
  { label: 'Certificates', value: '5M+', icon: Award },
]

export default function Home() {
  const { user } = useAuth()
  const featured = MOCK_COURSES.filter((c) => c.isFeatured).slice(0, 4)
  const bestsellers = MOCK_COURSES.filter((c) => c.isBestseller).slice(0, 4)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-800/60 border border-blue-600/40 rounded-full px-4 py-1.5 text-sm text-blue-200 mb-6">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                Trusted by 10M+ learners worldwide
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                Learn Without<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300"> Limits</span>
              </h1>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                Expand your skills with world-class online courses. Learn from expert instructors at your own pace, anywhere, anytime.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/catalog" className="btn-primary text-base px-8 py-4 flex items-center gap-2">
                  Explore Courses <ArrowRight className="w-5 h-5" />
                </Link>
                {!user && (
                  <Link to="/signup" className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-lg transition-colors">
                    Start for Free
                  </Link>
                )}
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                {['No credit card required', 'Cancel anytime', '30-day money back'].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-sm text-blue-200">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />{t}
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&q=80"
                  alt="Students learning" className="w-full object-cover h-80" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate">The Complete JavaScript Course</p>
                      <p className="text-blue-200 text-xs">845K+ students enrolled</p>
                    </div>
                    <span className="text-amber-400 font-bold text-sm">4.7 ⭐</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <p className="text-3xl font-extrabold text-gray-900">{value}</p>
                <p className="text-sm text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title">Browse by Category</h2>
          <Link to="/catalog" className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">View all <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} to={`/catalog?category=${cat.slug}`}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group">
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-xs font-medium text-gray-700 group-hover:text-blue-700 text-center leading-tight">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title">Featured Courses</h2>
            <Link to="/catalog?featured=true" className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">See all <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((c) => <CourseCard key={c.id} course={c} />)}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title">🔥 Bestsellers</h2>
            <Link to="/catalog?bestseller=true" className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">See all <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((c) => <CourseCard key={c.id} course={c} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Learning Today</h2>
          <p className="text-blue-100 text-lg mb-8">Join over 10 million learners and advance your career with expert-led courses.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/catalog" className="bg-white text-blue-700 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors">Browse Courses</Link>
            {!user && (
              <Link to="/signup" className="border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors">Create Free Account</Link>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
