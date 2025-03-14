"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import "./page.css";

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (username === "user" && password === "password123") {
      router.push("/events");
    } else {
      setError("Nom d'utilisateur ou mot de passe incorrect");
    }
  };

  return (
    <div className="container">
      {/* Header personnalisé */}
      <header className="header">
        <nav>
          <div className="logo">EventBooking</div>
          <ul className="nav-links">
            <li><a href="#">Accueil</a></li>
            <li><a href="#">Événements</a></li>
            <li><a href="#">À propos</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="/register">S'inscrire</a></li>
          </ul>
        </nav>
      </header>

      <h2>Connexion</h2>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Se connecter</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <div className="links">
        <a href="#">Mot de passe oublié ?</a>
        <a href="/register">Créer un compte</a>
      </div>
    </div>
  );
};

export default LoginPage;
