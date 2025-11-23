"use client";

import { useAuth } from "@/context/AuthContext";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { getUserEmailFromToken } from "@/lib/utils/jwt";
import CitySelect from "@/components/CitySelect";
import IndicatorsView from "@/components/IndicatorsView";
import LogoutButton from "@/components/LogoutButton";
import { api } from "@/lib/api";
import Link from "next/link";

export default function DashboardPage() {
  const { accessToken } = useAuth();
  useProtectedRoute();

  const userEmail = getUserEmailFromToken(accessToken);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">CityScope</h1>
            <p className="mt-1 text-sm text-slate-600">Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/cities"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Browse Cities
            </Link>
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">{userEmail}</p>
            </div>
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              onClick={async () => {
                const res = await api.get("/cities/debug/token");
                console.log("DEBUG:", res.data);
              }}
            >
              Test Token
            </button>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl p-6">
        <div className="space-y-6">
          <CitySelect />
          <IndicatorsView />
          
          {/* Map Placeholder */}
          <div className="mt-6 rounded-lg border border-slate-200 bg-gray-100 p-8 text-center shadow-sm">
            <p className="text-gray-500">Interactive map coming soon...</p>
          </div>
        </div>
      </main>
    </div>
  );
}
