import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Trash2, ChevronDown, ChevronUp, Upload, Save, Eye } from 'lucide-react'
import toast from 'react-hot-toast'

const STEP_LABELS = ['Basic Info', 'Curriculum', 'Media', 'Pricing', 'Publish']

const EMPTY_LESSON = () => ({ id: Date.now(), title: '', type: 'VIDEO', duration: '', isFree: false, url: '' })
const EMPTY_SECTION = () => ({ id: Date.now(), title: '', lessons: [EMPTY_LESSON()] })

export default function CreateCourse() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [saving, setSaving] = useState(false)
  const [expanded, setExpanded] = useState({})

  const [info, setInfo] = useState({ title: '', subtitle: '', description: '', category: '', level: 'BEGINNER', language: 'English' })
  const [sections, setSections] = useState([EMPTY_SECTION()])
  const [media, setMedia] = useState({ thumbnail: '', previewVideo: '' })
  const [pricing, setPricing] = useState({ price: '', originalPrice: '', isFree: false })

  const updateInfo = (k, v) => setInfo((p) => ({ ...p, [k]: v }))

  const addSection = () => setSections((s) => [...s, EMPTY_SECTION()])
  const removeSection = (sid) => setSections((s) => s.filter((x) => x.id !== sid))
  const updateSection = (sid, title) => setSections((s) => s.map((x) => x.id === sid ? { ...x, title } : x))

  const addLesson = (sid) => setSections((s) => s.map((x) => x.id === sid ? { ...x, lessons: [...x.lessons, EMPTY_LESSON()] } : x))
  const removeLesson = (sid, lid) => setSections((s) => s.map((x) => x.id === sid ? { ...x, lessons: x.lessons.filter((l) => l.id !== lid) } : x))
  const updateLesson = (sid, lid, key, val) => setSections((s) => s.map((x) => x.id === sid ? { ...x, lessons: x.lessons.map((l) => l.id === lid ? { ...l, [key]: val } : l) } : x))

  const handleSave = async (status = 'DRAFT') => {
    if (!info.title.trim()) { toast.error('Course title is required'); setStep(0); return }
    setSaving(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSaving(false)
    toast.success(status === 'PUBLISHED' ? 'Course published!' : 'Draft saved!')
    if (status === 'PUBLISHED') navigate('/instructor')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <h1 className="text-lg font-bold text-gray-900 truncate">{info.title || 'New Course'}</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => handleSave('DRAFT')} disabled={saving} className="btn-secondary py-2 px-4 flex items-center gap-1.5 text-sm">
              <Save className="w-4 h-4" />{saving ? 'Saving...' : 'Save Draft'}
            </button>
            <button onClick={() => handleSave('PUBLISHED')} disabled={saving} className="btn-primary py-2 px-4 flex items-center gap-1.5 text-sm">
              <Eye className="w-4 h-4" />Publish
            </button>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex">
            {STEP_LABELS.map((label, i) => (
              <button key={label} onClick={() => setStep(i)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${step===i ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs mr-2 ${i<=step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>{i+1}</span>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {step === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
            <h2 className="font-bold text-gray-900 text-lg">Course Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Course Title *</label>
              <input value={info.title} onChange={(e) => updateInfo('title', e.target.value)} placeholder="e.g. The Complete Web Development Bootcamp" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Subtitle</label>
              <input value={info.subtitle} onChange={(e) => updateInfo('subtitle', e.target.value)} placeholder="Brief course description" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea value={info.description} onChange={(e) => updateInfo('description', e.target.value)} rows={6} placeholder="What will students learn? Why take this course?" className="input-field resize-none" />
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                <select value={info.category} onChange={(e) => updateInfo('category', e.target.value)} className="input-field">
                  <option value="">Select...</option>
                  {['Development','Business','Design','Marketing','Data Science','Photography','Music','Health'].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Level</label>
                <select value={info.level} onChange={(e) => updateInfo('level', e.target.value)} className="input-field">
                  {['BEGINNER','INTERMEDIATE','ADVANCED','ALL_LEVELS'].map((l) => <option key={l}>{l.replace('_',' ')}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Language</label>
                <select value={info.language} onChange={(e) => updateInfo('language', e.target.value)} className="input-field">
                  {['English','Spanish','French','German','Portuguese','Japanese'].map((l) => <option key={l}>{l}</option>)}
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={() => setStep(1)} className="btn-primary px-8">Next: Curriculum</button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-gray-900 text-lg">Course Curriculum</h2>
              <button onClick={addSection} className="btn-secondary py-2 px-4 text-sm flex items-center gap-1.5">
                <Plus className="w-4 h-4" />Add Section
              </button>
            </div>
            {sections.map((section, si) => (
              <div key={section.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="flex items-center gap-3 p-4 bg-gray-50 border-b border-gray-200">
                  <span className="text-sm font-semibold text-gray-500 flex-shrink-0">Section {si+1}</span>
                  <input value={section.title} onChange={(e) => updateSection(section.id, e.target.value)}
                    placeholder="Section title" className="input-field py-1.5 text-sm flex-1" />
                  <button onClick={() => setExpanded((p) => ({ ...p, [section.id]: !p[section.id] }))} className="p-1.5 text-gray-400 hover:text-gray-600">
                    {expanded[section.id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {sections.length > 1 && <button onClick={() => removeSection(section.id)} className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>}
                </div>
                {!expanded[section.id] && (
                  <div className="p-4 space-y-3">
                    {section.lessons.map((lesson, li) => (
                      <div key={lesson.id} className="flex items-start gap-3 p-3 border border-gray-100 rounded-lg">
                        <span className="text-xs text-gray-400 mt-2.5 flex-shrink-0">Lesson {li+1}</span>
                        <input value={lesson.title} onChange={(e) => updateLesson(section.id, lesson.id, 'title', e.target.value)}
                          placeholder="Lesson title" className="input-field py-1.5 text-sm flex-1" />
                        <select value={lesson.type} onChange={(e) => updateLesson(section.id, lesson.id, 'type', e.target.value)} className="input-field py-1.5 text-sm w-28">
                          {['VIDEO','ARTICLE','QUIZ'].map((t) => <option key={t}>{t}</option>)}
                        </select>
                        <input value={lesson.duration} onChange={(e) => updateLesson(section.id, lesson.id, 'duration', e.target.value)}
                          placeholder="min" className="input-field py-1.5 text-sm w-20" />
                        <label className="flex items-center gap-1.5 text-xs text-gray-600 mt-2.5 flex-shrink-0 cursor-pointer">
                          <input type="checkbox" checked={lesson.isFree} onChange={(e) => updateLesson(section.id, lesson.id, 'isFree', e.target.checked)} className="rounded" />Free
                        </label>
                        {section.lessons.length > 1 && <button onClick={() => removeLesson(section.id, lesson.id)} className="p-1.5 text-gray-400 hover:text-red-500 mt-0.5"><Trash2 className="w-3.5 h-3.5" /></button>}
                      </div>
                    ))}
                    <button onClick={() => addLesson(section.id)} className="w-full py-2 text-sm text-blue-600 hover:text-blue-800 border border-dashed border-blue-300 hover:border-blue-500 rounded-lg flex items-center justify-center gap-1.5 transition-colors">
                      <Plus className="w-4 h-4" />Add Lesson
                    </button>
                  </div>
                )}
              </div>
            ))}
            <div className="flex justify-between">
              <button onClick={() => setStep(0)} className="btn-secondary px-8">Back</button>
              <button onClick={() => setStep(2)} className="btn-primary px-8">Next: Media</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
            <h2 className="font-bold text-gray-900 text-lg">Course Media</h2>
            {[['Course Thumbnail','thumbnail','Recommended: 1280×720px, JPG or PNG'],['Preview Video URL','previewVideo','YouTube or direct MP4 URL']].map(([label, key, hint]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                <input value={media[key]} onChange={(e) => setMedia((p) => ({ ...p, [key]: e.target.value }))} placeholder={hint} className="input-field" />
                {key === 'thumbnail' && media.thumbnail && (
                  <img src={media.thumbnail} alt="thumbnail preview" className="mt-3 w-48 h-28 object-cover rounded-lg border border-gray-200" onError={(e) => e.target.style.display='none'} />
                )}
              </div>
            ))}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <Upload className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-600">Drag & drop or click to upload thumbnail</p>
              <p className="text-xs text-gray-400 mt-1">S3 upload — configure Storage in amplify/storage/resource.ts</p>
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep(1)} className="btn-secondary px-8">Back</button>
              <button onClick={() => setStep(3)} className="btn-primary px-8">Next: Pricing</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
            <h2 className="font-bold text-gray-900 text-lg">Pricing</h2>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={pricing.isFree} onChange={(e) => setPricing((p) => ({ ...p, isFree: e.target.checked, price: e.target.checked ? '0' : '' }))} className="rounded w-5 h-5" />
              <div><p className="font-medium text-gray-900">Free Course</p><p className="text-sm text-gray-500">Make this course free for all students</p></div>
            </label>
            {!pricing.isFree && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Sale Price (USD) *</label>
                  <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                    <input type="number" min="0" step="0.01" value={pricing.price} onChange={(e) => setPricing((p) => ({ ...p, price: e.target.value }))} placeholder="19.99" className="input-field pl-7" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Original Price (USD)</label>
                  <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                    <input type="number" min="0" step="0.01" value={pricing.originalPrice} onChange={(e) => setPricing((p) => ({ ...p, originalPrice: e.target.value }))} placeholder="99.99" className="input-field pl-7" />
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-between">
              <button onClick={() => setStep(2)} className="btn-secondary px-8">Back</button>
              <button onClick={() => setStep(4)} className="btn-primary px-8">Next: Publish</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Eye className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to publish?</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">Review everything looks right, then hit Publish. You can always come back and edit your course after publishing.</p>
            <div className="bg-gray-50 rounded-xl p-5 text-left mb-8 max-w-sm mx-auto space-y-2">
              {[['Title', info.title || '—'],['Category', info.category || '—'],['Level', info.level],['Sections', sections.length],['Price', pricing.isFree ? 'Free' : pricing.price ? `$${pricing.price}` : '—']].map(([k,v]) => (
                <div key={k} className="flex justify-between text-sm"><span className="text-gray-500">{k}</span><span className="font-medium text-gray-900">{v}</span></div>
              ))}
            </div>
            <div className="flex gap-4 justify-center">
              <button onClick={() => handleSave('DRAFT')} disabled={saving} className="btn-secondary px-8 py-3">Save as Draft</button>
              <button onClick={() => handleSave('PUBLISHED')} disabled={saving} className="btn-primary px-8 py-3">
                {saving ? 'Publishing...' : '🚀 Publish Course'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
