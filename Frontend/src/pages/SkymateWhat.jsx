import React from "react";

const SkymateWhat = () => {
  return (
    <section className="w-full font-sans bg-slate-50 py-12 px-2 ">
      {/* Section Title */}
      <h2 className="text-center font-bold tracking-wide text-2xl md:text-3xl lg:text-3xl mb-10 text-gray-900 font-serif">
        WHAT IS SKYMATE?
      </h2>

      {/* Feature Cards */}
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto mb-5 items-stretch z-10 relative ">
        {/* Card 1 */}
        <div className="flex-1 flex-col bg-white rounded-lg shadow-md px-6 py-6 flex flex-col h-full font-serif">
          <div className="text-lg font-semibold mb-4 text-center min-h-[3.5rem]">
            YOUR FLIGHT COMPARISON TOOL <span className="ml-1">✈️</span>
          </div>
          <ul className="text-lg text-gray-700 list-disc  space-y-2">
            <li>
              Your flight fare comparison tool built for Indian travellers
            </li>
            <li>Tracks price changes and trends across airlines</li>
            <li>Offers peronalised suggestions for smarter bookings</li>
            <li>Designed for ease, speed, and real savings</li>
          </ul>
        </div>

        {/* Card 2 */}
        <div className="flex-1 flex flex-col bg-white rounded-lg shadow-md px-6 py-6 flex flex-col  h-full font-serif">
          <div className="text-lg font-semibold mb-4 text-center">
            VISUAL INSIGHTS THAT MATTER <span className="ml-1">📈</span>
          </div>
          <ul className="text-lg text-gray-700 list-disc  space-y-2">
            <li>Automatically charts airfare data above time</li>
            <li>Easy-to-read charts reveal best booking windows</li>
            <li>Shows price dips,surges and route comparisons</li>
            <li>Helps you make data-driven travel decisions</li>
          </ul>
        </div>

        {/* Card 3 */}
        <div className="flex-1 flex flex-col bg-white rounded-lg shadow-md px-6 py-6 flex flex-col h-full font-serif">
          <div className="text-xl font-semibold mb-4 text-center ">
            ALERTS THAT WORK FOR YOU <span className="ml-1">⚠️</span>
          </div>
          <ul className="text-lg text-gray-700 list-disc  space-y-2">
            <li>Set alerts for specific routes and travel dates</li>
            <li>Get notified when prices drop or deals appear</li>
            <li>
              Zero spam-just timely,relevant,updates all at extremely low costs
            </li>
            <li>Saves time,efforts and money on every trip</li>
          </ul>
        </div>
      </div>

      {/* Footer Tagline */}
      <div className="text-center text-base md:text-4xl sm:text-3xl text-gray-500 font-serif mt-16">
        <span className="font-bold text-gray-800">1 in 5 flights</span> could
        cost you less. Skymate tracks the drop!
      </div>
    </section>
  );
};

export default SkymateWhat;
