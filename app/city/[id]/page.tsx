"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { apiCities } from "@/services/apiCities";
import LogoutButton from "@/components/LogoutButton";
import { useAuth } from "@/context/AuthContext";
import { getUserEmailFromToken } from "@/lib/utils/jwt";

export default function CityDetailsPage() {
  const { accessToken } = useAuth();
  useProtectedRoute();
  const router = useRouter();
  const params = useParams();
  const cityId = Number(params.id);

  const userEmail = getUserEmailFromToken(accessToken);

  const {
    data: cityDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cityDetails", cityId],
    queryFn: () => apiCities.fetchCityDetails(cityId),
    enabled: !!cityId && !isNaN(cityId),
    retry: false,
  });

  // Handle 401 errors
  if (error && (error as any).response?.status === 401) {
    router.push("/login");
    return null;
  }

  if (isNaN(cityId)) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl p-6">
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-6 text-center shadow-sm">
            <p className="text-rose-600">Invalid city ID</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">CityScope</h1>
            <p className="mt-1 text-sm text-slate-600">City Details</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">{userEmail}</p>
            </div>
            <button
              onClick={() => router.push("/cities")}
              className="rounded-md bg-slate-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-600"
            >
              Back to Cities
            </button>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl p-6">
        {isLoading ? (
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="mb-2 h-4 w-1/4 rounded bg-slate-200"></div>
                  <div className="h-6 w-1/2 rounded bg-slate-100"></div>
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-6 text-center shadow-sm">
            <p className="text-rose-600">
              Error loading city details. Please try again.
            </p>
          </div>
        ) : cityDetails ? (
          <div className="space-y-6">
            {/* City Information Card */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-slate-900">{cityDetails.name}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">UF</p>
                  <p className="mt-1 text-lg text-slate-900">{cityDetails.uf}</p>
                </div>
                {cityDetails.region && (
                  <div>
                    <p className="text-sm font-medium text-slate-500">Region</p>
                    <p className="mt-1 text-lg text-slate-900">{cityDetails.region}</p>
                  </div>
                )}
                {cityDetails.area !== undefined && (
                  <div>
                    <p className="text-sm font-medium text-slate-500">Area</p>
                    <p className="mt-1 text-lg text-slate-900">
                      {cityDetails.area.toLocaleString()} km²
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Indicators Section */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">Indicators</h3>
              <div className="rounded-md bg-slate-50 p-8 text-center">
                <p className="text-slate-500">No indicators available yet</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-slate-500">No data available</p>
          </div>
        )}
      </main>
    </div>
  );
}

