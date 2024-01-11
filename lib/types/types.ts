export type OnboardingProps = {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    currentBalance: number | string,
    monthlyIncome: number | string
}
export type CsvDataProps = {
    Amount: string,
    Balance: string,
    Category: string,
    Currency: string,
    Date: string,
    Description: string
}