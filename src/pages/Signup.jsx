import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, GraduationCap, AlertCircle, CheckCircle } from 'lucide-react'
import { signUp, confirmSignUp, resendSignUpCode } from 'aws-amplify/auth'
import toast from 'react-hot-toast'

export default function Signup() {
  const navigate = useNavigate()
  const [step, setStep] = useState('form')
  const [role, setRole] = useState('student')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [confirmCode, setConfirmCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const strength = (() => {
    if (!password) return null
    let s = 0
    if (password.length >= 8) s++
    if (/[A-Z]/.test(password)) s++
    if (/[0-9]/.test(password)) s++
    if (/[^A-Za-z0-9]/.test(password)) s++
    return s
  })()
  const strengthMeta = { 1: ['Weak','bg-red-500'], 2: ['Fair','bg-amber-500'], 3: ['Good','bg-blue-500'], 4: ['Strong','bg-green-500'] }

  const handleSignUp = async (e) => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      await signUp({
        username: email.trim(), password,
        options: { userAttributes: { email: email.trim(), given_name: firstName.trim(), family_name: lastName.trim(), 'custom:role': role } },
      })
      setStep('confirm'); toast.success('Verification code sent!')
    } catch (err) { setError(err.message || 'Failed to sign up.') }
    finally { setLoading(false) }
  }

  const handleConfirm = async (e) => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      await confirmSignUp({ username: email.trim(), confirmationCode: confirmCode })
      toast.success('Account confirmed! Please sign in.')
      navigate('/login')
    } catch (err) { setError(err.message || 'Invalid code.') }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <Link to="/" className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">LearnHub</span>
          </Link>

          {step === 'form' ? (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Create your account</h1>
              <p className="text-gray-500 mb-6">Join 10M+ learners. Free forever.</p>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-5 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[{value:'student',label:'Student',desc:'I want to learn'},{value:'instructor',label:'Instructor',desc:'I want to teach'}].map((r) => (
                  <button key={r.value} type="button" onClick={() => setRole(r.value)}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${role===r.value ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <p className={`font-semibold text-sm ${role===r.value ? 'text-blue-700' : 'text-gray-800'}`}>{r.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{r.desc}</p>
                  </button>
                ))}
              </div>

              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">First name</label>
                    <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Jane" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Last name</label>
                    <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe" className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                  <div className="relative">
                    <input type={showPassword ? 'text' : 'password'} required value={password}
                      onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 characters"
                      className="input-field pr-12" minLength={8} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {strength && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {[1,2,3,4].map((s) => <div key={s} className={`h-1 flex-1 rounded-full ${s<=strength ? strengthMeta[strength][1] : 'bg-gray-200'}`} />)}
                      </div>
                      <p className="text-xs text-gray-500">{strengthMeta[strength][0]}</p>
                    </div>
                  )}
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h1>
                <p className="text-gray-500 text-sm">We sent a code to <strong>{email}</strong></p>
              </div>
              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-5 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
                </div>
              )}
              <form onSubmit={handleConfirm} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Verification Code</label>
                  <input type="text" required value={confirmCode} onChange={(e) => setConfirmCode(e.target.value)}
                    placeholder="Enter 6-digit code" className="input-field text-center text-2xl tracking-widest font-mono" maxLength={6} />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full py-3">
                  {loading ? 'Verifying...' : 'Verify Email'}
                </button>
                <button type="button" onClick={async () => { await resendSignUpCode({ username: email }); toast.success('Code resent!') }}
                  className="w-full text-sm text-gray-500 hover:text-gray-700">
                  Didn't receive it? Resend code
                </button>
              </form>
            </>
          )}

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-800">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
