"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 max-w-sm">
      <input
        className="w-full rounded border p-2"
        placeholder="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        className="w-full rounded border p-2"
        type="password"
        placeholder="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button
        disabled={loading}
        className="rounded bg-black px-4 py-2 text-white"
      >
        {loading ? "..." : "Login"}
      </button>
    </form>
  );
}

