const API_BASE_URL = "https://skymate-backend-only.onrender.com/api";


export const SearchApi = async (body) => {
  // accept startDate/endDate and other variants
  const params = new URLSearchParams({
    from: body.from || "",
    to: body.to || "",
    departure: body.departure ||  "",
    returnDate: body.returnDate ?? body.return ?? body.endDate ?? "",
  }).toString();

  const url = `${API_BASE_URL}/SearchFlights?${params}`;

  try {
    const res = await fetch(url, { method: "GET" });
    const text = await res.text();
    let json;
    try {
      json = text ? JSON.parse(text) : null;
    } catch (e) {
      json = null;
    }

    if (!res.ok) {
      const bodyPreview = json || text || "<empty>";
      throw new Error(`Server ${res.status} ${res.statusText}: ${JSON.stringify(bodyPreview)}`);
    }

    return json;
  } catch (err) {
    console.error("[SearchApi] fetch error:", err);
    throw new Error(err.message || "failed to get data, try again");
  }
};

export default SearchApi;