export async function getAdress (ip = '8.8.8.8') {
    const response = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_zqYJGGvnY27Qp84sN5woMi5uY3YyH&ipAddress=${ip}`)
    
    return await response.json()
}