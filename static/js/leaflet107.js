//https://gis.stackexchange.com/questions/66193/multiple-instance-of-leaflet-on-page
// Creating map object
var map2 = L.map("map2", {
  center: [37.5, -98.35],
  zoom: 4
});

// Adding tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 22
}).addTo(map2);

var link = "../static/data/107_update.json";

// Function that will determine the color of a district based on party
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
    // Style each feature (in this case a district)
    style: function(feature) {
      return {
        color: "white",
        // Call the chooseColor function to decide which color to color our district (color based on party affiliation)
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
      layer.bindPopup("<h3>District: " + feature.properties.DISTRICT + "</h3> <hr> <p>" + feature.properties.PARTY + "</p><br><p>"+ feature.properties.NAME+"</p>");

    }
  }).addTo(map2);
});
