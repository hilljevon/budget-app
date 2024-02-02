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
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ReferenceLine, ComposedChart, Line } from 'recharts';

const SpendingCarousel = ({ height, width }: { height: number, width: number }) => {
    const { spendingCharts } = useChartContext()
    return (
        <>
            {spendingCharts && (
                <Carousel className='max-w-xl max-h-48 pl-10'>
                    <CarouselContent>
                        {/* last 12 months spending */}
                        <CarouselItem>
                            <div>
                                <h2 className='text-lg font-semibold ml-4 mt-8'>Spending over past 12 months</h2>
                                <BarChart
                                    width={width}
                                    height={height}
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
                                    width={width}
                                    height={height}
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
                        {/* over under yearly */}
                        <CarouselItem>
                            <div className=''>
                                <h2 className='text-lg font-semibold ml-4 mt-8'>Over/Under Yearly</h2>
                                <ComposedChart
                                    width={width}
                                    height={height}
                                    data={spendingCharts.overUnderYearly}
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
                                    <ReferenceLine y={0} stroke="#000" />
                                    <Legend />
                                    <Bar type="monotone" dataKey="amount" stroke="#8884d8" fill='#00c04b' />
                                    <Line type="monotone" dataKey="amount" stroke="#ff7300" />
                                </ComposedChart>
                            </div>
                        </CarouselItem>
                        {/* over under weekly */}
                        <CarouselItem>
                            <div className=''>
                                <h2 className='text-lg font-semibold ml-4 mt-8'>Over/Under Weekly</h2>
                                <ComposedChart
                                    width={width}
                                    height={height}
                                    data={spendingCharts.overUnderWeekly}
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
                                    <ReferenceLine y={0} stroke="#000" />
                                    <Legend />
                                    <Bar type="monotone" dataKey="amount" stroke="#8884d8" fill='#00c04b' />
                                    <Line type="monotone" dataKey="amount" stroke="#ff7300" />
                                </ComposedChart>
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