import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formattedNumber } from "../../utils/formattedNumber";

import { Infinity } from "lucide-react";

import Chart from "../../components/chart/Chart";

import { MoveUpRight, MoveDownRight } from "lucide-react";
import { currencyFormat } from "../../utils/currencyFormat";

export default function CryptoDetail() {
    const { id } = useParams();

    const [cryptoDetail, setCryptoDetail] = useState(null);
    const [error, setError] = useState(null);

    const fetchCryptoDetail = () => {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                "x-cg-demo-api-key": import.meta.env.VITE_API_KEY_COINGECKO,
            },
        };

        fetch(`https://api.coingecko.com/api/v3/coins/${id}`, options)
            .then((response) => {
                if (!response.ok) {
                    return Promise.reject(`Erreur HTTP: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setCryptoDetail(data);
                setError(null);
            })
            .catch((err) => {
                console.error("Erreur lors de la récupération des données :", err);
                setError(
                    "Impossible de charger les détails de la crypto-monnaie. Veuillez réessayer plus tard."
                );
                setCryptoDetail(null);
            });
    };

    useEffect(() => {
        // fetchCryptoDetail();
    }, [id]);

    if (error) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-64px)]">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    if (!cryptoDetail) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-64px)]">
                <div className="loader inline-block h-6 w-6 p-0 border-t-2 border-r-2 border-b-2 border-zinc-700 border-l-2 border-l-gray-50 rounded-full"></div>
            </div>
        );
    }
    
    return (
        <main className="min-h-[calc(100dvh-65px)] w-full max-w-screen-2xl mx-auto border-x border-neutral-800">
            <nav
                aria-label="breadcrumb"
                className="md:px-8 px-4 py-4 border-b border-neutral-800"
            >
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
                        className="[&>svg]:size-3.5"
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
                            to="/markets/overview"
                            className="transition-colors text-white/60 hover:text-white"
                        >
                            Marchés
                        </Link>
                    </li>
                    <li
                        role="presentation"
                        aria-hidden="true"
                        className="[&>svg]:size-3.5"
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
                            Cours pour {cryptoDetail.name || id}
                        </span>
                    </li>
                </ol>
            </nav>

            <div className="flex border-b border-neutral-800">
                <div className="w-8/12 md:p-8 p-4">
                    <div className="mb-10">
                        <p>
                            {cryptoDetail.name}
                            <span className="uppercase">
                                ({cryptoDetail.symbol})
                            </span>
                        </p>
                        <h1 className="text-3xl font-semibold capitalize my-1.5">
                            {currencyFormat(cryptoDetail.market_data?.current_price?.usd || "Erreur")}
                        </h1>
                        {cryptoDetail.market_data?.price_change_percentage_24h !== undefined && (
                            cryptoDetail.market_data.price_change_percentage_24h < 0 ? (
                                <div className="flex items-center gap-2 text-red-500">
                                    <MoveDownRight size={18} />
                                    {cryptoDetail.market_data.price_change_percentage_24h}%
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-green-500">
                                    <MoveUpRight size={18} />
                                    {cryptoDetail.market_data.price_change_percentage_24h}%
                                </div>
                            )
                        )}
                    </div>

                    <div className="h-96 w-full">
                        <Chart id={id} />
                    </div>
                </div>
                <div className="w-4/12 bg-neutral-800/30 border-l border-neutral-800 md:p-8 p-4"></div>
            </div>
            <div className="md:p-8 p-4">
                <h3 className="text-sm font-semibold text-white/90 uppercase">Total</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div>
                        <p className="text-white/60 text-sm uppercase">Capitalisation</p>
                        <p className="text-white">{currencyFormat(cryptoDetail.market_data?.market_cap?.usd || "Erreur")}</p>
                    </div>
                    <div>
                        <p className="text-white/60 text-sm uppercase">Volume en 24h</p>
                        <p className="text-white">{currencyFormat(cryptoDetail.market_data?.total_volume?.usd || "Erreur")}</p>
                    </div>
                    <div>
                        <p className="text-white/60 text-sm uppercase">En circulation</p>
                        <p className="text-white">{formattedNumber(cryptoDetail.market_data?.circulating_supply)}</p>
                    </div>
                    <di>
                        <p className="text-white/60 text-sm uppercase">Offre maximale</p>
                        <p className="text-white">{cryptoDetail.market_data?.max_supply_infinite ? <Infinity size={18} /> : formattedNumber(cryptoDetail.market_data?.max_supply)}</p>
                    </di>
                    <di>
                        <p className="text-white/60 text-sm uppercase">Popularité</p>
                        <p className="text-white">{cryptoDetail.market_data?.market_cap_rank}</p>
                    </di>
                    <di>
                        <p className="text-white/60 text-sm uppercase">Niveau historique</p>
                        <p className="text-white">{currencyFormat(cryptoDetail.market_data?.ath?.usd || "Erreur")}</p>
                    </di>
                </div>
            </div>
        </main>
    );
}
