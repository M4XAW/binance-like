import React, { useState, useEffect } from 'react';

function DepotFonds() {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [amount, setAmount] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem('userLogin'));
    setCurrentUser(userLogin?.username);

    const usersFromStorage = JSON.parse(localStorage.getItem('usersList')) || [];
    setUsers(usersFromStorage);
  }, []);

  const handleDeposit = () => {
    if (amount <= 0 || isNaN(amount)) {
      setErrorMessage('Veuillez entrer un montant valide supérieur à zéro.');
      setSuccessMessage('');
      return;
    }

    const userIndex = users.findIndex(user => user.username === currentUser);
    if (userIndex === -1) {
      setErrorMessage('Utilisateur introuvable.');
      setSuccessMessage('');
      return;
    }

    const updatedUsers = [...users];
    const user = updatedUsers[userIndex];

    if (selectedCurrency === 'USD') {
      user.portemonnaie.USD = (user.portemonnaie.USD || 0) + parseFloat(amount);
    } else {
      user.portemonnaie[selectedCurrency] =
        (user.portemonnaie[selectedCurrency] || 0) + parseFloat(amount);
    }

    localStorage.setItem('usersList', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);

    const updatedUserLogin = { ...user };
    localStorage.setItem('userLogin', JSON.stringify(updatedUserLogin));

    const newTransaction = {
      date: new Date().toLocaleString(),
      amount: amount,
      crypto: selectedCurrency,
      receiver: currentUser,
      type: 'Dépôt',
      sender: currentUser,
    };

    const transactionHistory = JSON.parse(localStorage.getItem('transactionHistory')) || [];
    transactionHistory.push(newTransaction);
    localStorage.setItem('transactionHistory', JSON.stringify(transactionHistory));

    setAmount('');
    setErrorMessage('');
    setSuccessMessage(`Dépôt de ${amount} ${selectedCurrency} réussi !`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Dépôt de Fonds</h2>

        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="currency">
              Choisir une devise
            </label>
            <select
              id="currency"
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="USD">Dollars (USD)</option>
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

          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="amount">
              Montant à déposer
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Saisir votre montant"
              required
            />
          </div>

          <button
            type="submit"
            onClick={handleDeposit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Déposer
          </button>
        </form>
      </div>
    </div>
  );
}

export default DepotFonds;