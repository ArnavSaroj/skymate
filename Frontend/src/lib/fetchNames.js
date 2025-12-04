const fetchNames = async (query) => {
    if (!query) 
    {
        return [];
    }
    const res = await fetch(`https://skymate-backend-only.onrender.com/api/airport/name?q=${query}`)
    if (!res.ok) return [];
    return res.json();
}

export default fetchNames;