import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react'
import CourseCard from '../components/CourseCard'
import { MOCK_COURSES, CATEGORIES } from '../lib/mockData'

const LEVELS = ['ALL_LEVELS', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED']
const SORT_OPTIONS = [
  { value: 'relevance', label: 'Most Relevant' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'students', label: 'Most Popular' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
]

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-gray-200 pb-4 mb-4 last:border-0">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full mb-3">
        <span className="font-semibold text-gray-900 text-sm">{title}</span>
        {open ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
      </button>
      {open && children}
    </div>
  )
}

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const query = searchParams.get('q') || ''
  const categorySlug = searchParams.get('category') || ''
  const level = searchParams.get('level') || ''
  const sort = searchParams.get('sort') || 'relevance'
  const maxPrice = searchParams.get('maxPrice') || ''
  const minRating = searchParams.get('minRating') || ''

  const setParam = (key, val) => {
    const p = new URLSearchParams(searchParams)
    if (val) p.set(key, val); else p.delete(key)
    setSearchParams(p)
  }
  const clearAll = () => setSearchParams({})

  const filtered = useMemo(() => {
    let results = [...MOCK_COURSES]
    if (query) {
      const q = query.toLowerCase()
      results = results.filter((c) => c.title.toLowerCase().includes(q) || c.tags?.some((t) => t.toLowerCase().includes(q)))
    }
    if (categorySlug) {
      const cat = CATEGORIES.find((k) => k.slug === categorySlug)
      if (cat) results = results.filter((c) => c.categoryId === cat.id)
    }
    if (level) results = results.filter((c) => c.level === level)
    if (maxPrice) results = results.filter((c) => c.price <= parseFloat(maxPrice))
    if (minRating) results = results.filter((c) => c.avgRating >= parseFloat(minRating))
    if (searchParams.get('featured')) results = results.filter((c) => c.isFeatured)
    if (searchParams.get('bestseller')) results = results.filter((c) => c.isBestseller)
    switch (sort) {
      case 'rating': results.sort((a, b) => b.avgRating - a.avgRating); break
      case 'students': results.sort((a, b) => b.totalStudents - a.totalStudents); break
      case 'price_low': results.sort((a, b) => a.price - b.price); break
      case 'price_high': results.sort((a, b) => b.price - a.price); break
    }
    return results
  }, [query, categorySlug, level, sort, maxPrice, minRating, searchParams])

  const FiltersPanel = () => (
    <div>
      <FilterSection title="Category">
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input type="radio" name="cat" checked={!categorySlug} onChange={() => setParam('category', '')} />
            <span className="text-gray-700">All Categories</span>
          </label>
          {CATEGORIES.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer text-sm">
              <input type="radio" name="cat" checked={categorySlug === cat.slug} onChange={() => setParam('category', cat.slug)} />
              <span className="text-gray-700">{cat.icon} {cat.name}</span>
            </label>
          ))}
        </div>
      </FilterSection>
      <FilterSection title="Level">
        <div className="space-y-2">
          {LEVELS.map((l) => (
            <label key={l} className="flex items-center gap-2 cursor-pointer text-sm">
              <input type="checkbox" checked={level === l} onChange={() => setParam('level', level === l ? '' : l)} />
              <span className="text-gray-700">{l.replace('_', ' ')}</span>
            </label>
          ))}
        </div>
      </FilterSection>
      <FilterSection title="Min Rating">
        <div className="space-y-2">
          {[4.5, 4.0, 3.5].map((r) => (
            <label key={r} className="flex items-center gap-2 cursor-pointer text-sm">
              <input type="radio" name="rating" checked={minRating === String(r)} onChange={() => setParam('minRating', String(r))} />
              <span className="text-yellow-500">{'★'.repeat(Math.floor(r))}</span>
              <span className="text-gray-700">{r}+ up</span>
            </label>
          ))}
        </div>
      </FilterSection>
      <FilterSection title="Max Price">
        <div className="space-y-2">
          {[0, 15, 25, 50].map((p) => (
            <label key={p} className="flex items-center gap-2 cursor-pointer text-sm">
              <input type="radio" name="price" checked={p === 0 ? !maxPrice : maxPrice === String(p)} onChange={() => setParam('maxPrice', p === 0 ? '' : String(p))} />
              <span className="text-gray-700">{p === 0 ? 'Any price' : `Under $${p}`}</span>
            </label>
          ))}
        </div>
      </FilterSection>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {query ? `Results for "${query}"` : categorySlug ? CATEGORIES.find((c) => c.slug === categorySlug)?.name || 'All Courses' : 'All Courses'}
          </h1>
          <form onSubmit={(e) => { e.preventDefault(); setParam('q', e.target.q.value) }} className="flex gap-2 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input name="q" defaultValue={query} placeholder="Search courses..." className="input-field pl-10 py-2.5" />
            </div>
            <button type="submit" className="btn-primary py-2.5 px-5">Search</button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm text-gray-600 font-medium">{filtered.length} results</span>
            {(query || categorySlug || level || maxPrice || minRating) && (
              <button onClick={clearAll} className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1">
                <X className="w-3.5 h-3.5" /> Clear filters
              </button>
            )}
            <button onClick={() => setMobileFiltersOpen(true)} className="md:hidden flex items-center gap-1.5 text-sm font-medium border border-gray-300 rounded-lg px-3 py-2">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
          </div>
          <select value={sort} onChange={(e) => setParam('sort', e.target.value)} className="input-field py-2 px-3 w-auto text-sm">
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        <div className="flex gap-8">
          <aside className="hidden md:block w-56 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-bold text-gray-900 mb-4">Filters</h3>
              <FiltersPanel />
            </div>
          </aside>

          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)} />
              <div className="absolute right-0 top-0 bottom-0 w-72 bg-white p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-900">Filters</h3>
                  <button onClick={() => setMobileFiltersOpen(false)}><X className="w-5 h-5 text-gray-500" /></button>
                </div>
                <FiltersPanel />
              </div>
            </div>
          )}

          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No courses found</h3>
                <button onClick={clearAll} className="btn-primary mt-2">Clear Filters</button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((c) => <CourseCard key={c.id} course={c} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
