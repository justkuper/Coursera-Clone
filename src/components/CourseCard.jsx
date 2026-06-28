import { Link } from 'react-router-dom'
import { Clock, Users, ShoppingCart } from 'lucide-react'
import StarRating from './StarRating'
import { formatDuration, formatNumber } from '../lib/mockData'
import { useCart } from '../context/CartContext'

const levelColors = {
  BEGINNER: 'bg-green-100 text-green-700',
  INTERMEDIATE: 'bg-blue-100 text-blue-700',
  ADVANCED: 'bg-purple-100 text-purple-700',
  ALL_LEVELS: 'bg-gray-100 text-gray-700',
}

export default function CourseCard({ course, compact = false }) {
  const { addToCart, isInCart } = useCart()
  const discount = course.originalPrice ? Math.round((1 - course.price / course.originalPrice) * 100) : null

  return (
    <div className="card group flex flex-col h-full">
      <Link to={`/courses/${course.slug}`} className="block relative overflow-hidden">
        <img src={course.thumbnail} alt={course.title}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
        {course.isBestseller && (
          <span className="absolute top-2 left-2 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded">Bestseller</span>
        )}
        {discount && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">-{discount}%</span>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-blue-600 font-medium mb-1">{course.categoryName}</p>
        <Link to={`/courses/${course.slug}`}>
          <h3 className="font-semibold text-gray-900 leading-snug mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
            {course.title}
          </h3>
        </Link>
        <p className="text-xs text-gray-500 mb-2">{course.instructorName}</p>
        <StarRating rating={course.avgRating} totalReviews={course.totalReviews} />

        {!compact && (
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{formatDuration(course.totalDuration)}</span>
            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{formatNumber(course.totalStudents)}</span>
            <span className={`badge ${levelColors[course.level] || levelColors.ALL_LEVELS}`}>
              {course.level?.replace('_', ' ')}
            </span>
          </div>
        )}

        <div className="flex-1" />
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div>
            <span className="text-xl font-bold text-gray-900">${course.price}</span>
            {course.originalPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">${course.originalPrice}</span>
            )}
          </div>
          <button
            onClick={() => addToCart(course)}
            disabled={isInCart(course.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isInCart(course.id) ? 'bg-green-100 text-green-700 cursor-default' : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {isInCart(course.id) ? 'In Cart' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
}
