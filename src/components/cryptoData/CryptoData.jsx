import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../../utils/currencyFormat";
import { Ellipsis } from "lucide-react";

export const CryptoData = ({ cryptoIds }) => {
    const [cryptoData, setCryptoData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCryptoData = async () => {
            try {
                const url = `https://api.coingecko.com/api/v3/coins/markets?ids=${cryptoIds.join(",")}&vs_currency=usd`;
                const options = {
                    method: "GET",
                    headers: { 
                        accept: "application/json", "x-cg-demo-api-key": import.meta.env.VITE_API_KEY_COINGECKO,
                    },
                };

                const response = await fetch(url, options);
                const data = await response.json();
                setCryptoData(data);
            } catch (error) {
                console.error(
                    "Error fetching data for multiple cryptocurrencies:",
                    error
                );
            }
        };

        if (cryptoIds.length) {
            fetchCryptoData();
        }
    }, [cryptoIds]);

    return (
        <>
            {cryptoData && cryptoData.length > 0 ? (
                <table className="w-full caption-bottom text-sm">
                    <thead>
                        <tr>
                            <th className="h-10 px-4 text-left text-white/60 align-middle font-medium cursor-pointer">
                                Nom
                            </th>
                            <th className="h-10 px-4 text-left text-white/60 align-middle font-medium">
                                Prix
                            </th>
                            <th className="h-10 px-4 text-left text-white/60 align-middle font-medium cursor-pointer">
                                Variation
                            </th>
                            <th className="h-10 px-4 text-left text-white/60 align-middle font-medium">
                                Volume 24h
                            </th>
                            <th className="h-10 px-4 text-left align-middle text-white/60 font-medium">
                                Capitalisation
                            </th>
                            <th className="h-10 w-12 text-right px-4 align-middle text-white/60 font-medium"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cryptoData.map((crypto) => {
                            const priceChangeClass =
                                crypto.price_change_percentage_24h >= 0
                                    ? "text-green-500"
                                    : "text-red-500";

                            return (
                                <tr
                                    key={crypto.id}
                                    className="cursor-pointer transition-colors border-b border-white/15 last:border-b-0 hover:bg-white/5"
                                    onClick={() =>
                                        navigate(`/price/${crypto.id}`)
                                    }
                                >
                                    <td className="h-12 px-4 text-white whitespace-nowrap">
                                        <div className="flex items-center">
                                            <img
                                                src={crypto.image}
                                                alt={crypto.name}
                                                className="w-6 h-6 mr-2"
                                            />
                                            <span>
                                                {crypto.name}{" "}
                                                <span className="text-xs text-white/60 uppercase">
                                                    {crypto.symbol}
                                                </span>
                                            </span>
                                        </div>
                                    </td>
                                    <td className="h-12 px-4 text-white">
                                        {currencyFormat(crypto.current_price)}
                                    </td>
                                    <td
                                        className={`h-10 px-4 ${priceChangeClass}`}
                                    >
                                        {crypto.price_change_percentage_24h.toFixed(
                                            2
                                        )}
                                        %
                                    </td>
                                    <td className="h-12 px-4 text-white">
                                        {currencyFormat(crypto.total_volume)}
                                    </td>
                                    <td className="h-12 px-4 text-white">
                                        {currencyFormat(crypto.market_cap)}
                                    </td>
                                    <td className="h-12 px-4 text-white text-end">
                                        <Ellipsis
                                            size={18}
                                            className="cursor-pointer"
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <div className="flex items-center justify-center h-[calc(100vh-64px)]">
                    <div className="loader inline-block h-6 w-6 p-0 border-t-2 border-r-2 border-b-2 border-zinc-700 border-l-2 border-l-gray-50 rounded-full"></div>
                </div>
            )}
        </>
    );
};
