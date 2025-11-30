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
      </div>

      <div>
        <div className="rounded-lg border shadow-sm">
          <div className="p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="mt-1 h-4 w-48" />
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Skeleton className="h-9 w-32 rounded-md" />
                <Skeleton className="h-9 w-24 rounded-md" />
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <Skeleton className="h-10 flex-1 rounded-md" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-[180px] rounded-md" />
                <Skeleton className="h-10 w-[180px] rounded-md" />
              </div>
            </div>
          </div>

          <div className="border-t">
            <div className="grid grid-cols-12 border-b py-3 px-4">
              <Skeleton className="col-span-1 h-5 w-5 rounded-md" />
              <Skeleton className="col-span-3 h-5 w-24" />
              <Skeleton className="col-span-2 h-5 w-16" />
              <Skeleton className="col-span-2 h-5 w-24" />
              <Skeleton className="col-span-2 h-5 w-16" />
              <Skeleton className="col-span-2 h-5 w-16 justify-self-end" />
            </div>

            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-12 items-center border-b py-3 px-4">
                <Skeleton className="col-span-1 h-5 w-5 rounded-md" />
                <div className="col-span-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="mt-1 h-3 w-32" />
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="mt-1 h-3 w-20" />
                </div>
                <div className="col-span-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-1 h-3 w-16" />
                </div>
                <div className="col-span-2">
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
                <div className="col-span-2 flex justify-end">
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
