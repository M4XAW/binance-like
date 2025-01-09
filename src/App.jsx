import "./App.css";
import { Routes, Route } from "react-router-dom";

import PageLayout from "./layout/PageLayout";
import Home from "./pages/home/Home";
import Markets from "./pages/markets/Markets";
import CryptoDetail from "./pages/cryptoDetail/CryptoDetail";
import NotFound from "./pages/notFound/NotFound";
import Login from "./pages/login/Login";
import VirementCrypto from "./pages/virementCrypto/VirementCrypto";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/markets/overview" element={<Markets />} />
          <Route path="/login" element={<Login />} />
          <Route path="/virement" element={<VirementCrypto />} />
          <Route path="/price/:id" element={<CryptoDetail />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}