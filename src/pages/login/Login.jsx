import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const users = [
    {
      username: "user1",
      password: "password1",
      portemonnaie: {
        btc: 1.5,
        eth: 3.2,
        usdt: 1000,
        xrp: 500,
        bnb: 10,
        sol: 12,
        doge: 2000,
        usdc: 1500,
        ada: 1000,
        seth: 0.5,
      },
      transactions: [
        // Ajoutez d'autres transactions ici
      ],
    },
    {
      username: "user2",
      password: "password2",
      portemonnaie: {
        btc: 0.8,
        eth: 1.5,
        usdt: 500,
        xrp: 300,
        bnb: 5,
        sol: 7,
        doge: 1000,
        usdc: 800,
        ada: 600,
        seth: 0.2,
      },
      transactions: [
        // Ajoutez d'autres transactions ici
      ],
    },
  ];

  localStorage.setItem("usersList", JSON.stringify(users));

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("usersList")) || [];
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      localStorage.setItem("userLogin", JSON.stringify(user));
      navigate("/profile");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Connexion
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Nom d&apos;utilisateur
            </label>
            <input
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Mot de passe
            </label>
            <input
              className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-gray-100 hover:bg-gray-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

