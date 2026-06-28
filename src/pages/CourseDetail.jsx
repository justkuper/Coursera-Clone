import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Clock, Users, Star, Globe, Award, ChevronDown, ChevronUp, Play, Lock, CheckCircle, ShoppingCart, Zap, Share2 } from 'lucide-react'
import StarRating from '../components/StarRating'
import VideoPlayer from '../components/VideoPlayer'
import { MOCK_COURSES, MOCK_REVIEWS, formatDuration, formatNumber, formatSeconds } from '../lib/mockData'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const levelColors = {
  BEGINNER: 'bg-green-100 text-green-700', INTERMEDIATE: 'bg-blue-100 text-blue-700',
  ADVANCED: 'bg-purple-100 text-purple-700', ALL_LEVELS: 'bg-gray-100 text-gray-700',
}

export default function CourseDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { addToCart, isInCart } = useCart()
  const { user } = useAuth()
  const [openSections, setOpenSections] = useState({ s1: true })
  const [showPreview, setShowPreview] = useState(false)

  const course = MOCK_COURSES.find((c) => c.slug === slug)
  if (!course) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Course not found</h2>
      <Link to="/catalog" className="btn-primary">Browse Courses</Link>
    </div>
  )

  const toggleSection = (id) => setOpenSections((p) => ({ ...p, [id]: !p[id] }))
  const discount = course.originalPrice ? Math.round((1 - course.price / course.originalPrice) * 100) : null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:pr-[360px]">
          <p className="text-blue-400 text-sm mb-3">{course.categoryName}</p>
          <h1 className="text-2xl md:text-4xl font-bold leading-snug mb-4">{course.title}</h1>
          <p className="text-gray-300 text-lg mb-5 max-w-2xl">{course.shortDescription}</p>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {course.isBestseller && <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2.5 py-1 rounded">Bestseller</span>}
            <StarRating rating={course.avgRating} totalReviews={course.totalReviews} size="md" />
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
            <span>By <span className="text-blue-400">{course.instructorName}</span></span>
            <span className="flex items-center gap-1"><Globe className="w-4 h-4" />{course.language}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{formatDuration(course.totalDuration)}</span>
            <span className="flex items-center gap-1"><Users className="w-4 h-4" />{formatNumber(course.totalStudents)} students</span>
            <span className={`badge ${levelColors[course.level]}`}>{course.level?.replace('_', ' ')}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <div className="lg:pr-80">
          {/* What you'll learn */}
          {course.whatYouLearn?.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">What you'll learn</h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {course.whatYouLearn.map((item, i) => (
                  <div key={i} className="flex gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />{item}
                  </div>
                ))}
              </div>
            </div>
          )}

          {showPreview && <div className="mb-6"><VideoPlayer url={course.previewVideo} /></div>}

          {/* Curriculum */}
          <div className="bg-white border border-gray-200 rounded-xl mb-6 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Course Content</h2>
              <p className="text-sm text-gray-500 mt-1">{course.sections?.length} sections • {course.totalLessons} lessons • {formatDuration(course.totalDuration)} total</p>
            </div>
            {course.sections?.map((section) => (
              <div key={section.id} className="border-b border-gray-100 last:border-0">
                <button onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    {openSections[section.id] ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    <span className="font-semibold text-gray-900 text-sm">{section.title}</span>
                  </div>
                  <span className="text-xs text-gray-500">{section.lessons?.length} lessons</span>
                </button>
                {openSections[section.id] && section.lessons?.map((lesson) => (
                  <div key={lesson.id} className="flex items-center justify-between px-6 py-3 pl-14 border-t border-gray-50 hover:bg-blue-50/50">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      {lesson.isFree ? <Play className="w-4 h-4 text-blue-500" /> : <Lock className="w-4 h-4 text-gray-400" />}
                      <span>{lesson.title}</span>
                      {lesson.isFree && <span className="text-xs text-blue-600 font-medium bg-blue-50 px-1.5 py-0.5 rounded">Preview</span>}
                    </div>
                    <span className="text-xs text-gray-400">{formatSeconds(lesson.duration)}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Requirements */}
          {course.requirements?.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Requirements</h2>
              <ul className="space-y-2">
                {course.requirements.map((r, i) => <li key={i} className="text-sm text-gray-700 flex gap-2"><span className="text-gray-400">•</span>{r}</li>)}
              </ul>
            </div>
          )}

          {/* Reviews */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Student Reviews</h2>
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="text-center">
                <div className="text-6xl font-black text-amber-500">{course.avgRating}</div>
                <StarRating rating={course.avgRating} size="lg" />
                <p className="text-sm text-gray-500 mt-1">Course Rating</p>
              </div>
              <div className="flex-1 space-y-1.5">
                {[{s:5,p:68},{s:4,p:21},{s:3,p:7},{s:2,p:3},{s:1,p:1}].map(({s,p}) => (
                  <div key={s} className="flex items-center gap-3 text-sm">
                    <div className="flex-1 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-amber-400 h-full rounded-full" style={{ width: `${p}%` }} />
                    </div>
                    <span className="text-amber-500">{'★'.repeat(s)}</span>
                    <span className="text-gray-500 w-8">{p}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              {MOCK_REVIEWS.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                  <div className="flex items-start gap-3 mb-3">
                    <img src={review.userAvatar} alt={review.userName} className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{review.userName}</p>
                      <StarRating rating={review.rating} size="sm" />
                    </div>
                    <span className="ml-auto text-xs text-gray-400">{review.createdAt}</span>
                  </div>
                  <p className="text-sm text-gray-700 font-semibold mb-1">{review.title}</p>
                  <p className="text-sm text-gray-600">{review.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky card */}
        <div className="hidden lg:block absolute top-8 right-0 w-72 xl:w-80">
          <div className="card p-5 sticky top-24">
            <div className="relative rounded-lg overflow-hidden mb-4 cursor-pointer group" onClick={() => setShowPreview(!showPreview)}>
              <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white">
                  <Play className="w-5 h-5 text-gray-900 ml-0.5" />
                </div>
              </div>
              <p className="absolute bottom-2 inset-x-0 text-center text-white text-xs font-medium">Preview this course</p>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-black text-gray-900">${course.price}</span>
              {course.originalPrice && <span className="text-gray-400 line-through text-lg">${course.originalPrice}</span>}
              {discount && <span className="text-red-600 font-bold text-sm">{discount}% off</span>}
            </div>
            {discount && <p className="text-red-600 text-xs font-medium mb-3">⏰ 2 days left at this price!</p>}
            <div className="space-y-2 mb-4">
              <button onClick={() => { if (!user) navigate('/login'); else { addToCart(course); navigate('/checkout') } }}
                className="btn-primary w-full flex items-center justify-center gap-2">
                <Zap className="w-4 h-4" /> Buy Now
              </button>
              <button onClick={() => isInCart(course.id) ? navigate('/cart') : addToCart(course)}
                className="btn-secondary w-full flex items-center justify-center gap-2">
                <ShoppingCart className="w-4 h-4" />{isInCart(course.id) ? 'Go to Cart' : 'Add to Cart'}
              </button>
            </div>
            <p className="text-center text-xs text-gray-500 mb-4">30-Day Money-Back Guarantee</p>
            <div className="space-y-2 text-sm text-gray-700">
              {[
                [Clock, `${formatDuration(course.totalDuration)} on-demand video`],
                [Award, 'Certificate of completion'],
                [Globe, 'Full lifetime access'],
                [Play, `${course.totalLessons} lessons`],
              ].map(([Icon, text]) => (
                <div key={text} className="flex items-center gap-2"><Icon className="w-4 h-4 text-gray-400" /><span>{text}</span></div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile buy bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex items-center gap-3 z-50">
          <div>
            <span className="text-2xl font-black text-gray-900">${course.price}</span>
            {course.originalPrice && <span className="text-gray-400 line-through text-sm ml-2">${course.originalPrice}</span>}
          </div>
          <button onClick={() => { if (!user) navigate('/login'); else { addToCart(course); navigate('/checkout') } }} className="btn-primary flex-1">Buy Now</button>
          <button onClick={() => isInCart(course.id) ? navigate('/cart') : addToCart(course)} className="p-3 border-2 border-blue-600 text-blue-600 rounded-lg">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
