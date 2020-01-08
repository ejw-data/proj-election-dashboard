
// Creating map object
var map = L.map("map", {
  center: [37.5, -98.35],
  zoom: 4
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 22,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);


var link = "../static/data/114_update.json";

// Function that will determine the color of district
function chooseColor(district) {
  switch (district) {
  case "Republican":
    return "red";
  case "Independent":
    return "orange";
  case "Democratic":
    return "blue";
  default:
    return "black";
  }
}

// Grabbing our GeoJSON data..
d3.json(link).then(function(data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        color: "white",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: chooseColor(feature.properties.PARTY),
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // When a feature (district) is clicked, it is enlarged to fit the screen
        click: function(event) {
          map.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h4>District: " + feature.properties.DISTRICT + "</h4> <hr> <span>" + feature.properties.PARTY + "</span><br><span>" + feature.properties.NAME + "</span><br><a href=" + feature.properties.TAG + " class = \"btn btn-primary btn-sm btn-block\" style = \"color:white\" role=\"button\">Learn More</a>");

    }
  }).addTo(map);
});
