import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { TransactionType, recentActivityType } from "./types/types"
import { convertToDateObject, getLast12Months, getMonthlyAverages, groupByWeek } from "./dateUtils"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// THIS FUNCTION FILTERS OUR CSV DATA SO WE ONLY RETURN ALL NEGATIVE TRANSACTIONS THAT ARE NOT ACC2ACC TRANSFERS.
export function filterInitialBankData(allData: TransactionType[]) {
  const sortedData: any[] = []
  allData.forEach((transaction) => {
    if (parseFloat(transaction.Amount) < 0 && !transaction.Description.includes('Transfer To Share')) {
      sortedData.push(transaction)
    }
  })
  return sortedData
}
export function spendingPerYear(transactions: TransactionType[]) {
  const dateArray = getLast12Months()
  const spendingArrayByYear: any = []
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
  ];
  const monthlyAverages = getMonthlyAverages(transactions)
  for (let i = 0; i < 12; i++) {
    const data = {
      name: months[dateArray[i] - 1],
      amount: monthlyAverages[i]
    }
    spendingArrayByYear.unshift(data)
  }
  return spendingArrayByYear
}
export function spendingPerWeek(transactions: TransactionType[]) {
  const TEN_WEEKS_IN_MS = 10 * 7 * 24 * 60 * 60 * 1000;
  // converts a date string to a date object
  // FOR NOW, CURRENT DATE IS BASED OFF OF THE LAST TRANSACTION DATE. HOWEVER, WHEN WE CREATE ACTUAL APP WE NEED TO USE new Date()
  const currentDate = new Date();
  const tenWeeksAgo = new Date(currentDate.getTime() - TEN_WEEKS_IN_MS);
  // GET ALL TRANSACTIONS IN THE LAST 10 WEEKS
  const results = transactions.filter((item: TransactionType) => {
    const itemDate = convertToDateObject(item.Date);
    return itemDate >= tenWeeksAgo;
  });
  // SEPARATE THESE TRANSACTIONS INTO A OBJECT FILTERED BY WEEK
  let groupedTransactions = groupByWeek(results);
  // CONVERT OBJECT INTO AN ARRAY OF ARRAYS
  const transactionArrays = Object.values(groupedTransactions)
  // GET THE AVERAGES OF EACH RESPECTIVE ARRAY
  const weeklyAverages = transactionArrays.map((array: any) => {
    let sum = 0
    array.forEach((transaction: TransactionType) => {
      sum = sum + Math.abs(parseFloat(transaction.Amount))
    })
    return sum
  })
  const weeklyData = []
  // CREATE OBJECTS COMPATIBLE WITH RECHARTS
  for (let i = 0; i < 11; i++) {
    let weekObject = {
      name: i + 1,
      amount: weeklyAverages[i]
    }

    weeklyData.unshift(weekObject)
  }
  return weeklyData
}
export function spendingGraphData(transactions: TransactionType[]) {
  const yearlySpending = spendingPerYear(transactions)
  const weeklySpending = spendingPerWeek(transactions)
  return { yearlySpending, weeklySpending }
}
export function getRecentActivity(transactions: TransactionType[]) {
  function daysBetween(date1: Date, date2: Date) {
    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;
    // Calculate the time difference between the two dates
    const diffInTime = date2.getTime() - date1.getTime();
    // Calculate the days difference
    return Math.ceil(diffInTime / oneDay);

  }
  const splicedTransactions = transactions.slice(0, 25)
  const groupedData: { [key: string]: any[] } = {}
  const oneDay = 1000 * 60 * 60 * 24;
  const dateToday = new Date()
  splicedTransactions.forEach((item: TransactionType) => {
    const date = new Date(item.Date)
    const daysAgo = daysBetween(date, dateToday)
    if (!groupedData[item.Date]) {
      groupedData[item.Date] = [{ ...item, daysAgo }]
    } else {
      groupedData[item.Date].push({ ...item, daysAgo })
    }
  })
  const slicedArray = Object.values(groupedData)
  const days = slicedArray.map((arr: recentActivityType[]) => {
    if (arr[0].daysAgo == 0) {
      return {
        date: 'Today',
        dateTime: arr[0].Date,
        transactions: [...arr]
      }
    } else if (arr[0].daysAgo == 1) {
      return {
        date: 'Yesterday',
        dateTime: arr[0].Date,
        transactions: [...arr]
      }
    } else {
      return {
        date: `${arr[0].daysAgo} days ago`,
        dateTime: arr[0].Date,
        transactions: [...arr]
      }
    }
  })
  return days
}