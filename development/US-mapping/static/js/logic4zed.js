


// Adding tile layer
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
})



// var link113 = "static/data/112Congress/test113simple.json";
//var year114 = "static/data/112Congress/test114simple.json";

function setEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.statename +
      "</h3><hr><p>District: " + feature.properties.district + "</p>");
}
var election114 = L.geoJSON(year114, {
    style: function() {
        return {
        color: "black",
        opacity: 0.5,
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: "blue",
        fillOpacity: 0.5,
        weight: 1.5
        };
    },
    onEachFeature: setEachFeature
});

var election107 = L.geoJSON(year107, {    
    style: function() {
        return {
        color: "white",
        opacity: 0.5,
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: "red",
        fillOpacity: 0.5,
        weight: 1.5
        };
    },
    onEachFeature: setEachFeature
});

// Creating map object
var map = L.map("map", {
    center: [39.5, -98.35],
    zoom: 5,
    layers: [streetmap, election114]
  });

var baseMap = {
    "Street Map":streetmap
};

var overlayMap = {
    "114th Congress": election114,
    "107th Congress": election107
};

L.control.layers(baseMap, overlayMap, {collapsed: false}).addTo(map);