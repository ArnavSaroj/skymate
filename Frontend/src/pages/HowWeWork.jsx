import React from "react";

const HowWeWork = () => {
  return (
    <div className="w-full bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold text-center tracking-wide mb-10">
          HOW DOES IT WORK?
        </h2>

        {/* 3-step grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-6">
            <h3 className="text-lg font-semibold text-center mb-4">
              STEP 1 – YOU FILL IN THE URL
            </h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
              <li>Placeholder point 1 for step 1.</li>
              <li>Placeholder point 2 for step 1.</li>
              <li>Placeholder point 3 for step 1.</li>
            </ul>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-6">
            <h3 className="text-lg font-semibold text-center mb-4">
              STEP 2 – TITLE HERE
            </h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
              <li>Placeholder point 1 for step 2.</li>
              <li>Placeholder point 2 for step 2.</li>
              <li>Placeholder point 3 for step 2.</li>
            </ul>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-6">
            <h3 className="text-lg font-semibold text-center mb-4">
              STEP 3 – TITLE HERE
            </h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
              <li>Placeholder point 1 for step 3.</li>
              <li>Placeholder point 2 for step 3.</li>
              <li>Placeholder point 3 for step 3.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowWeWork;
