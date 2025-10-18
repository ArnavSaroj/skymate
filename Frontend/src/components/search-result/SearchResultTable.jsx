import React, { useContext, useState, createContext } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext.jsx";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { FiAlertTriangle } from "react-icons/fi";

export default function FlightResultsTable({ flights = [] }) {
  const { User, setUser } = useContext(AuthContext) ?? {};

  const [BookmarkedIds, setBookmarkIds] = useState([]);
  const [showFlightsPopup, setShowFlightsPopup] = useState(true);

  const handleBookmark = (id) => {
    console.log(User);

    if (!User) {
      return toast("you need to be logged in to access this functionality!!!");
    }

    setBookmarkIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const GenerateURL = (from, to, date, Airline_name) => {
    if (Airline_name === "spicejet") {
      return `https://www.spicejet.com/search?from=${from}&to=${to}&tripType=1&departure=${date}&adult=1&child=0&srCitizen=0&infant=0&currency=INR&redirectTo=/`;
    }
  };

  // it will show a popup if no flights found
  if (!flights || flights.length === 0) {
    return (
      <div>
        <Popup
          open={showFlightsPopup}
          onClose={() => setShowFlightsPopup(false)}
          modal
          closeOnDocumentClick
          closeOnEscape
          overlayStyle={{ background: "rgba(0,0,0,0.4)" }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="noflights-title"
            className="p-4 sm:p-6"
          >
            <div className="flex items-center gap-3">
              <FiAlertTriangle className="text-yellow-500" size={24} />
              <h2
                id="noflights-title"
                className="text-lg font-semibold text-gray-800"
              >
                No flights found
              </h2>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              We couldn’t find flights matching your search.
            </p>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700">
                Try the following:
              </h3>
              <ul className="mt-2 list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Check departure and arrival airport names/codes.</li>
                <li>Adjust your travel date.</li>
                <li>Swap origin and destination to ensure correct order.</li>
              </ul>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                className="px-3 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                onClick={() => setShowFlightsPopup(false)}
              >
                Dismiss
              </button>
              <button
                className="px-3 py-2 text-sm rounded-md bg-pink-500 text-white hover:bg-pink-600"
                onClick={() => window.location.reload()}
              >
                Try again
              </button>
            </div>
          </div>
        </Popup>
        <div className="text-center py-8">
          <p className="text-gray-500">
            OOPS!! No flights found for your search criteria.
          </p>
        </div>
      </div>
    );
  }

// if flights found it will show a popup of the cheapest flight
  return (
    <div className="overflow-x-auto">
       <Popup
          open={showFlightsPopup}
          onClose={() => setShowFlightsPopup(false)}
          modal
          closeOnDocumentClick
          closeOnEscape
          overlayStyle={{ background: "rgba(0,0,0,0.4)" }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="noflights-title"
            className="p-4 sm:p-6"
          >
            <div className="flex items-center gap-3">
              <h2
                id="noflights-title"
                className="text-lg font-semibold text-gray-800"
              >
               🥳Cheapest flight found
              </h2>
            </div>
            <p className="mt-2 text-sm font-medium text-gray-600">
              We have found the cheapest flight for your convinience.
            </p>
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-700">
              The cheapest flight for the route {flights[0].origin_code} to {flights[0].destination_code} is of {flights[0].airline_name} on {flights[0].departure_date} and its price is {flights[0].price}.
            </h3>
            <h4 className="text-sm font-medium text-gray-700">You can now go on {flights[0].airline_name} website and enjoy your savings!!We wish you a happy journey!!!</h4>
             
          </div>
          <div className="mt-8 text-sm  font-medium text-black">Disclaimer:We don't book tickets through our websites we just find the cheapest routes so that you don't end up wasting your time and energy.</div>
            <div className="mt-2 flex justify-end gap-2">
              
              <button
                className="px-3 py-2 text-sm rounded-md bg-green-500 text-white hover:bg-green-600 cursor-pointer"
                onClick={()=>{setShowFlightsPopup(false)}}
              >
                Browse All Flights
              </button>
            </div>
          </div>
        </Popup>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Airline Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Route
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Departure
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Full Price
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {flights.map((f, idx) => (
              <tr key={f.id ?? idx} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {f.airline_name ?? "-"}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{`${
                  f.origin_code ?? "-"
                } → ${f.destination_code ?? "-"}`}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  {f.departure_date ?? "-"}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  {f.price != null ? (
                    <div className="flex items-center space-x-2">
                      <span>₹{f.price}</span>
                      {(() => {
                        const prev = f.previous_price ?? null;
                        let num = NaN;

                        if (
                          prev != null &&
                          !Number.isNaN(Number(prev)) &&
                          f.price != null &&
                          !Number.isNaN(Number(f.price))
                        ) {
                          num =
                            ((Number(f.price) - Number(prev)) / Number(prev)) *
                            100;
                        }

                        if (Number.isNaN(num)) return null;
                        const isIncrease = num > 0;
                        const colorClass = isIncrease
                          ? "text-red-600"
                          : "text-green-600";
                        const arrow = isIncrease ? "▲" : "▼";
                        const absPct = Math.abs(num).toFixed(1);
                        const message = isIncrease
                          ? `This flight is ${absPct}% more expensive than the previous one.`
                          : `This flight is ${absPct}% cheaper than the previous one.`;

                        return (
                          <span className="relative inline-block group">
                            <span
                              className={`text-xs font-semibold ${colorClass}`}
                            >
                              {arrow} {absPct}%
                            </span>
                            <div className="pointer-events-none absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-gray-800 text-white text-xs rounded px-2 py-1 shadow-lg whitespace-nowrap">
                                {message}
                              </div>
                            </div>
                          </span>
                        );
                      })()}
                    </div>
                  ) : (
                    "-"
                  )}
                </td>
                <div className="flex items-center justify-between px-3">
                  <button
                    className="mt-2 mb-2 px-5 py-2 bg-pink-400 text-black text-sm font-medium rounded-lg shadow hover:bg-pink-500 focus:outline-none hover:cursor-pointer  transition"
                    onClick={() => {
                      const url = GenerateURL(
                        f.origin_code,
                        f.destination_code,
                        f.departure_date,
                        f.airline_name
                      );
                      if (url) {
                        window.open(url, "_blank");
                      }
                    }}
                  >
                    View
                  </button>
                  {BookmarkedIds.includes(f.id) ? (
                    <FaBookmark
                      size={25}
                      onClick={() => handleBookmark(f.id)}
                      className="hover cursor-pointer"
                    />
                  ) : (
                    <CiBookmark
                      size={25}
                      onClick={() => handleBookmark(f.id)}
                      className="hover cursor-pointer"
                    />
                  )}
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
  );
}
