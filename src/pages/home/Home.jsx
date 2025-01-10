import React from "react";

export default function Home() {
    return (
        <main className="min-h-[calc(100dvh-65px)] w-full max-w-screen-2xl border-x border-neutral-800 mx-auto">
            <div className="flex justify-center flex-col w-full border-b border-neutral-800 md:p-8 p-4">
                <h1 className="text-binance-yellow text-7xl font-semibold mb-2">251,534,204</h1>
                <h2 className="text-white text-3xl font-medium mb-8">Utilisateurs nous font confiance</h2>
                <div className="flex gap-4">
                    <input
                        className="flex h-9 max-w-72 w-full rounded-md border border-neutral-800 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 ring-white disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Adresse e-mail ou N° de téléphone"
                    />
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-1 outline-offset-4 disabled:pointer-events-none disabled:opacity-50 bg-binance-yellow text-zinc-950 shadow hover:bg-binance-yellow/90 h-9 py-2 px-4">
                        Commencer
                    </button>
                </div>
            </div>
        </main>
    );
}
