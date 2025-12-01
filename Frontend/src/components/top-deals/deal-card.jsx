import { FaArrowRight } from "react-icons/fa";

export function DealCard({ image, price, origin, destination, date, airline }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 z-10 flex flex-col h-96">
      {/* Image */}
      <div className="w-full h-1/2">
        <img
          src={image || "/images/landscape-placeholder.svg"}
          alt={image}
          className="w-full h-full object-fit rounded-t-lg"
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        {/* Price */}
        <div className="text-xl font-bold text-gray-900 mb-1">{price}</div>

        {/* Route */}
        <div className="text-sm font-semibold flex text-gray-900 uppercase mb-2">
          {origin} <FaArrowRight  size={15} className="gap-2"/> {destination}
        </div>

        {/* Date */}
        <div className="text-sm text-gray-900  mb-1">{date}</div>

        {/* Airline */}
        <div className="text-sm text-gray-900 uppercase ">
          {airline}
        </div>
      </div>
    </div>
  );
}
