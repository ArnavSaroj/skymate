const currentDate = new Date();

const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, "0");
const day = String(currentDate.getDate()).padStart(2, "0");

const formattedDate = `${year}-${month}-${day}`;

const oneMonth = String(currentDate.getMonth() + 2).padStart(2, "0");
const oneMonthAfterDate = `${year}-${oneMonth}-${day}`;

export const ScrapingRoutes = [
  // Top 8 major Indian flight routes by passenger volume/popularity
  {
    origin: "DEL",
    destination: "BLR",
    startDate: formattedDate,
    endDate: oneMonthAfterDate,
  }, // Delhi - Bengaluru
  {
    origin: "BOM",
    destination: "LKO",
    startDate: formattedDate,
    endDate: oneMonthAfterDate,
  }, {
    origin: "LKO",
    destination: "BOM",
    startDate: formattedDate,
    endDate: oneMonthAfterDate,
  }, 
    {
    origin: "DEL",
    destination: "HYD",
    startDate: formattedDate,
    endDate: oneMonthAfterDate,
  }, // Delhi - Hyderabad
  {
    origin: "DEL",
    destination: "MAA",
    startDate: formattedDate,
    endDate: oneMonthAfterDate,
  }, // Delhi - Chennai
  {
    origin: "BOM",
    destination: "BLR",
    startDate: formattedDate,
    endDate: oneMonthAfterDate,
  }, // Mumbai - Bengaluru
  {
    origin: "BOM",
    destination: "HYD",
    startDate: formattedDate,
    endDate: oneMonthAfterDate,
  }, // Mumbai - Hyderabad
  {
    origin: "BLR",
    destination: "HYD",
    startDate: formattedDate,
    endDate: oneMonthAfterDate,
  }, // Bengaluru - Hyderabad
  {
    origin: "DEL",
    destination: "CCU",
    startDate: formattedDate,
    endDate: oneMonthAfterDate,
  }, // Delhi - Kolkata
  {
    origin: "DEL",
    destination: "BOM",
    startDate: formattedDate,
    endDate: oneMonthAfterDate,
  }, // Delhi - Mumbai
  {
    origin: "BOM",
    destination: "DEL",
    startDate: formattedDate,
    endDate: oneMonthAfterDate,
  }, // Delhi - Mumbai
];
