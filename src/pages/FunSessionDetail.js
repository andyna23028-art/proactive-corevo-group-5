import React from "react";
import { useParams } from "react-router-dom";
import AppNavbar from "../components/Navbar";

export default function FunSessionDetail() {
  const { id } = useParams(); // Ambil ID sesi dari URL

  return (
    <>
      <AppNavbar isLoggedIn={true} activePage="Fun Session" />

      <div className="container mt-4">
        <h2 className="fw-bold">Fun Session Details</h2>
        <p className="text-muted">Session ID: {id}</p>

        {/* Tempatkan detail lengkap sesi di sini */}
        <div className="mt-3 p-4 rounded-3 shadow-sm bg-light">
          <h4>Session Detail Coming Soon...</h4>
          <p className="text-muted">
            Bos muda bisa menambahkan informasi lengkap untuk sesi ini di sini.
          </p>
        </div>
      </div>
    </>
  );
}
