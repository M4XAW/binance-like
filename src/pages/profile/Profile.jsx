import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("userLogin"));
    const [totalValue, setTotalValue] = useState(0);
    const [cryptoData, setCryptoData] = useState({});
    const [dataFetched, setDataFetched] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

        const fetchPrices = async () => {
            try {
                const cryptoIds = Object.keys(user.portemonnaie)
                    .map((crypto) => {
                        switch (crypto.toLowerCase()) {
                            case "btc":
                                return "bitcoin";
                            case "eth":
                                return "ethereum";
                            case "usdt":
                                return "tether";
                            case "xrp":
                                return "ripple";
                            case "bnb":
                                return "binancecoin";
                            case "sol":
                                return "solana";
                            case "doge":
                                return "dogecoin";
                            case "usdc":
                                return "usd-coin";
                            case "ada":
                                return "cardano";
                            case "seth":
                                return "seth";
                            default:
                                return crypto;
                        }
                    })
                    .join(",");

                const response = await fetch(
                    `https://api.coingecko.com/api/v3/coins/markets?ids=${cryptoIds}&vs_currency=usd`
                );
                const data = await response.json();

                let total = 0;
                const cryptoDataMap = {};
                data.forEach((cryptoData) => {
                    const amount =
                        user.portemonnaie[cryptoData.symbol.toUpperCase()];
                    if (amount) {
                        total += amount * cryptoData.current_price;
                        cryptoDataMap[cryptoData.symbol.toUpperCase()] = {
                            name: cryptoData.name,
                            image: cryptoData.image,
                            price: cryptoData.current_price,
                            amount: amount,
                        };
                    }
                });
                setTotalValue(total.toFixed(2));
                setCryptoData(cryptoDataMap);
                setDataFetched(true);
            } catch (error) {
                console.error("Error fetching crypto prices:", error);
            }
        };

        if (!dataFetched) {
            fetchPrices();
        }
    }, [user, navigate, dataFetched]);

    if (!user) {
        return null;
    }

    return (
        <main className="min-h-[calc(100dvh-65px)] w-full max-w-screen-2xl mx-auto border-x border-neutral-800">
            <div className="border-b border-neutral-800 md:p-8 p-4">
                <h2 className="text-2xl font-medium mb-6 text-white">
                    Bienvenue, {user.username}
                </h2>
                <div>
                    <p className="text-gray-300 text-5xl font-medium mb-1">${totalValue}</p>
                    <h3 className="text-md text-white/60">
                        Valeur totale du portefeuille
                    </h3>
                </div>
            </div>
            <div className="p-8 shadow-md w-full max-w-md">
                <ul>
                    {Object.entries(cryptoData).map(([crypto, data]) => (
                        <li
                            key={crypto}
                            className="text-gray-300 mb-4 flex items-center"
                        >
                            <img
                                src={data.image}
                                alt={data.name}
                                className="w-8 h-8 mr-2"
                            />
                            <div>
                                <strong>{data.name}:</strong> {data.amount}{" "}
                                (Valeur: $
                                {(data.amount * data.price).toFixed(2)})
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
