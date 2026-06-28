import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, DollarSign, Users, Star, Plus, Edit, Eye, Trash2, ChevronRight } from 'lucide-react'
import { MOCK_COURSES, formatNumber } from '../lib/mockData'
import { useAuth } from '../context/AuthContext'

const MY_COURSES = MOCK_COURSES.slice(0, 3).map((c, i) => ({
  ...c, status: i < 2 ? 'PUBLISHED' : 'DRAFT',
  revenue: [12340, 8920, 0][i], enrollmentsThisMonth: [234, 156, 0][i],
}))

const MONTHLY = [3200,4100,3800,5200,4700,6100,5800,7200,6500,8100,7800,9200]
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export default function InstructorDashboard() {
  const { user } = useAuth()
  const [tab, setTab] = useState('overview')
  const maxR = Math.max(...MONTHLY)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Instructor Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">{user?.signInDetails?.loginId?.split('@')[0] || 'Instructor'}'s Studio</p>
          </div>
          <Link to="/instructor/create-course" className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" /> Create Course
          </Link>
        </div>

        <div className="flex gap-0 border-b border-gray-200 mb-8">
          {['overview','courses','earnings','students'].map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-3 text-sm font-medium capitalize border-b-2 transition-colors ${tab===t ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              {t}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label:'Total Revenue', value:'$21,260', change:'+12% this month', icon:DollarSign, color:'text-green-600 bg-green-100' },
                { label:'Total Students', value:'1.77M', change:'+390 this month', icon:Users, color:'text-blue-600 bg-blue-100' },
                { label:'Active Courses', value:'2', change:'1 draft', icon:BookOpen, color:'text-purple-600 bg-purple-100' },
                { label:'Avg Rating', value:'4.65', change:'↑ 0.2 this month', icon:Star, color:'text-amber-600 bg-amber-100' },
              ].map(({ label, value, change, icon: Icon, color }) => (
                <div key={label} className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${color}`}><Icon className="w-5 h-5" /></div>
                  <p className="text-2xl font-bold text-gray-900">{value}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{label}</p>
                  <p className="text-xs text-green-600 mt-1">{change}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h2 className="font-bold text-gray-900 mb-6">Revenue Overview</h2>
              <div className="flex items-end gap-2 h-40">
                {MONTHLY.map((rev, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-blue-500 hover:bg-blue-600 rounded-t transition-colors cursor-pointer"
                      style={{ height: `${(rev/maxR)*100}%` }} title={`$${rev.toLocaleString()}`} />
                    <span className="text-xs text-gray-400">{MONTHS[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-gray-900">Recent Enrollments</h2>
                <button className="text-sm text-blue-600 flex items-center gap-1">View all <ChevronRight className="w-4 h-4" /></button>
              </div>
              <div className="space-y-3">
                {['Alex J.','Maria G.','James W.','Sarah L.'].map((name, i) => (
                  <div key={name} className="flex items-center gap-4 py-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">{name[0]}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{name}</p>
                      <p className="text-xs text-gray-500 truncate">{i%2===0 ? 'The Complete JavaScript Course' : 'React - The Complete Guide'}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-green-600">$19.99</p>
                      <p className="text-xs text-gray-400">{['2m','15m','1h','2h'][i]} ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === 'courses' && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-gray-900">My Courses</h2>
              <Link to="/instructor/create-course" className="btn-primary text-sm py-2 px-4 flex items-center gap-1">
                <Plus className="w-4 h-4" /> New Course
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {MY_COURSES.map((c) => (
                <div key={c.id} className="p-5 flex items-center gap-4">
                  <img src={c.thumbnail} alt={c.title} className="w-20 h-12 object-cover rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{c.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{formatNumber(c.totalStudents)}</span>
                      <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400 fill-amber-400" />{c.avgRating}</span>
                      <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />${c.revenue?.toLocaleString()}</span>
                      <span className={`badge ${c.status==='PUBLISHED' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{c.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link to={`/courses/${c.slug}`} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg"><Eye className="w-4 h-4" /></Link>
                    <Link to={`/instructor/edit-course/${c.id}`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></Link>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'earnings' && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-3 gap-4">
              {[['Total Earnings','$21,260.00','All time'],['This Month','$3,240.00','June 2026'],['Pending Payout','$1,820.00','Next: July 15']].map(([l,v,s]) => (
                <div key={l} className="bg-white rounded-xl border border-gray-200 p-6">
                  <p className="text-sm text-gray-500 mb-1">{l}</p>
                  <p className="text-3xl font-bold text-gray-900">{v}</p>
                  <p className="text-xs text-gray-400 mt-1">{s}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-900 mb-4">Payout History</h2>
              {[['June 15, 2026','$1,680.00'],['May 15, 2026','$2,120.00'],['Apr 15, 2026','$1,890.00']].map(([date,amt]) => (
                <div key={date} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                  <div><p className="text-sm font-medium text-gray-900">{date}</p><p className="text-xs text-gray-500">Direct bank transfer</p></div>
                  <div className="flex items-center gap-3">
                    <span className="badge bg-green-100 text-green-700">paid</span>
                    <span className="font-bold text-gray-900">{amt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'students' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-6">All Students</h2>
            <div className="space-y-3">
              {['Alex Johnson','Maria Garcia','James Wilson','Sarah Lee','Chris Brown','Emma Davis','Liam Taylor','Olivia Martin'].map((name, i) => (
                <div key={name} className="flex items-center gap-4 py-2 border-b border-gray-100 last:border-0">
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{name[0]}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{name}</p>
                    <p className="text-xs text-gray-500 truncate">{i%2===0 ? 'The Complete JavaScript Course' : 'React - The Complete Guide'}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-medium text-blue-600">{[100,68,45,92,23,78,55,10][i]}% complete</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
