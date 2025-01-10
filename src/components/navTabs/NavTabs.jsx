export default function NavTabs({ cryptos, activeTab, setActiveTab }) {
  return (
    <div className="mb-4">
      <div className="border-b border-gray-200">
        {cryptos.map((crypto, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(crypto)}
            className={`px-4 py-2 ${
              activeTab === crypto
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
          >
            {crypto}
          </button>
        ))}
      </div>
    </div>
  );
}
