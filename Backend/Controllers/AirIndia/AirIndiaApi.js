import axios from "axios";
import randomUseragent from "random-useragent";

const AirindiaURL = "https://api.airindia.com/airline-fares/v1/search";
const range = 31;
const randomAgent = randomUseragent.getRandom();

export const AirIndiaRoutesData = async (req, res) => {
  const { origin, destination, startDate, endDate } = req.body;
  if (!origin || !destination || !startDate || !endDate) {
    return res
      .status(400)
      .json({ message: "incomplete or missing required field" });
  }

  let attempt = 3;
  let lastError;

  while (attempt--) {
    try {
      const axiosRes = await axios.post(
        AirindiaURL,
        {
          classType: "ECONOMY",
          concessionType: null,
          itinerary: {
            origin: origin,
            destination: destination,
            departureDate: startDate,
            returnDate: null,
            originCountryCode: "IN",
          },
          tripInfo: { duration: null, range: range, durationFlexibility: null },
        },
        {
          headers: {
            "User-Agent": randomAgent,
            Accept: "application/json, text/plain, */*",
            "Accept-Language": "en-US,en;q=0.5",
            "Accept-Encoding": "gzip, deflate, br, zstd",
            "Ocp-Apim-Subscription-Key": "8ea658f3ac1e44cca129d7ed252d4c42",
            "Content-Type": "application/json",
            Origin: "https://www.airindia.com",
            "Sec-GPC": "1",
            Connection: "keep-alive",
            Referer: "https://www.airindia.com/",
          },
          timeout: 10000,
        }
      );

      return res.status(200).json({
        status: "success",
        airline: "AirIndia",
        data: axiosRes.data,
      });
    } catch (error) {
      lastError = error;
      console.error(`Attempt failed: ${error.message}`);
    }
  }

  return res.status(500).json({
    status: "error",
    airline: "AirIndia",
    message: lastError?.message || "All attempts failed",
  });
};
