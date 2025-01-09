import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function VirementCrypto() {
  const [users, setUsers] = useState([]);
  const [selectedSender, setSelectedSender] = useState(null);
  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const usersFromStorage = JSON.parse(localStorage.getItem('usersList')) || [];
    setUsers(usersFromStorage);

    const userLogin = JSON.parse(localStorage.getItem('userLogin'));
    if (userLogin) {
      setSelectedSender(userLogin.username);
    }
  }, []);

  const handleTransaction = () => {
    if (amount <= 0 || isNaN(amount)) {
      setErrorMessage('Le montant doit être supérieur à zéro.');
      return;
    }

    const sender = users.find(user => user.username === selectedSender);
    const receiver = users.find(user => user.username === selectedReceiver);

    if (!sender || !receiver) {
      setErrorMessage('Sélectionnez un récepteur valide.');
      return;
    }

    if (sender.portemonnaie[selectedCrypto] < amount) {
      setErrorMessage('Fonds insuffisants.');
      return;
    }

    const updatedUsers = users.map(user => {
      if (user.username === selectedSender) {
        return {
          ...user,
          portemonnaie: {
            ...user.portemonnaie,
            [selectedCrypto]: user.portemonnaie[selectedCrypto] - parseFloat(amount),
          },
        };
      }
      if (user.username === selectedReceiver) {
        return {
          ...user,
          portemonnaie: {
            ...user.portemonnaie,
            [selectedCrypto]: (user.portemonnaie[selectedCrypto] || 0) + parseFloat(amount),
          },
        };
      }
      return user;
    });

    localStorage.setItem('usersList', JSON.stringify(updatedUsers));

    setUsers(updatedUsers);

    alert(`Transaction réussie ! ${amount} ${selectedCrypto} envoyés de ${sender.username} à ${receiver.username}`);
    setAmount('');
    setSelectedReceiver(null);
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Virement Crypto</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="sender">
              Expéditeur (automatique)
            </label>
            <input
              type="text"
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              value={selectedSender || ''}
              disabled
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="receiver">
              Sélectionner le récepteur
            </label>
            <select
              id="receiver"
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              value={selectedReceiver || ''}
              onChange={(e) => setSelectedReceiver(e.target.value)}
            >
              <option value="">Sélectionner un utilisateur</option>
              {users.map((user) => (
                <option key={user.username} value={user.username}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="crypto">
              Choisir une crypto
            </label>
            <select
              id="crypto"
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              value={selectedCrypto}
              onChange={(e) => setSelectedCrypto(e.target.value)}
            >
              <option value="BTC">Bitcoin (BTC)</option>
              <option value="ETH">Ethereum (ETH)</option>
              <option value="USDT">Tether (USDT)</option>
              <option value="XRP">XRP</option>
              <option value="BNB">Binance Coin (BNB)</option>
              <option value="SOL">Solana (SOL)</option>
              <option value="DOGE">Dogecoin (DOGE)</option>
              <option value="USDC">USD Coin (USDC)</option>
              <option value="ADA">Cardano (ADA)</option>
              <option value="STETH">Staked Ether (STETH)</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="amount">
              Montant à envoyer
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          <button
            type="submit"
            onClick={handleTransaction}
            className="bg-gray-100 hover:bg-gray-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Effectuer le virement
          </button>
        </form>
      </div>
    </div>
  );
}

export default VirementCrypto;