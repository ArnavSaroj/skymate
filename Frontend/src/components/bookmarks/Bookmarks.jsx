import React from "react";

const Bookmarks = ({ bookmarks_table = [] }) => {
  return (
    <div className="w-full">
      <h1 className="text-4xl font-sans flex justify-center">
        BOOKMARKED ROUTES
      </h1>

      <div className="mt-4 flex justify-center">
        <div className="w-full max-w-lg overflow-x-auto rounded-lg border border-gray-200 bg-white">
          {/* switch to table-fixed so columns share width equally */}
          <table className="w-full table-fixed text-sm">
            <thead className="bg-gray-100">
              <tr className="text-left text-gray-700">
                {/* each col takes exactly 1/3 of the table */}
                <th className="w-1/3 px-2 py-2 font-semibold whitespace-nowrap">
                  Route
                </th>
                <th className="w-1/3 px-2 py-2 font-semibold text-right whitespace-nowrap">
                  Target Price
                </th>
                <th className="w-1/3 px-1 py-2 font-semibold text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {bookmarks_table.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-2 py-3 text-center text-gray-400 italic"
                  >
                    No bookmarks yet.
                  </td>
                </tr>
              )}

              {bookmarks_table.map((b, idx) => (
                <tr
                  key={b.route_info?.id ?? idx}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-2 py-2">
                    <span className="font-mono">
                      {b.route_info?.origin_iata_code}
                    </span>
                    <span className="mx-1">➡️</span>
                    <span className="font-mono">
                      {b.route_info?.destination_iata_code}
                    </span>
                  </td>
                  <td className="px-2 py-2 text-right">
                    <span className="font-semibold">{b.target_price}</span>
                  </td>
                  <td className="px-1 py-2 text-center">
                    <button
                      className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wide bg-red-600 text-white rounded-full hover:bg-red-700 active:scale-95 transition-transform"
                      // onClick={() => handleDelete(b)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
