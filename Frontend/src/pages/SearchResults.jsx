import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import FlightResultsTable from "../components/search-result/searchResultTable.jsx";
import { SearchApi } from "../routes/searchApi.js";
import PricesTrends from '../components/charts/pricesTrends.jsx'

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // accept multiple possible param names for UI display
  const displayPayload = {
    from:
      searchParams.get("from") ||
      searchParams.get("origin") ||
      searchParams.get("o") ||
      "",
    to:
      searchParams.get("to") ||
      searchParams.get("destination") ||
      searchParams.get("d") ||
      "",
    departure:
      searchParams.get("departure") ||
      searchParams.get("startDate") ||
      searchParams.get("start") ||
      "",
    returnDate:
      searchParams.get("return") ||
      searchParams.get("endDate") ||
      searchParams.get("returnDate") ||
      "",
  };

  const qs = searchParams.toString();

  useEffect(() => {
    // use a fresh URLSearchParams parsed from the query-string so the effect
    // doesn't directly depend on the complex `searchParams` object.
    const sp = new URLSearchParams(qs);
    const payloadInside = {
      from: sp.get("from") || sp.get("origin") || sp.get("o") || "",
      to: sp.get("to") || sp.get("destination") || sp.get("d") || "",
      departure:
        sp.get("departure") || sp.get("startDate") || sp.get("start") || "",
      returnDate:
        sp.get("return") || sp.get("endDate") || sp.get("returnDate") || "",
    };


    if (
      !payloadInside.from ||
      !payloadInside.to ||
      !payloadInside.departure ||
      !payloadInside.returnDate
    ) {
      setError("Missing search parameters. Check query string keys.");
      return;
    }

    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await SearchApi(payloadInside);
        if (!mounted) return;
        // setFlights(data.flights || []);
        const sortedFlight = (data.flights).sort((a,b)=>a.price-b.price);
        setFlights(sortedFlight);
      } catch (err) {
        console.error("SearchApi error:", err);
        if (!mounted) return;
        setError(err.message || "Failed to fetch flights");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, [qs]);

  return (
    // opaque container sits above the fixed airplane image
    <div className="relative z-50 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div>
             <PricesTrends/>
            </div>
            <h2 className="text-xl font-semibold ">Search Results</h2>
            <p className="text-sm text-gray-600">
              {displayPayload.from} → {displayPayload.to} •{" "}
              {displayPayload.departure} — {displayPayload.returnDate}
            </p>
          </div>
          <div>
            <button
              onClick={() => navigate(-1)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Back
            </button>
          </div>
        </div>

        {loading && (
          <div className="py-8 text-center">Searching for flights...</div>
        )}
        {error && <div className="py-4 text-red-600">Error: {error}</div>}
        {!loading && !error && <FlightResultsTable flights={flights} />}
      </div>
    </div>
  );
}
