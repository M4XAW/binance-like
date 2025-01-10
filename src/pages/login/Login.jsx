import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const users = [
    {
      username: "user1",
      password: "password1",
      portemonnaie: {
        BTC: 1.5,
        ETH: 3.2,
        USDT: 1000,
        XRP: 500,
        BNB: 10,
        SOL: 12,
        DOGE: 2000,
        USDC: 1500,
        ADA: 1000,
        SETH: 0.5,
      },
    },
    {
      username: "user2",
      password: "password2",
      portemonnaie: {
        BTC: 0.8,
        ETH: 1.5,
        USDT: 500,
        XRP: 300,
        BNB: 5,
        SOL: 7,
        DOGE: 1000,
        USDC: 800,
        ADA: 600,
        SETH: 0.2,
      },
    },
  ];

  useEffect(() => {
    const existingUsers = JSON.parse(localStorage.getItem("usersList"));
    if (!existingUsers) {
      localStorage.setItem("usersList", JSON.stringify(users));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("usersList")) || [];
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      localStorage.setItem("userLogin", JSON.stringify(user));
      navigate("/");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-20 w-full border-b border-neutral-800">
        <div className="container mx-auto flex justify-between items-center h-16 max-w-screen-2xl md:px-8 px-4 border-x border-neutral-800">
          <nav className="flex items-center space-x-5">
            <Link
              to="/"
              className="group flex items-center align-center text-sm text-white font-semibold transition-colors"
            >
              <svg
                className="h-8 w-8 mr-2"
                width="201"
                height="201"
                viewBox="0 0 201 201"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100.517 200.483C155.745 200.483 200.517 155.712 200.517 100.483C200.517 45.2549 155.745 0.483337 100.517 0.483337C45.2882 0.483337 0.516663 45.2549 0.516663 100.483C0.516663 155.712 45.2882 200.483 100.517 200.483Z"
                  fill="black"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M126.452 111.118L141.537 126.159L100.531 167.121L59.5688 126.159L74.6533 111.118L100.531 136.995L126.452 111.118ZM100.531 85.1965L115.832 100.498L100.531 115.799L85.2732 100.541V100.498L87.9607 97.8103L89.2611 96.5099L100.531 85.1965ZM48.949 85.4133L64.0335 100.498L48.949 115.539L33.8644 100.454L48.949 85.4133ZM152.113 85.4133L167.198 100.498L152.113 115.539L137.029 100.454L152.113 85.4133ZM100.531 33.8311L141.493 74.7934L126.409 89.8779L100.531 63.9568L74.6533 89.8346L59.5688 74.7934L100.531 33.8311Z"
                  fill="#F3BA2F"
                />
              </svg>
              Binance
            </Link>
          </nav>
        </div>
      </header>
      <div className="relative h-[calc(100dvh-65px)] flex items-center justify-center w-full max-w-screen-2xl border-x border-neutral-800 mx-auto">
        <div className="p-4 lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">
                Connexion
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Entrer votre nom d'utilisateur et mot de passe ci-dessous
              </p>
            </div>
            <div className="grid gap-6">
              <form onSubmit={handleLogin}>
                <div className="grid gap-2">
                  <div className="relative">
                    <input
                      className="flex h-9 w-full rounded-md border border-zinc-200 dark:border-neutral-800 bg-transparent px-3 py-1 text-sm text-zinc-900 dark:text-zinc-50 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-black/60 dark:placeholder:text-white/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50"
                      id="username"
                      placeholder="Nom d'utilisateur"
                      autoCapitalize="none"
                      autoComplete="username"
                      autoCorrect="off"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <input
                    className="flex h-9 w-full rounded-md border border-zinc-200 dark:border-neutral-800 bg-transparent px-3 py-1 text-sm text-zinc-900 dark:text-zinc-50 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-black/60 dark:placeholder:text-white/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50"
                    id="password"
                    placeholder="Password"
                    autoCapitalize="none"
                    autoComplete="password"
                    autoCorrect="off"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50 bg-zinc-900 dark:bg-gray-50 text-white dark:text-zinc-900 shadow hover:bg-white/90 h-9 px-4 py-2"
                  >
                    Se connecter
                  </button>
                </div>
              </form>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-zinc-200 dark:border-neutral-800"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-950 px-2">
                    Ou continuez avec
                  </span>
                </div>
              </div>
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50 border border-zinc-200 dark:border-neutral-800 bg-transparent text-zinc-900 dark:text-zinc-50 shadow-sm hover:bg-zinc-100 dark:hover:bg-neutral-800 h-9 px-4 py-2 transition-colors"
                type="button"
              >
                <svg
                  width="256"
                  height="262"
                  viewBox="0 0 256 262"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid"
                  className="mr-2 h-4 w-4"
                >
                  <path
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                    fill="#4285F4"
                  />
                  <path
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                    fill="#34A853"
                  />
                  <path
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                    fill="#FBBC05"
                  />
                  <path
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                    fill="#EB4335"
                  />
                </svg>
                Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
