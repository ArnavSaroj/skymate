import { FaArrowRight } from "react-icons/fa";

const ORIGIN_IMAGE_MAP = {
  BLR: "/images/cities/blr.png",
  DEL: "/images/cities/del.png",
  BOM: "/images/cities/bom.png",
  HYD: "/images/cities/hyd.png",
  MAA: "/images/cities/chennai.png",
  CCU: "/images/cities/kokata.png",
  JAI: "/images/cities/jaipur.png",
  AMD:"/images/cities/ahm.png"
};

function getCityImage(origin) {
  if (!origin) return "/images/cities/blr.png"; 
  const code = String(origin).trim().toUpperCase();
  return ORIGIN_IMAGE_MAP[code] || "/images/cities/blr.png";
}

export function DealCard({ image, price, origin, destination, date, airline }) {
  const imageSrc = image || getCityImage(origin);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 z-10 flex flex-col h-96 ">
      {/* Image */}
      <div className="w-full h-1/2">
        <img
          src={imageSrc}
          alt={origin || "city"}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col hover:cursor-pointer justify-between">
        {/* Price */}
        <div className="text-xl font-bold text-gray-900 ">{price}</div>

        {/* Route */}
        <div className="text-sm font-semibold flex text-gray-900 uppercase ">
          {origin} <FaArrowRight size={15} className="gap-2" /> {destination}
        </div>

        {/* Date */}
        <div className="text-sm text-gray-900  ">{date}</div>

        {/* Airline */}
        <div className="text-sm text-gray-900 uppercase ">{airline}</div>
      </div>
    </div>
  );
}
