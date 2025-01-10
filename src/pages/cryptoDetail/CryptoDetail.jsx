import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

export default function CryptoDetail() {
    const { id } = useParams();

    const [cryptoDetail, setCryptoDetail] = useState({});

    const data = [
        {
            name: "Page A",
            uv: 4000,
            amt: 2400,
        },
        {
            name: "Page B",
            uv: 1000,
            amt: 2210,
        },
        {
            name: "Page B",
            uv: 1000,
            amt: 2210,
        },
        {
            name: "Page B",
            uv: 1300,
            amt: 410,
        },
        {
            name: "Page B",
            uv: 1150,
            amt: 2210,
        },
        {
            name: "Page B",
            uv: 2020,
            amt: 2210,
        },
        {
            name: "Page B",
            uv: 2560,
            amt: 2210,
        },
        {
            name: "Page B",
            uv: 6000,
            amt: 2210,
        },
    ];

    useEffect(() => {
        const fetchCryptoDetail = async () => {
            try {
                const url = `https://api.coingecko.com/api/v3/coins/markets?ids=${cryptoIds.join(
                    ","
                )}&vs_currency=usd`;
                const options = {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        "x-cg-demo-api-key": import.meta.env
                            .VITE_API_KEY_COINGECKO,
                    },
                };

                const response = await fetch(url, options);
                const data = await response.json();
                setCryptoDetail(data);
            } catch (error) {
                console.error(
                    "Error fetching data for a single cryptocurrency:",
                    error
                );
            }
        };

        if (id) {
            fetchCryptoDetail();
        }
    }, [id]);

    return (
        <main className="min-h-[calc(100dvh-64px)] w-full max-w-screen-2xl mx-auto md:p-8 p-4">
            <nav aria-label="breadcrumb" className="mb-6">
                <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
                    <li className="inline-flex items-center gap-1.5">
                        <Link
                            to="/"
                            className="transition-colors text-white/60 hover:text-white"
                        >
                            Accueil
                        </Link>
                    </li>
                    <li
                        role="presentation"
                        aria-hidden="true"
                        className="[&amp;>svg]:size-3.5"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </li>
                    <li className="inline-flex items-center gap-1.5">
                        <Link
                            to
                            className="transition-colors text-white/60 hover:text-white"
                            href="/docs/components"
                        >
                            Marchés
                        </Link>
                    </li>
                    <li
                        role="presentation"
                        aria-hidden="true"
                        className="[&amp;>svg]:size-3.5"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </li>
                    <li className="inline-flex items-center gap-1.5">
                        <span
                            role="link"
                            aria-disabled="true"
                            aria-current="page"
                            className="font-normal text-white"
                        >
                            Cours pour {id}
                        </span>
                    </li>
                </ol>
            </nav>
            <h1 className="text-3xl font-semibold capitalize mb-2">{id}</h1>

            <AreaChart
                width={730}
                height={250}
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor="#82ca9d"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="95%"
                            stopColor="#82ca9d"
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                />
                <Area
                    type="monotone"
                    dataKey="pv"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorPv)"
                />
            </AreaChart>
        </main>
    );
}
