import { Link, useNavigate } from 'react-router-dom'
import { Trash2, ShoppingCart, Tag, ArrowRight } from 'lucide-react'
import StarRating from '../components/StarRating'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Cart() {
  const { items, removeFromCart, subtotal, totalItems } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  if (items.length === 0) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingCart className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Discover courses you'll love</p>
        <Link to="/catalog" className="btn-primary">Browse Courses</Link>
      </div>
    </div>
  )

  const savings = items.reduce((s, i) => s + ((i.originalPrice || i.price) - i.price), 0)

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart ({totalItems})</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((course) => (
              <div key={course.id} className="bg-white rounded-xl border border-gray-200 p-4 flex gap-4">
                <Link to={`/courses/${course.slug}`} className="flex-shrink-0">
                  <img src={course.thumbnail} alt={course.title} className="w-24 h-16 object-cover rounded-lg" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/courses/${course.slug}`}>
                    <h3 className="font-semibold text-gray-900 text-sm leading-snug hover:text-blue-600 line-clamp-2 mb-1">{course.title}</h3>
                  </Link>
                  <p className="text-xs text-gray-500 mb-1">By {course.instructorName}</p>
                  <StarRating rating={course.avgRating} totalReviews={course.totalReviews} />
                </div>
                <div className="flex flex-col items-end justify-between flex-shrink-0">
                  <button onClick={() => removeFromCart(course.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${course.price}</p>
                    {course.originalPrice && <p className="text-xs text-gray-400 line-through">${course.originalPrice}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <h2 className="font-bold text-gray-900 text-lg mb-4">Order Summary</h2>
              {savings > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-700 font-medium">You save ${savings.toFixed(2)}!</span>
                </div>
              )}
              <div className="space-y-2 mb-4 text-sm text-gray-600">
                <div className="flex justify-between"><span>Original Price</span><span>${items.reduce((s,i) => s+(i.originalPrice||i.price),0).toFixed(2)}</span></div>
                {savings > 0 && <div className="flex justify-between text-green-600"><span>Discounts</span><span>-${savings.toFixed(2)}</span></div>}
              </div>
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between font-bold text-gray-900 text-lg"><span>Total</span><span>${subtotal.toFixed(2)}</span></div>
              </div>
              <button onClick={() => user ? navigate('/checkout') : navigate('/login', { state: { from: { pathname: '/checkout' } } })}
                className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2">
                Checkout <ArrowRight className="w-5 h-5" />
              </button>
              <div className="mt-4 flex gap-2">
                <input type="text" placeholder="Coupon code" className="input-field py-2 text-sm flex-1" />
                <button className="btn-secondary py-2 px-4 text-sm">Apply</button>
              </div>
              <p className="text-center text-xs text-gray-500 mt-4">🔒 30-Day Money-Back Guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
