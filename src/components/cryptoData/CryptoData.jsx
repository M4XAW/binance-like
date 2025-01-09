import React, { useEffect, useState } from "react";

export const CryptoData = ({ cryptoId }) => {
    const [cryptoData, setCryptoData] = useState(null);

    useEffect(() => {
        const fetchCryptoData = async () => {
            try {
                const url = 'https://api.coingecko.com/api/v3/coins/' + cryptoId;
                const options = {
                    method: 'GET',
                    headers: {accept: 'application/json', 'x-cg-demo-api-key': import.meta.env.VITE_API_KEY_COINGECKO},
                };
                const response = await fetch(url, options);
                const data = await response.json();
                setCryptoData(data);
            } catch (error) {
                console.error(`Error fetching ${cryptoId} data`, error);
            }
        };

        if (cryptoId) {
            fetchCryptoData();
        }
    }, [cryptoId]);

    const priceChangeClass = cryptoData?.market_data.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500";

    return (
        <>
            {cryptoData && (
                <tr>
                    <td className="h-10 px-4 text-white">
                        <div className="flex items-center">
                            <img src={cryptoData.image.small} alt={cryptoData.name} className="w-6 h-6 mr-2" />
                            <span>{cryptoData.name} <span className="text-xs text-white/60 uppercase">{cryptoData.symbol}</span></span>
                        </div>
                    </td>
                    <td className="h-10 px-4 text-white">${cryptoData.market_data.current_price.usd}</td>
                    <td className={`h-10 px-4 ${priceChangeClass}`}>
                        {cryptoData.market_data.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td className="h-10 px-4 text-white">
                        ${cryptoData.market_data.total_volume.usd.toLocaleString()}
                    </td>
                    <td className="h-10 px-4 text-white">
                        ${cryptoData.market_data.market_cap.usd.toLocaleString()}
                    </td>
                </tr>
            )}
        </>
    );
};
