"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) alert("Невірний email або пароль");
    else window.location.href = "/dashboard";
  };

  const loginMagic = async () => {
    setLoading(true);

    const res = await signIn("email", {
      email,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) alert("Помилка відправки email");
    else alert("Magic link надіслано 📩");
  };

  return (
    <div>
      <h1>Вхід</h1>

      <form onSubmit={loginPassword}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button disabled={loading}>Увійти з паролем</button>
      </form>

      <hr />

      <button onClick={loginMagic} disabled={!email || loading}>
        Увійти через Magic Link
      </button>
    </div>
  );
}
