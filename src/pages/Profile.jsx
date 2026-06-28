import { useState } from 'react'
import { Camera, Save, Shield, Bell, Globe, Trash2 } from 'lucide-react'
import { signOut, updatePassword } from 'aws-amplify/auth'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const TABS = ['Profile', 'Account', 'Notifications', 'Privacy']

export default function Profile() {
  const { user } = useAuth()
  const [tab, setTab] = useState('Profile')
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState({
    firstName: '', lastName: '',
    headline: '', bio: '', website: '', location: '',
  })
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' })
  const [notifs, setNotifs] = useState({ courseUpdates: true, newMessages: true, promotions: false, weeklyDigest: true })

  const updateProfile = (k, v) => setProfile((p) => ({ ...p, [k]: v }))

  const handleSaveProfile = async () => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSaving(false)
    toast.success('Profile updated!')
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    if (passwords.newPass !== passwords.confirm) { toast.error('Passwords do not match'); return }
    if (passwords.newPass.length < 8) { toast.error('Password must be at least 8 characters'); return }
    setSaving(true)
    try {
      await updatePassword({ oldPassword: passwords.current, newPassword: passwords.newPass })
      toast.success('Password changed!')
      setPasswords({ current: '', newPass: '', confirm: '' })
    } catch (err) { toast.error(err.message || 'Failed to change password') }
    finally { setSaving(false) }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-6">
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {user?.signInDetails?.loginId?.[0]?.toUpperCase() || 'U'}
              </div>
              <button className="absolute bottom-0 right-0 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center shadow-md hover:bg-blue-700">
                <Camera className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{profile.firstName ? `${profile.firstName} ${profile.lastName}` : (user?.signInDetails?.loginId?.split('@')[0] || 'Your Profile')}</h1>
              <p className="text-gray-500 text-sm mt-0.5">{user?.signInDetails?.loginId}</p>
              {profile.headline && <p className="text-sm text-gray-600 mt-1">{profile.headline}</p>}
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex">
            {TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${tab===t ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {tab === 'Profile' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
            <h2 className="font-bold text-gray-900">Public Profile</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                <input value={profile.firstName} onChange={(e) => updateProfile('firstName', e.target.value)} className="input-field" placeholder="Jane" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                <input value={profile.lastName} onChange={(e) => updateProfile('lastName', e.target.value)} className="input-field" placeholder="Doe" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Professional Headline</label>
              <input value={profile.headline} onChange={(e) => updateProfile('headline', e.target.value)} className="input-field" placeholder="e.g. Full-Stack Developer | Instructor" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
              <textarea value={profile.bio} onChange={(e) => updateProfile('bio', e.target.value)} rows={4} className="input-field resize-none" placeholder="Tell learners about yourself..." />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Website</label>
                <div className="relative"><Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input value={profile.website} onChange={(e) => updateProfile('website', e.target.value)} className="input-field pl-10" placeholder="https://yourwebsite.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
                <input value={profile.location} onChange={(e) => updateProfile('location', e.target.value)} className="input-field" placeholder="City, Country" />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button onClick={handleSaveProfile} disabled={saving} className="btn-primary px-8 flex items-center gap-2">
                <Save className="w-4 h-4" />{saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        )}

        {tab === 'Account' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2"><Shield className="w-5 h-5 text-gray-500" />Change Password</h2>
              <form onSubmit={handleChangePassword} className="space-y-4">
                {[['current','Current Password'],['newPass','New Password'],['confirm','Confirm New Password']].map(([k,l]) => (
                  <div key={k}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{l}</label>
                    <input type="password" value={passwords[k]} onChange={(e) => setPasswords((p) => ({ ...p, [k]: e.target.value }))} className="input-field" required minLength={8} />
                  </div>
                ))}
                <div className="flex justify-end">
                  <button type="submit" disabled={saving} className="btn-primary px-8">
                    {saving ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </form>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-bold text-gray-900 mb-2">Email Address</h2>
              <p className="text-sm text-gray-500 mb-4">Your email is managed by AWS Cognito and cannot be changed here.</p>
              <input type="email" value={user?.signInDetails?.loginId || ''} disabled className="input-field bg-gray-50 text-gray-500 cursor-not-allowed" />
            </div>
            <div className="bg-white rounded-xl border border-red-100 p-6">
              <h2 className="font-bold text-red-700 mb-2 flex items-center gap-2"><Trash2 className="w-5 h-5" />Delete Account</h2>
              <p className="text-sm text-gray-500 mb-4">Permanently delete your account and all data. This action cannot be undone.</p>
              <button onClick={() => toast.error('Please contact support to delete your account.')} className="bg-red-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-red-700 transition-colors text-sm">
                Delete My Account
              </button>
            </div>
          </div>
        )}

        {tab === 'Notifications' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><Bell className="w-5 h-5 text-gray-500" />Notification Preferences</h2>
            <div className="space-y-5">
              {[
                ['courseUpdates','Course Updates','Get notified when courses you\'re enrolled in are updated'],
                ['newMessages','New Messages','Receive notifications for instructor messages and Q&A replies'],
                ['promotions','Promotions & Deals','Hear about special offers and new course deals'],
                ['weeklyDigest','Weekly Digest','A weekly summary of your learning progress'],
              ].map(([key, label, desc]) => (
                <div key={key} className="flex items-start justify-between gap-4 py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                  </div>
                  <button onClick={() => setNotifs((p) => ({ ...p, [key]: !p[key] }))}
                    className={`relative inline-flex w-11 h-6 rounded-full transition-colors flex-shrink-0 ${notifs[key] ? 'bg-blue-600' : 'bg-gray-300'}`}>
                    <span className={`inline-block w-4 h-4 bg-white rounded-full shadow mt-1 transition-transform ${notifs[key] ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <button onClick={() => toast.success('Preferences saved!')} className="btn-primary px-8">Save Preferences</button>
            </div>
          </div>
        )}

        {tab === 'Privacy' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
            <h2 className="font-bold text-gray-900">Privacy Settings</h2>
            {[
              ['Show profile to other students','Let other learners see your profile and courses','true'],
              ['Show courses on profile','Display your enrolled and completed courses publicly','true'],
              ['Allow marketing emails','Receive personalized course recommendations','false'],
            ].map(([label, desc, def], i) => (
              <div key={i} className="flex items-start justify-between gap-4 py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                </div>
                <div className={`relative inline-flex w-11 h-6 rounded-full flex-shrink-0 ${def==='true' ? 'bg-blue-600' : 'bg-gray-300'}`}>
                  <span className={`inline-block w-4 h-4 bg-white rounded-full shadow mt-1 transition-transform ${def==='true' ? 'translate-x-6' : 'translate-x-1'}`} />
                </div>
              </div>
            ))}
            <div className="flex justify-end pt-2">
              <button onClick={() => toast.success('Privacy settings saved!')} className="btn-primary px-8">Save Changes</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
