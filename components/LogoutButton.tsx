"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/authService";

export default function LogoutButton() {
  const { setAccessToken } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear auth state
      setAccessToken(null);
      // Clear localStorage
      localStorage.removeItem("accessToken");
      // Clear cookies manually as fallback
      document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      // Redirect to login
      router.push("/login");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded-md bg-slate-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
    >
      Logout
    </button>
  );
}

