import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { CsvDataProps } from "./types/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export async function handleBankData(allData: CsvDataProps[]) {
  const groupedData: { [key: string]: CsvDataProps[] } = {}
  const csvData = allData.splice(0, 200)
  csvData.forEach((item: CsvDataProps) => {
    const date = new Date(item.Date)
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const monthYearKey = `${month}/${year}`
    if (!groupedData[monthYearKey]) {
      groupedData[monthYearKey] = [item]
    } else {
      groupedData[monthYearKey].push(item)
    }
  })
  return groupedData
}
export async function handleTransaction(item: CsvDataProps) {
  const date = new Date(item.Date)
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const monthYearKey = `${month}/${year}`
  return
}