import React, { useEffect, useState } from 'react';

function Historique() {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem('userLogin'));
    setCurrentUser(userLogin?.username);

    const history = JSON.parse(localStorage.getItem('transactionHistory')) || [];
    setTransactionHistory(history);
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
              </tr>
            </thead>
            <tbody>
              {transactionHistory
                .filter(transaction => transaction.sender === currentUser)
                .map((transaction, index) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="px-4 py-2">{transaction.date}</td>
                    <td className="px-4 py-2">{transaction.amount}</td>
                    <td className="px-4 py-2">{transaction.crypto}</td>
                    <td className="px-4 py-2">{transaction.receiver}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Historique;