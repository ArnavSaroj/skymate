import React from "react";
import { TopDealsSection } from "../components/top-deals/top_dealSection";
import { useNavigate } from "react-router-dom";

const DealsPage = () => {
  const navigate = useNavigate();

  const clickDeals = () => {
    navigate("/deals");
  };

  return (
    <div>
      <TopDealsSection limit="6" />
      {/* View All Deals Button */}

      <div className="text-center mt-12">
        <button
          className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg font-medium transition-colors hover:cursor-pointer"
          onClick={clickDeals}
        >
          View All Deals
        </button>
      </div>
    </div>
  );
};

export default DealsPage;
