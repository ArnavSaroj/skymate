import React from "react";

const Working = () => {
  return (
    <section className="w-full font-sans bg-slate-50 py-12 px-2 ">
      {/* Section Title */}
      <h2 className="text-center font-bold tracking-wide text-2xl md:text-3xl lg:text-3xl mb-10 text-gray-900 font-serif">
        HOW WE WORK?
      </h2>

      {/* Feature Cards */}
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto mb-5 items-stretch z-10 relative ">
        {/* Card 1 */}
        <div className="flex-1 flex-col bg-white rounded-lg shadow-md px-6 py-6 flex flex-col h-full font-serif">
          <div className="text-lg font-semibold mb-4 text-center min-h-[3.5rem]">
           USER INPUT → WE START WORKING ✈️ <span className="ml-1">✈️</span>
          </div>
          <ul className="text-lg text-gray-700 list-disc  space-y-2">
            <li>
Enter your origin, destination, departure date, and return date            </li>
            <li>Our system instantly understands your travel preferences</li>
            <li>We begin tracking prices for your selected route right away</li>
            <li>Designed for convenience and accurate results every time</li>
          </ul>
        </div>

        {/* Card 2 */}
        <div className="flex-1 flex flex-col bg-white rounded-lg shadow-md px-6 py-6 flex flex-col  h-full font-serif">
          <div className="text-lg font-semibold mb-4 text-center">
            SMART SCRAPING & DATA ENGINE ⚙️ <span className="ml-1">📈</span>
          </div>
          <ul className="text-lg text-gray-700 list-disc  space-y-2">
            <li>Our backend automatically scrapes flight prices from multiple websites</li>
            <li>Compares fares across airlines and booking platforms</li>
            <li>Uses intelligent algorithms to remove duplicates and wrong entries</li>
            <li>Ensures you always see fresh, reliable, and verified data</li>
          </ul>
        </div>

        {/* Card 3 */}
        <div className="flex-1 flex flex-col bg-white rounded-lg shadow-md px-6 py-6 flex flex-col h-full font-serif">
          <div className="text-xl font-semibold mb-4 text-center ">
           SEE PRICE TRENDS THAT REALLY MATTER 📈 
          </div>
          <ul className="text-lg text-gray-700 list-disc  space-y-2">
            <li>View historic prices for every route you track</li>
            <li>Understand price dips, surges, and usual travel-period fluctuations</li>
            <li>
Helps you decide when to book for maximum savings            </li>
            <li>Gives you confidence to make data-driven travel decisions</li>
          </ul>
        </div>
      </div>

     
    </section>
  );
};

export default Working;
