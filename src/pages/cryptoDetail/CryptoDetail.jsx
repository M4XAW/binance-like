import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'

export default function CryptoDetail() {
    const { id } = useParams();

    const [cryptoDetail, setCryptoDetail] = useState({});

    useEffect(() => {
        const fetchCryptoDetail = async () => {
            try {
                const url = `https://api.coingecko.com/api/v3/coins/${id}`;
                const options = {
                    method: 'GET',
                    headers: {accept: 'application/json', 'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY},
                };
                
                const response = await fetch(url, options);
                const data = await response.json();
                setCryptoDetail(data);
            } catch (error) {
                console.error('Error fetching data for a single cryptocurrency:', error);
            }
        };
    }, [cryptoIds]);

    return (
        <main className="min-h-[calc(100dvh-64px)] w-full max-w-screen-2xl mx-auto md:p-8 p-4">
            <nav aria-label="breadcrumb">
                <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
                    <li className="inline-flex items-center gap-1.5">
                        <Link to="/"className="transition-colors text-white/60 hover:text-white">Accueil</Link>
                    </li>
                    <li role="presentation" aria-hidden="true" className="[&amp;>svg]:size-3.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </li>
                    <li className="inline-flex items-center gap-1.5">
                        <a className="transition-colors text-white/60 hover:text-white" href="/docs/components">Components</a>
                    </li>
                    <li role="presentation" aria-hidden="true" className="[&amp;>svg]:size-3.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </li>
                    <li className="inline-flex items-center gap-1.5">
                        <span role="link" aria-disabled="true" aria-current="page" className="font-normal text-white">Cours pour {id}</span>
                    </li>
                </ol>
            </nav>
            <h1 className='text-3xl font-semibold mt-6 capitalize'>{id}</h1>
        </main>
    )
}

