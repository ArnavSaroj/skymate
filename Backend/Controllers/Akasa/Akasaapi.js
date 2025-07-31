import axios from "axios";
import randomUseragent from "random-useragent";
import randNumber from "../../Utility/randtimout.js";
import attachEncodedTime from "../../Utility/attachencodedtime.js";
import { supabase } from "../../Config/supabaseClient.js";

const languages = [
  "en-US,en;q=0.9",
  "en-GB,en;q=0.8",
  "hi-IN,hi;q=0.9,en-US;q=0.8,en;q=0.7",
  "fr-FR,fr;q=0.9,en-US;q=0.8",
  "de-DE,de;q=0.9,en;q=0.8",
];
const acceptLanguage = languages[Math.floor(Math.random() * languages.length)];

export const GetdataAkasa = async (params) => {
  let attempt = 3;
  let lasterror;

  while (attempt--) {
    await new Promise((resolve) => setTimeout(resolve, randNumber()));
    try {
      const { origin, destination, startDate } = params;
      let encodedDate = attachEncodedTime(startDate);

      const url = `https://prod-bl.qp.akasaair.com/api/ibe/availability?origin=${origin}&destination=${destination}&startDate=${encodedDate}&numberOfPassengers=1&channel=WEB&currencyCode=INR`;
      const useragent = randomUseragent.getRandom();

      const axiosRES = await axios.get(url, {
        headers: {
          "User-Agent": useragent,
          Accept: "application/json, text/plain, */*",
          "Accept-Language": acceptLanguage,
          "Accept-Encoding": "gzip, deflate, br, zstd",
          Referer: "https://www.akasaair.com/",
          // "Authorization": "token_if_needed",
          Origin: "https://www.akasaair.com",
          DNT: "1",
          Connection: "keep-alive",
          Pragma: "no-cache",
          "Cache-Control": "no-cache",
        },
        timeout: 7000,
      });
      return {
        startDate: startDate,
        status: "success",
        airline: "Akasa",
        data: axiosRES.data.data,
      };
    } catch (err) {
      lasterror = err;
      console.error(err.message);
    }
  }
  return { message: lasterror.message };
};

export const AkasaDataSpecific = async (req, res) => {
  let attempt = 3;
  let lasterror;

  while (attempt--) {
    await new Promise((resolve) => setTimeout(resolve, randNumber()));
    try {
      const { origin, destination, startDate } = req.body;
      let encodedDate = attachEncodedTime(startDate);

      const url = `https://prod-bl.qp.akasaair.com/api/ibe/availability?origin=${origin}&destination=${destination}&startDate=${encodedDate}&numberOfPassengers=1&channel=WEB&currencyCode=INR`;
      const useragent = randomUseragent.getRandom();

      const axiosRES = await axios.get(url, {
        headers: {
          "User-Agent": useragent,
          Accept: "application/json, text/plain, */*",
          "Accept-Language": acceptLanguage,
          "Accept-Encoding": "gzip, deflate, br, zstd",
          Referer: "https://www.akasaair.com/",
          Origin: "https://www.akasaair.com",
          DNT: "1",
          Connection: "keep-alive",
          Pragma: "no-cache",
          "Cache-Control": "no-cache",
          // authentication if required in future
        },
        timeout: 7000,
      });

      return res.status(200).json({
        startDate: startDate,
        status: "success",
        airline: "Akasa",
        data: axiosRES.data.data,
      });
    } catch (err) {
      lasterror = err;
      console.error(err.message);
    }
  }

  return res.status(500).json({
    status: "error",
    airline: "Akasa",
    message: lasterror?.message || "All attempts failed",
  });
};

export const GetAndStoreAkasa = async (req, res) => {
  let attempt = 7;
  let lasterror;

  while (attempt--) {
    await new Promise((resolve) => setTimeout(resolve, randNumber()));
    try {
      const { origin, destination, startDate, endDate } = req.body;
      let encodedDate = attachEncodedTime(startDate);

      const url = `https://prod-bl.qp.akasaair.com/api/ibe/availability?origin=${origin}&destination=${destination}&startDate=${encodedDate}&numberOfPassengers=1&channel=WEB&currencyCode=INR`;
      const useragent = randomUseragent.getRandom();

      const axiosRES = await axios.get(url, {
        headers: {
          "User-Agent": useragent,
          Accept: "application/json, text/plain, */*",
          "Accept-Language": acceptLanguage,
          "Accept-Encoding": "gzip, deflate, br, zstd",
          Referer: "https://www.akasaair.com/",
          Origin: "https://www.akasaair.com",
          DNT: "1",
          Connection: "keep-alive",
          Pragma: "no-cache",
          "Cache-Control": "no-cache",
          // authentication if required in future
        },
        timeout: 7000,
      });
      const allFlightData = axiosRES.data.data;

      let flightData = allFlightData;

      if (endDate) {
        const endDateObj = new Date(endDate);

        flightData = allFlightData.filter((flight) => {
          const flightDate = new Date(flight.date);
          return flightDate <= endDateObj;
        });
        console.log(
        );
      }

      let errorCount = 0;
      let successCount = 0;

      for (const flight of flightData) {
        try {
          if (
            !flight.price ||
            isNaN(flight.price) ||
            parseInt(flight.price) <= 0
          ) {
            errorCount++;
            continue;
          }

          const { data, error } = await supabase.rpc("insert_flight_price", {
            _airline: "akasa",
            _origin: origin,
            _destination: destination,
            _departure_date: flight.date,
            _price: flight.price,
            _source_site: "akasa",
          });

          if (error) {
            errorCount++;
            console.error("Database error:", error.message);
          } else {
            successCount++;
          }
        } catch (error) {
          console.error("database not stored:", error.message);
          errorCount++;
        }
      }

      return res.status(200).json({
        status: "success",
        airline: "akasa",
        inserted: successCount,
        errors: errorCount,
        total: flightData.length,
      });
    } catch (err) {
      lasterror = err;
      console.error(err.message);
    }
  }

  return res.status(500).json({
    status: "error",
    airline: "Akasa",
    message: lasterror?.message || "All attempts failed",
  });
};
