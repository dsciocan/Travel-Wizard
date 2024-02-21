
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
console.log(startDateVal)
})



endDate.on('change',(e)=>{
  if(e.target.value > startDateVal) {
  endDateVal = e.target.value;
  $("#EndDateError").text("")
  } else {
  e.target.value = startDateVal;
  endDateVal = e.target.value;
  $("#EndDateError").text("Return date cannot be before departure date")
  }
  console.log(endDateVal)
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
// the city name comes from the input field  
var searchBox = document.querySelector(".search input");
var searchBtn = document.querySelector(".search button");
// "data" gets all the infor about the weather from the selected city 
var data;
// create a function to get the information from the api
function checkWeather(city) { 
    var response = fetch(apiurl + city + `&appid=${apiKey}`).then(function (response) {
             return response.json();
           })
           .then(function (data) {
             console.log(data);
// select elements from html to update the data we need to display
document.querySelector(".city").innerHTML = data.name;
document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

           })

     
}
// create a button to send the info input to checkWeather()
// searchBtn.addEventListener("click", () => {
    

// })


// var adultNumber;
// var seniorNumber; 
// var totalNumber;

// $("#adult-dropdown").on('change', function(){
//     adultNumber = $("#adult-dropdown option:selected").text();
//     console.log(adultNumber);
//     totalNumber = Number(adultNumber) + Number(seniorNumber);
//     console.log(totalNumber)
// });


// $("#senior-dropdown").on('change', function(){
//     seniorNumber = $("#senior-dropdown option:selected").text();
//     totalNumber = Number(adultNumber) + Number(seniorNumber);
//     console.log(seniorNumber);
//     console.log(totalNumber)
// });


var loading;


// Search button press

$("#search-button").on('click', function() {
    loading = $('<h3 class="loading">').text("Please wait while we get your results. In the meantime check out our suggestions!");
    $(".results").prepend(loading)
    flightInfo()
    // initiateHotelSearch();
    checkWeather(toCity);
    console.log(JSON.stringify(data));
    getToken();
});


function flightInfo() {
    var DEV_MODE = false;
    var flightData;
    if(DEV_MODE){
        var preloadedResponse = JSON.parse(response);
        flightData = preloadedResponse.data.flights;
        console.log(flightData);  
        for(i=0;i<3;i++) {
            var cardDiv = $('<div id = "flightDetails"></div>');
            var firstRow = $('<div class = row></div>');
            var secondRow = $('<div class = row></div>');
            var thirdRow = $('<div class = "row"></div>');
            var fourthRow = $('<div class= "row button-row"></div>')
            var flightNameDepart = $("<h5>").text("Departure flight: " + flightData[i].segments[0].legs[0].originStationCode + " (" + flightData[i].segments[0].legs[0].departureDateTime.substring(0,10) + " , " + flightData[i].segments[0].legs[0].departureDateTime.substring(12,16) + " )" +  " - " + flightData[0].segments[0].legs[0].destinationStationCode + " (" + flightData[i].segments[0].legs[0].arrivalDateTime.substring(0,10) + " , " + flightData[i].segments[0].legs[0].arrivalDateTime.substring(12,16) + " )");
            var flightNameReturn = $("<h5>").text("Return Flight: " + flightData[i].segments[1].legs[0].originStationCode + " (" + flightData[i].segments[1].legs[0].departureDateTime.substring(0,10) + " , " + flightData[i].segments[1].legs[0].departureDateTime.substring(12,16) + " )" +  " - " + flightData[0].segments[1].legs[0].destinationStationCode + " (" + flightData[i].segments[1].legs[0].arrivalDateTime.substring(0,10) + " , " + flightData[i].segments[1].legs[0].arrivalDateTime.substring(12,16) + " )");
            var airline = $("<p>").text("Airline: " + flightData[i].purchaseLinks[0].providerId);
            var price = $("<p>").text("Total price: " + flightData[i].purchaseLinks[0].totalPrice + "GBP").addClass("flight-price");
            var purchaseLink = $('<button type="button" class="btn btn-dark col-lg-2 flight-btn"><a href=' + flightData[i].purchaseLinks[0].url +'>Purchase Here</a></button>');
            firstRow.append(flightNameDepart);
            secondRow.append(flightNameReturn)
            thirdRow.append(airline, price);
            fourthRow.append(purchaseLink);
            cardDiv.append(firstRow, secondRow, thirdRow, fourthRow)
            $(".flight-cards").append(cardDiv);
        }
        $("#results").removeClass("hidden");
        loading.addClass("hidden")
    }
    else{
        const url = "https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights?sourceAirportCode=" + fromCode + "&destinationAirportCode=" + toCode + "&date=" + startDateVal + "&itineraryType=ROUND_TRIP&sortOrder=PRICE&numAdults=1&numSeniors=0&classOfService=ECONOMY&returnDate=" + endDateVal + "&pageNumber=1&currencyCode=GBP";
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'db33c1e3fbmsh3306c740b331275p182a48jsnd483e7640601',
                'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
            }
        };
        console.log(url)
        try {
            fetch(url, options).then(function (response) {
              return response.json();
            })
            .then(function (data) {
                console.log(data)
                flightData = data.data.flights;
                for(i=0;i<3;i++) {
                    var cardDiv = $('<div id = "flightDetails"></div>');
                    var firstRow = $('<div class = row></div>');
                    var secondRow = $('<div class = row></div>');
                    var thirdRow = $('<div class = "row"></div>');
                    var fourthRow = $('<div class= "row button-row"></div>')
                    var flightNameDepart = $("<h5>").text("Departure flight: " + flightData[i].segments[0].legs[0].originStationCode + " (" + flightData[i].segments[0].legs[0].departureDateTime.substring(0,10) + " , " + flightData[i].segments[0].legs[0].departureDateTime.substring(12,16) + " )" +  " - " + flightData[0].segments[0].legs[0].destinationStationCode + " (" + flightData[i].segments[0].legs[0].arrivalDateTime.substring(0,10) + " , " + flightData[i].segments[0].legs[0].arrivalDateTime.substring(12,16) + " )");
                    var flightNameReturn = $("<h5>").text("Return Flight: " + flightData[i].segments[1].legs[0].originStationCode + " (" + flightData[i].segments[1].legs[0].departureDateTime.substring(0,10) + " , " + flightData[i].segments[1].legs[0].departureDateTime.substring(12,16) + " )" +  " - " + flightData[0].segments[1].legs[0].destinationStationCode + " (" + flightData[i].segments[1].legs[0].arrivalDateTime.substring(0,10) + " , " + flightData[i].segments[1].legs[0].arrivalDateTime.substring(12,16) + " )");
                    var airline = $("<p>").text("Airline: " + flightData[i].purchaseLinks[0].providerId);
                    var price = $("<p>").text("Total price from: " + flightData[i].purchaseLinks[0].totalPrice + "GBP").addClass("flight-price");
                    var purchaseLink = $('<button type="button" class="btn btn-dark col-lg-2 flight-btn"><a href=' + flightData[i].purchaseLinks[0].url +'>Purchase Here</a></button>');
                    firstRow.append(flightNameDepart);
                    secondRow.append(flightNameReturn)
                    thirdRow.append(airline, price);
                    fourthRow.append(purchaseLink);
                    cardDiv.append(firstRow, secondRow, thirdRow, fourthRow)
                    $(".flight-cards").append(cardDiv);
                }
                $("#results").removeClass("hidden");
                loading.addClass("hidden");
            })
        } catch (error) {
            console.error(error);
        }
    }
 
}


//hotel search 
let token;
function getToken() {
    fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials&client_id=dz4cRgXFZjSpBxBB4XAfW8ku8I5kJGyy&client_secret=DYBVT7v3LUwz24Tu'
      })
      .then (function(response) {
        return response.json();
      })
      .then(function (data) {
        token = data.access_token
        console.log(token)
        hotel(token)
      })
}


    function hotel(token) {
        const url = `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${toCode}&radius=10&radiusUnit=KM&ratings=4,5&hotelSource=ALL`;
        const options = {method:"get",
        headers: {
            'Content-Type': "/reference-data/locations/hotels/by-city",
            'Authorization' : `Bearer ${token}`}}
                try {

                    fetch(url, options)
                    .then(function (response) {
                      return response.json();
                    })
                    .then(function (data) {
                        console.log(data)
                        for (i=0;i<5;i++) {
                            var cardDiv = $(`<div class = "hotelDetails" id=${data.data[i].hotelId}></div>`);
                            var firstRow = $('<div class = row></div>');
                            var secondRow = $('<div class = row></div>');
                            var thirdRow = $('<div class = "row"></div>');
                            var hotelName = $("<h5>").text("Hotel Name: " + data.data[i].name);
                            var hotelRating = $("<h5>").text("Rating: " + data.data[i].rating + "/5");
                            var details = $('<button type="button" class="btn btn-dark col-lg-2 hotel-btn"> View Details <button/>');
                            details.on("click", () => {
                                hotelDetails(data.data[i].hotelId)
                            });
                            firstRow.append(hotelName);
                            secondRow.append(hotelRating)
                            thirdRow.append(details);
                            cardDiv.append(firstRow, secondRow, thirdRow);
                            $(".hotel-cards").append(cardDiv);
                    
                                  }
                        $("#results").removeClass("hidden");
                        loading.addClass("hidden");

                    })
    }

catch (error) {
    console.error(error);
}
    }

    // onclick=${hotelDetails(data.data[i].hotelId)}


    function hotelDetails(id) {
        const indUrl = `https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=${id}&adults=1&checkInDate=${startDateVal}&checkOutDate=${endDateVal}&roomQuantity=1&currency=GBP&paymentPolicy=NONE&includeClosed=false&bestRateOnly=true`
        const indOptions = {method:"get",
        headers: {
            'Content-Type': "/shopping/hotel-offers",
            'Authorization' : `Bearer ${token}`}}
            fetch(indUrl, indOptions)
            .then(function (response) {
                if(response) {
                return response.json();
                } else {
                    const fourthRow = $('<div class = row></div>')
                    const error = $('<p>').text(`Hotel unavailable, please try another hotel or destination.`)
                    fourthRow.append(error)
                    $(`#${id}`).append(fourthRow)
                }
              })
              .then(function (data) {
                if(data) {
                const avail = data.data[0].available;
                const fourthRow = $('<div class = row></div>')
                const fifthRow = $('<div class = row></div>')
                if(avail == true) {
                    let available = $('<p>').text("Available")
                    let price = $('<p>').text(`Price: ${data.data[0].offers[0].price.total}GBP`)
                    let type = $('<p>').text(`Room Type: ${data.data[0].offers[0].room.typeEstimated.bedType}`)
                    let description = $('<p>').text(`Room Description: ${data.data[0].offers[0].room.description}`)
                    fourthRow.append(available, price, type)
                    fifthRow.append(description)
                    cardDiv.append(fourthRow, fifthRow)

                } else if(avail == false || data.status == "400") {
                    let available = $('<p>').text("Unavailable")
                    fourthRow.append(available)
                    cardDiv.append(fourthRow)
                }
            }
                //     hotelList.push({id: data.data[0].hotel.hotelId, name: data.data[0].hotel.name, price: data.data[0].offers.price.total})
                // } else if(data[0].offers.price.total < hotelList[0].price) {
                //     hotelList.unshift({id: data.data[0].hotel.hotelId, name: data.data[0].hotel.name, price: data.data[0].offers.price.total})
                // }
    })
}


    // const hotelCode = data.data[i].hotelId;
    // const indUrl = `https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=${hotelCode}&adults=1&checkInDate=${startDateVal}&checkOutDate=${endDateVal}&roomQuantity=1&currency=GBP&paymentPolicy=NONE&includeClosed=false&bestRateOnly=true`
    // const indOptions = {method:"get",
    // headers: {
    //     'Content-Type': "/shopping/hotel-offers",
    //     'Authorization' : `Bearer ${token}`}}
    //     fetch(indUrl, indOptions).then(function (response) {
    //         return response.json();
    //       })
    //       .then(function (data) {
    //         if(hotelList.length = 0) { 
    //             hotelList.push({id: data.data[0].hotel.hotelId, name: data.data[0].hotel.name, price: data.data[0].offers.price.total})
    //         } else if(data[0].offers.price.total < hotelList[0].price) {
    //             hotelList.unshift({id: data.data[0].hotel.hotelId, name: data.data[0].hotel.name, price: data.data[0].offers.price.total})
    //         }
    //         if(hotelList.length > 5) {
    //             hotelList.length = 5
    //         }

// // Bahar - Tripadvisor Hotel Search
//     // API Key, Url
//     const HotelApiKey = 'EF7B1C98A7D0465FAEADD693B60AA8B5';
//     const baseUrl = 'https://api.tripadvisor.com/poi/v1/';
//     // Search hotels on TripAdvisor
//     function searchHotelsOnTripAdvisor(destination) {
//         const endpoint = `${baseUrl}hotels`;
//         const params = {
//             apikey: apiKey,
//             q: destination,
//             limit: 5 // Show "xxx"(10) amount of hotels on search
//         };
//         const queryString = new URLSearchParams(params).toString();
//         const url = `${endpoint}?${queryString}`;
//         return fetch(url)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch hotels');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 return data.data;
//             });
//     }
//     // Display hotel information
//     function displayHotels(hotels) {
//         // Show hotels on UI
//     }
//     // Show after flight details
//     function initiateHotelSearch() {
//         const destination = $("#to").val(); // Fetch the destination from user input field
//         searchHotelsOnTripAdvisor(destination)
//             .then(displayHotels)
//             .catch(error => {
//                 console.error(error);
//                 $(".results .hotel-cards").html("<p>Failed to fetch hotel information.</p>");
//             });
//     }
//     // Hotel search when button clicked
//     // $("#search-button").on('click', function () {

//     // });
    



//variable names for destination city: toCity departure date: startDateVal return date: endDateVal
//add info to the div with the weather-cards class
