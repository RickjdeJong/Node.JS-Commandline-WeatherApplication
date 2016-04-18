
function convertTimestamp(timestamp) {
  var d = new Date(timestamp * 1000),	// Convert the passed timestamp to milliseconds
		yyyy = d.getFullYear(),
		mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
		dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
		hh = d.getHours(),
		h = hh,
		min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
		ampm = 'AM',
		time;
			
	if (hh > 12) {
		h = hh - 12;
		ampm = 'PM';
	} else if (hh === 12) {
		h = 12;
		ampm = 'PM';
	} else if (hh == 0) {
		h = 12;
	}
	
	// ie: 2013-02-18, 8:35 AM	
	time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
		
	return time;
}

function printMessage(city, description, temperature, pressure, humidity, sunrise, sunset){
  //Getting all the info from the previous call and spitting them out
  var temperature = temperature - 272.15;
  temperature = temperature.toFixed(2);
  console.log("The weather in " + city + ":");
  console.log(description);
  console.log(temperature + " Degrees Celcius");
  console.log("The pressure is: " + pressure);
  console.log("And the humidity is: " + humidity + "%");
  console.log("The sun rises at: " + sunrise);
  console.log("The sun sets at: " + sunset);
  console.log("---------------------------------------");
}

function get(postalCode){
  var http = require("http");
  var apiKey = "276892e8ff98cac107c93af6d1f21966";
  var body = "";

  //Connect to the Weather API
  var request = http.get("http://api.openweathermap.org/data/2.5/weather?zip=" + postalCode + ",nl&appid=" + apiKey, function(response) {
    //Read the data  
    response.on('data', function (chunk) {
      body += chunk;
    });
    
    //Received all data
    response.on('end', function () {
      if(response.statusCode === 200) {
        try {
          //Parse the data
          var weatherInfo = JSON.parse(body);
          //Sending all the data to the printMessage function
          printMessage(weatherInfo.name, weatherInfo.weather[0].description, weatherInfo.main.temp, weatherInfo.main.pressure, weatherInfo.main.humidity, convertTimestamp(weatherInfo.sys.sunrise), convertTimestamp(weatherInfo.sys.sunset));
        } catch(error) {
          //Parse Error
          printError(error);
        }
      } else {
        //Status Code Error 
        printError("There was an error getting the profile for " + postalCode + ". (" + https.STATUS_CODES[response.statusCode] + ")");
      }
    });
   
  });
  
  //Connection Error
  request.on('error', function(){
    console.error("There was an error getting the weather information for postal" + postalCode + ". (" + https.STATUS_CODES[response.statusCode] + ")");
  });
}

module.exports.get = get;
