import axios from "axios";
import { ScrapingRoutes } from "./ScrapingRoutes.js";

const API_BASE_URL = `http://localhost:5000/flight/AllStore`;


  async function run() {
  

  console.log("[CronScraper] starting, routes:", ScrapingRoutes.length);

  for (const route of ScrapingRoutes) {
    try {
      const response = await axios.post(API_BASE_URL, route, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      

      if (response.status >= 200 && response.status < 300) {
        console.log("Success in inserting data");
      } else {
        throw new Error("Unexpected status code: " + response.status);
      }
    } catch (error) {
      console.error("Failed to fetch by cron:", error.message);
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
      }
    }
  }

  console.log("[CronScraper] finished");
}

run().catch((err) => {
  console.error("Unhandled error in CronScraper:", err);
  process.exitCode = 1;
});
