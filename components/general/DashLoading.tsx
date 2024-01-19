'use client'
import React, { useEffect } from 'react'
import type { } from 'ldrs'
const DashLoading = () => {
    useEffect(() => {
        async function getLoader() {
            const { spiral } = await import('ldrs')
            spiral.register()
        }
        getLoader()
    }, [])
    return (
        <div className='flex w-full h-screen justify-center items-center'>
            <l-spiral color="coral"></l-spiral>
        </div>
    )
}

export default DashLoading