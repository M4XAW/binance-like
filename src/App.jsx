import "./App.css";
import { Routes, Route } from "react-router-dom";

import PageLayout from "./layout/PageLayout";
import Home from "./pages/home/Home";
import Markets from "./pages/markets/Markets";
import CryptoDetail from "./pages/cryptoDetail/CryptoDetail";
import NotFound from "./pages/notFound/NotFound";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import VirementCrypto from "./pages/virementCrypto/VirementCrypto";
import Historique from "./pages/historique/Historique";

export default function App() {
    return (
        <>
            <Routes>
                <Route element={<PageLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/markets/overview" element={<Markets />} />
                    <Route path="/virement" element={<VirementCrypto />} />
                    <Route path="/historique" element={<Historique />} />
                    <Route path="/price/:id" element={<CryptoDetail />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}
