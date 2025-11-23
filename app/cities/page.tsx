"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { apiCities } from "@/services/apiCities";
import LogoutButton from "@/components/LogoutButton";
import { useAuth } from "@/context/AuthContext";
import { getUserEmailFromToken } from "@/lib/utils/jwt";
import Link from "next/link";

export default function CitiesPage() {
  const { accessToken } = useAuth();
  useProtectedRoute();
  const router = useRouter();
  const [selectedUF, setSelectedUF] = useState<string>("");
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);

  const userEmail = getUserEmailFromToken(accessToken);

  const { data: states = [], isLoading: statesLoading, error: statesError } = useQuery({
    queryKey: ["states"],
    queryFn: apiCities.fetchStates,
    retry: false,
  });

  const {
    data: cities = [],
    isLoading: citiesLoading,
    error: citiesError,
  } = useQuery({
    queryKey: ["cities", selectedUF],
    queryFn: () => apiCities.fetchCitiesByState(selectedUF),
    enabled: !!selectedUF,
    retry: false,
  });

  const {
    data: cityDetails,
    isLoading: cityDetailsLoading,
    error: cityDetailsError,
  } = useQuery({
    queryKey: ["cityDetails", selectedCityId],
    queryFn: () => apiCities.fetchCityDetails(selectedCityId!),
    enabled: !!selectedCityId,
    retry: false,
  });

  // Handle 401 errors
  if (statesError && (statesError as any).response?.status === 401) {
    router.push("/login");
    return null;
  }

  if (citiesError && (citiesError as any).response?.status === 401) {
    router.push("/login");
    return null;
  }

  if (cityDetailsError && (cityDetailsError as any).response?.status === 401) {
    router.push("/login");
    return null;
  }

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUF(e.target.value);
    setSelectedCityId(null); // Reset city selection when state changes
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = e.target.value ? Number(e.target.value) : null;
    setSelectedCityId(cityId);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">CityScope</h1>
            <p className="mt-1 text-sm text-slate-600">Browse Cities</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="rounded-md bg-slate-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              Dashboard
            </Link>
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
          {/* Dropdowns Section */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              {/* UF Dropdown */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Select UF
                </label>
                {statesLoading ? (
                  <div className="animate-pulse">
                    <div className="h-10 w-full rounded bg-slate-100"></div>
                  </div>
                ) : statesError ? (
                  <div className="rounded-md bg-rose-50 p-3 text-sm text-rose-600">
                    Error loading states. Please try again.
                  </div>
                ) : (
                  <select
                    value={selectedUF}
                    onChange={handleStateChange}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="">Select a state</option>
                    {states.map((state) => (
                      <option key={state.uf} value={state.uf}>
                        {state.uf} {state.name ? `- ${state.name}` : ""}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* City Dropdown */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Select City
                </label>
                {!selectedUF ? (
                  <select
                    disabled
                    className="w-full rounded-md border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-400 cursor-not-allowed"
                  >
                    <option>Select a UF first</option>
                  </select>
                ) : citiesLoading ? (
                  <div className="animate-pulse">
                    <div className="h-10 w-full rounded bg-slate-100"></div>
                  </div>
                ) : citiesError ? (
                  <div className="rounded-md bg-rose-50 p-3 text-sm text-rose-600">
                    Error loading cities. Please try again.
                  </div>
                ) : cities.length === 0 ? (
                  <select
                    disabled
                    className="w-full rounded-md border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-400 cursor-not-allowed"
                  >
                    <option>No cities available</option>
                  </select>
                ) : (
                  <select
                    value={selectedCityId || ""}
                    onChange={handleCityChange}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="">Select a city</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>

          {/* City Information */}
          {selectedCityId && (
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-slate-900">City Information</h2>
              {cityDetailsLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="mb-2 h-4 w-1/4 rounded bg-slate-200"></div>
                      <div className="h-6 w-1/2 rounded bg-slate-100"></div>
                    </div>
                  ))}
                </div>
              ) : cityDetailsError ? (
                <div className="rounded-md bg-rose-50 p-3 text-sm text-rose-600">
                  Error loading city details. Please try again.
                </div>
              ) : cityDetails ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Name</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">
                      {cityDetails.name}
                    </p>
                  </div>
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
                  {cityDetails.area !== undefined && cityDetails.area !== null && (
                    <div>
                      <p className="text-sm font-medium text-slate-500">Area</p>
                      <p className="mt-1 text-lg text-slate-900">
                        {cityDetails.area.toLocaleString()} km²
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="rounded-md bg-slate-50 p-8 text-center">
                  <p className="text-slate-500">No data available</p>
                </div>
              )}
            </div>
          )}

          {!selectedUF && (
            <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
              <p className="text-slate-500">Select a UF to view cities</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

