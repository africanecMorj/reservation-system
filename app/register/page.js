"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      alert("Користувач уже існує");
      return;
    }

    alert("Реєстрація успішна. Можеш увійти");
    window.location.href = "/login";
  };

  return (
    <form onSubmit={submit}>
      <h1>Реєстрація</h1>

      <input
        placeholder="Імʼя"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      <input
        type="password"
        placeholder="Пароль"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />

      <button>Зареєструватись</button>
    </form>
  );
}
