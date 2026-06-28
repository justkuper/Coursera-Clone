import { Star } from 'lucide-react'

export default function StarRating({ rating, totalReviews, size = 'sm', interactive = false, onRate }) {
  const sz = size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'
  return (
    <div className="flex items-center gap-1">
      <span className="font-bold text-amber-600 text-sm">{Number(rating).toFixed(1)}</span>
      <div className="flex items-center">
        {[1,2,3,4,5].map((s) => (
          <span key={s} onClick={() => interactive && onRate?.(s)} className={interactive ? 'cursor-pointer' : ''}>
            <Star className={`${sz} ${s <= Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300 fill-gray-200'}`} />
          </span>
        ))}
      </div>
      {totalReviews !== undefined && <span className="text-xs text-gray-500">({totalReviews?.toLocaleString()})</span>}
    </div>
  )
}
