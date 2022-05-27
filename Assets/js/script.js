var nameEl = document.querySelector("#city-input")
var inputEl = document.querySelector("#City")

var searchCity = function() {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"
    
 fetch(apiUrl).then(function(response) {
    if (response.ok) {
        response.json().then(function(data) {
          displayCities(data);
        });
      } else {
        alert("Error: City not found");
      }
      })
      .catch(function() {
           alert ("Unable to connect");
      })
 };
searchCity();

var citySearch = function(event) {
    event.preventDefault();
    var City = inputEl.value.trim();
}

var displayCities = function() {
    

}
nameEl.addEventListener("search", searchCity)