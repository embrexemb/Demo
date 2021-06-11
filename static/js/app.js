// from data.js
var tableData = data;

// YOUR CODE HERE!

// Get references to the tbody element, input field and button

var tbody_html = d3.select("tbody");
var searchBtn_html = d3.select("#filter-btn");
var resetBtn_html = d3.select("#reset-btn");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
//$searchBtn.addEventListener("click", handleSearchButtonClick);
searchBtn_html.on("click",handleSearchButtonClick);
resetBtn_html.on("click",handleResetClick);

// renderTable renders the tableData to the tbody
function renderTable() {
  tbody_html.innerHTML = "";
  //if (tableData.datatime == "") {tableData = data; console.log('no tableData');}
  tableData.forEach(element => {
    var row = tbody_html.append("tr");
    Object.entries(element).forEach(([key,value])=>{
      var cell = row.append("td");
      cell.text(value);
    })

    
  });
}

function handleResetClick(){
  var table_data = document.getElementById("ufo-tbody");
  table_data.innerHTML = "";   
  renderTable();
}

function handleSearchButtonClick() {
  // prevent page from refreshing
  d3.event.preventDefault();
 
  //filter for date
 var inputElement = d3.select("#datetime");
 var inputValue = inputElement.property("value");
//start with date to get dataset
 var filteredData = tableData.filter(record => record.datetime === inputValue);
 
 var cinputElement = d3.select("#city_id");
 var cinputValue = cinputElement.property("value");
 if (cinputValue !=""){
    //if there is a city get the data
    filteredData = filteredData.filter(record => record.city === cinputValue);
    }

    var sinputElement = d3.select("#state_id");
    var sinputValue = sinputElement.property("value");
    if (sinputValue !=""){
       //if there is a state get the data
       filteredData = filteredData.filter(record => record.state === sinputValue);
       }

    var cninputElement = d3.select("#country_id");
    var cninputValue = cninputElement.property("value");
    if (cninputValue !=""){
      //if there is a country get the data
      filteredData = filteredData.filter(record => record.country === cninputValue);
      }   
      
    var shinputElement = d3.select("#shape_id");
    var shinputValue =shinputElement.property("value");
    if (shinputValue != ""){
      //if there is a shape get the data
      filteredData = filteredData.filter(record => record.shape === shinputValue);
    }
 
 
 //render the filtered data here
 console.log(filteredData);
 
  var table_data = document.getElementById("ufo-tbody");
  table_data.innerHTML = "";   
 
  for (var i=0; i < filteredData.length; i++){
    var data = filteredData[i];
    var fields = Object.keys(data);
    console.log(data);
    console.log(fields);
    var $row = table_data.insertRow(i);
    for (var j=0; j<fields.length; j++){
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = data[field];
    }
  }
  
 
}


// Render the table for the first time on page load
renderTable();
