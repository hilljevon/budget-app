'use client'
import React from 'react'
import SpendingCarousel from './SpendingCarousel';
import BillsCarousel from './BillsCarousel';
const CHART_WIDTH = 500
const CHART_HEIGHT = 300
const DashGraphs = () => {
    return (
        <>
            <div className='flex justify-center flex-col items-center'>
                <SpendingCarousel width={CHART_WIDTH} height={CHART_HEIGHT} />
                <BillsCarousel width={CHART_WIDTH} height={CHART_HEIGHT} />
            </div>
        </>
    )
}

export default DashGraphs