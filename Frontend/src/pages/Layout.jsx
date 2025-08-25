import React from "react";
import HomePage from "./HomePage";
import DealsPage from "./DealsPage";
import SkymateWhat from "./skymateWhat";
import Working from "./Working";
import { useLocation } from "react-router-dom";
import SearchResults from "./SearchResults";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="w-full min-h-screen bg-white">
      <img
        src="/plane_flying.jpg"
        alt="Airplane"
        className="fixed top-0 left-0 w-screen h-screen object-cover object-top md:object-[center_30%] opacity-20 z-0 pointer-events-none select-none hidden lg:block "
      />
      <HomePage />
      {location.pathname === "/search-flights" && <SearchResults />}
      <DealsPage />
      <SkymateWhat />
      <Working />
    </div>
  );
};

export default Layout;
