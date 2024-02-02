import { TransactionType } from "./types/types"
export function formatDate(date: any) {
    var month = '' + (date.getMonth() + 1), // Months are zero indexed
        day = '' + date.getDate(),
        year = date.getFullYear();

    // Pad the month and day with a leading zero if they are less than 10
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [month, day, year].join('/');
}
export function getWeekNumber(d: any) {
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
export function groupByWeek(transactions: TransactionType[]) {
    let grouped: any = {};

    transactions.forEach((transaction: TransactionType) => {
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
export const convertToDateObject = (dateString: string) => {
    const [month, day, year]: any[] = dateString.split('/');
    return new Date(year, month - 1, day);
};
export function getLast12Months() {
    const now = new Date();
    let currentMonth = now.getMonth() + 1; // January is 1
    let months = [];
    for (let i = 0; i < 12; i++) {
        months.push(currentMonth); // Add to the end of the array
        currentMonth--;
        if (currentMonth === 0) {
            currentMonth = 12; // Reset to December after January
        }
    }

    // Reverse the array to get the desired order
    return months;
}
export function monthYearKeys(csvData: TransactionType[]) {
    const groupedData: { [key: string]: TransactionType[] } = {}
    csvData.forEach((item: TransactionType) => {
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
export function getMonthlyAverages(allData: TransactionType[]) {
    const filteredObjectData = monthYearKeys(allData)
    // ARRAY OF ARRAYS, WHERE INDEX 0 BEGINS AT THE LATEST MONTH FROM THE TRANSACTIONS
    const arrayOfArrays = Object.values(filteredObjectData)

    // THIS FIRST LOOP WILL GO THROUGH EACH OUTER ARRAY, WHICH EACH MONTH OF TRANSACTIONS
    const averages = arrayOfArrays.map((monthArray: TransactionType[], idx) => {
        // NOW ON AN INDIVUDUAL MONTH, WE WANT TO EXTRACT THE TOTAL PRICE FROM THAT MONTH
        let currentSum = 0

        // NOW WITHIN THE MONTH, WE HAVE ARRAY OF TRANSACTIONS. WE WANT TO LOOP THRU EACH TRANSACTION, TAKE THAT PRICE, AND ADD IT TO OUR CURRENT SUM
        const innerAverage = monthArray.forEach((transaction: TransactionType) => {
            currentSum = currentSum + Math.abs(parseFloat(transaction.Amount))
        })
        // now that we added each sum transaction, we have the total sum of transactions for that respective month. returning currentSum will be the sum of all inner arrays
        return currentSum
    })
    // averages should return another array of arrays, where each array represents the latest month and that respective average
    return averages
}
export function sortObjectsByDateDesc(objects: any[]) {
    return objects.sort((a, b) => {
        // Convert "MM/DD/YYYY" to "YYYY/MM/DD" for accurate date comparison
        const reformattedDateA = a.Date.split('/').reverse().join('/');
        const reformattedDateB = b.Date.split('/').reverse().join('/');

        // Convert to date objects
        const dateA: any = new Date(reformattedDateA);
        const dateB: any = new Date(reformattedDateB);

        // Compare dates for sorting in descending order
        return dateB - dateA;
    });
}