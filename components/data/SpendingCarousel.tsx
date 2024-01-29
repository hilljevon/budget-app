'use client'
import { useChartContext } from '@/lib/contexts/ChartProvider'
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

const SpendingCarousel = () => {
    const { spendingCharts } = useChartContext()
    return (
        <>
            {spendingCharts && (
                <Carousel className='max-w-sm max-h-48'>
                    <CarouselContent>
                        {/* last 12 months spending */}
                        <CarouselItem>
                            <div>
                                <h2 className='text-lg font-semibold ml-4 mt-8'>Spending over past 12 months</h2>
                                <BarChart
                                    width={350}
                                    height={150}
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
                        {/* last 10 weeks spending */}
                        <CarouselItem>
                            <div className=''>
                                <h2 className='text-lg font-semibold ml-4 mt-8'>Spending over last 10 weeks</h2>
                                <BarChart
                                    width={350}
                                    height={150}
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
            )}
        </>
    )
}

export default SpendingCarousel