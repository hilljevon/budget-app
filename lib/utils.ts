import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { CsvDataProps, LogisticsContextTypes } from "./types/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
function getWeekNumber(d: any) {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  // Get first day of year
  let yearStart: any = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  let weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  // Return array of year and week number
  return [d.getUTCFullYear(), weekNo];
}
function groupByWeek(transactions: CsvDataProps[]) {
  let grouped: any = {};

  transactions.forEach((transaction: CsvDataProps) => {
    const date = new Date(transaction.Date);
    const [year, week] = getWeekNumber(date);
    const weekKey = `${year}-W${week}`;

    if (!grouped[weekKey]) {
      grouped[weekKey] = [];
    }

    grouped[weekKey].push(transaction);
  });

  return grouped;
}
const convertToDateObject = (dateString: string) => {
  const [month, day, year]: any[] = dateString.split('/');
  return new Date(year, month - 1, day);
};
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

export function spendingPerYear(spendingData: LogisticsContextTypes) {
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
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
  ];

  for (let i = 0; i < 12; i++) {
    const data = {
      name: months[dateArray[i] - 1],
      amount: spendingData.spendingAveragesByMonth[i]
    }
    spendingArrayByYear.unshift(data)
  }
  return spendingArrayByYear
}

export function spendingPerWeek(spendingData: LogisticsContextTypes) {
  const TEN_WEEKS_IN_MS = 10 * 7 * 24 * 60 * 60 * 1000;
  // converts a date string to a date object
  // FOR NOW, CURRENT DATE IS BASED OFF OF THE LAST TRANSACTION DATE. HOWEVER, WHEN WE CREATE ACTUAL APP WE NEED TO USE new Date()
  const currentDate = new Date(spendingData.recentDate);
  const tenWeeksAgo = new Date(currentDate.getTime() - TEN_WEEKS_IN_MS);
  // GET ALL TRANSACTIONS IN THE LAST 10 WEEKS
  const results = spendingData.transactions.filter((item: CsvDataProps) => {
    const itemDate = convertToDateObject(item.Date);
    return itemDate >= tenWeeksAgo;
  });
  // SEPARATE THESE TRANSACTIONS INTO A OBJECT FILTERED BY WEEK
  let groupedTransactions = groupByWeek(results);
  console.log('MY GROUPED TRANSACTIONS HERE', groupedTransactions)
  // CONVERT OBJECT INTO AN ARRAY OF ARRAYS
  const transactionArrays = Object.values(groupedTransactions)
  // GET THE AVERAGES OF EACH RESPECTIVE ARRAY
  const weeklyAverages = transactionArrays.map((array: any) => {
    let sum = 0
    array.forEach((transaction: CsvDataProps) => {
      sum = sum + parseFloat(transaction.Amount)
    })
    return sum
  })
  const weeklyData = []
  // CREATE OBJECTS COMPATIBLE WITH RECHARTS
  for (let i = 0; i < 12; i++) {
    let weekObject = {
      name: i + 1,
      amount: weeklyAverages[i]
    }

    weeklyData.unshift(weekObject)
  }
  return weeklyData
}
export function spendingGraphData(spendingData: LogisticsContextTypes) {
  const annualSpending = spendingPerYear(spendingData)
  const weeklySpending = spendingPerWeek(spendingData)
  return annualSpending
}