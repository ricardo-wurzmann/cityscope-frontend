"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../components/ProtectedRoute";
import CitySelect from "../../components/CitySelect";
import IndicatorsView from "../../components/IndicatorsView";
import { authService } from "@/services/authService";

export default function DashboardPage() {
  const { accessToken, setAccessToken } = useAuth();
  const router = useRouter();
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);

  const handleLogout = async () => {
    try {
      await authService.logout();
      setAccessToken(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      setAccessToken(null);
      router.push("/login");
    }
  };

  // Extrair email do token (se disponível) ou usar um valor padrão
  const getUserEmail = () => {
    // Se você tiver JWT token, pode decodificar aqui
    // Por enquanto, retornamos um valor padrão
    return "usuário@cityscope.com";
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white shadow-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">CityScope</h1>
              <p className="mt-1 text-sm text-slate-600">Dashboard de Indicadores</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium text-slate-900">{getUserEmail()}</p>
                <p className="text-xs text-slate-500">Logado</p>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-md bg-slate-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              >
                Sair
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* City Selection */}
            <section>
              <h2 className="mb-4 text-lg font-semibold text-slate-900">
                Selecionar Cidade
              </h2>
              <CitySelect
                onSelect={setSelectedCityId}
                selectedCityId={selectedCityId}
              />
            </section>

            {/* Indicators */}
            <section>
              <IndicatorsView cityId={selectedCityId} />
            </section>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

