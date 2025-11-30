import { DealCard } from "./deal-card"

export function TopDealsSection() {
  // Sample deals data matching the design
  const deals = [
    {
      id: 1,
      // image: "/placeholder.svg"image to be added,
      price: "₹4567",
      route: "NEW DELHI TO MUMBAI",
      date: "13-07-2025",
      airline: "AKASA",
    },
    {
      id: 2,
      // image to be added
      price: "₹4000",
      route: "MUMBAI TO CHENNAI",
      date: "12-07-2025",
      airline: "INDIGO",
    },
    {
      id: 3,
      image: "/images/landscape-placeholder.svg",
      price: "₹3000",
      route: "CHENNAI TO BENGALURU",
      date: "15-07-2025",
      airline: "AKASA",
    },
    {
      id: 4,
      image: "/images/mumbai.jpg",
      price: "₹2199",
      route: "NEW DELHI TO MUMBAI",
      date: "20-07-2025",
      airline: "SPICEJET",
    },
    {
      id: 5,
      image: "/images/tajmahal.jpg",
      price: "₹7899",
      route: "MUMBAI TO DELHI",
      date: "22-07-2025",
      airline: "INDIGO",
    },
      {
      id: 6,
      image: "/placeholder.svg",
      price: "₹7899",
      route: "MUMBAI TO DELHI",
      date: "22-07-2025",
      airline: "INDIGO",
    },
  ]

  return (
    <section className="bg-transparent relative py-16 border-t border-gray-100 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-serif">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Top Deals of the Week 
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing flight deals handpicked just for you. We bring you the best offers tailored to your requirements!
          </p>
        </div>

        {/* Deals Grid - Horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-6 md:overflow-visible z-10" >
          {deals.map((deal) => (
            <div key={deal.id} className="flex-shrink-0 ">
              <DealCard
                image={deal.image}
                price={deal.price}
                route={deal.route}
                date={deal.date}
                airline={deal.airline}
              />
            </div>
          ))}
        </div>

        {/* View All Deals Button */}
        <div className="text-center mt-12">
          <button className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg font-medium transition-colors hover:cursor-pointer">
            View All Deals
          </button>
        </div>
      </div>
    </section>
  )
}
