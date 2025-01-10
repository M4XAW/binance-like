import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../../utils/currencyFormat";

import Loading from "../loading/Loading";
import { Ellipsis, MoveUpRight, MoveDownRight } from "lucide-react";

export default function CryptoData() {
    const [cryptoData, setCryptoData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const fetchCryptoData = async () => {
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
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false`,
                options
            );
            const data = await response.json();
            setCryptoData(data);
        } catch (error) {
            console.error(
                "Erreur lors de la récupération des données :",
                error
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCryptoData();
    }, []);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : cryptoData.length > 0 ? (
                <>
                    <table className="w-full caption-bottom text-sm">
                        <thead>
                            <tr>
                                <th className="h-10 px-4 text-left text-white/60 align-middle font-medium">
                                    Nom
                                </th>
                                <th className="h-10 px-4 text-left text-white/60 align-middle font-medium border-l border-neutral-800">
                                    Prix
                                </th>
                                <th className="h-10 px-4 text-left text-white/60 align-middle font-medium border-l border-neutral-800">
                                    Variation
                                </th>
                                <th className="h-10 px-4 text-left text-white/60 align-middle font-medium border-l border-neutral-800">
                                    Volume 24h
                                </th>
                                <th className="h-10 px-4 text-left align-middle text-white/60 font-medium border-l border-neutral-800">
                                    Capitalisation
                                </th>
                                <th className="h-10 w-12 text-right px-4 align-middle text-white/60 font-medium"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cryptoData.map((crypto) => {
                                const isPositive =
                                    crypto.price_change_percentage_24h >= 0;
                                return (
                                    <tr
                                        key={crypto.id}
                                        className="cursor-pointer transition-colors border-t border-neutral-800 first:border-transparent hover:first:border-neutral-800 hover:bg-white/5"
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
                                                <span className="truncate">
                                                    {crypto.name}{" "}
                                                    <span className="text-xs text-white/60 uppercase">
                                                        {crypto.symbol}
                                                    </span>
                                                </span>
                                            </div>
                                        </td>
                                        <td className="h-12 px-4 text-white border-l border-neutral-800">
                                            {currencyFormat(
                                                crypto.current_price
                                            )}
                                        </td>
                                        <td
                                            className={`h-10 px-4 ${
                                                isPositive
                                                    ? "text-green-500"
                                                    : "text-red-500"
                                            } border-l border-neutral-800`}
                                        >
                                            <span className="flex items-center gap-2">
                                                {isPositive ? (
                                                    <MoveUpRight size={18} />
                                                ) : (
                                                    <MoveDownRight size={18} />
                                                )}
                                                {crypto.price_change_percentage_24h.toFixed(
                                                    2
                                                )}
                                                %
                                            </span>
                                        </td>
                                        <td className="h-12 px-4 text-white border-l border-neutral-800">
                                            {currencyFormat(
                                                crypto.total_volume
                                            )}
                                        </td>
                                        <td className="h-12 px-4 text-white border-l border-neutral-800">
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
                    <nav
                        role="navigation"
                        aria-label="pagination"
                        className="flex w-full justify-center border-t border-neutral-800 mx-auto mmd:px-8 px-4 py-4"
                    >
                        <ul className="flex flex-row items-center gap-1">
                            <li>
                                <a
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-neutral-800 h-9 px-4 py-2 gap-1 pl-2.5"
                                    aria-label="Go to previous page"
                                    href="#"
                                >
                                    <svg
                                        width="15"
                                        height="15"
                                        viewBox="0 0 15 15"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                    >
                                        <path
                                            d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
                                            fill="currentColor"
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    Précédent
                                </a>
                            </li>
                            <li>
                                <a
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-neutral-800 h-9 w-9"
                                    href="#"
                                >
                                    1
                                </a>
                            </li>
                            <li>
                                <a
                                    aria-current="page"
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-neutral-800 shadow-sm hover:bg-neutral-800 h-9 w-9"
                                    href="#"
                                >
                                    2
                                </a>
                            </li>
                            <li>
                                <a
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-neutral-800 h-9 w-9"
                                    href="#"
                                >
                                    3
                                </a>
                            </li>
                            <li>
                                <span
                                    aria-hidden="true"
                                    className="flex h-9 w-9 items-center justify-center"
                                >
                                    <svg
                                        width="15"
                                        height="15"
                                        viewBox="0 0 15 15"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                    >
                                        <path
                                            d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z"
                                            fill="currentColor"
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <span className="sr-only">More pages</span>
                                </span>
                            </li>
                            <li>
                                <a
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-neutral-800 h-9 px-4 py-2 gap-1 pr-2.5"
                                    aria-label="Go to next page"
                                    href="#"
                                >
                                    Suivant
                                    <svg
                                        width="15"
                                        height="15"
                                        viewBox="0 0 15 15"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                    >
                                        <path
                                            d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                                            fill="currentColor"
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </>
            ) : (
                <p>Aucune donnée disponible</p>
            )}
        </>
    );
}
