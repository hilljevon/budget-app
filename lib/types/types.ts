export type OnboardingProps = {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    currentBalance: number | string,
    monthlyIncome: number | string,
    bills: {
        name: string,
        price: string,
        category: string,
        frequency: string
    }[],
    subscriptions: {
        name: string,
        price: string,
        category: string,
        frequency: string
    }[],
    transactionsByDate: any[]
}
export type TransactionType = {
    Amount: string,
    Balance: string,
    Category: string,
    Currency: string,
    Date: string,
    Description: string
}
export type recentActivityType = {
    Amount: number,
    Currency: string,
    Date: string,
    Description: string,
    author: string,
    _id: string,
    daysAgo: string | number
}
export type SpendingChartContextTypes = {
    yearlySpending: { name: string, amount: number }[],
    weeklySpending: { name: string, amount: number }[],
    overUnderYearly: { name: string, amount: number }[],
    overUnderWeekly: { name: string, amount: number }[],
}
export type InvoiceType = {
    _id: any,
    name: string,
    category: string,
    frequency: string,
    price: number,
    type: string,
}
export type MongoUserType = {
    _id: string,
    clerkId: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    transactions: TransactionType[],
    currentBalance: number,
    monthlyIncome: number,
    netGoals: any[],
    subscriptions: InvoiceType[],
    bills: InvoiceType[]
}