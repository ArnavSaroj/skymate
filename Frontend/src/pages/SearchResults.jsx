import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import FlightResultsTable from "../components/search-result/searchResultTable.jsx";
import { SearchApi } from "../routes/searchApi.js";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // accept multiple possible param names
  const payload = {
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

  useEffect(() => {
    console.log("SearchResults mounted, payload:", payload);

    if (!payload.from || !payload.to || !payload.departure || !payload.returnDate) {
      setError("Missing search parameters. Check query string keys.");
      return;
    }

    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Calling SearchApi with:", payload);
        const data = await SearchApi(payload); // SearchApi should build the GET URL
        console.log("SearchApi response:", data);
        if (!mounted) return;
        setFlights(data.flights || []);
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
    // re-run when query string changes
  }, [searchParams.toString()]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Search Results</h2>
          <p className="text-sm text-gray-600">
            {payload.from} → {payload.to} • {payload.departure} — {payload.returnDate}
          </p>
        </div>
        <div>
          <button onClick={() => navigate(-1)} className="px-3 py-1 bg-gray-200 rounded">Back</button>
        </div>
      </div>

      {loading && <div className="py-8 text-center">Searching for flights...</div>}
      {error && <div className="py-4 text-red-600">Error: {error}</div>}
      {!loading && !error && <FlightResultsTable flights={flights} />}
    </div>
  );
}