// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 12,
  id: "mapbox.light",
  accessToken: API_KEY
}).addTo(myMap);

// Function that will determine the color of a earthquake based on the magnitude it belongs to
function getColor(d){
  if (d < 1) {
      color = "greenyellow";
  }
  else if (d < 2) {
      color = "green";
  }
  else if (d < 3 ) {
      color = "yellow";
  }
  else if (d < 4 ) {
      color = "orange";
  }
  else if (d < 5 ) {
      color = "red";
  }
  else {
      color = "darkred";
  }
return color};
// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// console.log(queryUrl)
// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  console.log(data);

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  data.features.forEach(feature =>  {
    var lon = feature.geometry.coordinates[0]
    var lat = feature.geometry.coordinates[1]
    // adding a circle marker
    L.circle([lat, lon], {
      fillOpacity: 0.60,
      color: "lightgrey",
      fillColor: getColor(feature.properties.mag),
      radius: (feature.properties.mag)*40000
    }).bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) +
      "<br> Earthquake Magnitude : "+ feature.properties.mag + "</p>").addTo(myMap);
  });
});
//  adding legend to the map object
var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');
    labels = [],
    categories = [0,1,2,3,4,5];

    
    for (var i = 0; i < categories.length; i++) {

            div.innerHTML += 
            labels.push(
                '<i style=background:' + getColor(categories[i]) + '></i> ' +
            categories[i]+ (categories[i+1] ? "&ndash;" + categories[i+1]+"<br>":"+"));

        }
        div.innerHTML = labels.join("");
    return div;
    };
    legend.addTo(myMap);
  
