'use client'
import React from 'react'

const MainSection = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="lg:pl-72">
            <div className="xl:pr-96">
                <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 mt-12">
                    {children}
                </div>
            </div>
        </main>
    )
}

export default MainSection