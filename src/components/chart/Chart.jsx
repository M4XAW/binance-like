import React, { useEffect, useState } from "react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

import { currencyFormat } from "../../utils/currencyFormat";

export default function Chart({ id }) {
    const [chartData, setChartData] = useState([]);

    const fetchChartData = async () => {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                "x-cg-demo-api-key": import.meta.env.VITE_API_KEY_COINGECKO,
            },
        };

        fetch(
            `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1`,
            options
        )
            .then((res) => res.json())
            .then((data) => {
                const formattedData = data.prices.map(([timestamp, price]) => {
                    const date = new Date(timestamp);
                    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    return {
                        name: timeString,
                        value: price,
                    };
                });
                setChartData(formattedData);
                console.log(formattedData);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        fetchChartData();
    }, [id]);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const { name, value } = payload[0].payload; 
            return (
                <div className="custom-tooltip bg-zinc-900 p-3 rounded-md border border-neutral-800 shadow-md">
                    <p className="text-white/60 text-xs">{name}</p>
                    <p className="text-white text-sm">{`Prix : ${currencyFormat(value)}`}</p>
                </div>
            );
        }
        return null;
    };    

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                data={chartData}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor="#8884d8"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor="#8884d8"
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>
                <XAxis 
                    dataKey="name" 
                    fontSize={12}
                    axisLine={false}
                    interval={50}
                />
                <YAxis 
                    fontSize={12}
                />
                <CartesianGrid 
                    strokeDasharray="3 3"
                    vertical={false}
                 />
                <Tooltip content={<CustomTooltip />} />
                <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
