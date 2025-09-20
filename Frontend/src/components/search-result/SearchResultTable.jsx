import React, { useContext, useState,createContext } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import {AuthContext} from '../../context/AuthContext.jsx'



export default function FlightResultsTable({ flights = [] }) {

  const { User,setUser } = useContext(AuthContext) ?? {};

  const [BookmarkedIds, setBookmarkIds] = useState([]);

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

  if (!flights || flights.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          OOPS!! No flights found for your search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ToastContainer position="top-center" autoClose={2000} theme="dark" type='warning' />
      <div className="overflow-x-auto">
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
                  <button className="mt-2 mb-2 px-5 py-2 bg-pink-400 text-black text-sm font-medium rounded-lg shadow hover:bg-pink-500 focus:outline-nonehover:cursor-pointer  transition">
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
    </div>
  );
}
