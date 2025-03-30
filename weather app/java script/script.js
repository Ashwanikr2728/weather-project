const apiKey = "39a4d6b053b2148b5194671803045e46";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");    // added for takin search city input in firstpage
const startBtn = document.querySelector(".startBtn");         // added for searh button in firstpage

const searchBox2 = document.querySelector(".search2 input");  // added for takin city input in weather page
const searchBtn2 = document.querySelector(".searchBtn2");  // Added for search button in weather page

const searchBox3 = document.querySelector(".search3 input");  // added for takin city input in error page
const searchBtn3 = document.querySelector(".searchBtn3"); // Added for seach button in error page

const weatherIcon = document.querySelector(".weather-icon");

startBtn.addEventListener("click", function () {
    let firstPage = document.querySelector(".firstPage");
    let weather = document.querySelector(".weather");

    // Toggle first page and weather visibility
    if (firstPage.style.display === "block" || firstPage.style.display === "") {
        firstPage.style.display = "none";  
        weather.style.display = "block";   
    } else {
        firstPage.style.display = "block";  
        weather.style.display = "none";    
    }

    // Hide weather and error pages initially
    document.querySelector(".weather").style.display = "none"; 
    document.querySelector(".error").style.display = "none";   

    // Fetch weather data for the city entered on the first page
    if (searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    }

    // Clear the first search box after search
    searchBox.value = "";

    if(searchBox2.value.trim()!==""){
        checkWeather(searchBox2.value);
    }
});

// Add event listener to the search button in the weather page (searchBtn2)
searchBtn2.addEventListener("click", function () {
    const city = searchBox2.value.trim();  // Get city name from the second search input

    if (city !== "") {
        // Hide previous weather details and error
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".error").style.display = "none";
        
        // Fetch new weather data based on the second search input
        checkWeather(city);

        // Clear the search box after search
        searchBox2.value = "";
    }
});
searchBtn3.addEventListener("click", function () {
    const city = searchBox3.value.trim();  // Get city name from the second search input

    if (city !== "") {
        // Hide previous weather details and error
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".error").style.display = "none";
        
        // Fetch new weather data based on the second search input
        checkWeather(city);

        // Clear the search box after search
        searchBox3.value = "";
    }
});



async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
        // Show error page if city is not found
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".error").style.display = "block";
        return;  // Stop execution if error occurs
    } else {
        var data = await response.json();

        // Populate weather data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        // Set the weather icon based on the weather condition
        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "images/cloudd.png";
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "images/clearr.png";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "images/drizzlee";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "images/mist.png";
        }

        // Show weather page and hide error page if data is valid
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}
