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
export type LogisticsContextTypes = {
    spendingAveragesByMonth: number[],
    recentDate: string
}
export type CsvDataProps = {
    Amount: string,
    Balance: string,
    Category: string,
    Currency: string,
    Date: string,
    Description: string
}
export type InitialOnboardingProps = {
    bills: {
        category: string,
        frequency: string,
        name: string,
        price: string | number
    }[],
    currentBalance: string | number,
    email: string,
    firstName: string,
    lastName: string,
    monthlyIncome: string | number,
    phone: string,
    subscriptions: {
        category: string,
        frequency: string,
        name: string,
        price: string | number
    }[],
    // transactionsByDate: {
    //     [key: string]: {
    //         Amount: string | number,
    //         Balance: string | number,
    //         Currency: string,
    //         Date: string,
    //         Description: string
    //     }[]
    // },
    transactionsByDate: any,
    clerkId: string
}
interface transactionsByDate {
    [key: string]: {
        Amount: string | number,
        Balance: string | number,
        Currency: string,
        Date: string,
        Description: string
    }[]
}