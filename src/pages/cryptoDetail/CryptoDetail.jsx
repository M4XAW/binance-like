import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formattedNumber } from "../../utils/formattedNumber";

import Chart from "../../components/chart/Chart";

import { MoveUpRight, MoveDownRight, Infinity } from "lucide-react";
import { currencyFormat } from "../../utils/currencyFormat";
import CryptoDiscussion from "../../components/blog/CryptoDiscussion";

export default function CryptoDetail() {
  const { id } = useParams();

  const [cryptoDetail, setCryptoDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCryptoDetail = async () => {
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
        `https://api.coingecko.com/api/v3/coins/${id}`,
        options
      );
      const data = await response.json();
      setCryptoDetail(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoDetail();
  }, [id]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!cryptoDetail) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <div className="loader inline-block h-6 w-6 p-0 border-t-2 border-r-2 border-b-2 border-zinc-700 border-l-2 border-l-gray-50 rounded-full"></div>
      </div>
    );
  }

  return (
    <main className="min-h-[calc(100dvh-65px)] w-full max-w-screen-2xl mx-auto border-x border-neutral-800">
      <nav
        aria-label="breadcrumb"
        className="md:px-8 px-4 py-4 border-b border-neutral-800"
      >
        <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
          <li className="inline-flex items-center gap-1.5">
            <Link
              to="/"
              className="transition-colors text-white/60 hover:text-white"
            >
              Accueil
            </Link>
          </li>
          <li
            role="presentation"
            aria-hidden="true"
            className="[&>svg]:size-3.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Link
              to="/markets/overview"
              className="transition-colors text-white/60 hover:text-white"
            >
              Marchés
            </Link>
          </li>
          <li
            role="presentation"
            aria-hidden="true"
            className="[&>svg]:size-3.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </li>
          <li className="inline-flex items-center gap-1.5">
            <span
              role="link"
              aria-disabled="true"
              aria-current="page"
              className="font-normal text-white"
            >
              Cours pour {cryptoDetail.name || id}
            </span>
          </li>
        </ol>
      </nav>

      <div className="flex border-b border-neutral-800">
        <div className="w-8/12 md:p-8 p-4">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-6">
              <img
                src={cryptoDetail.image?.small}
                alt={cryptoDetail.name}
                className="h-6 w-6"
              />
              <p>
                {cryptoDetail.name}{" "}
                <span className="uppercase">({cryptoDetail.symbol})</span>
              </p>
            </div>
            <h1 className="text-3xl font-semibold capitalize my-1.5">
              {currencyFormat(
                cryptoDetail.market_data?.current_price?.usd || "Erreur"
              )}
            </h1>
            {cryptoDetail.market_data?.price_change_percentage_24h !==
              undefined &&
              (cryptoDetail.market_data.price_change_percentage_24h < 0 ? (
                <div className="flex items-center gap-2 text-red-500">
                  <MoveDownRight size={18} />
                  {cryptoDetail.market_data.price_change_percentage_24h}%
                </div>
              ) : (
                <div className="flex items-center gap-2 text-green-500">
                  <MoveUpRight size={18} />
                  {cryptoDetail.market_data.price_change_percentage_24h}%
                </div>
              ))}
          </div>

          <div className="h-96 w-full">
            <Chart id={id} />
          </div>
        </div>
        <div className="flex flex-col justify-between w-4/12 bg-neutral-800/30 border-l border-neutral-800 md:p-8 p-4">
          <input
            className="flex h-9 max-w-72 w-full rounded-md border border-neutral-800 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 ring-white disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="0.00"
          />
          <div className="inline-flex gap-8 w-full">
            <button
              to="/login"
              className="inline-flex items-center justify-center w-1/2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-1 outline-offset-4 disabled:pointer-events-none disabled:opacity-50 bg-green-500 text-zinc-950 shadow hover:bg-green-500/90 h-9 py-2 px-4"
            >
              Acheter
            </button>
            <button
              to="/login"
              className="inline-flex items-center justify-center w-1/2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-1 outline-offset-4 disabled:pointer-events-none disabled:opacity-50 bg-red-500 text-zinc-950 shadow hover:bg-red-500/90 h-9 py-2 px-4"
            >
              Vendre
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/2 md:p-8 p-4 border-r border-neutral-800">
        <h3 className="text-sm font-semibold text-white/90 uppercase">Total</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div>
            <p className="text-white/60 text-xs uppercase">Capitalisation</p>
            <p className="text-white">
              {currencyFormat(
                cryptoDetail.market_data?.market_cap?.usd || "Erreur"
              )}
            </p>
          </div>
          <div>
            <p className="text-white/60 text-xs uppercase">Volume en 24h</p>
            <p className="text-white">
              {currencyFormat(
                cryptoDetail.market_data?.total_volume?.usd || "Erreur"
              )}
            </p>
          </div>
          <div>
            <p className="text-white/60 text-xs uppercase">En circulation</p>
            <p className="text-white">
              {formattedNumber(cryptoDetail.market_data?.circulating_supply)}
            </p>
          </div>
          <div>
            <p className="text-white/60 text-xs uppercase">Offre maximale</p>
            <p className="text-white">
              {cryptoDetail.market_data?.max_supply_infinite ? (
                <Infinity size={18} />
              ) : (
                formattedNumber(cryptoDetail.market_data?.max_supply)
              )}
            </p>
          </div>
          <div>
            <p className="text-white/60 text-xs uppercase">Popularité</p>
            <p className="text-white">
              {cryptoDetail.market_data?.market_cap_rank}
            </p>
          </div>
          <div>
            <p className="text-white/60 text-xs uppercase">Niveau historique</p>
            <p className="text-white">
              {currencyFormat(cryptoDetail.market_data?.ath?.usd || "Erreur")}
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/2 md:p-8 p-4 border-r border-neutral-800">
        <CryptoDiscussion cryptoName={id} />
      </div>
    </main>
  );
}
