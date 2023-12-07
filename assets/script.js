
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
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
    console.log(JSON.stringify(data));

})
var adultNumber;
var seniorNumber; 
var totalNumber;

$("#adult-dropdown").on('change', function(){
    adultNumber = $("#adult-dropdown option:selected").text();
    console.log(adultNumber);
    totalNumber = Number(adultNumber) + Number(seniorNumber);
    console.log(totalNumber)
});


$("#senior-dropdown").on('change', function(){
    seniorNumber = $("#senior-dropdown option:selected").text();
    totalNumber = Number(adultNumber) + Number(seniorNumber);
    console.log(seniorNumber);
    console.log(totalNumber)
});


var loading;

$("#search-button").on('click', function() {
    loading = $('<h3 class="loading">').text("Please wait while we get your results. In the meantime check out our suggestions!");
    $(".results").prepend(loading)
    flightInfo()
});


function flightInfo() {
    var DEV_MODE = true;
    var response = `{
        "status": true,
        "message": "Success",
        "timestamp": 1701892706431,
        "data": {
        "session": {
            "searchHash": "859189d1b07683ffc3fb0004155923ba",
            "pageLoadUid": "1209d8b7-e498-4282-8396-aa62540b25b1",
            "searchId": "e9930935-e7bc-476d-a115-07f4f5ef9b0f.302",
            "filterSettings": {
            "aa": "CDG,ORY,BVA",
            "tt": "",
            "a": "",
            "d": "",
            "ns": "",
            "cos": "0",
            "fq": "",
            "al": "",
            "ft": "",
            "sid": "",
            "oc": "",
            "plp": "",
            "mc": "",
            "pRange": "-1,-1",
            "da": "LCY,LHR,LTN,LGW,SEN,STN",
            "ca": ""
            }
        },
        "complete": true,
        "numOfFilters": 1583,
        "totalNumResults": 1583,
        "flights": [
            {
            "segments": [
                {
                "legs": [
                    {
                    "originStationCode": "LTN",
                    "isDifferentOriginStation": false,
                    "destinationStationCode": "CDG",
                    "isDifferentDestinationStation": false,
                    "departureDateTime": "2023-12-07T07:00:00Z",
                    "arrivalDateTime": "2023-12-07T09:20:00+01:00",
                    "classOfService": "ECONOMY",
                    "marketingCarrierCode": "U2",
                    "operatingCarrierCode": "U2",
                    "amenities": [],
                    "flightNumber": 2435,
                    "seatGuruEquipmentId": 0,
                    "seatGuruAirlineUrl": "",
                    "numStops": 0,
                    "distanceInKM": 380.6494,
                    "isInternational": true,
                    "selfTransfer": false,
                    "operatingCarrier": {
                        "locationId": 8729066,
                        "code": "U2",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/easyJet.png",
                        "displayName": "easyJet"
                    },
                    "marketingCarrier": {
                        "locationId": 8729066,
                        "code": "U2",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/easyJet.png",
                        "displayName": "easyJet"
                    }
                    }
                ],
                "layovers": []
                },
                {
                "legs": [
                    {
                    "originStationCode": "CDG",
                    "isDifferentOriginStation": false,
                    "destinationStationCode": "SEN",
                    "isDifferentDestinationStation": true,
                    "departureDateTime": "2023-12-13T14:00:00+01:00",
                    "arrivalDateTime": "2023-12-13T14:05:00Z",
                    "classOfService": "ECONOMY",
                    "marketingCarrierCode": "U2",
                    "operatingCarrierCode": "U2",
                    "amenities": [],
                    "flightNumber": 4645,
                    "seatGuruEquipmentId": 0,
                    "seatGuruAirlineUrl": "",
                    "numStops": 0,
                    "distanceInKM": 314.34552,
                    "isInternational": true,
                    "selfTransfer": false,
                    "operatingCarrier": {
                        "locationId": 8729066,
                        "code": "U2",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/easyJet.png",
                        "displayName": "easyJet"
                    },
                    "marketingCarrier": {
                        "locationId": 8729066,
                        "code": "U2",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/easyJet.png",
                        "displayName": "easyJet"
                    }
                    }
                ],
                "layovers": []
                }
            ],
            "purchaseLinks": [
                {
                "purchaseLinkId": "SkyScanner|3|901",
                "providerId": "easyJet",
                "partnerSuppliedProvider": {
                    "id": "Optional[easy]",
                    "displayName": "easyJet",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/easy.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 85.34,
                "totalPricePerPassenger": 85.34,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13849",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|901&area=FLTCenterColumn|1|1|ItinList|2|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13849&totalPricePerPassenger=85.34"
                },
                {
                "purchaseLinkId": "SkyScanner|7|346",
                "providerId": "Mytrip",
                "partnerSuppliedProvider": {
                    "id": "Optional[mtuk]",
                    "displayName": "Mytrip",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/mtuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 103.99,
                "totalPricePerPassenger": 103.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13850",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|7|346&area=FLTCenterColumn|1|1|ItinList|2|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13850&totalPricePerPassenger=103.99"
                },
                {
                "purchaseLinkId": "SkyScanner|3|902",
                "providerId": "Trip.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[ctuk]",
                    "displayName": "Trip.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/ctuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 105.1,
                "totalPricePerPassenger": 105.1,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13851",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|902&area=FLTCenterColumn|1|1|ItinList|2|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13851&totalPricePerPassenger=105.1"
                },
                {
                "purchaseLinkId": "SkyScanner|7|347",
                "providerId": "GotoGate",
                "partnerSuppliedProvider": {
                    "id": "Optional[gtuk]",
                    "displayName": "GotoGate",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/gtuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 107.99,
                "totalPricePerPassenger": 107.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13852",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|7|347&area=FLTCenterColumn|1|1|ItinList|2|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13852&totalPricePerPassenger=107.99"
                },
                {
                "purchaseLinkId": "SkyScanner|7|348",
                "providerId": "Kiwi.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[skyp]",
                    "displayName": "Kiwi.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/skyp.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 109,
                "totalPricePerPassenger": 109,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13853",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|7|348&area=FLTCenterColumn|1|1|ItinList|2|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13853&totalPricePerPassenger=109"
                },
                {
                "purchaseLinkId": "SkyScanner|7|349",
                "providerId": "Booking.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[bcuk]",
                    "displayName": "Booking.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/bcuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 109.99,
                "totalPricePerPassenger": 109.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13854",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|7|349&area=FLTCenterColumn|1|1|ItinList|2|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13854&totalPricePerPassenger=109.99"
                },
                {
                "purchaseLinkId": "SkyScanner|6|177",
                "providerId": "Expedia",
                "partnerSuppliedProvider": {
                    "id": "Optional[xpuk]",
                    "displayName": "Expedia",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/xpuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 111.34,
                "totalPricePerPassenger": 111.34,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13855",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|6|177&area=FLTCenterColumn|1|1|ItinList|2|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13855&totalPricePerPassenger=111.34"
                },
                {
                "purchaseLinkId": "SkyScanner|4|117",
                "providerId": "eDreams",
                "partnerSuppliedProvider": {
                    "id": "Optional[eduk]",
                    "displayName": "eDreams",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/eduk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 111.56,
                "totalPricePerPassenger": 111.56,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13856",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|4|117&area=FLTCenterColumn|1|1|ItinList|2|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13856&totalPricePerPassenger=111.56"
                },
                {
                "purchaseLinkId": "SkyScanner|7|350",
                "providerId": "BudgetAir",
                "partnerSuppliedProvider": {
                    "id": "Optional[s1uk]",
                    "displayName": "BudgetAir",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/s1uk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 113,
                "totalPricePerPassenger": 113,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13857",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|7|350&area=FLTCenterColumn|1|1|ItinList|2|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13857&totalPricePerPassenger=113"
                },
                {
                "purchaseLinkId": "SkyScanner|6|178",
                "providerId": "lastminute.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[lmuk]",
                    "displayName": "lastminute.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/lmuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 118.98,
                "totalPricePerPassenger": 118.98,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13858",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|6|178&area=FLTCenterColumn|1|1|ItinList|2|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13858&totalPricePerPassenger=118.98"
                }
            ]
            },
            {
            "segments": [
                {
                "legs": [
                    {
                    "originStationCode": "LTN",
                    "isDifferentOriginStation": false,
                    "destinationStationCode": "CDG",
                    "isDifferentDestinationStation": false,
                    "departureDateTime": "2023-12-07T07:00:00Z",
                    "arrivalDateTime": "2023-12-07T09:20:00+01:00",
                    "classOfService": "ECONOMY",
                    "marketingCarrierCode": "U2",
                    "operatingCarrierCode": "U2",
                    "amenities": [],
                    "flightNumber": 2435,
                    "seatGuruEquipmentId": 0,
                    "seatGuruAirlineUrl": "",
                    "numStops": 0,
                    "distanceInKM": 380.6494,
                    "isInternational": true,
                    "selfTransfer": false,
                    "operatingCarrier": {
                        "locationId": 8729066,
                        "code": "U2",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/easyJet.png",
                        "displayName": "easyJet"
                    },
                    "marketingCarrier": {
                        "locationId": 8729066,
                        "code": "U2",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/easyJet.png",
                        "displayName": "easyJet"
                    }
                    }
                ],
                "layovers": []
                },
                {
                "legs": [
                    {
                    "originStationCode": "CDG",
                    "isDifferentOriginStation": false,
                    "destinationStationCode": "LGW",
                    "isDifferentDestinationStation": true,
                    "departureDateTime": "2023-12-13T07:25:00+01:00",
                    "arrivalDateTime": "2023-12-13T07:30:00Z",
                    "classOfService": "ECONOMY",
                    "marketingCarrierCode": "U2",
                    "operatingCarrierCode": "U2",
                    "amenities": [],
                    "flightNumber": 8402,
                    "seatGuruEquipmentId": 0,
                    "seatGuruAirlineUrl": "",
                    "numStops": 0,
                    "distanceInKM": 308.59512,
                    "isInternational": true,
                    "selfTransfer": false,
                    "operatingCarrier": {
                        "locationId": 8729066,
                        "code": "U2",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/easyJet.png",
                        "displayName": "easyJet"
                    },
                    "marketingCarrier": {
                        "locationId": 8729066,
                        "code": "U2",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/easyJet.png",
                        "displayName": "easyJet"
                    }
                    }
                ],
                "layovers": []
                }
            ],
            "purchaseLinks": [
                {
                "purchaseLinkId": "SkyScanner|3|924",
                "providerId": "easyJet",
                "partnerSuppliedProvider": {
                    "id": "Optional[easy]",
                    "displayName": "easyJet",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/easy.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 90.34,
                "totalPricePerPassenger": 90.34,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13859",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|924&area=FLTCenterColumn|1|1|ItinList|3|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13859&totalPricePerPassenger=90.34"
                },
                {
                "purchaseLinkId": "SkyScanner|7|993",
                "providerId": "Mytrip",
                "partnerSuppliedProvider": {
                    "id": "Optional[mtuk]",
                    "displayName": "Mytrip",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/mtuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 108.99,
                "totalPricePerPassenger": 108.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13860",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|7|993&area=FLTCenterColumn|1|1|ItinList|3|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13860&totalPricePerPassenger=108.99"
                },
                {
                "purchaseLinkId": "SkyScanner|3|925",
                "providerId": "Trip.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[ctuk]",
                    "displayName": "Trip.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/ctuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 110.4,
                "totalPricePerPassenger": 110.4,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13861",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|925&area=FLTCenterColumn|1|1|ItinList|3|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13861&totalPricePerPassenger=110.4"
                },
                {
                "purchaseLinkId": "SkyScanner|7|994",
                "providerId": "GotoGate",
                "partnerSuppliedProvider": {
                    "id": "Optional[gtuk]",
                    "displayName": "GotoGate",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/gtuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 112.99,
                "totalPricePerPassenger": 112.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13862",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|7|994&area=FLTCenterColumn|1|1|ItinList|3|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13862&totalPricePerPassenger=112.99"
                },
                {
                "purchaseLinkId": "SkyScanner|7|995",
                "providerId": "Booking.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[bcuk]",
                    "displayName": "Booking.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/bcuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 114.99,
                "totalPricePerPassenger": 114.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13863",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|7|995&area=FLTCenterColumn|1|1|ItinList|3|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13863&totalPricePerPassenger=114.99"
                },
                {
                "purchaseLinkId": "SkyScanner|7|996",
                "providerId": "Kiwi.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[skyp]",
                    "displayName": "Kiwi.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/skyp.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 115,
                "totalPricePerPassenger": 115,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13864",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|7|996&area=FLTCenterColumn|1|1|ItinList|3|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13864&totalPricePerPassenger=115"
                },
                {
                "purchaseLinkId": "SkyScanner|6|544",
                "providerId": "Expedia",
                "partnerSuppliedProvider": {
                    "id": "Optional[xpuk]",
                    "displayName": "Expedia",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/xpuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 116.34,
                "totalPricePerPassenger": 116.34,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13865",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|6|544&area=FLTCenterColumn|1|1|ItinList|3|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13865&totalPricePerPassenger=116.34"
                },
                {
                "purchaseLinkId": "SkyScanner|4|375",
                "providerId": "eDreams",
                "partnerSuppliedProvider": {
                    "id": "Optional[eduk]",
                    "displayName": "eDreams",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/eduk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 116.7,
                "totalPricePerPassenger": 116.7,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13866",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|4|375&area=FLTCenterColumn|1|1|ItinList|3|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13866&totalPricePerPassenger=116.7"
                },
                {
                "purchaseLinkId": "SkyScanner|7|997",
                "providerId": "BudgetAir",
                "partnerSuppliedProvider": {
                    "id": "Optional[s1uk]",
                    "displayName": "BudgetAir",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/s1uk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 118,
                "totalPricePerPassenger": 118,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13867",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|7|997&area=FLTCenterColumn|1|1|ItinList|3|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13867&totalPricePerPassenger=118"
                },
                {
                "purchaseLinkId": "SkyScanner|6|545",
                "providerId": "lastminute.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[lmuk]",
                    "displayName": "lastminute.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/lmuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 122.99,
                "totalPricePerPassenger": 122.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13868",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|6|545&area=FLTCenterColumn|1|1|ItinList|3|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13868&totalPricePerPassenger=122.99"
                }
            ]
            },
            {
            "segments": [
                {
                "legs": [
                    {
                    "originStationCode": "LTN",
                    "isDifferentOriginStation": false,
                    "destinationStationCode": "CDG",
                    "isDifferentDestinationStation": false,
                    "departureDateTime": "2023-12-07T07:00:00Z",
                    "arrivalDateTime": "2023-12-07T09:20:00+01:00",
                    "classOfService": "ECONOMY",
                    "marketingCarrierCode": "U2",
                    "operatingCarrierCode": "U2",
                    "amenities": [],
                    "flightNumber": 2435,
                    "seatGuruEquipmentId": 0,
                    "seatGuruAirlineUrl": "",
                    "numStops": 0,
                    "distanceInKM": 380.6494,
                    "isInternational": true,
                    "selfTransfer": false,
                    "operatingCarrier": {
                        "locationId": 8729066,
                        "code": "U2",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/easyJet.png",
                        "displayName": "easyJet"
                    },
                    "marketingCarrier": {
                        "locationId": 8729066,
                        "code": "U2",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/easyJet.png",
                        "displayName": "easyJet"
                    }
                    }
                ],
                "layovers": []
                },
                {
                "legs": [
                    {
                    "originStationCode": "CDG",
                    "isDifferentOriginStation": false,
                    "destinationStationCode": "LTN",
                    "isDifferentDestinationStation": false,
                    "departureDateTime": "2023-12-13T14:35:00+01:00",
                    "arrivalDateTime": "2023-12-13T14:50:00Z",
                    "classOfService": "ECONOMY",
                    "marketingCarrierCode": "U2",
                    "operatingCarrierCode": "U2",
                    "amenities": [],
                    "flightNumber": 2440,
                    "seatGuruEquipmentId": 0,
                    "seatGuruAirlineUrl": "",
                    "numStops": 0,
                    "distanceInKM": 380.6494,
                    "isInternational": true,
                    "selfTransfer": false,
                    "operatingCarrier": {
                        "locationId": 8729066,
                        "code": "U2",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/easyJet.png",
                        "displayName": "easyJet"
                    },
                    "marketingCarrier": {
                        "locationId": 8729066,
                        "code": "U2",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/easyJet.png",
                        "displayName": "easyJet"
                    }
                    }
                ],
                "layovers": []
                }
            ],
            "purchaseLinks": [
                {
                "purchaseLinkId": "SkyScanner|3|410",
                "providerId": "easyJet",
                "partnerSuppliedProvider": {
                    "id": "Optional[easy]",
                    "displayName": "easyJet",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/easy.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 91.34,
                "totalPricePerPassenger": 91.34,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13869",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|410&area=FLTCenterColumn|1|1|ItinList|4|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13869&totalPricePerPassenger=91.34"
                },
                {
                "purchaseLinkId": "SkyScanner|7|795",
                "providerId": "Mytrip",
                "partnerSuppliedProvider": {
                    "id": "Optional[mtuk]",
                    "displayName": "Mytrip",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/mtuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 109.99,
                "totalPricePerPassenger": 109.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13870",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|7|795&area=FLTCenterColumn|1|1|ItinList|4|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13870&totalPricePerPassenger=109.99"
                },
                {
                "purchaseLinkId": "SkyScanner|3|411",
                "providerId": "Trip.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[ctuk]",
                    "displayName": "Trip.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/ctuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 111.7,
                "totalPricePerPassenger": 111.7,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13871",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|411&area=FLTCenterColumn|1|1|ItinList|4|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13871&totalPricePerPassenger=111.7"
                },
                {
                "purchaseLinkId": "SkyScanner|7|796",
                "providerId": "GotoGate",
                "partnerSuppliedProvider": {
                    "id": "Optional[gtuk]",
                    "displayName": "GotoGate",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/gtuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 113.99,
                "totalPricePerPassenger": 113.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13872",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|7|796&area=FLTCenterColumn|1|1|ItinList|4|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13872&totalPricePerPassenger=113.99"
                },
                {
                "purchaseLinkId": "SkyScanner|7|797",
                "providerId": "Booking.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[bcuk]",
                    "displayName": "Booking.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/bcuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 115.99,
                "totalPricePerPassenger": 115.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13873",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|7|797&area=FLTCenterColumn|1|1|ItinList|4|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13873&totalPricePerPassenger=115.99"
                },
                {
                "purchaseLinkId": "SkyScanner|7|798",
                "providerId": "Kiwi.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[skyp]",
                    "displayName": "Kiwi.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/skyp.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 116,
                "totalPricePerPassenger": 116,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13874",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|7|798&area=FLTCenterColumn|1|1|ItinList|4|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13874&totalPricePerPassenger=116"
                },
                {
                "purchaseLinkId": "SkyScanner|6|441",
                "providerId": "Expedia",
                "partnerSuppliedProvider": {
                    "id": "Optional[xpuk]",
                    "displayName": "Expedia",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/xpuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 117.34,
                "totalPricePerPassenger": 117.34,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13875",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|6|441&area=FLTCenterColumn|1|1|ItinList|4|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13875&totalPricePerPassenger=117.34"
                },
                {
                "purchaseLinkId": "SkyScanner|4|303",
                "providerId": "eDreams",
                "partnerSuppliedProvider": {
                    "id": "Optional[eduk]",
                    "displayName": "eDreams",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/eduk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 117.7,
                "totalPricePerPassenger": 117.7,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13876",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|4|303&area=FLTCenterColumn|1|1|ItinList|4|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13876&totalPricePerPassenger=117.7"
                },
                {
                "purchaseLinkId": "SkyScanner|7|799",
                "providerId": "BudgetAir",
                "partnerSuppliedProvider": {
                    "id": "Optional[s1uk]",
                    "displayName": "BudgetAir",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/s1uk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 119,
                "totalPricePerPassenger": 119,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13877",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|7|799&area=FLTCenterColumn|1|1|ItinList|4|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13877&totalPricePerPassenger=119"
                },
                {
                "purchaseLinkId": "SkyScanner|6|442",
                "providerId": "lastminute.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[lmuk]",
                    "displayName": "lastminute.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/lmuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 123.99,
                "totalPricePerPassenger": 123.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13878",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|6|442&area=FLTCenterColumn|1|1|ItinList|4|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13878&totalPricePerPassenger=123.99"
                }
            ]
            },
            {
            "segments": [
                {
                "legs": [
                    {
                    "originStationCode": "LTN",
                    "isDifferentOriginStation": false,
                    "destinationStationCode": "CDG",
                    "isDifferentDestinationStation": false,
                    "departureDateTime": "2023-12-07T07:00:00Z",
                    "arrivalDateTime": "2023-12-07T09:20:00+01:00",
                    "classOfService": "ECONOMY",
                    "marketingCarrierCode": "U2",
                    "operatingCarrierCode": "U2",
                    "amenities": [],
                    "flightNumber": 2435,
                    "seatGuruEquipmentId": 0,
                    "seatGuruAirlineUrl": "",
                    "numStops": 0,
                    "distanceInKM": 380.6494,
                    "isInternational": true,
                    "selfTransfer": false,
                    "operatingCarrier": {
                        "locationId": 8729066,
                        "code": "U2",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/easyJet.png",
                        "displayName": "easyJet"
                    },
                    "marketingCarrier": {
                        "locationId": 8729066,
                        "code": "U2",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/easyJet.png",
                        "displayName": "easyJet"
                    }
                    }
                ],
                "layovers": []
                },
                {
                "legs": [
                    {
                    "originStationCode": "CDG",
                    "isDifferentOriginStation": false,
                    "destinationStationCode": "LTN",
                    "isDifferentDestinationStation": false,
                    "departureDateTime": "2023-12-13T21:25:00+01:00",
                    "arrivalDateTime": "2023-12-13T21:40:00Z",
                    "classOfService": "ECONOMY",
                    "marketingCarrierCode": "U2",
                    "operatingCarrierCode": "U2",
                    "amenities": [],
                    "flightNumber": 2442,
                    "seatGuruEquipmentId": 0,
                    "seatGuruAirlineUrl": "",
                    "numStops": 0,
                    "distanceInKM": 380.6494,
                    "isInternational": true,
                    "selfTransfer": false,
                    "operatingCarrier": {
                        "locationId": 8729066,
                        "code": "U2",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/easyJet.png",
                        "displayName": "easyJet"
                    },
                    "marketingCarrier": {
                        "locationId": 8729066,
                        "code": "U2",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/easyJet.png",
                        "displayName": "easyJet"
                    }
                    }
                ],
                "layovers": []
                }
            ],
            "purchaseLinks": [
                {
                "purchaseLinkId": "SkyScanner|3|957",
                "providerId": "easyJet",
                "partnerSuppliedProvider": {
                    "id": "Optional[easy]",
                    "displayName": "easyJet",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/easy.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 91.34,
                "totalPricePerPassenger": 91.34,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13879",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|957&area=FLTCenterColumn|1|1|ItinList|6|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13879&totalPricePerPassenger=91.34"
                },
                {
                "purchaseLinkId": "SkyScanner|7|364",
                "providerId": "Mytrip",
                "partnerSuppliedProvider": {
                    "id": "Optional[mtuk]",
                    "displayName": "Mytrip",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/mtuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 109.99,
                "totalPricePerPassenger": 109.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13880",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|7|364&area=FLTCenterColumn|1|1|ItinList|6|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13880&totalPricePerPassenger=109.99"
                },
                {
                "purchaseLinkId": "SkyScanner|3|958",
                "providerId": "Trip.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[ctuk]",
                    "displayName": "Trip.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/ctuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 111.7,
                "totalPricePerPassenger": 111.7,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13881",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|958&area=FLTCenterColumn|1|1|ItinList|6|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13881&totalPricePerPassenger=111.7"
                },
                {
                "purchaseLinkId": "SkyScanner|7|365",
                "providerId": "GotoGate",
                "partnerSuppliedProvider": {
                    "id": "Optional[gtuk]",
                    "displayName": "GotoGate",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/gtuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 113.99,
                "totalPricePerPassenger": 113.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13882",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|7|365&area=FLTCenterColumn|1|1|ItinList|6|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13882&totalPricePerPassenger=113.99"
                },
                {
                "purchaseLinkId": "SkyScanner|7|366",
                "providerId": "Booking.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[bcuk]",
                    "displayName": "Booking.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/bcuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 115.99,
                "totalPricePerPassenger": 115.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13883",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|7|366&area=FLTCenterColumn|1|1|ItinList|6|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13883&totalPricePerPassenger=115.99"
                },
                {
                "purchaseLinkId": "SkyScanner|7|367",
                "providerId": "Kiwi.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[skyp]",
                    "displayName": "Kiwi.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/skyp.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 116,
                "totalPricePerPassenger": 116,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13884",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|7|367&area=FLTCenterColumn|1|1|ItinList|6|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13884&totalPricePerPassenger=116"
                },
                {
                "purchaseLinkId": "SkyScanner|6|194",
                "providerId": "Expedia",
                "partnerSuppliedProvider": {
                    "id": "Optional[xpuk]",
                    "displayName": "Expedia",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/xpuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 117.34,
                "totalPricePerPassenger": 117.34,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13885",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|6|194&area=FLTCenterColumn|1|1|ItinList|6|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13885&totalPricePerPassenger=117.34"
                },
                {
                "purchaseLinkId": "SkyScanner|4|125",
                "providerId": "eDreams",
                "partnerSuppliedProvider": {
                    "id": "Optional[eduk]",
                    "displayName": "eDreams",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/eduk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 117.7,
                "totalPricePerPassenger": 117.7,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13886",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|4|125&area=FLTCenterColumn|1|1|ItinList|6|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13886&totalPricePerPassenger=117.7"
                },
                {
                "purchaseLinkId": "SkyScanner|7|368",
                "providerId": "BudgetAir",
                "partnerSuppliedProvider": {
                    "id": "Optional[s1uk]",
                    "displayName": "BudgetAir",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/s1uk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 119,
                "totalPricePerPassenger": 119,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13887",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|7|368&area=FLTCenterColumn|1|1|ItinList|6|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13887&totalPricePerPassenger=119"
                },
                {
                "purchaseLinkId": "SkyScanner|6|195",
                "providerId": "lastminute.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[lmuk]",
                    "displayName": "lastminute.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/lmuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 123.99,
                "totalPricePerPassenger": 123.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13888",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|6|195&area=FLTCenterColumn|1|1|ItinList|6|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13888&totalPricePerPassenger=123.99"
                }
            ]
            },
            {
            "segments": [
                {
                "legs": [
                    {
                    "originStationCode": "LGW",
                    "isDifferentOriginStation": false,
                    "destinationStationCode": "ORY",
                    "isDifferentDestinationStation": false,
                    "departureDateTime": "2023-12-07T13:00:00Z",
                    "arrivalDateTime": "2023-12-07T15:20:00+01:00",
                    "classOfService": "ECONOMY",
                    "marketingCarrierCode": "VY",
                    "operatingCarrierCode": "VY",
                    "amenities": [],
                    "flightNumber": 6943,
                    "seatGuruEquipmentId": 0,
                    "seatGuruAirlineUrl": "",
                    "numStops": 0,
                    "distanceInKM": 326.02792,
                    "isInternational": true,
                    "selfTransfer": false,
                    "operatingCarrier": {
                        "locationId": 8729185,
                        "code": "VY",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Vueling.png",
                        "displayName": "Vueling"
                    },
                    "marketingCarrier": {
                        "locationId": 8729185,
                        "code": "VY",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Vueling.png",
                        "displayName": "Vueling"
                    }
                    }
                ],
                "layovers": []
                },
                {
                "legs": [
                    {
                    "originStationCode": "ORY",
                    "isDifferentOriginStation": false,
                    "destinationStationCode": "LGW",
                    "isDifferentDestinationStation": false,
                    "departureDateTime": "2023-12-13T18:25:00+01:00",
                    "arrivalDateTime": "2023-12-13T18:30:00Z",
                    "classOfService": "ECONOMY",
                    "marketingCarrierCode": "VY",
                    "operatingCarrierCode": "VY",
                    "amenities": [],
                    "flightNumber": 6944,
                    "seatGuruEquipmentId": 0,
                    "seatGuruAirlineUrl": "",
                    "numStops": 0,
                    "distanceInKM": 326.02792,
                    "isInternational": true,
                    "selfTransfer": false,
                    "operatingCarrier": {
                        "locationId": 8729185,
                        "code": "VY",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Vueling.png",
                        "displayName": "Vueling"
                    },
                    "marketingCarrier": {
                        "locationId": 8729185,
                        "code": "VY",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Vueling.png",
                        "displayName": "Vueling"
                    }
                    }
                ],
                "layovers": []
                }
            ],
            "purchaseLinks": [
                {
                "purchaseLinkId": "SkyScanner|3|649",
                "providerId": "Kiwi.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[skyp]",
                    "displayName": "Kiwi.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/skyp.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 93,
                "totalPricePerPassenger": 93,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13889",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|649&area=FLTCenterColumn|1|1|ItinList|7|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13889&totalPricePerPassenger=93"
                },
                {
                "purchaseLinkId": "SkyScanner|3|650",
                "providerId": "eDreams",
                "partnerSuppliedProvider": {
                    "id": "Optional[eduk]",
                    "displayName": "eDreams",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/eduk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 97.73,
                "totalPricePerPassenger": 97.73,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13890",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|650&area=FLTCenterColumn|1|1|ItinList|7|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13890&totalPricePerPassenger=97.73"
                },
                {
                "purchaseLinkId": "SkyScanner|3|651",
                "providerId": "BudgetAir",
                "partnerSuppliedProvider": {
                    "id": "Optional[s1uk]",
                    "displayName": "BudgetAir",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/s1uk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 98,
                "totalPricePerPassenger": 98,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13891",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|651&area=FLTCenterColumn|1|1|ItinList|7|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13891&totalPricePerPassenger=98"
                },
                {
                "purchaseLinkId": "SkyScanner|3|652",
                "providerId": "Mytrip",
                "partnerSuppliedProvider": {
                    "id": "Optional[mtuk]",
                    "displayName": "Mytrip",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/mtuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 100.99,
                "totalPricePerPassenger": 100.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13892",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|652&area=FLTCenterColumn|1|1|ItinList|7|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13892&totalPricePerPassenger=100.99"
                },
                {
                "purchaseLinkId": "SkyScanner|3|653",
                "providerId": "Trip.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[ctuk]",
                    "displayName": "Trip.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/ctuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 101.5,
                "totalPricePerPassenger": 101.5,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13893",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|653&area=FLTCenterColumn|1|1|ItinList|7|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13893&totalPricePerPassenger=101.5"
                },
                {
                "purchaseLinkId": "SkyScanner|3|654",
                "providerId": "Booking.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[bcuk]",
                    "displayName": "Booking.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/bcuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 101.99,
                "totalPricePerPassenger": 101.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13894",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|654&area=FLTCenterColumn|1|1|ItinList|7|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13894&totalPricePerPassenger=101.99"
                },
                {
                "purchaseLinkId": "SkyScanner|3|655",
                "providerId": "GotoGate",
                "partnerSuppliedProvider": {
                    "id": "Optional[gtuk]",
                    "displayName": "GotoGate",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/gtuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 103.99,
                "totalPricePerPassenger": 103.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13895",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|655&area=FLTCenterColumn|1|1|ItinList|7|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13895&totalPricePerPassenger=103.99"
                },
                {
                "purchaseLinkId": "SkyScanner|3|656",
                "providerId": "lastminute.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[lmuk]",
                    "displayName": "lastminute.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/lmuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 109.98,
                "totalPricePerPassenger": 109.98,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13896",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|656&area=FLTCenterColumn|1|1|ItinList|7|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13896&totalPricePerPassenger=109.98"
                },
                {
                "purchaseLinkId": "SkyScanner|3|657",
                "providerId": "Vueling Airlines",
                "partnerSuppliedProvider": {
                    "id": "Optional[vuel]",
                    "displayName": "Vueling Airlines",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/vuel.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 117.9,
                "totalPricePerPassenger": 117.9,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13897",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|657&area=FLTCenterColumn|1|1|ItinList|7|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13897&totalPricePerPassenger=117.9"
                },
                {
                "purchaseLinkId": "SkyScanner|3|658",
                "providerId": "travelup",
                "partnerSuppliedProvider": {
                    "id": "Optional[trup]",
                    "displayName": "travelup",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/trup.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 274.04,
                "totalPricePerPassenger": 274.04,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13898",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|658&area=FLTCenterColumn|1|1|ItinList|7|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13898&totalPricePerPassenger=274.04"
                }
            ]
            },
            {
            "segments": [
                {
                "legs": [
                    {
                    "originStationCode": "LGW",
                    "isDifferentOriginStation": false,
                    "destinationStationCode": "ORY",
                    "isDifferentDestinationStation": false,
                    "departureDateTime": "2023-12-07T15:05:00Z",
                    "arrivalDateTime": "2023-12-07T17:25:00+01:00",
                    "classOfService": "ECONOMY",
                    "marketingCarrierCode": "VY",
                    "operatingCarrierCode": "VY",
                    "amenities": [],
                    "flightNumber": 6949,
                    "seatGuruEquipmentId": 0,
                    "seatGuruAirlineUrl": "",
                    "numStops": 0,
                    "distanceInKM": 326.02792,
                    "isInternational": true,
                    "selfTransfer": false,
                    "operatingCarrier": {
                        "locationId": 8729185,
                        "code": "VY",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Vueling.png",
                        "displayName": "Vueling"
                    },
                    "marketingCarrier": {
                        "locationId": 8729185,
                        "code": "VY",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Vueling.png",
                        "displayName": "Vueling"
                    }
                    }
                ],
                "layovers": []
                },
                {
                "legs": [
                    {
                    "originStationCode": "ORY",
                    "isDifferentOriginStation": false,
                    "destinationStationCode": "LGW",
                    "isDifferentDestinationStation": false,
                    "departureDateTime": "2023-12-13T18:25:00+01:00",
                    "arrivalDateTime": "2023-12-13T18:30:00Z",
                    "classOfService": "ECONOMY",
                    "marketingCarrierCode": "VY",
                    "operatingCarrierCode": "VY",
                    "amenities": [],
                    "flightNumber": 6944,
                    "seatGuruEquipmentId": 0,
                    "seatGuruAirlineUrl": "",
                    "numStops": 0,
                    "distanceInKM": 326.02792,
                    "isInternational": true,
                    "selfTransfer": false,
                    "operatingCarrier": {
                        "locationId": 8729185,
                        "code": "VY",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Vueling.png",
                        "displayName": "Vueling"
                    },
                    "marketingCarrier": {
                        "locationId": 8729185,
                        "code": "VY",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Vueling.png",
                        "displayName": "Vueling"
                    }
                    }
                ],
                "layovers": []
                }
            ],
            "purchaseLinks": [
                {
                "purchaseLinkId": "SkyScanner|3|891",
                "providerId": "Kiwi.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[skyp]",
                    "displayName": "Kiwi.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/skyp.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 93,
                "totalPricePerPassenger": 93,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13899",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|891&area=FLTCenterColumn|1|1|ItinList|8|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13899&totalPricePerPassenger=93"
                },
                {
                "purchaseLinkId": "SkyScanner|3|892",
                "providerId": "eDreams",
                "partnerSuppliedProvider": {
                    "id": "Optional[eduk]",
                    "displayName": "eDreams",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/eduk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 97.73,
                "totalPricePerPassenger": 97.73,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13900",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|892&area=FLTCenterColumn|1|1|ItinList|8|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13900&totalPricePerPassenger=97.73"
                },
                {
                "purchaseLinkId": "SkyScanner|3|893",
                "providerId": "BudgetAir",
                "partnerSuppliedProvider": {
                    "id": "Optional[s1uk]",
                    "displayName": "BudgetAir",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/s1uk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 98,
                "totalPricePerPassenger": 98,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13901",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|893&area=FLTCenterColumn|1|1|ItinList|8|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13901&totalPricePerPassenger=98"
                },
                {
                "purchaseLinkId": "SkyScanner|3|894",
                "providerId": "Mytrip",
                "partnerSuppliedProvider": {
                    "id": "Optional[mtuk]",
                    "displayName": "Mytrip",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/mtuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 100.99,
                "totalPricePerPassenger": 100.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13902",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|894&area=FLTCenterColumn|1|1|ItinList|8|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13902&totalPricePerPassenger=100.99"
                },
                {
                "purchaseLinkId": "SkyScanner|3|895",
                "providerId": "Trip.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[ctuk]",
                    "displayName": "Trip.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/ctuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 101.5,
                "totalPricePerPassenger": 101.5,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13903",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|895&area=FLTCenterColumn|1|1|ItinList|8|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13903&totalPricePerPassenger=101.5"
                },
                {
                "purchaseLinkId": "SkyScanner|3|896",
                "providerId": "Booking.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[bcuk]",
                    "displayName": "Booking.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/bcuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 101.99,
                "totalPricePerPassenger": 101.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13904",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|896&area=FLTCenterColumn|1|1|ItinList|8|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13904&totalPricePerPassenger=101.99"
                },
                {
                "purchaseLinkId": "SkyScanner|3|897",
                "providerId": "GotoGate",
                "partnerSuppliedProvider": {
                    "id": "Optional[gtuk]",
                    "displayName": "GotoGate",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/gtuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 103.99,
                "totalPricePerPassenger": 103.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13905",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|897&area=FLTCenterColumn|1|1|ItinList|8|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13905&totalPricePerPassenger=103.99"
                },
                {
                "purchaseLinkId": "SkyScanner|3|898",
                "providerId": "Vueling Airlines",
                "partnerSuppliedProvider": {
                    "id": "Optional[vuel]",
                    "displayName": "Vueling Airlines",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/vuel.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 107.1,
                "totalPricePerPassenger": 107.1,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13906",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|898&area=FLTCenterColumn|1|1|ItinList|8|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13906&totalPricePerPassenger=107.1"
                },
                {
                "purchaseLinkId": "SkyScanner|3|899",
                "providerId": "lastminute.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[lmuk]",
                    "displayName": "lastminute.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/lmuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 109.98,
                "totalPricePerPassenger": 109.98,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13907",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|899&area=FLTCenterColumn|1|1|ItinList|8|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13907&totalPricePerPassenger=109.98"
                },
                {
                "purchaseLinkId": "SkyScanner|3|900",
                "providerId": "travelup",
                "partnerSuppliedProvider": {
                    "id": "Optional[trup]",
                    "displayName": "travelup",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/trup.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 274.04,
                "totalPricePerPassenger": 274.04,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13908",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|900&area=FLTCenterColumn|1|1|ItinList|8|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13908&totalPricePerPassenger=274.04"
                }
            ]
            },
            {
            "segments": [
                {
                "legs": [
                    {
                    "originStationCode": "LGW",
                    "isDifferentOriginStation": false,
                    "destinationStationCode": "ORY",
                    "isDifferentDestinationStation": false,
                    "departureDateTime": "2023-12-07T19:00:00Z",
                    "arrivalDateTime": "2023-12-07T21:20:00+01:00",
                    "classOfService": "ECONOMY",
                    "marketingCarrierCode": "VY",
                    "operatingCarrierCode": "VY",
                    "amenities": [],
                    "flightNumber": 6945,
                    "seatGuruEquipmentId": 0,
                    "seatGuruAirlineUrl": "",
                    "numStops": 0,
                    "distanceInKM": 326.02792,
                    "isInternational": true,
                    "selfTransfer": false,
                    "operatingCarrier": {
                        "locationId": 8729185,
                        "code": "VY",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Vueling.png",
                        "displayName": "Vueling"
                    },
                    "marketingCarrier": {
                        "locationId": 8729185,
                        "code": "VY",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Vueling.png",
                        "displayName": "Vueling"
                    }
                    }
                ],
                "layovers": []
                },
                {
                "legs": [
                    {
                    "originStationCode": "ORY",
                    "isDifferentOriginStation": false,
                    "destinationStationCode": "LGW",
                    "isDifferentDestinationStation": false,
                    "departureDateTime": "2023-12-13T18:25:00+01:00",
                    "arrivalDateTime": "2023-12-13T18:30:00Z",
                    "classOfService": "ECONOMY",
                    "marketingCarrierCode": "VY",
                    "operatingCarrierCode": "VY",
                    "amenities": [],
                    "flightNumber": 6944,
                    "seatGuruEquipmentId": 0,
                    "seatGuruAirlineUrl": "",
                    "numStops": 0,
                    "distanceInKM": 326.02792,
                    "isInternational": true,
                    "selfTransfer": false,
                    "operatingCarrier": {
                        "locationId": 8729185,
                        "code": "VY",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Vueling.png",
                        "displayName": "Vueling"
                    },
                    "marketingCarrier": {
                        "locationId": 8729185,
                        "code": "VY",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Vueling.png",
                        "displayName": "Vueling"
                    }
                    }
                ],
                "layovers": []
                }
            ],
            "purchaseLinks": [
                {
                "purchaseLinkId": "SkyScanner|3|1515",
                "providerId": "Kiwi.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[skyp]",
                    "displayName": "Kiwi.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/skyp.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 93,
                "totalPricePerPassenger": 93,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13909",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|1515&area=FLTCenterColumn|1|1|ItinList|9|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13909&totalPricePerPassenger=93"
                },
                {
                "purchaseLinkId": "SkyScanner|3|1516",
                "providerId": "eDreams",
                "partnerSuppliedProvider": {
                    "id": "Optional[eduk]",
                    "displayName": "eDreams",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/eduk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 97.73,
                "totalPricePerPassenger": 97.73,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13910",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|1516&area=FLTCenterColumn|1|1|ItinList|9|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13910&totalPricePerPassenger=97.73"
                },
                {
                "purchaseLinkId": "SkyScanner|3|1517",
                "providerId": "BudgetAir",
                "partnerSuppliedProvider": {
                    "id": "Optional[s1uk]",
                    "displayName": "BudgetAir",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/s1uk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 98,
                "totalPricePerPassenger": 98,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13911",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|1517&area=FLTCenterColumn|1|1|ItinList|9|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13911&totalPricePerPassenger=98"
                },
                {
                "purchaseLinkId": "SkyScanner|3|1518",
                "providerId": "Mytrip",
                "partnerSuppliedProvider": {
                    "id": "Optional[mtuk]",
                    "displayName": "Mytrip",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/mtuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 100.99,
                "totalPricePerPassenger": 100.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13912",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|1518&area=FLTCenterColumn|1|1|ItinList|9|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13912&totalPricePerPassenger=100.99"
                },
                {
                "purchaseLinkId": "SkyScanner|3|1519",
                "providerId": "Trip.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[ctuk]",
                    "displayName": "Trip.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/ctuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 101.5,
                "totalPricePerPassenger": 101.5,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13913",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|1519&area=FLTCenterColumn|1|1|ItinList|9|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13913&totalPricePerPassenger=101.5"
                },
                {
                "purchaseLinkId": "SkyScanner|3|1520",
                "providerId": "Booking.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[bcuk]",
                    "displayName": "Booking.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/bcuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 101.99,
                "totalPricePerPassenger": 101.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13914",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|1520&area=FLTCenterColumn|1|1|ItinList|9|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13914&totalPricePerPassenger=101.99"
                },
                {
                "purchaseLinkId": "SkyScanner|3|1521",
                "providerId": "GotoGate",
                "partnerSuppliedProvider": {
                    "id": "Optional[gtuk]",
                    "displayName": "GotoGate",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/gtuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 103.99,
                "totalPricePerPassenger": 103.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13915",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|1521&area=FLTCenterColumn|1|1|ItinList|9|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13915&totalPricePerPassenger=103.99"
                },
                {
                "purchaseLinkId": "SkyScanner|3|1522",
                "providerId": "Vueling Airlines",
                "partnerSuppliedProvider": {
                    "id": "Optional[vuel]",
                    "displayName": "Vueling Airlines",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/vuel.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 107.1,
                "totalPricePerPassenger": 107.1,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13916",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|1522&area=FLTCenterColumn|1|1|ItinList|9|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13916&totalPricePerPassenger=107.1"
                },
                {
                "purchaseLinkId": "SkyScanner|3|1523",
                "providerId": "lastminute.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[lmuk]",
                    "displayName": "lastminute.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/lmuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 109.98,
                "totalPricePerPassenger": 109.98,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13917",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|1523&area=FLTCenterColumn|1|1|ItinList|9|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13917&totalPricePerPassenger=109.98"
                },
                {
                "purchaseLinkId": "SkyScanner|3|1524",
                "providerId": "travelup",
                "partnerSuppliedProvider": {
                    "id": "Optional[trup]",
                    "displayName": "travelup",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/trup.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 274.04,
                "totalPricePerPassenger": 274.04,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13918",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|1524&area=FLTCenterColumn|1|1|ItinList|9|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13918&totalPricePerPassenger=274.04"
                }
            ]
            },
            {
            "segments": [
                {
                "legs": [
                    {
                    "originStationCode": "LTN",
                    "isDifferentOriginStation": false,
                    "destinationStationCode": "CDG",
                    "isDifferentDestinationStation": false,
                    "departureDateTime": "2023-12-07T07:00:00Z",
                    "arrivalDateTime": "2023-12-07T09:20:00+01:00",
                    "classOfService": "ECONOMY",
                    "marketingCarrierCode": "U2",
                    "operatingCarrierCode": "U2",
                    "amenities": [],
                    "flightNumber": 2435,
                    "seatGuruEquipmentId": 0,
                    "seatGuruAirlineUrl": "",
                    "numStops": 0,
                    "distanceInKM": 380.6494,
                    "isInternational": true,
                    "selfTransfer": false,
                    "operatingCarrier": {
                        "locationId": 8729066,
                        "code": "U2",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/easyJet.png",
                        "displayName": "easyJet"
                    },
                    "marketingCarrier": {
                        "locationId": 8729066,
                        "code": "U2",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/easyJet.png",
                        "displayName": "easyJet"
                    }
                    }
                ],
                "layovers": []
                },
                {
                "legs": [
                    {
                    "originStationCode": "CDG",
                    "isDifferentOriginStation": false,
                    "destinationStationCode": "LTN",
                    "isDifferentDestinationStation": false,
                    "departureDateTime": "2023-12-13T10:05:00+01:00",
                    "arrivalDateTime": "2023-12-13T10:20:00Z",
                    "classOfService": "ECONOMY",
                    "marketingCarrierCode": "U2",
                    "operatingCarrierCode": "U2",
                    "amenities": [],
                    "flightNumber": 2436,
                    "seatGuruEquipmentId": 0,
                    "seatGuruAirlineUrl": "",
                    "numStops": 0,
                    "distanceInKM": 380.6494,
                    "isInternational": true,
                    "selfTransfer": false,
                    "operatingCarrier": {
                        "locationId": 8729066,
                        "code": "U2",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/easyJet.png",
                        "displayName": "easyJet"
                    },
                    "marketingCarrier": {
                        "locationId": 8729066,
                        "code": "U2",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/easyJet.png",
                        "displayName": "easyJet"
                    }
                    }
                ],
                "layovers": []
                }
            ],
            "purchaseLinks": [
                {
                "purchaseLinkId": "SkyScanner|3|378",
                "providerId": "easyJet",
                "partnerSuppliedProvider": {
                    "id": "Optional[easy]",
                    "displayName": "easyJet",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/easy.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 92.34,
                "totalPricePerPassenger": 92.34,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13919",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|378&area=FLTCenterColumn|1|1|ItinList|10|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13919&totalPricePerPassenger=92.34"
                },
                {
                "purchaseLinkId": "SkyScanner|7|171",
                "providerId": "Mytrip",
                "partnerSuppliedProvider": {
                    "id": "Optional[mtuk]",
                    "displayName": "Mytrip",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/mtuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 110.99,
                "totalPricePerPassenger": 110.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13920",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|7|171&area=FLTCenterColumn|1|1|ItinList|10|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13920&totalPricePerPassenger=110.99"
                },
                {
                "purchaseLinkId": "SkyScanner|3|379",
                "providerId": "Trip.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[ctuk]",
                    "displayName": "Trip.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/ctuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 111.7,
                "totalPricePerPassenger": 111.7,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13921",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|379&area=FLTCenterColumn|1|1|ItinList|10|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13921&totalPricePerPassenger=111.7"
                },
                {
                "purchaseLinkId": "SkyScanner|7|172",
                "providerId": "GotoGate",
                "partnerSuppliedProvider": {
                    "id": "Optional[gtuk]",
                    "displayName": "GotoGate",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/gtuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 114.99,
                "totalPricePerPassenger": 114.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13922",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|7|172&area=FLTCenterColumn|1|1|ItinList|10|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13922&totalPricePerPassenger=114.99"
                },
                {
                "purchaseLinkId": "SkyScanner|7|173",
                "providerId": "Booking.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[bcuk]",
                    "displayName": "Booking.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/bcuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 116.99,
                "totalPricePerPassenger": 116.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13923",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|7|173&area=FLTCenterColumn|1|1|ItinList|10|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13923&totalPricePerPassenger=116.99"
                },
                {
                "purchaseLinkId": "SkyScanner|7|174",
                "providerId": "Kiwi.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[skyp]",
                    "displayName": "Kiwi.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/skyp.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 117,
                "totalPricePerPassenger": 117,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13924",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|7|174&area=FLTCenterColumn|1|1|ItinList|10|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13924&totalPricePerPassenger=117"
                },
                {
                "purchaseLinkId": "SkyScanner|6|75",
                "providerId": "Expedia",
                "partnerSuppliedProvider": {
                    "id": "Optional[xpuk]",
                    "displayName": "Expedia",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/xpuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 118.34,
                "totalPricePerPassenger": 118.34,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13925",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|6|75&area=FLTCenterColumn|1|1|ItinList|10|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13925&totalPricePerPassenger=118.34"
                },
                {
                "purchaseLinkId": "SkyScanner|4|48",
                "providerId": "eDreams",
                "partnerSuppliedProvider": {
                    "id": "Optional[eduk]",
                    "displayName": "eDreams",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/eduk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 118.7,
                "totalPricePerPassenger": 118.7,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13926",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|4|48&area=FLTCenterColumn|1|1|ItinList|10|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13926&totalPricePerPassenger=118.7"
                },
                {
                "purchaseLinkId": "SkyScanner|7|175",
                "providerId": "BudgetAir",
                "partnerSuppliedProvider": {
                    "id": "Optional[s1uk]",
                    "displayName": "BudgetAir",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/s1uk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 120,
                "totalPricePerPassenger": 120,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13927",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|7|175&area=FLTCenterColumn|1|1|ItinList|10|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13927&totalPricePerPassenger=120"
                },
                {
                "purchaseLinkId": "SkyScanner|6|76",
                "providerId": "lastminute.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[lmuk]",
                    "displayName": "lastminute.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/lmuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 124.98,
                "totalPricePerPassenger": 124.98,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13928",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|6|76&area=FLTCenterColumn|1|1|ItinList|10|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13928&totalPricePerPassenger=124.98"
                }
            ]
            },
            {
            "segments": [
                {
                "legs": [
                    {
                    "originStationCode": "LTN",
                    "isDifferentOriginStation": false,
                    "destinationStationCode": "CDG",
                    "isDifferentDestinationStation": false,
                    "departureDateTime": "2023-12-07T07:00:00Z",
                    "arrivalDateTime": "2023-12-07T09:20:00+01:00",
                    "classOfService": "ECONOMY",
                    "marketingCarrierCode": "U2",
                    "operatingCarrierCode": "U2",
                    "amenities": [],
                    "flightNumber": 2435,
                    "seatGuruEquipmentId": 0,
                    "seatGuruAirlineUrl": "",
                    "numStops": 0,
                    "distanceInKM": 380.6494,
                    "isInternational": true,
                    "selfTransfer": false,
                    "operatingCarrier": {
                        "locationId": 8729066,
                        "code": "U2",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/easyJet.png",
                        "displayName": "easyJet"
                    },
                    "marketingCarrier": {
                        "locationId": 8729066,
                        "code": "U2",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/easyJet.png",
                        "displayName": "easyJet"
                    }
                    }
                ],
                "layovers": []
                },
                {
                "legs": [
                    {
                    "originStationCode": "CDG",
                    "isDifferentOriginStation": false,
                    "destinationStationCode": "LTN",
                    "isDifferentDestinationStation": false,
                    "departureDateTime": "2023-12-13T17:35:00+01:00",
                    "arrivalDateTime": "2023-12-13T17:50:00Z",
                    "classOfService": "ECONOMY",
                    "marketingCarrierCode": "U2",
                    "operatingCarrierCode": "U2",
                    "amenities": [],
                    "flightNumber": 2438,
                    "seatGuruEquipmentId": 0,
                    "seatGuruAirlineUrl": "",
                    "numStops": 0,
                    "distanceInKM": 380.6494,
                    "isInternational": true,
                    "selfTransfer": false,
                    "operatingCarrier": {
                        "locationId": 8729066,
                        "code": "U2",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/easyJet.png",
                        "displayName": "easyJet"
                    },
                    "marketingCarrier": {
                        "locationId": 8729066,
                        "code": "U2",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/easyJet.png",
                        "displayName": "easyJet"
                    }
                    }
                ],
                "layovers": []
                }
            ],
            "purchaseLinks": [
                {
                "purchaseLinkId": "SkyScanner|3|812",
                "providerId": "easyJet",
                "partnerSuppliedProvider": {
                    "id": "Optional[easy]",
                    "displayName": "easyJet",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/easy.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 92.34,
                "totalPricePerPassenger": 92.34,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13929",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|812&area=FLTCenterColumn|1|1|ItinList|12|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13929&totalPricePerPassenger=92.34"
                },
                {
                "purchaseLinkId": "SkyScanner|7|308",
                "providerId": "Mytrip",
                "partnerSuppliedProvider": {
                    "id": "Optional[mtuk]",
                    "displayName": "Mytrip",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/mtuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 110.99,
                "totalPricePerPassenger": 110.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13930",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|7|308&area=FLTCenterColumn|1|1|ItinList|12|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13930&totalPricePerPassenger=110.99"
                },
                {
                "purchaseLinkId": "SkyScanner|3|813",
                "providerId": "Trip.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[ctuk]",
                    "displayName": "Trip.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/ctuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 112.5,
                "totalPricePerPassenger": 112.5,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13931",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|813&area=FLTCenterColumn|1|1|ItinList|12|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13931&totalPricePerPassenger=112.5"
                },
                {
                "purchaseLinkId": "SkyScanner|7|309",
                "providerId": "GotoGate",
                "partnerSuppliedProvider": {
                    "id": "Optional[gtuk]",
                    "displayName": "GotoGate",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/gtuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 114.99,
                "totalPricePerPassenger": 114.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13932",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|7|309&area=FLTCenterColumn|1|1|ItinList|12|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13932&totalPricePerPassenger=114.99"
                },
                {
                "purchaseLinkId": "SkyScanner|7|310",
                "providerId": "Booking.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[bcuk]",
                    "displayName": "Booking.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/bcuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 116.99,
                "totalPricePerPassenger": 116.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13933",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|7|310&area=FLTCenterColumn|1|1|ItinList|12|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13933&totalPricePerPassenger=116.99"
                },
                {
                "purchaseLinkId": "SkyScanner|7|311",
                "providerId": "Kiwi.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[skyp]",
                    "displayName": "Kiwi.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/skyp.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 117,
                "totalPricePerPassenger": 117,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13934",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|7|311&area=FLTCenterColumn|1|1|ItinList|12|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13934&totalPricePerPassenger=117"
                },
                {
                "purchaseLinkId": "SkyScanner|6|150",
                "providerId": "Expedia",
                "partnerSuppliedProvider": {
                    "id": "Optional[xpuk]",
                    "displayName": "Expedia",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/xpuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 118.34,
                "totalPricePerPassenger": 118.34,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13935",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|6|150&area=FLTCenterColumn|1|1|ItinList|12|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13935&totalPricePerPassenger=118.34"
                },
                {
                "purchaseLinkId": "SkyScanner|4|104",
                "providerId": "eDreams",
                "partnerSuppliedProvider": {
                    "id": "Optional[eduk]",
                    "displayName": "eDreams",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/eduk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 118.7,
                "totalPricePerPassenger": 118.7,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13936",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|4|104&area=FLTCenterColumn|1|1|ItinList|12|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13936&totalPricePerPassenger=118.7"
                },
                {
                "purchaseLinkId": "SkyScanner|7|312",
                "providerId": "BudgetAir",
                "partnerSuppliedProvider": {
                    "id": "Optional[s1uk]",
                    "displayName": "BudgetAir",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/s1uk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 120,
                "totalPricePerPassenger": 120,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13937",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|7|312&area=FLTCenterColumn|1|1|ItinList|12|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13937&totalPricePerPassenger=120"
                },
                {
                "purchaseLinkId": "SkyScanner|6|151",
                "providerId": "lastminute.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[lmuk]",
                    "displayName": "lastminute.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/lmuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 124.98,
                "totalPricePerPassenger": 124.98,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13938",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|6|151&area=FLTCenterColumn|1|1|ItinList|12|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13938&totalPricePerPassenger=124.98"
                }
            ]
            },
            {
            "segments": [
                {
                "legs": [
                    {
                    "originStationCode": "LTN",
                    "isDifferentOriginStation": false,
                    "destinationStationCode": "CDG",
                    "isDifferentDestinationStation": false,
                    "departureDateTime": "2023-12-07T15:15:00Z",
                    "arrivalDateTime": "2023-12-07T17:35:00+01:00",
                    "classOfService": "ECONOMY",
                    "marketingCarrierCode": "U2",
                    "operatingCarrierCode": "U2",
                    "amenities": [],
                    "flightNumber": 4640,
                    "seatGuruEquipmentId": 0,
                    "seatGuruAirlineUrl": "",
                    "numStops": 0,
                    "distanceInKM": 380.6494,
                    "isInternational": true,
                    "selfTransfer": false,
                    "operatingCarrier": {
                        "locationId": 8729066,
                        "code": "U2",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/easyJet.png",
                        "displayName": "easyJet"
                    },
                    "marketingCarrier": {
                        "locationId": 8729066,
                        "code": "U2",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/easyJet.png",
                        "displayName": "easyJet"
                    }
                    }
                ],
                "layovers": []
                },
                {
                "legs": [
                    {
                    "originStationCode": "ORY",
                    "isDifferentOriginStation": true,
                    "destinationStationCode": "LGW",
                    "isDifferentDestinationStation": true,
                    "departureDateTime": "2023-12-13T18:25:00+01:00",
                    "arrivalDateTime": "2023-12-13T18:30:00Z",
                    "classOfService": "ECONOMY",
                    "marketingCarrierCode": "VY",
                    "operatingCarrierCode": "VY",
                    "amenities": [],
                    "flightNumber": 6944,
                    "seatGuruEquipmentId": 0,
                    "seatGuruAirlineUrl": "",
                    "numStops": 0,
                    "distanceInKM": 326.02792,
                    "isInternational": true,
                    "selfTransfer": false,
                    "operatingCarrier": {
                        "locationId": 8729185,
                        "code": "VY",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Vueling.png",
                        "displayName": "Vueling"
                    },
                    "marketingCarrier": {
                        "locationId": 8729185,
                        "code": "VY",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Vueling.png",
                        "displayName": "Vueling"
                    }
                    }
                ],
                "layovers": []
                }
            ],
            "purchaseLinks": [
                {
                "purchaseLinkId": "SkyScanner|3|1463",
                "providerId": "eDreams",
                "partnerSuppliedProvider": {
                    "id": "Optional[eduk]",
                    "displayName": "eDreams",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/eduk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 97.12,
                "totalPricePerPassenger": 97.12,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13939",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|1463&area=FLTCenterColumn|1|1|ItinList|13|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13939&totalPricePerPassenger=97.12"
                },
                {
                "purchaseLinkId": "SkyScanner|3|1464",
                "providerId": "Mytrip",
                "partnerSuppliedProvider": {
                    "id": "Optional[mtuk]",
                    "displayName": "Mytrip",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/mtuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 98.99,
                "totalPricePerPassenger": 98.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13940",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|1464&area=FLTCenterColumn|1|1|ItinList|13|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13940&totalPricePerPassenger=98.99"
                },
                {
                "purchaseLinkId": "SkyScanner|3|1465",
                "providerId": "BudgetAir",
                "partnerSuppliedProvider": {
                    "id": "Optional[s1uk]",
                    "displayName": "BudgetAir",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/s1uk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 99,
                "totalPricePerPassenger": 99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13941",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|1465&area=FLTCenterColumn|1|1|ItinList|13|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13941&totalPricePerPassenger=99"
                },
                {
                "purchaseLinkId": "SkyScanner|3|1466",
                "providerId": "Kiwi.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[skyp]",
                    "displayName": "Kiwi.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/skyp.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 103,
                "totalPricePerPassenger": 103,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13942",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|1466&area=FLTCenterColumn|1|1|ItinList|13|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13942&totalPricePerPassenger=103"
                },
                {
                "purchaseLinkId": "SkyScanner|3|1467",
                "providerId": "GotoGate",
                "partnerSuppliedProvider": {
                    "id": "Optional[gtuk]",
                    "displayName": "GotoGate",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/gtuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 106.99,
                "totalPricePerPassenger": 106.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13943",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|1467&area=FLTCenterColumn|1|1|ItinList|13|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13943&totalPricePerPassenger=106.99"
                },
                {
                "purchaseLinkId": "SkyScanner|3|1468",
                "providerId": "lastminute.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[lmuk]",
                    "displayName": "lastminute.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/lmuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 107.98,
                "totalPricePerPassenger": 107.98,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13944",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|1468&area=FLTCenterColumn|1|1|ItinList|13|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13944&totalPricePerPassenger=107.98"
                },
                {
                "purchaseLinkId": "SkyScanner|3|1469",
                "providerId": "Booking.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[bcuk]",
                    "displayName": "Booking.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/bcuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 107.99,
                "totalPricePerPassenger": 107.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13945",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|1469&area=FLTCenterColumn|1|1|ItinList|13|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13945&totalPricePerPassenger=107.99"
                },
                {
                "purchaseLinkId": "SkyScanner|3|1470",
                "providerId": "Trip.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[ctuk]",
                    "displayName": "Trip.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/ctuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 109.1,
                "totalPricePerPassenger": 109.1,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13946",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|1470&area=FLTCenterColumn|1|1|ItinList|13|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13946&totalPricePerPassenger=109.1"
                }
            ]
            },
            {
            "segments": [
                {
                "legs": [
                    {
                    "originStationCode": "LTN",
                    "isDifferentOriginStation": false,
                    "destinationStationCode": "CDG",
                    "isDifferentDestinationStation": false,
                    "departureDateTime": "2023-12-07T18:35:00Z",
                    "arrivalDateTime": "2023-12-07T20:55:00+01:00",
                    "classOfService": "ECONOMY",
                    "marketingCarrierCode": "U2",
                    "operatingCarrierCode": "U2",
                    "amenities": [],
                    "flightNumber": 2441,
                    "seatGuruEquipmentId": 0,
                    "seatGuruAirlineUrl": "",
                    "numStops": 0,
                    "distanceInKM": 380.6494,
                    "isInternational": true,
                    "selfTransfer": false,
                    "operatingCarrier": {
                        "locationId": 8729066,
                        "code": "U2",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/easyJet.png",
                        "displayName": "easyJet"
                    },
                    "marketingCarrier": {
                        "locationId": 8729066,
                        "code": "U2",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/easyJet.png",
                        "displayName": "easyJet"
                    }
                    }
                ],
                "layovers": []
                },
                {
                "legs": [
                    {
                    "originStationCode": "ORY",
                    "isDifferentOriginStation": true,
                    "destinationStationCode": "LGW",
                    "isDifferentDestinationStation": true,
                    "departureDateTime": "2023-12-13T18:25:00+01:00",
                    "arrivalDateTime": "2023-12-13T18:30:00Z",
                    "classOfService": "ECONOMY",
                    "marketingCarrierCode": "VY",
                    "operatingCarrierCode": "VY",
                    "amenities": [],
                    "flightNumber": 6944,
                    "seatGuruEquipmentId": 0,
                    "seatGuruAirlineUrl": "",
                    "numStops": 0,
                    "distanceInKM": 326.02792,
                    "isInternational": true,
                    "selfTransfer": false,
                    "operatingCarrier": {
                        "locationId": 8729185,
                        "code": "VY",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Vueling.png",
                        "displayName": "Vueling"
                    },
                    "marketingCarrier": {
                        "locationId": 8729185,
                        "code": "VY",
                        "logoUrl": "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Vueling.png",
                        "displayName": "Vueling"
                    }
                    }
                ],
                "layovers": []
                }
            ],
            "purchaseLinks": [
                {
                "purchaseLinkId": "SkyScanner|3|329",
                "providerId": "eDreams",
                "partnerSuppliedProvider": {
                    "id": "Optional[eduk]",
                    "displayName": "eDreams",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/eduk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 97.12,
                "totalPricePerPassenger": 97.12,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13947",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|329&area=FLTCenterColumn|1|1|ItinList|14|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13947&totalPricePerPassenger=97.12"
                },
                {
                "purchaseLinkId": "SkyScanner|3|330",
                "providerId": "Mytrip",
                "partnerSuppliedProvider": {
                    "id": "Optional[mtuk]",
                    "displayName": "Mytrip",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/mtuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 98.99,
                "totalPricePerPassenger": 98.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13948",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|330&area=FLTCenterColumn|1|1|ItinList|14|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13948&totalPricePerPassenger=98.99"
                },
                {
                "purchaseLinkId": "SkyScanner|3|331",
                "providerId": "BudgetAir",
                "partnerSuppliedProvider": {
                    "id": "Optional[s1uk]",
                    "displayName": "BudgetAir",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/s1uk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 99,
                "totalPricePerPassenger": 99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13949",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|331&area=FLTCenterColumn|1|1|ItinList|14|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13949&totalPricePerPassenger=99"
                },
                {
                "purchaseLinkId": "SkyScanner|3|332",
                "providerId": "Kiwi.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[skyp]",
                    "displayName": "Kiwi.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/skyp.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 103,
                "totalPricePerPassenger": 103,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13950",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|332&area=FLTCenterColumn|1|1|ItinList|14|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13950&totalPricePerPassenger=103"
                },
                {
                "purchaseLinkId": "SkyScanner|3|333",
                "providerId": "GotoGate",
                "partnerSuppliedProvider": {
                    "id": "Optional[gtuk]",
                    "displayName": "GotoGate",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/gtuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 106.99,
                "totalPricePerPassenger": 106.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13951",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|333&area=FLTCenterColumn|1|1|ItinList|14|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13951&totalPricePerPassenger=106.99"
                },
                {
                "purchaseLinkId": "SkyScanner|3|334",
                "providerId": "lastminute.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[lmuk]",
                    "displayName": "lastminute.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/lmuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 107.98,
                "totalPricePerPassenger": 107.98,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13952",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|334&area=FLTCenterColumn|1|1|ItinList|14|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13952&totalPricePerPassenger=107.98"
                },
                {
                "purchaseLinkId": "SkyScanner|3|335",
                "providerId": "Booking.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[bcuk]",
                    "displayName": "Booking.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/bcuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 107.99,
                "totalPricePerPassenger": 107.99,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13953",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|335&area=FLTCenterColumn|1|1|ItinList|14|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13953&totalPricePerPassenger=107.99"
                },
                {
                "purchaseLinkId": "SkyScanner|3|336",
                "providerId": "Trip.com",
                "partnerSuppliedProvider": {
                    "id": "Optional[ctuk]",
                    "displayName": "Trip.com",
                    "logoUrl": "https://logos.skyscnr.com/images/websites/ctuk.png"
                },
                "commerceName": "SkyscannerFlightsMeta",
                "currency": "GBP",
                "originalCurrency": "GBP",
                "seatAvailability": 0,
                "taxesAndFees": 0,
                "taxesAndFeesPerPassenger": 0,
                "totalPrice": 108.8,
                "totalPricePerPassenger": 108.8,
                "fareBasisCodes": [],
                "containedPurchaseLinks": [],
                "impressionId": "b4feeb79-4507-4481-92e4-cc2730123f47.13954",
                "partnerData": {},
                "isPaid": false,
                "fareAttributesList": [],
                "url": "https://www.tripadvisor.com/CheapFlightsPartnerHandoff?searchHash=859189d1b07683ffc3fb0004155923ba&provider=SkyScanner|3|336&area=FLTCenterColumn|1|1|ItinList|14|Meta_ItineraryPrice&resultsServlet=CheapFlightsSearchResults&handoffPlatform=desktop&impressionId=b4feeb79-4507-4481-92e4-cc2730123f47.13954&totalPricePerPassenger=108.8"
                }
            ]
            }
        ]
        }
    }`
    var flightData;
    if(DEV_MODE){
        var preloadedResponse = JSON.parse(response);
        flightData = preloadedResponse.data.flights;
        console.log(flightData);  
        for(i=0;i<2;i++) {
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
        const url = "https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights?sourceAirportCode=" + fromCode + "&destinationAirportCode=" + toCode + "&date=" + startDateVal + "&itineraryType=ROUND_TRIP&sortOrder=PRICE&numAdults=" + adultNumber + "&numSeniors="  + seniorNumber + "&classOfService=ECONOMY&returnDate=" + endDateVal + "&pageNumber=1&currencyCode=GBP";
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'db33c1e3fbmsh3306c740b331275p182a48jsnd483e7640601',
                'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
            }
        };
        console.log("in the function");
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
            })
        } catch (error) {
            console.error(error);
        }
    }
 
}

//variable names for destination city: toCity departure date: startDateVal return date: endDateVal
//add info to the div with the weather-cards class
