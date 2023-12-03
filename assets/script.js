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

var fromCode;
var toCode;

$(function () {
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

    });

 

})