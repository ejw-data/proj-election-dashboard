


// Adding tile layer
var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18
})

// In future add selectable colors for each map layer
// function chooseColor(precinct) {
//     switch (precinct) {
//     case "Republican":
//       return "red";
//     case "Democratic":
//       return "blue";
//     case "Independent":
//       return "orange";
//     default:
//       return "Green";
//     }
//   }

// var link113 = "static/data/112Congress/test113simple.json";
//var year114 = "static/data/112Congress/test114simple.json";

function setEachFeature114(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.STATENAME +
      "</h3><hr><p>District (114th): " + feature.properties.DISTRICT + "</p>");


}
function setEachFeature107(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.STATENAME +
      "</h3><hr><p>District (107th): " + feature.properties.DISTRICT + "</p>");

}
var election114 = L.geoJSON(year114, {
    style: function() {
        return {
        color: "black",
        opacity: 0.5,
        // Call the chooseColor function to decide which color to color our district (color based on party)
        fillColor: "red", //chooseColor(feature.properties.PARTY),
        fillOpacity: 0.0,
        weight: 1.5
        };
    },
    onEachFeature: setEachFeature114
});

var election107 = L.geoJSON(year107, {    
    style: function() {
        return {
        color: "green",
        opacity: 0.5,
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: "blue", //chooseColor(feature.properties.PARTY),
        fillOpacity: 0.0,
        weight: 1.5
        };
    },
    onEachFeature: setEachFeature107
});

// var keys = Object.keys(pointlayer._layers)
// keys.forEach(function(key){
//     pointlayer._layers[key].setStyle({
//         color: 
//     })
// })

// Creating map object
var map3 = L.map("map3", {
    center: [39.5, -98.35],
    zoom: 4,
    layers: [streetmap, election114]
  });

var baseMap = {
    "Street Map":streetmap
};

var overlayMap = {
    "<span style='color: black'>114th Congress</span>": election114,
    "<span style='color: green'>107th Congress</span>": election107
};

L.control.layers(baseMap, overlayMap, {collapsed: false}).addTo(map3);