import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Ellipsis } from 'lucide-react';

export const CryptoData = ({ cryptoIds }) => {
    const [cryptoData, setCryptoData] = useState([]);

    useEffect(() => {
        const fetchCryptoData = async () => {
            try {
                const url = `https://api.coingecko.com/api/v3/coins/markets?ids=${cryptoIds.join(',')}&vs_currency=usd`;

                const response = await fetch(url);
                const data = await response.json();
                setCryptoData(data);
            } catch (error) {
                console.error('Error fetching data for multiple cryptocurrencies:', error);
            }
        };

        if (cryptoIds.length) {
            fetchCryptoData();
        }
    }, [cryptoIds]);

    function currencyFormat(num) {
        return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return (
        <>
            {cryptoData.map((crypto) => {
                const priceChangeClass = crypto.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500";

                return (
                    <tr 
                        key={crypto.id} 
                        className="cursor-pointer transition-colors border-b border-white/15 last:border-b-0 hover:bg-white/5"
                        onClick={() => navigate(`/price/${crypto.id}`)}
                    >
                        <td className="h-12 px-4 text-white whitespace-nowrap">
                            <div className="flex items-center">
                                <img src={crypto.image} alt={crypto.name} className="w-6 h-6 mr-2" />
                                <span>{crypto.name} <span className="text-xs text-white/60 uppercase">{crypto.symbol}</span></span>
                            </div>
                        </td>
                        <td className="h-12 px-4 text-white">{currencyFormat(crypto.current_price)}</td>
                        <td className={`h-10 px-4 ${priceChangeClass}`}>
                            {crypto.price_change_percentage_24h.toFixed(2)}%
                        </td>
                        <td className="h-12 px-4 text-white">
                            {currencyFormat(crypto.total_volume)}
                        </td>
                        <td className="h-12 px-4 text-white">
                            {currencyFormat(crypto.market_cap)}
                        </td>
                        <td className="h-12 px-4 text-white text-end">
                            <Ellipsis size={18} className="cursor-pointer" />
                        </td>
                    </tr>
                );
            })}
        </>
    );
};
