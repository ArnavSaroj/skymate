import React from "react";

export default function FlightResultsTable({ flights = [] }) {
  if (!flights || flights.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">OOPS!! No flights found for your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Flight No</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Departure</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {flights.map((f, idx) => (
              <tr key={f.id ?? idx} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{f.source ?? "-"}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{f.p_num ?? f.flightNumber ?? "-"}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{`${f.origin_code ?? "-"} → ${f.destination_code ?? "-"}`}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{f.departure_date ?? "-"}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{f.price != null ? `₹${f.price}` : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}