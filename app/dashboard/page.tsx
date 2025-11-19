"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { accessToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) router.push("/login");
  }, [accessToken]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Dashboard</h1>
      {/* Aqui você depois coloca o CitySelect etc */}
    </div>
  );
}
