const fetchNames = async (query) => {
    if (!query) 
    {
        return [];
    }
    const res = await fetch(`http://localhost:5000/api/airport/name?q=${query}`)
    if (!res.ok) return [];
    return res.json();
}

export default fetchNames;