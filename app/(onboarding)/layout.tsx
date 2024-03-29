import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { OnboardingProvider } from '@/lib/contexts/OnboardingProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Brain Budget',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    <OnboardingProvider>
                        {children}
                    </OnboardingProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}
