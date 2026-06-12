const BASE_URL = 'https://fakestoreapi.com';

//function used for calling api
async function fetchData(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Fetch API error:", error);
        throw error;
    }
}