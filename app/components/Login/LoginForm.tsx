// app/components/LoginForm.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "../../context/UserContext"; // Import the context hook


export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useUser(); // Use the context to set user info
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log("Respocne :: ", response)

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();
      console.log("data :: ", data)

      const user = { name: data.data.name, email: data.data.email }; // Dummy user data for now

     // Set user data in context
      setUser(user);

      router.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Login</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <button type="submit" className="bg-green-600 text-white font-bold px-6 py-2">
            Login
          </button>
          {error && <div className="bg-red-500 text-white p-2 rounded">{error}</div>}
          <Link href="/register" className="text-sm mt-3 text-right">
            Don&apos;t have an account? <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
