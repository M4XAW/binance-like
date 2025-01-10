import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formattedNumber } from "../../utils/formattedNumber";

import Loading from "../../components/loading/Loading";
import Chart from "../../components/chart/Chart";

import { MoveUpRight, MoveDownRight, Infinity } from "lucide-react";
import { currencyFormat } from "../../utils/currencyFormat";

export default function CryptoDetail() {
    const { id } = useParams();

    const [cryptoDetail, setCryptoDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [amount, setAmount] = useState("");
    const [limitPrice, setLimitPrice] = useState("");

    const user = JSON.parse(localStorage.getItem("userLogin"));

    const fetchCryptoDetail = async () => {
        setIsLoading(true);
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                "x-cg-demo-api-key": import.meta.env.VITE_API_KEY_COINGECKO,
            },
        };

        try {
            const response = await fetch(
                `https://api.coingecko.com/api/v3/coins/${id}`,
                options
            );
            const data = await response.json();
            setCryptoDetail(data);
        } catch (error) {
            console.error(
                "Erreur lors de la récupération des données :",
                error
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleBuy = () => {
        if (!amount || !cryptoDetail) {
            alert("Veuillez entrer un montant.");
            return;
        }

        const price = cryptoDetail.market_data?.current_price?.usd;
        const totalCost = parseFloat(amount) * price;

        if (user.portemonnaie.USDT < totalCost) {
            alert("Fonds insuffisants.");
            return;
        }

        user.portemonnaie.USDT -= totalCost;
        user.portemonnaie[id.toUpperCase()] =
            (user.portemonnaie[id.toUpperCase()] || 0) + parseFloat(amount);

        localStorage.setItem("userLogin", JSON.stringify(user));
        alert(`Achat réussi de ${amount} ${id.toUpperCase()}`);
    };

    const handleSetLimitOrder = () => {
        if (!amount || !limitPrice) {
            alert("Veuillez entrer un montant et un prix limite.");
            return;
        }

        const orders = JSON.parse(localStorage.getItem("limitOrders")) || [];
        orders.push({
            crypto: id.toUpperCase(),
            amount: parseFloat(amount),
            limitPrice: parseFloat(limitPrice),
            type: "buy",
        });

        localStorage.setItem("limitOrders", JSON.stringify(orders));
        alert(`Ordre limite créé pour ${amount} ${id.toUpperCase()} à ${limitPrice} USD`);
    };

    useEffect(() => {
        // fetchCryptoDetail();
    }, [id]);

    if (!cryptoDetail) {
        return (
            <Loading />
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
                <div className="w-9/12 md:p-8 p-4">
                    <div className="mb-10">
                        <div className="flex items-center gap-2 mb-6">
                            <img
                                src={cryptoDetail.image?.small}
                                alt={cryptoDetail.name}
                                className="h-6 w-6"
                            />
                            <p>
                                {cryptoDetail.name}{" "}
                                <span className="uppercase">
                                    ({cryptoDetail.symbol})
                                </span>
                            </p>
                        </div>
                        <h1 className="text-3xl font-semibold capitalize my-1.5">
                            {currencyFormat(cryptoDetail.market_data?.current_price?.usd || "Erreur")}
                        </h1>
                        {cryptoDetail.market_data
                            ?.price_change_percentage_24h !== undefined &&
                            (cryptoDetail.market_data
                                .price_change_percentage_24h < 0 ? (
                                <div className="flex items-center gap-2 text-red-500">
                                    <MoveDownRight size={18} />
                                    {
                                        cryptoDetail.market_data
                                            .price_change_percentage_24h
                                    }
                                    %
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-green-500">
                                    <MoveUpRight size={18} />
                                    {
                                        cryptoDetail.market_data
                                            .price_change_percentage_24h
                                    }
                                    %
                                </div>
                            ))}
                    </div>

                    <div className="h-96 w-full">
                        <Chart id={id} />
                    </div>
                </div>
                <div className="flex flex-col gap-4 justify-between w-3/12 bg-neutral-800/30 border-l border-neutral-800 md:p-8 p-4">
                    <div className="space-y-2">
                        <input
                            className="input"
                            type="number"
                            placeholder="Montant"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <input
                            className="input"
                            type="number"
                            placeholder="Prix limite (optionnel)"
                            value={limitPrice}
                            onChange={(e) => setLimitPrice(e.target.value)}
                        />
                        <div className="flex space-x-2 w-full">
                            <button className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-1 outline-offset-4 disabled:pointer-events-none disabled:opacity-50 bg-transparent border border-neutral-800 text-white shadow hover:bg-white/10 h-9 px-4 py-2">25%</button>
                            <button className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-1 outline-offset-4 disabled:pointer-events-none disabled:opacity-50 bg-transparent border border-neutral-800 text-white shadow hover:bg-white/10 h-9 px-4 py-2">50%</button>
                            <button className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-1 outline-offset-4 disabled:pointer-events-none disabled:opacity-50 bg-transparent border border-neutral-800 text-white shadow hover:bg-white/10 h-9 px-4 py-2">75%</button>
                            <button className="inline-flex items-center justify-center w-full whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-1 outline-offset-4 disabled:pointer-events-none disabled:opacity-50 bg-transparent border border-neutral-800 text-white shadow hover:bg-white/10 h-9 px-4 py-2">100%</button>
                        </div>
                    </div>
                    <div className="inline-flex gap-4 w-full">
                        <button
                            className="btn bg-green-500"
                            onClick={handleBuy}
                        >
                            Acheter
                        </button>
                        <button
                            className="btn bg-yellow-500"
                            onClick={handleSetLimitOrder}
                        >
                                Définir un ordre
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-1/2 md:p-8 p-4 border-r border-neutral-800">
                <h3 className="text-sm font-semibold text-white/90 uppercase">
                    Total
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div>
                        <p className="text-white/60 text-xs uppercase">
                            Capitalisation
                        </p>
                        <p className="text-white">
                            {currencyFormat(
                                cryptoDetail.market_data?.market_cap?.usd ||
                                    "Erreur"
                            )}
                        </p>
                    </div>
                    <div>
                        <p className="text-white/60 text-xs uppercase">
                            Volume en 24h
                        </p>
                        <p className="text-white">
                            {currencyFormat(
                                cryptoDetail.market_data?.total_volume?.usd ||
                                    "Erreur"
                            )}
                        </p>
                    </div>
                    <div>
                        <p className="text-white/60 text-xs uppercase">
                            En circulation
                        </p>
                        <p className="text-white">
                            {formattedNumber(
                                cryptoDetail.market_data?.circulating_supply
                            )}
                        </p>
                    </div>
                    <div>
                        <p className="text-white/60 text-xs uppercase">
                            Offre maximale
                        </p>
                        <p className="text-white">
                            {cryptoDetail.market_data?.max_supply_infinite ? (
                                <Infinity size={18} />
                            ) : (
                                formattedNumber(
                                    cryptoDetail.market_data?.max_supply
                                )
                            )}
                        </p>
                    </div>
                    <div>
                        <p className="text-white/60 text-xs uppercase">
                            Popularité
                        </p>
                        <p className="text-white">
                            {cryptoDetail.market_data?.market_cap_rank}
                        </p>
                    </div>
                    <div>
                        <p className="text-white/60 text-xs uppercase">
                            Niveau historique
                        </p>
                        <p className="text-white">
                            {currencyFormat(
                                cryptoDetail.market_data?.ath?.usd || "Erreur"
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
