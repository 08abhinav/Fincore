"use client"
import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { SelectSingleEventHandler } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover"

type Props = {
  value?: Date
  onChange: SelectSingleEventHandler
  disabled?: boolean
}

export const DatePicker = ({ value, onChange, disabled }: Props) => {
  const [month, setMonth] = React.useState<Date>(value || new Date())

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="h-4 w-4 mr-2" />
          {value ? format(value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto p-0 bg-white text-black rounded-xl shadow-xl border border-gray-200"
        align="end"
      >
        {/* Custom caption at the top */}
        <div className="px-3 py-2 text-center font-semibold text-gray-800 border-b border-gray-200">
          {format(month, "MMMM yyyy")}
        </div>

        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={disabled}
          month={month}
          onMonthChange={setMonth}
          initialFocus
          className="p-12"
          classNames={{
            table: "w-full border-collapse",
            head_row: "flex",
            head_cell: "text-gray-400 w-9 font-medium text-xs",
            row: "flex w-full",
            cell: "h-9 w-9 text-center relative",
            day: "h-9 w-9 flex items-center justify-center rounded-md text-sm text-black hover:bg-gray-200 transition",
            day_selected: "bg-black text-white font-semibold hover:bg-black/90",
            day_today: "border border-black text-black font-bold",
            day_outside: "text-gray-400 opacity-60",
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
