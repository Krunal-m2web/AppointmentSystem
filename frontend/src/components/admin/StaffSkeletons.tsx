import { Skeleton } from "../ui/skeleton";
import { User, Mail, Phone, Briefcase, Search, Plus, Clock } from "lucide-react";

export function DetailsSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-gray-300" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4 text-gray-300" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Mail className="w-4 h-4 text-gray-300" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Phone className="w-4 h-4 text-gray-300" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Briefcase className="w-4 h-4 text-gray-300" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Password requirements skeleton */}
      <div className="mt-3 bg-gray-50/50 rounded-lg p-3 border border-gray-100">
        <Skeleton className="h-3 w-32 mb-3" />
        <div className="grid grid-cols-1 gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="w-3.5 h-3.5 rounded-full" />
              <Skeleton className="h-3 w-40" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ServicesSkeleton() {
  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <Skeleton className="h-4 w-3/4 mb-2" />
      
      {/* Search Input Skeleton */}
      <div className="relative">
        <Search className="w-4 h-4 text-gray-300 absolute left-3 top-3" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        {/* Header Skeleton */}
        <div className="bg-gray-50/80 px-4 py-2.5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Skeleton className="w-4 h-4 rounded" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        
        {/* List Skeletons */}
        <div className="divide-y divide-gray-100">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="w-4 h-4 rounded" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  );
}

export function SchedulesSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Bulk Apply section skeleton */}
      <div className="mb-5 border border-gray-200 rounded-lg p-4 space-y-4">
        <Skeleton className="h-4 w-40" />
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <Skeleton key={i} className="h-7 w-12 rounded-full" />
          ))}
        </div>
        <div className="flex items-center gap-4">
           <div className="flex-1 space-y-2">
             <Skeleton className="h-3 w-10" />
             <Skeleton className="h-10 w-full rounded-lg" />
           </div>
           <div className="flex-1 space-y-2">
             <Skeleton className="h-3 w-10" />
             <Skeleton className="h-10 w-full rounded-lg" />
           </div>
           <Skeleton className="h-10 w-20 mt-5 rounded-lg" />
        </div>
      </div>

      <Skeleton className="h-5 w-32 mb-4" />
      
      {/* Weekly cards skeletons */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between mb-3">
              <Skeleton className="h-4 w-20" />
              <div className="flex items-center gap-1">
                <Plus className="w-4 h-4 text-gray-300" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-24 rounded-lg" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-10 w-24 rounded-lg" />
              <Skeleton className="h-9 w-9 rounded-lg ml-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
