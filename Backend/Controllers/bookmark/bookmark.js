import { supabase } from "../../Config/supabaseClient.js";
import axios from 'axios'
import { BookmarkEmail } from "../../Utility/sendEmail.js";

const currentDate = new Date();

const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, "0");
const day = String(currentDate.getDate()).padStart(2, "0");

const formattedDate = `${year}-${month}-${day}`;

const oneMonth = String(currentDate.getMonth() + 2).padStart(2, "0");
const oneMonthAfterDate = `${year}-${oneMonth}-${day}`;

const API_BASE_URL = `http://localhost:5000/flight/AllStore`;

export const CreateBookmark = async (req, res) => {
  //date is optional and airline is optional too
  try {
    const { route, date, airline, id, target_price } = req.body;
    const { origin, destination } = route;
    if (!origin || !date || !airline || !target_price || !id || !destination) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const { data, error } = await supabase.rpc("insert_bookmark", {
      p_user_id: id,
      p_origin: origin,
      p_destination: destination,
      p_target_price: target_price,
      p_airline: airline,
      p_date: date,
    });

    if (error) {
      return res.status(400).json({ message: error });
    }
    return res.status(200).json({ message: "bookmark created" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const DeleteBookmark = async (req, res) => {
  try {
    const { id, route } = req.body;
    const { origin, destination } = route;
    if (!id || !route) {
      return res.status(500).json({ message: "invalid" });
    }

    const { data: routeData, error: routeError } = await supabase
      .from("routes")
      .select("id")
      .eq("origin_iata_code", origin)
      .eq("destination_iata_code", destination)
      .single();

    if (routeError || !routeData) {
      return res.status(500).json({ message: "this route doesnt exists" });
    }

    const { data, error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("user_id", id)
      .eq("route_id", routeData.id)
      .select();

    if (error) {
      return res.status(500).json({ message: error.message });
    }
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "bookmark not found" });
    }
    return res.status(204).json({ message: "successfull" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const PriceDropBookmark = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("route_id,target_price","target_price");

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    for (const bookmark of data) {
      let route_id = bookmark.route_id;

      const { data: routeData, err: routeError } = await supabase
        .from("routes")
        .select("origin_iata_code,destination_iata_code")
        .eq("id", route_id);

      for (const routes of routeData) {
        try {
          let route = {
            origin:routes.origin_iata_code,
              destination:routes.destination_iata_code,
            startDate: formattedDate,
            endDae:oneMonthAfterDate
}

          const response = await axios.post(API_BASE_URL, route, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(response.data);
          // BookmarkEmail(data.target_price, response.price);

          if (response.status >= 200 && response.status < 300) {
            console.log("Success in inserting data");
          } else {
            throw new Error("Unexpected status code: " + response.status);
          }
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
