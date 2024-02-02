'use client'
import React from 'react'

const MainSection = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="">
            <div className="">
                <div className="py-10 lg:py-6 mt-12">
                    {children}
                </div>
            </div>
        </main>
    )
}

export default MainSection