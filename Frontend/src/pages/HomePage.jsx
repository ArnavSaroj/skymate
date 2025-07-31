"use client";

import { useState, useCallback } from "react";
import fetchNames from "../lib/fetchNames.js";
import debounce from "lodash.debounce";

export default function HomePage() {
  const [searchData, setSearchData] = useState({
    origin: "",
    destination: "",
    startDate: "",
    endDate: "",
  });

  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  const handleInputChange = (field, value) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const debouncedFetchOrigin = useCallback(
    debounce(async (value) => {
      const suggestions = await fetchNames(value);
      setOriginSuggestions(suggestions);
    }, 300),
    []
  );

  const debouncedFetchDestination = useCallback(
    debounce(async (value) => {
      const suggestions = await fetchNames(value);
      setToSuggestions(suggestions);
    }, 300),
    []
  );

  const handleOriginChange = (e) => {
    const value = e.target.value;
    handleInputChange("origin", value);
    debouncedFetchOrigin(value);
  };

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    handleInputChange("destination", value);
    debouncedFetchDestination(value);
  };

  const handleSearch = () => {
    console.log("Search data:", searchData);
  };

  return (
    <div className=" min-h-[600px] relative overflow-visible sm:min-h-0 md:min-height-0 font-serif">
      {/* Background Plane Image */}

      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900">SKYMATE</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a
                  href="#"
                  className="text-gray-900 hover:text-sky-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-sky-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Pricing
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-sky-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  How It Works
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:cursor-pointer">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section & Search Bar */}
      <main className="relative z-10 bg-transparent pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 pt-8">
          <div className="text-center mb-9">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-12">
              Looking for the cheapest flight prices?
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Track flight prices across multiple airlines and get notified when
              prices drop. Find the best deals and save money on your next trip.
            </p>
          </div>
          {/* need to shift this down later so that nose of aeroplane is visible */}
          {/* Search Bar */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-4 md:p-8 backdrop-blur-md  ">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-5 overflow-visible">
                {/* origin label */}
                <div className="space-y-2 ">
                  <label
                    htmlFor="origin"
                    className="block text-sm font-medium text-gray-700"
                  >
                    From
                  </label>
                  <input
                    type="text"
                    id="origin"
                    placeholder="Origin city"
                    value={searchData.origin}
                    onChange={handleOriginChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors"
                  />
                  {originSuggestions.length > 0 && (
                    <ul className="bg-white border rounded-2xl shadow mt-1 absolute z-50 w-full ">
                      {originSuggestions.map((s) => (
                        <li
                          key={s.iata_code}
                          onClick={() => {
                            handleInputChange("origin", `${s.airport_name}`);
                            setOriginSuggestions([]);
                          }}
                          className="px-4 py-2 hover:bg-sky-100 cursor-pointer font-serif"
                        >
                          ✈️-{s.airport_name} ({s.iata_code}),{s.city}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="destination"
                    className="block text-sm font-medium text-gray-700"
                  >
                    To
                  </label>
                  <input
                    type="text"
                    id="destination"
                    placeholder="Destination city"
                    value={searchData.destination}
                    onChange={handleDestinationChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors"
                  />
                  {toSuggestions.length > 0 && (
                    <ul className="bg-white border rounded-2xl shadow mt-1 absolute z-50 w-full ">
                      {toSuggestions.map((s) => (
                        <li
                          key={s.iata_code}
                          onClick={() => {
                            handleInputChange(
                              "destination",
                              `${s.airport_name}`
                            );
                            setToSuggestions([]);
                          }}
                          className="px-4 py-2 hover:bg-sky-100 cursor-pointer font-serif"
                        >
                          ✈️-{s.airport_name} ({s.iata_code}),{s.city}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="startDate"
                    className="block text-sm font-medium text-gray-700 "
                  >
                    Departure
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    value={searchData.startDate}
                    onChange={(e) =>
                      handleInputChange("startDate", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="endDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Return
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    value={searchData.endDate}
                    onChange={(e) =>
                      handleInputChange("endDate", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-transparent">
                    Search
                  </label>
                  <button
                    onClick={handleSearch}
                    className="w-full bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg font-medium transition-colors focus:ring-2 focus:ring-sky-500 focus:ring-offset-2  hover:cursor-pointer outline-none"
                  >
                    Search Flights
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
