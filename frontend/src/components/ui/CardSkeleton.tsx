import { Skeleton } from "./skeleton";

interface CardSkeletonProps {
  count?: number;
}

export function CardSkeleton({ count = 4 }: CardSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-10 w-10 rounded-lg bg-gray-200" />
            <Skeleton className="h-4 w-16 bg-gray-200" />
          </div>
          <Skeleton className="h-8 w-24 mb-2 bg-gray-200" />
          <Skeleton className="h-4 w-32 bg-gray-200" />
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-6 w-40 bg-gray-200" />
        <Skeleton className="h-8 w-24 bg-gray-200" />
      </div>
      <div className="h-64 flex items-end justify-between gap-2 px-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <Skeleton 
              className="w-full bg-gray-200 rounded-t" 
              style={{ height: `${Math.random() * 60 + 40}%` }} 
            />
            <Skeleton className="h-3 w-6 bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
