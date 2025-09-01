import { clsx, type ClassValue } from "clsx"
import { eachDayOfInterval, format as formatDate, isSameDay, subDays } from "date-fns";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function converAmountFromMili(amount: number){
  return amount / 100;
}

export function formatCurrency(amount: number){
  return Intl.NumberFormat("en-IN", { 
    maximumSignificantDigits: 2,
    style: "currency",
    currency: "INR"})
    .format(amount)
}

export function calcuatePercentageChange(
  current: number,
  previous: number
){
  if(previous === 0){
    return 0;
  }
  return ((current - previous) / Math.abs(previous )) * 100;
}

export function fillMissingDays(
  activeDays: {
    date: Date;
    income: number;
    expenses: number;
  }[],
  startDate: Date,
  endDate: Date,
){
  if(activeDays.length === 0){
    return [];
  }
  const allDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  })

  const transactionsByDate = allDays.map((day) => {
    const found = activeDays.find((d)=> isSameDay(d.date, day));
    if(found){
      return found;
    }else{
      return {
        date: day,
        income: 0,
        expenses: 0,
      }
    }
  })

  return transactionsByDate
}

type Period={
  from: string | Date | undefined;
  to: string | Date | undefined;
}

export function formatDateRange(period: Period) {
  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  if (!period?.from) {
    return `${formatDate(defaultFrom, "MMM dd")} - ${formatDate(defaultTo, "MMM dd, yyyy")}`;
  }

  if (period?.to) {
    return `${formatDate(period.from, "MMM dd")} - ${formatDate(period.to, "MMM dd, yyyy")}`;
  }

  return formatDate(period.from, "MMM dd, yyyy");
}

export function formatPercentage(
  value: number,
  { addPrefix = false }: { addPrefix?: boolean } = {}
) {
  const res = new Intl.NumberFormat("en-IN", {
    style: "percent",
    maximumFractionDigits: 1
  }).format(value / 10000);

  if (addPrefix && value > 0) {
    return `+${res}`;
  }
  return res;
}
