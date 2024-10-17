const weatherImages = {
    clear: 'images/clear.png',
    rain: 'images/rain.png',
    snow: 'images/snow.png',
    cloudy: 'images/cloudy.png',
    default: 'images/default.png' // Fallback image
};
async function fetchWeatherDetails(latitude, longitude){
const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?lat=${latitude}&lon=${longitude}`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '2582e59e0bmshc01afd5931fd5d2p19c022jsn643604a8dd31',
		'x-rapidapi-host': 'weather-by-api-ninjas.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);

    document.querySelector(".temp").innerHTML = result.temp + "°C";
    document.querySelector(".humidity").innerHTML = result.wind_speed + "%";
    document.querySelector(".wind").innerHTML = result.humidity+ "km/hr";
    document.querySelector(".latdeg").innerHTML = searchLatitude.value+ "° N";
    document.querySelector(".longdeg").innerHTML = searchLongitude.value + "° W";
    let imagePath = weatherImages.default; // Default image

        // Add conditions based on the API response
        if (result.temp < 0) {
            imagePath = weatherImages.snow; // Cold temperature indicates snow
        } else if (result.humidity > 80) {
            imagePath = weatherImages.rain; // High humidity indicates rain
        } else if (result.temp > 20) {
            imagePath = weatherImages.clear; // Warm temperature indicates clear
        } else {
            imagePath = weatherImages.cloudy; // Assume cloudy otherwise
        }

        document.querySelector(".weather-icon").src = imagePath;
} catch (error) {
	console.error(error);
}
}
const searchLatitude = document.querySelector(".lat");
const searchLongitude = document.querySelector(".long");
const searchBtn = document.querySelector(".search button");

searchBtn.addEventListener("click",()=>{
    fetchWeatherDetails(searchLatitude.value,searchLongitude.value);
})
