var cities = []

var startButtonEl = document.querySelector("#city-input")
var inputEl = document.querySelector("#City")
var tempEl = document.querySelector("#temperature")
var humidityEl = document.querySelector("#humidity")
var windEl = document.querySelector("#wind-speed")
var indexEl = document.querySelector("#uv-index")
var searchEl = document.querySelector("#search")
var dateEl = document.querySelector("#current-city")
var DayOneEl = document.querySelector("#Day1")
var DayTwoEl = document.querySelector("#Day2")
var DayThreeEl = document.querySelector("#Day3")
var DayFourEl = document.querySelector("#Day4")
var DayFiveEl = document.querySelector("#Day5")

var tempEl1 = document.querySelector("#temp")
var windEl1 = document.querySelector("Wind")
var humidityEl1 = document.querySelector("#Humidity")

var tempEl2 = document.querySelector("#temp1")
var windEl2 = document.querySelector("#Wind1")
var humidityEl2 = document.querySelector("#Humidity1")

var tempEl3 = document.querySelector("#temp2")
var windEl3 = document.getElementById('Wind2')
var humidityEl3 = document.querySelector("#Humidity2")

var tempEl4= document.querySelector("#temp3")
var windEl4 = document.querySelector("#Wind3")
var humidityEl4 = document.querySelector("#Humidity3")

var tempEl5= document.querySelector("#temp4")
var windEl5 = document.querySelector("#Wind4")
var humidityEl5 = document.querySelector("#Humidity4")

var longitude;
var latitude;

var searchCity = function(cityName) {
    console.log(cityName)
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=f5ccb9b7972cddbc717a1372851cbb3b&units=imperial"
    
 fetch(apiUrl).then(function(response) {
    if (response.ok) {
        response.json().then(function(data) {
            tempEl.textContent = data.main.temp;
            humidityEl.textContent = data.main.humidity;
            windEl.textContent = data.wind.speed;
            console.log(data)
            longitude = data.coord.lon
            console.log(longitude)
            latitude = data.coord.lat
            console.log(latitude)

            dateEl.textContent = data.name;
            
            var date = moment();
            var currentDate = moment.unix(data.dt).format("MM/DD/YYYY");
            dateEl.textContent += " " + currentDate;
            
         
             fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=alerts,minutely,hourly&units=imperial&appid=f5ccb9b7972cddbc717a1372851cbb3b')
            .then(function(response) {
                if (response.ok) {
                    response.json().then(function(data) {
                        console.log(data)
                        var dayOneForecast = moment.unix(data.daily[1].dt).format('MM/DD/YY');
                        DayOneEl.textContent = dayOneForecast
                        var dayTwoForecast = moment.unix(data.daily[2].dt).format('MM/DD/YY');
                        DayTwoEl.textContent = dayTwoForecast
                        var dayThreeForecast = moment.unix(data.daily[3].dt).format('MM/DD/YY');
                        DayThreeEl.textContent = dayThreeForecast
                        var dayFourForecast = moment.unix(data.daily[4].dt).format('MM/DD/YY');
                        DayFourEl.textContent = dayFourForecast
                        var dayFiveForecast = moment.unix(data.daily[5].dt).format('MM/DD/YY');
                        DayFiveEl.textContent = dayFiveForecast
                        indexEl.textContent = data.daily[0].uvi;


                        tempEl1.textContent =  "Temp: "  +  data.daily[1].temp.day
                        tempEl2.textContent =  "Temp: "  +  data.daily[2].temp.day
                        tempEl3.textContent =  "Temp: "  +  data.daily[3].temp.day
                        tempEl4.textContent =  "Temp: "  +  data.daily[4].temp.day
                        tempEl5.textContent =  "Temp: "  +  data.daily[5].temp.day
                        
                       
                        humidityEl1.textContent = "Humidity: " + data.daily[1].humidity
                        humidityEl2.textContent = "Humidity: " + data.daily[2].humidity
                        humidityEl3.textContent = "Humidity: " + data.daily[3].humidity
                        humidityEl4.textContent = "Humidity: " + data.daily[4].humidity
                        humidityEl5.textContent = "Humidity: " + data.daily[5].humidity

                        windEl1.textContent = "Wind: " + data.daily[1].wind_speed
                        windEl2.textContent = "Wind: " + data.daily[2].wind_speed
                        windEl3.textContent = "Wind: " + data.daily[3].wind_speed
                        windEl4.textContent = "Wind: " + data.daily[4].wind_speed
                        windEl5.textContent = "Wind: " + data.daily[5].wind_speed

                        

                        
                        
                        
                        
                    })
                }
            })
            
            



        });
    }
})}


startButtonEl.addEventListener("click", function() {
    var citySearch = document.querySelector("#input");
   
    cities.push(citySearch.value)
  
    searchCity(citySearch.value)

    displayCities(citySearch.value)
    
})

var displayCities = function(saveSearchHistory) {
    searchEl = localStorage.getItem("FindCity")
    localStorage.setItem("FindCity", JSON.stringify(cities) )
    var button = document.createElement("button")
    button.textContent = saveSearchHistory;
    console.log(button);
    button.addEventListener("click", function(event){
        //getting text
        var clickedItem = event.target.textContent;
        //calling weather function with new text
        searchCity(clickedItem);
    })
    searchEl.appendChild(button);
}

        
 
     
 

