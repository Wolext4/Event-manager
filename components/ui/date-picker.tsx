"use client"

import * as React from "react"
import { Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { formatDate } from "@/utils/date" // Declare the formatDate function

interface DatePickerProps {
  date?: {
    from?: Date
    to?: Date
  }
  setDate?: (date: { from?: Date; to?: Date }) => void
}

export function DatePicker({ date, setDate }: DatePickerProps) {
  const [fromDate, setFromDate] = React.useState<string>(date?.from ? formatDate(date.from) : "")
  const [toDate, setToDate] = React.useState<string>(date?.to ? formatDate(date.to) : "")

  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFromDate(value)
    if (setDate) {
      const fromDateObj = value ? new Date(value) : undefined
      setDate({
        from: fromDateObj,
        to: date?.to,
      })
    }
  }

  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setToDate(value)
    if (setDate) {
      const toDateObj = value ? new Date(value) : undefined
      setDate({
        from: date?.from,
        to: toDateObj,
      })
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <Input type="date" value={fromDate} onChange={handleFromDateChange} placeholder="From date" className="pl-8" />
      </div>
      <span className="text-gray-500">to</span>
      <div className="relative">
        <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <Input type="date" value={toDate} onChange={handleToDateChange} placeholder="To date" className="pl-8" />
      </div>
    </div>
  )
}
