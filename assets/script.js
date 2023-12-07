// // target the button using the data attribute we added earlier
// const button = document.querySelector("[data-theme-toggle]");

// button.addEventListener("click", () => {
//   const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

//   // update the button text
//   const newCta = newTheme === "dark" ? "Change to light theme" : "Change to dark theme";
//   button.innerText = newCta;  

//   // use an aria-label if you are omitting text on the button
//   // and using sun/moon icons, for example
//   button.setAttribute("aria-label", newCta);

//   // update theme attribute on HTML to switch theme in CSS
//   document.querySelector("html").setAttribute("data-theme", newTheme);

//   // update in local storage
//   localStorage.setItem("theme", newTheme);

//   // update the currentThemeSetting in memory

//Date pickcer code
let startDate = $('#startDate')
let endDate = $('#endDate')
let startDateVal;
let endDateVal;
var today=dayjs().format("YYYY-MM-DD");
startDate.on('change',(e)=>{
    var dateToday = dayjs().toDate();
    var selectedDate = new Date(e.target.value)
  if(selectedDate >= dateToday) {
  startDateVal = e.target.value;
} else {
    e.target.value = today;
    startDateVal = e.target.value;
    $("#EndDateError").text("Departure date cannot be before today")
}
})

endDate.on('change',(e)=>{
  if(e.target.value > startDateVal) {
  endDateVal = e.target.value;
  $("#EndDateError").text("")
  } else {
  e.target.value = startDateVal;
  $("#EndDateError").text("Return date cannot be before departure date")
  }
}) 

var fromCode; //var to be used as api parameter for departure airport code
var toCode; //var to be used as api parameter for arrival airport code
var toCity; //var to be used as api parameter for hotel city

//From field autocomplete
$(document).ready(function() { 
    var autocomplete = [];
    var names = $.map(airports, function(o) { return o["name"]; }) 
    var codes = $.map(airports, function(o) { return o["iata"]; })
    var cities = $.map(airports, function(o) { return o["city"]; })
    var searchCodes = [];
    for(i=0;i<names.length;i++) {
        if(names[i].search("Station") == -1) {
            if(cities[i].search($("#from").val()) != -1 || codes[i].search($("#from").val()) != -1) {
            autocomplete.push(String(cities[i] + " " + codes[i] + " - " + names[i]));
            searchCodes.push(codes[i])
        }
    }
    }
    var fromValue;
    $("#from").autocomplete({
    source: autocomplete,                
    select : showResult, 

    });
    function showResult(event, ui) { 
        fromValue = ui.item.label 
        console.log(fromValue)
        var index = autocomplete.indexOf(fromValue);
        console.log(index)
        fromCode = searchCodes[index]
        console.log(fromCode)
    } 
 

})

//To field autocomplete
$(document).ready(function() { 
    var autocomplete = [];
    var names = $.map(airports, function(o) { return o["name"]; }) 
    var codes = $.map(airports, function(o) { return o["iata"]; })
    var cities = $.map(airports, function(o) { return o["city"]; })
    var searchCodes = [];
    var searchCities = [];
    for(i=0;i<names.length;i++) {
        if(names[i].search("Station") == -1) {
            if(cities[i].search($("#to").val()) != -1 || codes[i].search($("#to").val()) != -1) {
            autocomplete.push(String(cities[i] + " " + codes[i] + " - " + names[i]));
            searchCodes.push(codes[i])
            searchCities.push(cities[i])
        }
    }
    }
    var fromValue;
    $("#to").autocomplete({
    source: autocomplete,                
    select : showResult, 

    });
    function showResult(event, ui) { 
        fromValue = ui.item.label 
        console.log(fromValue)
        var index = autocomplete.indexOf(fromValue);
        console.log(index)
        toCode = searchCodes[index]
        toCity = searchCities[index]
        console.log(fromCode, toCode, toCity)
    } 
 

})

// weather API from https://openweathermap.org/
var apiKey = "1fd1536f1b205d864c414f1b46152fdb";
var apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";  
var searchBox = document.querySelector(".search input");
var searchBtn = document.querySelector(".search button");

var data;

function checkWeather(city) { 
    var response = fetch(apiurl + city + `&appid=${apiKey}`).then(function (response) {
             return response.json();
           })
           .then(function (data) {
             console.log(data);
             document.querySelector(".city").innerHTML = data.name;
document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

           })

     
}
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
    console.log(JSON.stringify(data));

})