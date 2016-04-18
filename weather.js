// Start the program in the following way:
// node weather (dutchpostalcode)

// So for example :
// node weather 1234AB 1298AB
// WIll give the weather results for both postal codes

var weather = require("./getweather");
var postalcode = process.argv.slice(2);
if (postalcode.length == 0) {
  console.log("You did not enter a postalCode");
} else {
  postalcode.forEach(weather.get);
}