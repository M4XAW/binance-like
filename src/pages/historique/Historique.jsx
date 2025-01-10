import React, { useEffect, useState } from 'react';

function Historique() {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem('userLogin'));
    setCurrentUser(userLogin?.username);

    const history = JSON.parse(localStorage.getItem('transactionHistory')) || [];
    const sortedHistory = history.sort((a, b) => new Date(b.date) - new Date(a.date));
    setTransactionHistory(sortedHistory);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-6 rounded shadow-md w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Historique des Transactions</h2>
        {transactionHistory.length === 0 ? (
          <p className="text-gray-400 text-center">Aucune transaction enregistrée.</p>
        ) : (
          <table className="table-auto w-full text-gray-300">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Montant</th>
                <th className="px-4 py-2">Crypto</th>
                <th className="px-4 py-2">Destinataire</th>
                <th className="px-4 py-2">Type</th>
              </tr>
            </thead>
            <tbody>
              {transactionHistory
                .filter(
                  transaction =>
                    transaction.sender === currentUser || transaction.receiver === currentUser
                )
                .map((transaction, index) => {
                  const isReceiver = transaction.receiver === currentUser;
                  const formattedAmount = isReceiver
                    ? `+${transaction.amount}`
                    : `-${transaction.amount}`;

                  return (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="px-4 py-2">{transaction.date}</td>
                      <td
                        className={`px-4 py-2 ${
                          isReceiver ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {formattedAmount}
                      </td>
                      <td className="px-4 py-2">{transaction.crypto}</td>
                      <td className="px-4 py-2">{transaction.receiver}</td>
                      <td className="px-4 py-2 capitalize">{transaction.type}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Historique;