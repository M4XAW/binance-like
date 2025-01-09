import React from "react";

import { CryptoData } from "../../components/cryptoData/CryptoData";

export default function Home() {
    return (
        <main className="min-h-[calc(100dvh-64px)] w-full max-w-screen-2xl mx-auto md:p-8 p-4">
            <div className="relative w-full overflow-auto rounded-md border border-white/15">
                <table className="w-full caption-bottom text-sm">
                    <thead>
                        <tr className="border-b border-white/15 transition-colors hover:bg-white/5 data-[state=selected]:bg-muted">
                            <th className="h-10 w-64 px-4 text-left text-white/60 align-middle font-medium cursor-pointer">Nom</th>
                            <th className="h-10 px-4 text-left text-white/60 align-middle font-medium">Prix</th>
                            <th className="h-10 px-4 text-left text-white/60 align-middle font-medium cursor-pointer">Variation</th>
                            <th className="h-10 px-4 text-left text-white/60 align-middle font-medium">Volume 24h</th>
                            <th className="h-10 px-4 w-14 align-middle text-white/60 font-medium text-right">Capitalisation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <CryptoData cryptoId="bitcoin" />
                        {/* <CryptoData cryptoId="ethereum" />
                        <CryptoData cryptoId="dogecoin" />
                        <CryptoData cryptoId="ripple" />
                        <CryptoData cryptoId="solana" />
                        <CryptoData cryptoId="cardano" />
                        <CryptoData cryptoId="dot" /> */}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
