import { Skeleton } from "./skeleton";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export function TableSkeleton({ rows = 5, columns = 6 }: TableSkeletonProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header skeleton */}
      <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-20 bg-gray-200" />
          ))}
        </div>
      </div>
      
      {/* Row skeletons */}
      <div className="divide-y divide-gray-100">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="px-6 py-4">
            <div className="grid gap-4 items-center" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton 
                  key={colIndex} 
                  className={`h-4 bg-gray-200 ${colIndex === 0 ? 'w-32' : 'w-20'}`} 
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
