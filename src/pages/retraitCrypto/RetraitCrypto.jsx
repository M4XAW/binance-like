import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function RetraitCrypto() {
  const [user, setUser] = useState(null);
  const [crypto, setCrypto] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userLogin = JSON.parse(localStorage.getItem('userLogin'));
    const users = JSON.parse(localStorage.getItem('usersList')) || [];
    const loggedInUser = users.find(u => u.username === userLogin?.username);
    setUser(loggedInUser);
  }, []);

  const generateFictitiousAddress = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let address = '0x';
    for (let i = 0; i < 40; i++) {
      address += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return address;
  };

  const handleWithdraw = () => {
    setErrorMessage('');

    if (amount <= 0 || isNaN(amount)) {
      setErrorMessage('Le montant doit être supérieur à zéro.');
      return;
    }

    const finalAddress = address || generateFictitiousAddress();

    if (user.portemonnaie[crypto] < amount) {
      setErrorMessage('Fonds insuffisants.');
      return;
    }

    const updatedUser = {
      ...user,
      portemonnaie: {
        ...user.portemonnaie,
        [crypto]: user.portemonnaie[crypto] - parseFloat(amount),
      },
    };

    const users = JSON.parse(localStorage.getItem('usersList')) || [];
    const updatedUsers = users.map(u => (u.username === user.username ? updatedUser : u));
    localStorage.setItem('usersList', JSON.stringify(updatedUsers));

    localStorage.setItem('userLogin', JSON.stringify(updatedUser));

    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    notifications.push({
      message: `Retrait de ${amount} ${crypto} vers ${finalAddress}`,
      timestamp: new Date().toISOString(),
      read: false,
    });
    localStorage.setItem('notifications', JSON.stringify(notifications));

    const transactionHistory = JSON.parse(localStorage.getItem('transactionHistory')) || [];
    transactionHistory.push({
      type: 'retrait',
      sender: user.username,
      amount: parseFloat(amount),
      crypto,
      receiver: finalAddress,
      date: new Date().toLocaleString(),
    });
    localStorage.setItem('transactionHistory', JSON.stringify(transactionHistory));

    alert(`Retrait réussi : ${amount} ${crypto} envoyé à l'adresse ${finalAddress}.`);
    setAmount('');
    setAddress('');
    setUser(updatedUser);
  };

  if (!user) {
    return (
      <div className="text-white text-center mt-10">
        Chargement des données utilisateur...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Retrait de Crypto</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="crypto">
              Choisir une crypto
            </label>
            <select
              id="crypto"
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              value={crypto}
              onChange={(e) => setCrypto(e.target.value)}
            >
              {Object.keys(user.portemonnaie).map(key => (
                <option key={key} value={key}>
                  {key} ({user.portemonnaie[key]})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="amount">
              Montant à retirer
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

          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="address">
              Adresse du portefeuille externe
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          <button
            type="submit"
            onClick={handleWithdraw}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Effectuer le retrait
          </button>
        </form>

        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
}

export default RetraitCrypto;