import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userLogin"));
  const [totalValue, setTotalValue] = useState(0);
  const [cryptoData, setCryptoData] = useState({});

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchPrices = async () => {
      try {
        const cryptoIds = Object.keys(user.portemonnaie)
          .map((crypto) => {
            // Mapper les symboles aux identifiants de CoinGecko
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
          const amount = user.portemonnaie[cryptoData.symbol.toLowerCase()];
          if (amount) {
            total += amount * cryptoData.current_price;
            cryptoDataMap[cryptoData.symbol.toLowerCase()] = {
              name: cryptoData.name,
              image: cryptoData.image,
              price: cryptoData.current_price,
              amount: amount,
            };
          }
        });
        setTotalValue(total.toFixed(2));
        setCryptoData(cryptoDataMap);
      } catch (error) {
        console.error("Error fetching crypto prices:", error);
      }
    };

    fetchPrices();
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Profil de {user.username}
        </h2>
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">
            Valeur totale du portefeuille
          </h3>
          <p className="text-gray-300">${totalValue}</p>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4 text-white">Portefeuille</h3>
          <ul>
            {Object.entries(cryptoData).map(([crypto, data]) => (
              <li key={crypto} className="text-gray-300 mb-4 flex items-center">
                <img
                  src={data.image}
                  alt={data.name}
                  className="w-8 h-8 mr-2"
                />
                <div>
                  <strong>{data.name}:</strong> {data.amount} (Valeur: $
                  {(data.amount * data.price).toFixed(2)})
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4 text-white">
            Historique des Transactions
          </h3>
          <ul>
            {user.transactions.map((transaction, index) => (
              <li key={index} className="text-gray-300 mb-2">
                <strong>Date:</strong> {transaction.date},{" "}
                <strong>Type:</strong> {transaction.type},{" "}
                <strong>Montant:</strong> {transaction.amount},{" "}
                <strong>Prix:</strong> ${transaction.price},{" "}
                <strong>Crypto:</strong> {transaction.crypto}
              </li>
            ))}
          </ul>
        </div>
        <button
          className="bg-gray-100 hover:bg-gray-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          onClick={() => {
            localStorage.removeItem("userLogin");
            navigate("/login");
          }}
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}
