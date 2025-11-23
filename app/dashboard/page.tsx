"use client";

import { useAuth } from "@/context/AuthContext";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { getUserEmailFromToken } from "@/lib/utils/jwt";
import CitySelect from "@/components/CitySelect";
import IndicatorsView from "@/components/IndicatorsView";
import LogoutButton from "@/components/LogoutButton";

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
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">{userEmail}</p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl p-6">
        <div className="space-y-6">
          <CitySelect />
          <IndicatorsView />
        </div>
      </main>
    </div>
  );
}
