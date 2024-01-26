'use client'
import { useChartContext } from '@/lib/contexts/ChartProvider';
import { useLogisticsContext } from '@/lib/contexts/LogisticsProvider';
import { spendingGraphData } from '@/lib/utils';
import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const DashGraphs = () => {
    const { spendingData } = useLogisticsContext()
    const { spendingCharts, setSpendingCharts } = useChartContext()
    useEffect(() => {
        setSpendingCharts(() => {
            return spendingGraphData(spendingData)
        })
    }, [])
    return (
        <>
            {spendingCharts && (
                <>
                    <Carousel>
                        <CarouselContent>
                            <CarouselItem>
                                <div>
                                    <h2 className='text-lg font-semibold ml-4 mt-8'>Spending over past 12 months</h2>
                                    <BarChart
                                        width={625}
                                        height={300}
                                        data={spendingCharts.yearlySpending}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar type="monotone" dataKey="amount" stroke="#8884d8" fill='#00c04b' />
                                    </BarChart>
                                </div>
                            </CarouselItem>
                            <CarouselItem>
                                <div className=''>
                                    <h2 className='text-lg font-semibold ml-4 mt-8'>Spending over last 10 weeks</h2>
                                    <BarChart
                                        width={625}
                                        height={300}
                                        data={spendingCharts.weeklySpending}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar type="monotone" dataKey="amount" stroke="#8884d8" fill='#00c04b' />
                                    </BarChart>
                                </div>
                            </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </>
            )}

        </>
    )
}

export default DashGraphs