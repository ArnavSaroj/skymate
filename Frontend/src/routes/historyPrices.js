const API_BASE_URL = "https://skymate-backend-only.onrender.com/api/historicPrice";

const historyPrices = async (body) => {
  try {
    const res = await fetch(API_BASE_URL, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body), 
    });

    if (!res.ok) {
      throw new Error("Some error occurred");
    }

    const data = await res.json(); 
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export default historyPrices;