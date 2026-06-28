import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingCart, Menu, X, GraduationCap, Bell, ChevronDown, User, LogOut, LayoutDashboard, BookOpen } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { CATEGORIES } from '../lib/mockData'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [profileOpen, setProfileOpen] = useState(false)
  const [catsOpen, setCatsOpen] = useState(false)
  const { user, signOut, isInstructor } = useAuth()
  const { totalItems } = useCart()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) { navigate(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`); setSearchQuery('') }
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-4">
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">LearnHub</span>
          </Link>

          {/* Categories */}
          <div className="relative hidden md:block"
            onMouseEnter={() => setCatsOpen(true)} onMouseLeave={() => setCatsOpen(false)}>
            <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-blue-600 py-2">
              Browse <ChevronDown className="w-4 h-4" />
            </button>
            {catsOpen && (
              <div className="absolute top-full left-0 bg-white border border-gray-200 rounded-xl shadow-lg py-2 w-52 z-50">
                {CATEGORIES.map((cat) => (
                  <Link key={cat.id} to={`/catalog?category=${cat.slug}`}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                    onClick={() => setCatsOpen(false)}>
                    <span className="text-lg">{cat.icon}</span>{cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden md:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search for courses..." value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
          </form>

          {/* Right */}
          <div className="flex items-center gap-2 ml-auto">
            {user ? (
              <>
                <Link to="/cart" className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg">
                  <ShoppingCart className="w-5 h-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">{totalItems}</span>
                  )}
                </Link>
                <button className="p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg hidden md:block">
                  <Bell className="w-5 h-5" />
                </button>
                <Link to="/my-learning" className="text-sm font-medium text-gray-700 hover:text-blue-600 hidden md:block">My Learning</Link>
                <div className="relative">
                  <button onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {user.signInDetails?.loginId?.[0]?.toUpperCase() || 'U'}
                    </div>
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg py-2 w-52 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900 truncate">{user.signInDetails?.loginId}</p>
                        <p className="text-xs text-gray-500">{isInstructor ? 'Instructor' : 'Student'}</p>
                      </div>
                      {[
                        { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                        { to: '/my-learning', icon: BookOpen, label: 'My Learning' },
                        ...(isInstructor ? [{ to: '/instructor', icon: GraduationCap, label: 'Instructor Dashboard' }] : []),
                        { to: '/profile', icon: User, label: 'Profile Settings' },
                      ].map(({ to, icon: Icon, label }) => (
                        <Link key={to} to={to} onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50">
                          <Icon className="w-4 h-4" />{label}
                        </Link>
                      ))}
                      <hr className="my-1 border-gray-100" />
                      <button onClick={() => { signOut(); setProfileOpen(false) }}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full">
                        <LogOut className="w-4 h-4" />Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/cart" className="relative p-2 text-gray-700 hover:text-blue-600">
                  <ShoppingCart className="w-5 h-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">{totalItems}</span>
                  )}
                </Link>
                <Link to="/login" className="btn-ghost text-sm">Log In</Link>
                <Link to="/signup" className="btn-primary text-sm py-2 px-4">Sign Up</Link>
              </>
            )}
            <button className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 pt-3 space-y-3">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search courses..." value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </form>
            <div className="flex flex-col gap-1">
              {CATEGORIES.map((cat) => (
                <Link key={cat.id} to={`/catalog?category=${cat.slug}`}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg"
                  onClick={() => setMobileOpen(false)}>
                  {cat.icon} {cat.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
