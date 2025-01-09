import React from "react";

import { CryptoData } from "../../components/cryptoData/CryptoData";

export default function Markets() {
    return (
        <main className="min-h-[calc(100dvh-64px)] w-full">
            <div className="border-b border-white/15">
                <div className="relative w-full max-w-screen-2xl mx-auto overflow-auto md:p-8 p-4">
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
                            <CryptoData
                                cryptoIds={[
                                    "bitcoin",
                                    "ethereum",
                                    "tether",
                                    "binance-peg-xrp",
                                    "bnb",
                                    "solana",
                                    "dogecoin",
                                ]}
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
