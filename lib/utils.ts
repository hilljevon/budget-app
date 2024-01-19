import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { CsvDataProps, LogisticsContextTypes } from "./types/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function handleBankData(csvData: CsvDataProps[]) {
  const groupedData: { [key: string]: CsvDataProps[] } = {}
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
// THIS FUNCTION FILTERS OUR CSV DATA SO WE ONLY RETURN ALL NEGATIVE TRANSACTIONS THAT ARE NOT ACC2ACC TRANSFERS.
export function filterInitialBankData(allData: CsvDataProps[]) {
  const sortedData: any[] = []
  allData.forEach((transaction) => {
    if (parseFloat(transaction.Amount) < 0 && !transaction.Description.includes('Transfer To Share')) {
      sortedData.push(transaction)
    }
  })
  return sortedData
}

export function handleBankData1(allData: CsvDataProps[]) {
  const filteredObjectData = handleBankData(allData)
  // ARRAY OF ARRAYS, WHERE INDEX 0 BEGINS AT THE LATEST MONTH FROM THE TRANSACTIONS
  const arrayOfArrays = Object.values(filteredObjectData)

  // THIS FIRST LOOP WILL GO THROUGH EACH OUTER ARRAY, WHICH EACH MONTH OF TRANSACTIONS
  const averages = arrayOfArrays.map((monthArray: CsvDataProps[], idx) => {
    // NOW ON AN INDIVUDUAL MONTH, WE WANT TO EXTRACT THE TOTAL PRICE FROM THAT MONTH
    let currentSum = 0

    // NOW WITHIN THE MONTH, WE HAVE ARRAY OF TRANSACTIONS. WE WANT TO LOOP THRU EACH TRANSACTION, TAKE THAT PRICE, AND ADD IT TO OUR CURRENT SUM
    const innerAverage = monthArray.forEach((transaction: CsvDataProps) => {
      currentSum = currentSum + Math.abs(parseFloat(transaction.Amount))
    })
    // now that we added each sum transaction, we have the total sum of transactions for that respective month. returning currentSum will be the sum of all inner arrays
    return currentSum
  })
  // averages should return another array of arrays, where each array represents the latest month and that respective average
  return averages
}
export function spendingGraphData(spendingData: LogisticsContextTypes) {
  const length = spendingData.spendingAveragesByMonth.length
  const latestMonth = parseInt(spendingData.recentDate.split('/')[0])
  const dateArray = []
  // this will loop from 1-11, we are going to subtract from our current month that the csv data has
  for (let i = 0; i < 12; i++) {
    // if our latest month minus our current iteration is greater than 0, we want to push that integer onto the array
    if (latestMonth - i > 0) {
      dateArray.push(latestMonth - i)
      // otherwise, we subtract the other way around
    } else {
      dateArray.push(i - latestMonth)
    }
  }
  const spendingArrayByYear: any = []
  for (let i = 0; i < 12; i++) {
    const data = {
      name: dateArray[i],
      amount: spendingData.spendingAveragesByMonth[i]
    }
    spendingArrayByYear.push(data)
  }
  return spendingArrayByYear
}