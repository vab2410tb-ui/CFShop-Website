"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

const FILTERS = [
  { id: "all", label: "ALL" },
  { id: "ESPRESSO_MACHINE", label: "ESPRESSO MACHINE" },
  { id: "GRINDER_MACHINE", label: "GRINDER MACHINE" },
  { id: "COFFEE_BEANS", label: "COFFEE BEANS" },
  { id: "ACCESSORIES", label: "ACCESSORIES" },
];

export default function SearchFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  const currentCategory = searchParams.get("category") || "all";
  const currentSort = searchParams.get("sort") || "default";

  const [searchTerm, setSearchTerm] = useState(currentSearch);

  const updateURL = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value && value !== "all" && value !== "default") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== currentSearch) {
        updateURL("search", searchTerm);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="mb-5 rounded-xl bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
      <div className="flex flex-wrap items-center justify-between gap-[15px]">
        {/* Category filters */}
        <div className="flex gap-2">
          {FILTERS.map((f) => {
            const isActive = currentCategory === f.id;

            return (
              <button
                key={f.id}
                onClick={() => updateURL("category", f.id)}
                className={`cursor-pointer rounded-[20px] border-none px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Search + Sort */}
        <div className="flex gap-[10px]">
          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[250px] rounded-lg border border-slate-300 py-2.5 pl-[35px] pr-2.5 outline-none"
            />
          </div>

          {/* Sort */}
          <select
            value={currentSort}
            onChange={(e) => updateURL("sort", e.target.value)}
            className="cursor-pointer rounded-lg border border-slate-300 bg-white p-2.5 outline-none"
          >
            <option value="default">Sort by: Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}

