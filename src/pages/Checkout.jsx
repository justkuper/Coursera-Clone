import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, CreditCard, CheckCircle, Shield } from 'lucide-react'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [card, setCard] = useState({ number: '', expiry: '', cvc: '', name: '' })

  const fmtCard = (v) => v.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim().slice(0,19)
  const fmtExpiry = (v) => { const d = v.replace(/\D/g,''); return d.length >= 3 ? `${d.slice(0,2)}/${d.slice(2,4)}` : d }

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true)
    await new Promise((r) => setTimeout(r, 2000))
    setLoading(false); setSuccess(true); clearCart()
    toast.success('Payment successful!')
  }

  if (success) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
        <p className="text-gray-500 mb-8">You've been enrolled. Start learning right away!</p>
        <div className="space-y-3">
          <Link to="/my-learning" className="btn-primary w-full py-3 block text-center">Go to My Learning</Link>
          <Link to="/catalog" className="btn-secondary w-full py-3 block text-center">Browse More Courses</Link>
        </div>
      </div>
    </div>
  )

  if (items.length === 0) { navigate('/cart'); return null }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <div className="flex items-center gap-2 mb-6">
                <Lock className="w-5 h-5 text-gray-500" />
                <h2 className="font-bold text-gray-900">Secure Payment</h2>
                <div className="ml-auto flex items-center gap-2">
                  {['Visa','MC','Amex'].map((c) => <span key={c} className="text-xs bg-gray-100 px-2 py-0.5 rounded font-mono">{c}</span>)}
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Name on Card</label>
                  <input type="text" required value={card.name} onChange={(e) => setCard({...card,name:e.target.value})} placeholder="Jane Doe" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Card Number</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" required value={card.number} onChange={(e) => setCard({...card,number:fmtCard(e.target.value)})}
                      placeholder="1234 5678 9012 3456" className="input-field pl-11 font-mono" maxLength={19} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Expiry</label>
                    <input type="text" required value={card.expiry} onChange={(e) => setCard({...card,expiry:fmtExpiry(e.target.value)})}
                      placeholder="MM/YY" className="input-field font-mono" maxLength={5} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">CVC</label>
                    <input type="text" required value={card.cvc} onChange={(e) => setCard({...card,cvc:e.target.value.replace(/\D/g,'').slice(0,4)})}
                      placeholder="123" className="input-field font-mono" maxLength={4} />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2">
                  {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Processing...</> : <><Lock className="w-4 h-4" />Pay ${subtotal.toFixed(2)}</>}
                </button>
              </form>
            </div>
            <div className="flex items-start gap-2 text-xs text-gray-400 bg-white border border-gray-200 rounded-lg px-4 py-3">
              <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />
              In production, replace this form with <code className="bg-gray-100 px-1 rounded">@stripe/react-stripe-js</code> Elements and a Lambda that creates a Stripe PaymentIntent.
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {items.map((c) => (
                  <div key={c.id} className="flex gap-3">
                    <img src={c.thumbnail} alt={c.title} className="w-12 h-8 object-cover rounded" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800 line-clamp-2 leading-snug">{c.title}</p>
                    </div>
                    <span className="text-sm font-bold text-gray-900 flex-shrink-0">${c.price}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between font-bold text-gray-900 text-lg"><span>Total</span><span>${subtotal.toFixed(2)}</span></div>
              </div>
              <p className="text-center text-xs text-gray-500 mt-4">🔒 30-Day Money-Back Guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
