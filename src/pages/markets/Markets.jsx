import React from "react";

import { CryptoData } from "../../components/cryptoData/CryptoData";

export default function Markets() {
    return (
        <main className="min-h-[calc(100dvh-64px)] w-full">
            <div className="relative w-full max-w-screen-2xl mx-auto overflow-auto md:p-8 p-4 border-x border-neutral-800">
                <h1 className="text-3xl font-semibold text-white/90 mb-6">Aperçu du marché</h1>
            </div>
            <div className="border-y border-white/15">
                <div className="relative w-full max-w-screen-2xl mx-auto border-x border-neutral-800 overflow-auto ">
                    <CryptoData
                        cryptoIds={[
                            "bitcoin",
                            "ethereum",
                            "tether",
                            "ripple",
                            "bnb",
                            "solana",
                            "dogecoin",
                            "usd-coin",
                            "cardano",
                            "tron",
                            "avalanche-2",
                            "sui",
                        ]}
                    />
                </div>
            </div>
        </main>
    );
}
