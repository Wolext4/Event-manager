import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-10 rounded-md" />
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-1 h-4 w-32" />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Skeleton className="h-9 w-20 rounded-md" />
          <Skeleton className="h-9 w-20 rounded-md" />
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <Skeleton className="h-28 flex-1 rounded-lg" />
        <Skeleton className="h-28 flex-1 rounded-lg" />
        <Skeleton className="h-28 flex-1 rounded-lg" />
        <Skeleton className="h-28 flex-1 rounded-lg" />
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Skeleton className="h-8 w-48" />
          <div className="flex flex-col gap-2 md:flex-row">
            <Skeleton className="h-10 w-[180px] rounded-md" />
            <Skeleton className="h-10 w-[180px] rounded-md" />
            <Skeleton className="h-10 w-[180px] rounded-md" />
            <Skeleton className="h-10 w-10 rounded-md" />
          </div>
        </div>

        <div>
          <div className="mb-4 flex">
            <Skeleton className="h-10 w-24 rounded-md" />
            <Skeleton className="ml-2 h-10 w-24 rounded-md" />
            <Skeleton className="ml-2 h-10 w-24 rounded-md" />
            <Skeleton className="ml-2 h-10 w-24 rounded-md" />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Skeleton className="h-[350px] md:col-span-4 rounded-lg" />
            <Skeleton className="h-[350px] md:col-span-3 rounded-lg" />
          </div>

          <Skeleton className="mt-4 h-[400px] rounded-lg" />
        </div>
      </div>
    </div>
  )
}
