import "./App.css";
import { Routes, Route } from "react-router-dom";

import PageLayout from "./layout/PageLayout";
import Home from "./pages/home/Home";
import Markets from "./pages/markets/Markets";
import CryptoDetail from "./pages/cryptoDetail/CryptoDetail";
import NotFound from "./pages/notFound/NotFound";
import Login from "./pages/login/Login";
import VirementCrypto from "./pages/virementCrypto/VirementCrypto";
import Historique from "./pages/historique/Historique";
import RetraitCrypto from './pages/retraitCrypto/RetraitCrypto';
import DepotFonds from './pages/depotFonds/DepotFonds';



export default function App() {
  return (
    <>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/markets/overview" element={<Markets />} />
          <Route path="/login" element={<Login />} />
          <Route path="/virement" element={<VirementCrypto />} />
          <Route path="/historique" element={<Historique />} />
          <Route path="/price/:id" element={<CryptoDetail />} />
          <Route path="/retrait" element={<RetraitCrypto />} />
          <Route path="/depot" element={<DepotFonds />} />


        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}