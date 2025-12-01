import { useEffect,useState } from "react"
import { DealCard } from "./deal-card"
import {Link} from 'react-router-dom'

const API_BASE_URL="http://localhost:5000/api/top_deals"

export function TopDealsSection(props) {

  const fetchDeals = async() => {
  try {
    const res = await fetch(API_BASE_URL, {
      method: "GET", headers: {
      "Content-Type":"application/json"
      }
    })
    
    if (!res.ok) {
      throw new Error("some error ocurred")
    }

    const data = await res.json();
    return data.top_Deals_found;

  } catch (error) {
    console.error(error.message);
  }
}

  const [deals, setDeals] = useState(null);

  useEffect(() => {

    fetchDeals().then((json) => {
      const limited=props.limit?json.slice(0, props.limit):json;
      setDeals(limited);

    })

  }, []);

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
          {deals&& deals.map((deal) => (
            <div key={deal.id} className="flex-shrink-0 ">
              <DealCard
                image={ deal.image}
                price={deal.current_price}
                origin={deal.origin}
                destination={deal.destination}
                date={deal.departure}
                airline={deal.airline}
              />
            </div>
          ))}
        </div>

        {/* View All Deals Button */}
        <Link to="/deals">
        <div className="text-center mt-12">
          <button className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg font-medium transition-colors hover:cursor-pointer">
            View All Deals
          </button>
          </div>
          </Link>
      </div>
      
    </section>
  )
}
