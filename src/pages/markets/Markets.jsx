import React from "react";

import CryptoData from "../../components/cryptoData/CryptoData"

export default function Markets() {
    return (
        <main className="min-h-[calc(100dvh-65px)] w-full">
            <div className="relative w-full max-w-screen-2xl mx-auto overflow-auto md:p-8 p-4 border-x border-neutral-800">
                <h1 className="text-3xl font-semibold text-white/90 mb-1">Aperçu du marché</h1>
                <p className="text-sm text-white/60">17900 actifs</p>
            </div>
            <div className="border-t border-neutral-800">
                <div className="relative w-full max-w-screen-2xl mx-auto border-x border-neutral-800 overflow-auto ">
                    <CryptoData />
                </div>
            </div>
        </main>
    );
}
