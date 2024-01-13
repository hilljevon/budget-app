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
}
export type CsvDataProps = {
    Amount: string,
    Balance: string,
    Category: string,
    Currency: string,
    Date: string,
    Description: string
}