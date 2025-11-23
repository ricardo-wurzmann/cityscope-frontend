"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function useProtectedRoute() {
  const { accessToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If user is not authenticated (accessToken is null), redirect to login
    if (!accessToken) {
      router.push("/login");
    }
  }, [accessToken, router]);
}

