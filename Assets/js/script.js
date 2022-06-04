//create cities array to store all the cities
var cities = []
//Query selects all the possible id that are being used in HTML in order for the code to work
var startButtonEl = document.querySelector("#city-input")
var inputEl = document.querySelector("#City")
var tempEl = document.querySelector("#temperature")
var humidityEl = document.querySelector("#humidity")
var windEl = document.querySelector("#wind-speed")
var indexEl = document.querySelector("#uv-index")
var searchEl = document.querySelector("#search")
var dateEl = document.querySelector("#current-city")
//OneEl to fiveEl has to do with 5 day forecast
var DayOneEl = document.querySelector("#Day1")
var DayTwoEl = document.querySelector("#Day2")
var DayThreeEl = document.querySelector("#Day3")
var DayFourEl = document.querySelector("#Day4")
var DayFiveEl = document.querySelector("#Day5")
// Query selects for day one
var tempEl1 = document.querySelector("#temp")
var windEl1 = document.querySelector("#Wind")
var humidityEl1 = document.querySelector("#Humidity")
// day two
var tempEl2 = document.querySelector("#temp1")
var windEl2 = document.querySelector("#Wind1")
var humidityEl2 = document.querySelector("#Humidity1")
// day three
var tempEl3 = document.querySelector("#temp2")
var windEl3 = document.querySelector("#Wind2")
var humidityEl3 = document.querySelector("#Humidity2")
// day four
var tempEl4= document.querySelector("#temp3")
var windEl4 = document.querySelector("#Wind3")
var humidityEl4 = document.querySelector("#Humidity3")
//day five
var tempEl5= document.querySelector("#temp4")
var windEl5 = document.querySelector("#Wind4")
var humidityEl5 = document.querySelector("#Humidity4")
// created varibales for longitude and latitude 
var longitude;
var latitude;
//created the function names searchcity and set cityname as the parameter
var searchCity = function(cityName) {
    console.log(cityName)
    //states the open weather URL
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=f5ccb9b7972cddbc717a1372851cbb3b&units=imperial"
    // fetch the url into the function called response to get all the data we stated above in the URL
 fetch(apiUrl).then(function(response) {
     // check if the response works
    if (response.ok) {
        //then we call the function data
        response.json().then(function(data) {
            //and add text content to the details we need in this instance temperature
            tempEl.textContent = data.main.temp;
            // added text content to get humidity
            humidityEl.textContent = data.main.humidity;
            // added text content to get wind speed
            windEl.textContent = data.wind.speed;
            console.log(data)
            // set longitude and latitude to their values using object within an object within an object technique
            longitude = data.coord.lon
            console.log(longitude)
            latitude = data.coord.lat
            console.log(latitude)
            //we added text content to get the name of the city we put in
            dateEl.textContent = data.name;
            // created a moment function to ge the date
            var date = moment();
            //using unix method with retrieve the date in the format we desire
            var currentDate = moment.unix(data.dt).format("MM/DD/YYYY");
            //then we add text content to the data to retrieve the current date
            dateEl.textContent += " " + currentDate;
            
             //then within one fetch we add another fetch to get the UV index and for that used latitude and longitude
             fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=alerts,minutely,hourly&units=imperial&appid=f5ccb9b7972cddbc717a1372851cbb3b')
             //then we pass a function respone
            .then(function(response) {
                // to see if the response is ok
                if (response.ok) {
                    //we then call another function called data
                    response.json().then(function(data) {
                        console.log(data)
                        //this is wehere [1] and [2] would represent the days and according to the date will be formatted since the array starts from [0] [1] would show tommorrows date [2] would show the day after and so on..
                        var dayOneForecast = moment.unix(data.daily[1].dt).format('MM/DD/YY');
                        //text context is a must or we will not be able to display the daye
                        DayOneEl.textContent = dayOneForecast
                        //Day 2 date would be shown remember since [0] would be current date [1] would be day 1 after the current date
                        var dayTwoForecast = moment.unix(data.daily[2].dt).format('MM/DD/YY');
                        DayTwoEl.textContent = dayTwoForecast
                        // Day 3 after the current date
                        var dayThreeForecast = moment.unix(data.daily[3].dt).format('MM/DD/YY');
                        DayThreeEl.textContent = dayThreeForecast
                        // Day 4 after the current date
                        var dayFourForecast = moment.unix(data.daily[4].dt).format('MM/DD/YY');
                        DayFourEl.textContent = dayFourForecast
                        //Day 5 after the current date
                        var dayFiveForecast = moment.unix(data.daily[5].dt).format('MM/DD/YY');
                        DayFiveEl.textContent = dayFiveForecast
                        //here we add the add text content to UV index [0] since we only need it for the current date
                        indexEl.textContent = data.daily[0].uvi;

                        //then we added the textcontent from day 1 to day 5 to get the temperature
                        tempEl1.textContent =  "Temp: "  +  data.daily[1].temp.day
                        tempEl2.textContent =  "Temp: "  +  data.daily[2].temp.day
                        tempEl3.textContent =  "Temp: "  +  data.daily[3].temp.day
                        tempEl4.textContent =  "Temp: "  +  data.daily[4].temp.day
                        tempEl5.textContent =  "Temp: "  +  data.daily[5].temp.day
                        
                        //then we added the textcontent from day 1 to day 5 to get the humidity
                        humidityEl1.textContent = "Humidity: " + data.daily[1].humidity
                        humidityEl2.textContent = "Humidity: " + data.daily[2].humidity
                        humidityEl3.textContent = "Humidity: " + data.daily[3].humidity
                        humidityEl4.textContent = "Humidity: " + data.daily[4].humidity
                        humidityEl5.textContent = "Humidity: " + data.daily[5].humidity

                        //then we added the textcontent from day 1 to day 5 to get the temperature
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

// we created an event listner function 
startButtonEl.addEventListener("click", function() {
    //this query selects input meaning the place where the user would type in the city name
    var citySearch = document.querySelector("#input");
    //then using push method we push that city 
    cities.push(citySearch.value)
    //we called the searchcity function here since it will all come into affect once user enters something 
    searchCity(citySearch.value)
    //we called the display cities function here
    displayCities(citySearch.value)
    
})
//this is were display cities function gets created and given a parameter called saveSearchHistory
var displayCities = function(saveSearchHistory) {
    //we created an element button 
    var button = document.createElement("button")
    //gave it a text content
    button.textContent = saveSearchHistory;
    console.log(button);
    // we then add an event listner
    button.addEventListener("click", function(event){
        // then when we click the button it will target the text content
        var clickedItem = event.target.textContent;
        //and it will be clicked through this function
        searchCity(clickedItem);
        //Using the local storage we save each input as an array using JSON.stringfy
        searchEl = localStorage.getItem("FindCity")
    localStorage.setItem("FindCity", JSON.stringify(cities))
    })
    
    
    // we append the button here
    searchEl.appendChild(button);
}

        
 
     
 

