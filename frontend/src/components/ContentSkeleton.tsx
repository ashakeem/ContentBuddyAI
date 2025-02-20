export default function ContentSkeleton() {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 animate-pulse">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="h-6 bg-gray-700 rounded w-3/4"></div>
          <div className="h-5 w-5 bg-gray-700 rounded"></div>
        </div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6"></div>
          <div className="h-4 bg-gray-700 rounded w-4/6"></div>
        </div>
        <div className="h-32 bg-gray-700 rounded w-full"></div>
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-6 w-16 bg-gray-700 rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
  )
} 