export default function ProgressBar({ value = 0, label, size = 'sm', color = 'blue' }) {
  const h = size === 'sm' ? 'h-1.5' : size === 'md' ? 'h-2.5' : 'h-4'
  const colors = { blue: 'bg-blue-600', green: 'bg-green-500', amber: 'bg-amber-500' }
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{label}</span><span>{Math.round(value)}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${h} overflow-hidden`}>
        <div className={`${h} ${colors[color]} rounded-full transition-all duration-500`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
      </div>
    </div>
  )
}
