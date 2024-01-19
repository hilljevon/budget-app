'use client'
import { useLogisticsContext } from '@/lib/contexts/LogisticsProvider';
import { spendingGraphData } from '@/lib/utils';
import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
const data = [
    {
        name: 'Jan',
        uv: 4000,
        pv: 2400,
    },
    {
        name: 'Feb',
        uv: 3000,
        pv: 1398,

    },
    {
        name: 'March',
        uv: 2000,
        pv: 9800,

    },
    {
        name: 'April',
        uv: 2780,
        pv: 3908,

    },
    {
        name: 'May',
        uv: 1890,
        pv: 4800,

    },
    {
        name: 'June',
        uv: 2390,
        pv: 3800,

    },
    {
        name: 'July',
        uv: 3490,
        pv: 4300,

    },
];
const data2 = [
    { name: 'Page A', uv: 2520, pv: 4000, amt: 3920 },
    { name: 'Page B', uv: 1329, pv: 2099.5, amt: 2940 },
    { name: 'Page C', uv: 7320, pv: 2175.5, amt: 1960 },
    { name: 'Page D', uv: 4108.4, pv: 4500, amt: 2724 },
    { name: 'Page E', uv: 5040, pv: 2071.95, amt: 1852.2 },
    { name: 'Page F', uv: 3990, pv: 2375, amt: 2343.2 },
    { name: 'Page G', uv: 4515, pv: 1995, amt: 3420.2 },
];
const data3 = [
    { name: 'Page A', uv: '3080', pv: '2195', amt: '3800' },
    { name: 'Page B', uv: '2895', pv: '1650', amt: '2297' },
    { name: 'Page C', uv: '3180', pv: '1300', amt: '14720' },
    { name: 'Page D', uv: '2860', pv: '1690', amt: '6052' },
    { name: 'Page E', uv: '3134', pv: '1345', amt: '7400' },
    { name: 'Page F', uv: '3300', pv: '1495', amt: '5900' },
    { name: 'Page G', uv: '2920', pv: '2075', amt: '6650' },
]
const data4 = [
    { name: 'Page A', uv: '3500', pv: '2100', amt: '3600' },
    { name: 'Page B', uv: '2650', pv: '1900', amt: '2500' },
    { name: 'Page C', uv: '3000', pv: '1200', amt: '15000' },
    { name: 'Page D', uv: '2900', pv: '1750', amt: '6000' },
    { name: 'Page E', uv: '3200', pv: '1400', amt: '7200' },
    { name: 'Page F', uv: '3400', pv: '1600', amt: '5700' },
    { name: 'Page G', uv: '3100', pv: '2000', amt: '6500' },
]
const DashGraphs = () => {
    const [yearlyData, setYearlyData] = useState([])
    const { spendingData, setSpendingData } = useLogisticsContext()
    const myData = []
    const yearlySpendingArray = spendingGraphData(spendingData)
    // console.log('MY INITIAL SPENDING DATA HERE', spendingData)
    useEffect(() => {
        setYearlyData(() => {
            return spendingGraphData(spendingData)
        })
    }, [])
    console.log('MY YEARLY DATA USESTATE HERE', yearlyData)
    return (
        <>
            {yearlyData && (
                <>
                    <h2 className='text-lg font-semibold ml-4 mt-8'>Spending over past 12 months</h2>
                    <div className='grid grid-cols-6'>
                        <div className='col-span-3 mt-2'>
                            <BarChart
                                width={500}
                                height={300}
                                data={yearlyData}
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
                        {/* <div className='col-span-3 mt-6'>
                    <h2 className='text-lg font-semibold mb-3 ml-4'>Trajectory</h2>
                    <LineChart
                        width={300}
                        height={200}
                        data={data2}
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
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                </div>
                <div className='col-span-3 mt-6'>
                    <h2 className='text-lg font-semibold mb-3 ml-4'>Transactions</h2>
                    <LineChart
                        width={300}
                        height={200}
                        data={data3}
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
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                </div>
                <div className='col-span-3 mt-6'>
                    <h2 className='text-lg font-semibold mb-3 ml-4'>Budget Analysis</h2>
                    <LineChart
                        width={300}
                        height={200}
                        data={data4}
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
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>
                </div> */}
                    </div>
                </>
            )}

        </>
    )
}

export default DashGraphs