function startTime() {
  var today = new Date();
  var h = today.getHours();
  var ampm = h >= 12 ? 'pm' : 'am';
  var m = today.getMinutes();
  
  if (h < 12) {
    var timeOfDay = 'morning';
  } else if (h < 18) {
    var timeOfDay = 'afternoon';
  } else {
    var timeOfDay = 'night';
  }
  
  //make hours go 1-12, convert 00:00 to 12:00
  h = h ? h % 12 : 12;
  //make minutes padded with a zero when under 10
  m = m < 10 ? '0' + m : m;
  
  document.getElementById('time').innerHTML =
    h + ':' + m + ' ' + ampm;
  document.getElementById('greeting').innerHTML =
    document.getElementById('greeting').innerHTML.replace('%', timeOfDay);
  
  //refresh in 10 second intervals
  var t = setTimeout(startTime, 10000);
  
}

function kToF(kelvin, precision) {
  return (kelvin * 9 / 5 - 459.67).toFixed(precision);
}

function getWeather() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText)
      var weatherString = kToF(json.main.temp, 1) + '&#x2109, ' + json.weather[0].description;
      var weatherExtra = 'low: ' + kToF(json.main.temp_min, 0) + ' high: ' + kToF(json.main.temp_max, 0);
      document.getElementById('weather').innerHTML = weatherString;
      document.getElementById('weatherExtra').innerHTML = weatherExtra;
    }
  };
  xhttp.open('GET', 'http://api.openweathermap.org/data/2.5/weather?zip=02375,us&APPID=bc1a96c0959ab8e3001c880d867de711', true);
  xhttp.send();
}