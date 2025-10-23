import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import FlightResultsTable from "../components/search-result/searchResultTable.jsx";
import { SearchApi } from "../routes/searchApi.js";
import PricesTrends from "../components/charts/pricesTrends.jsx";
import historyPrices from "../routes/historyPrices.js";


export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [historicPrices, setHistoricPrices] = useState([]);


const now = new Date();
const monthsToShow = 6;

  // these all are for charts
let filteredData = historicPrices.filter(item => {
  const date = new Date(item.departure_date);
  return date >= new Date(now.setMonth(now.getMonth() - monthsToShow));
});

// if still too many dates cut sample it 
  const maxPoints = 60;
if (filteredData.length > maxPoints) {
  const step = Math.ceil(filteredData.length / maxPoints);
  filteredData = filteredData.filter((_, idx) => idx % step === 0);
}

const trendLabels = filteredData.map(item => item.departure_date);
const trendPrices = filteredData.map(item => item.price);


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
        const prevPrices = await historyPrices(payloadInside);
        console.log(payloadInside);
        if (!mounted) return;
        // setFlights(data.flights || []);
        const sortedFlight = data.flights.sort((a, b) => a.price - b.price);
        setFlights(sortedFlight);
        setHistoricPrices(prevPrices.data);
       
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
    <div className="relative z-50 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="mb-4 flex items-center text-center ">
          <div>
            <div className="flex justify-center"> 
              {/* this is the graphs which shows trends */}
              <PricesTrends labels={trendLabels} prices={trendPrices}/>
              {/* <PricesTrends /> */}
            </div>
            <h2 className="text-3xl font-semibold ">Search Results</h2>
            <p className="text-xl text-gray-600">
              {displayPayload.from} → {displayPayload.to} •{" "}
              {displayPayload.departure} — {displayPayload.returnDate}
            </p>
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
