import { useState } from "react";
import NavTabs from "../../components/navTabs/NavTabs";
import CryptoDiscussion from "../../components//blog/CryptoDiscussion";

export default function BlogPage() {
  const [cryptos, setCryptos] = useState([
    "Bitcoin",
    "Ethereum",
    "Tether",
    "XRP",
    "BNB",
    "Solana",
    "DogeCoin",
    "USDC",
    "Cardano",
    "STETH",
    "Tron",
    "Avalanche",
    "Sui",
    "WSTETH",
    "Shiba Inu",
    "Toncoin",
    "ChainLink",
    "WBTC",
    "Stellar",
    "Hedera",
  ]);
  const [activeTab, setActiveTab] = useState(cryptos[0]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Mini-Blog</h1>
      <NavTabs
        cryptos={cryptos}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <CryptoDiscussion cryptoName={activeTab} />
    </div>
  );
}
