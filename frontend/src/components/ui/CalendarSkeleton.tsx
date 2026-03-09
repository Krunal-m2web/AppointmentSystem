import { Skeleton } from "./skeleton";

interface CalendarSkeletonProps {
  viewMode: 'month' | 'week' | 'day' | 'list';
}

export function CalendarSkeleton({ viewMode }: CalendarSkeletonProps) {
  if (viewMode === 'month') {
    return <MonthSkeleton />;
  }
  if (viewMode === 'week') {
    return <WeekSkeleton />;
  }
  if (viewMode === 'day') {
    return <DaySkeleton />;
  }
  return <ListSkeleton />;
}

function MonthSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-7 gap-2">
        {/* Day headers */}
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex justify-center py-2">
            <Skeleton className="h-4 w-12 bg-gray-100" />
          </div>
        ))}
        
        {/* Calendar days */}
        {Array.from({ length: 35 }).map((_, i) => (
          <div
            key={i}
            className="min-h-[100px] p-2 rounded-lg border-2 border-gray-100 bg-white space-y-2"
          >
            <Skeleton className="h-4 w-6 bg-gray-100" />
            {/* Randomly show a skeleton for an appointment in some days */}
            {i % 3 === 0 && (
              <Skeleton className="h-5 w-full bg-gray-50 rounded" />
            )}
            {i % 5 === 0 && (
              <Skeleton className="h-5 w-full bg-gray-50 rounded" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function WeekSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-7 gap-2">
        {/* Week headers */}
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="text-center border-b border-gray-100 pb-2 mb-2 flex flex-col items-center gap-2">
            <Skeleton className="h-3 w-10 bg-gray-100" />
            <Skeleton className="h-6 w-6 bg-gray-100 rounded-full" />
          </div>
        ))}
        
        {/* Week columns */}
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="min-h-[400px] border border-gray-100 rounded-lg p-2 space-y-3">
             {/* Randomly show skeleton appointments */}
             {i % 2 === 0 && (
               <>
                <Skeleton className="h-16 w-full bg-gray-50 rounded-lg border-l-4 border-gray-200" />
                <Skeleton className="h-16 w-full bg-gray-50 rounded-lg border-l-4 border-gray-200" />
               </>
             )}
             {i % 3 === 0 && (
               <Skeleton className="h-16 w-full bg-gray-50 rounded-lg border-l-4 border-gray-200" />
             )}
             <Skeleton className="h-8 w-full bg-gray-50/50 rounded-lg mt-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

function DaySkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-in fade-in duration-300">
      <div className="space-y-4">
        {/* Time slots */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-start gap-4 border-b border-gray-50 pb-4 min-h-[80px]">
            <Skeleton className="w-20 h-4 bg-gray-100 mt-2" />
            <div className="flex-1 space-y-3">
              {i % 2 === 0 ? (
                 <Skeleton className="h-20 w-full bg-gray-50 rounded-xl border-l-4 border-gray-200" />
              ) : (
                 <Skeleton className="h-12 w-full bg-gray-50/30 rounded-lg" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-in fade-in duration-300">
      <div className="space-y-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="h-4 w-48 mb-4 bg-gray-100 rounded" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="border border-gray-100 rounded-xl p-4 space-y-3 bg-white">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-3 w-20 bg-gray-100" />
                    <Skeleton className="h-4 w-12 bg-gray-100 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-32 bg-gray-100" />
                  <Skeleton className="h-3 w-24 bg-gray-100" />
                  <div className="pt-2 border-t border-gray-50 flex justify-between">
                    <Skeleton className="h-3 w-10 bg-gray-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
