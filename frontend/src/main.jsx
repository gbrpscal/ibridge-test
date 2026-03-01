import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./index.css";
import "./App.css";

import Home from "./pages/Home";
import DashboardLayout from "./pages/DashboardLayout";
import Resumo from "./pages/Resumo";
import TopOperadores from "./pages/TopOperadores";
import TopListas from "./pages/TopListas";
import TopCampanhas from "./pages/TopCampanhas";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard/resumo" replace />} />

          <Route path="resumo" element={<Resumo />} />
          <Route path="top-operadores" element={<TopOperadores />} />
          <Route path="top-listas" element={<TopListas />} />
          <Route path="top-campanhas" element={<TopCampanhas />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
