// from data.js
var tableData = data;

// Get a reference to the table body
var tbody = d3.select("tbody");

// Use d3 to update each cell's text with ufo sighting data
// (datetime, city, state, country, shape, duration, comments)
tableData.forEach(function(ufoReport) {
//   console.log(ufoReport);
  var row = tbody.append("tr");
  Object.entries(ufoReport).forEach(function([key, value]) {
    // console.log(key, value);
    // Append a cell to the row for each value
    // in the ufo sighting report object
    var cell = row.append("td");
    cell.text(value);
  });
});


// Select the button
var button = d3.select("#filter-btn");

// Select the form
var form = d3.select(".form-group");

// Create event handlers 
button.on("click", runEnter);
form.on("submit",runEnter);

// Complete the event handler function for the form
function runEnter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
    
    // Select the input element and get the raw HTML node
    var inputElementDate = d3.select("#datetime");
    var inputElementCity = d3.select("#city");
    var inputElementState = d3.select("#state");
    var inputElementCountry = d3.select("#country");
    var inputElementShape = d3.select("#shape");
  
    // Get the value property of the input element
    var inputValueDate = inputElementDate.property("value");
    var inputValueCity = inputElementCity.property("value");
    var inputValueState = inputElementState.property("value");
    var inputValueCountry = inputElementCountry.property("value");
    var inputValueShape = inputElementShape.property("value");
  
    // console.log(inputValue);
    // console.log(tableData);

    // Fiter data by entered parameters
    var filteredData = tableData.filter(date => date.datetime === inputValueDate)
        .filter(city => city.city === inputValueCity)
        .filter(state => state.state === inputValueState)
        .filter(country => country.country === inputValueCountry)
        .filter(shape => shape.shape === inputValueShape);

    // console.log(filteredData);

    // remove any children from the table
    tbody.html("");
  
    // If/else statement to evaluate entered parameters
    let response = {
        filteredData
    }

    if(response.filteredData.length !== 0) {
        // Use d3 to update each cell's text with ufo sighting data specific to parameters entered
        // (datetime, city, state, country, shape, duration, comments)
        filteredData.forEach(function(ufoByDate) {
            //   console.log(ufoByDate);
            var row = tbody.append("tr");
            Object.entries(ufoByDate).forEach(function([key, value]) {
                // console.log(key, value);
                // Append a cell to the row for each value
                // in the ufo sighting report object
                var cell = row.append("td");
                cell.text(value);
            });
        });
    }

        // Message to input different data because output is not available for selected input
    
        else {
            tbody.append("tr").append("td").text("Please modify input data");
        }
}

    
