import randNumber from "../../Utility/randtimout.js";
import randomUseragent from "random-useragent";
import fetchToken from "../../Auth/Indigo/fetchToken.js";
import axios from "axios";
import { supabase } from "../../Config/supabaseClient.js";

export const getToken = async (req, res) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, randNumber()));
    const token = await fetchToken();
    res.send(token);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const GetFlightData = async (params) => {
  let attempt = 4;
  let lastError;
  while (attempt--) {
    try {
      const { origin, destination, startDate, endDate } = params;
      await new Promise((resolve) => setTimeout(resolve, randNumber()));
      const the_token = await fetchToken();

      const urls = [
        "https://api-prod-booking-skyplus6e.goindigo.in/v1/getfarecalendar",
        "https://api-prod-booking-skyplus6e.goindigo.in/v2/getfarecalendar",
      ];
      const url = urls[Math.floor(Math.random() * urls.length)];

      const randUserAgent = randomUseragent.getRandom();

      const axiosRes = await axios.post(
        url,
        {
          startDate,
          endDate,
          origin,
          // NOTE format is in year month date
          destination,
          currencyCode: "INR",
          promoCode: "",
          lowestIn: "M",
        },
        {
          headers: {
            Authorization: the_token,
            Referer: "https://www.goindigo.in/",
            User_key: "15faf8ddf1e8354e90e54fa098e8b1a8",
            "Content-Type": "application/json",
            "User-Agent": randUserAgent,
            Accept: "*/*",
          },
          timeout: 7000,
        }
      );
      return {
        startDate: startDate,
        endDate: endDate,
        status: "success",
        airline: "INDIGO",
        data: axiosRes.data.data.lowFares,
      };
    } catch (err) {
      lastError = err;
      console.error(
        "Axios error:",
        err.response ? err.response.data : err.message
      );
    }
  }
  return { message: lastError?.message, data: lastError?.response?.data };
};

export const IndigoSpecific = async (req, res) => {
  let attempt = 6;
  let lastError;

  while (attempt--) {
    await new Promise((resolve) => setTimeout(resolve, randNumber()));
    try {
      const { origin, destination, startDate, endDate } = req.body;
      const the_token = await fetchToken();

      const urls = [
        "https://api-prod-booking-skyplus6e.goindigo.in/v1/getfarecalendar",
        "https://api-prod-booking-skyplus6e.goindigo.in/v2/getfarecalendar",
      ];
      const url = urls[Math.floor(Math.random() * urls.length)];

      const randUserAgent = randomUseragent.getRandom();

      const axiosRes = await axios.post(
        url,
        {
          startDate,
          endDate,
          origin,
          destination,
          currencyCode: "INR",
          promoCode: "",
          lowestIn: "M",
        },
        {
          headers: {
            Authorization: the_token,
            Referer: "https://www.goindigo.in/",
            User_key: "15faf8ddf1e8354e90e54fa098e8b1a8",
            "Content-Type": "application/json",
            "User-Agent": randUserAgent,
            Accept: "*/*",
          },
          timeout: 7000,
        }
      );

      return res.status(200).json({
        status: "success",
        origin: origin,
        destination: destination,
        startDate: startDate,
        endDate: endDate,
        airline: "Indigo",
        data: axiosRes.data.data.lowFares,
      });
    } catch (err) {
      lastError = err;
      console.error(
        "Axios error:",
        err.response ? err.response.data : err.message
      );
    }
  }

  return res.status(500).json({
    status: "error",
    airline: "Indigo",
    message: lastError?.message || "All attempts failed",
    data: lastError?.response?.data,
  });
};

export const GetAndStoreFlightsIndigo = async (req, res) => {
  let attempt = 7;
  let lastError;

  while (attempt--) {
    await new Promise((resolve) => setTimeout(resolve, randNumber()));
    try {
      const { origin, destination, startDate, endDate } = req.body;
      const the_token = await fetchToken();

      const urls = [
        "https://api-prod-booking-skyplus6e.goindigo.in/v1/getfarecalendar",
        "https://api-prod-booking-skyplus6e.goindigo.in/v2/getfarecalendar",
      ];
      const url = urls[Math.floor(Math.random() * urls.length)];

      const randUserAgent = randomUseragent.getRandom();

      const axiosRes = await axios.post(
        url,
        {
          startDate,
          endDate,
          origin,
          destination,
          currencyCode: "INR",
          promoCode: "",
          lowestIn: "M",
        },
        {
          headers: {
            Authorization: the_token,
            Referer: "https://www.goindigo.in/",
            User_key: "15faf8ddf1e8354e90e54fa098e8b1a8",
            "Content-Type": "application/json",
            "User-Agent": randUserAgent,
            Accept: "*/*",
          },
          timeout: 7000,
        }
      );

      const flightData = axiosRes.data.data.lowFares;

      
      let successCount = 0;
      let errorCount = 0;

      for (const flight of flightData) {
        try {
          if (
            !flight.price ||
            isNaN(parseInt(flight.price)) ||
            parseInt(flight.price) <= 0
          ) {
            errorCount++;
            continue;
          }
          const { data, error } = await supabase.rpc("insert_flight_price", {
            _airline: "Indigo",
            _origin: origin,
            _destination: destination,
            _departure_date: flight.date,
            _price: parseInt(flight.price),
            _source_site: "Indigo",
          });

          if (error) {
            console.error("❌ Database error:", error.message);
            errorCount++;
          } else {
            successCount++;
          }
        } catch (storeErr) {
          errorCount++;
          console.error("❌ Storage error:", storeErr.message);
        }
      }

      return res.status(200).json({
        status: "success",
        airline: "Indigo",
        route: `${origin} → ${destination}`,
        inserted: successCount,
        errors: errorCount,
        total: flightData.length,
      });
    } catch (err) {
      lastError = err;
      console.error(
        "Axios error:",
        err.response ? err.response.data : err.message
      );

      if ((err.response && err.response.status === 403) || (err.response && err.response.status === 409)){
        console.log("rate limited trying again in 5 sec");
        await new Promise((resolve) => setTimeout(resolve, 5000));
}

    }
  }

  return res.status(500).json({
    status: "error",
    airline: "Indigo",
    message: lastError?.message || "All attempts failed",
    data: lastError?.response?.data,
  });
};
