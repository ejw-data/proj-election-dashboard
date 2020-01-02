    // Adding tile layer
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: API_KEY
    });

// links to geojson data
var link = "static/data/112Congress/test114simple.json";
var link2 = "static/data/112Congress/test113simple.json";

d3.json(link, function(data){
    var data114 = data.feature;
    d3.json(link2, function(data2){
        var data113 = data2.feature;
        return data113
    })
    createFeatures(data113, data114);
  })

  function createFeatures(jsondata1, jsondata2){

    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.statename +
          "</h3><hr><p>" + new Date(feature.properties.district) + "</p>");
    }
    var election114 = L.geoJSON(jsondata1, {
        onEachFeature: onEachFeature
    });

    var election113 = L.geoJSON(jsondata2, {
        onEachFeature: onEachFeature
    });

    createMap(election113, election114);

  }

  function createMap(layer1, layer2){


    // Initialize all of the LayerGroups we'll be using
    var layers = {
        ELECTION114: new L.LayerGroup(),
        ELECTION113: new L.LayerGroup(),
    };

    layers.ELECTION113 = layer1;
    layers.ELECTION114 = layer2;

        // Creating map object
    var map = L.map("map", {
        center: [39.5, -98.35],
        zoom: 5,
        layers:[layers.ELECTION113, layers.ELECTION114 ]
    });

    streetmap.addTo(map);

    var overlays = {
        "113th Congress": layers.ELECTION113,
        "114th Congress": layers.ELECTION114   
    };

    L.control.layers(null, overlays).addTo(map);

    var info = L.control({
        position: "bottomright"
    });

    // When the layer control is added, insert a div with the class of "legend"
    info.onAdd = function() {
        var div = L.DomUtil.create("div", "legend");
        return div;
    };
    // Add the info legend to the map
    info.addTo(map);

  }






// // Function that will determine the color of a neighborhood based on the borough it belongs to
// function chooseColor(borough) {
//   switch (borough) {
//   case "Republican":
//     return "red";
//   case "Alabama":
//     return "red";
//   case "Arkansas":
//     return "orange";
//   case "Democrat":
//     return "blue";
//   case "Republican2":
//     return "purple";
//   default:
//     return "black";
//   }
// }

// var layer114 = []
// // Grabbing our GeoJSON data..
// d3.json(link).then(function(data) {
//   // Creating a geoJSON layer with the retrieved data
//   layer114.push(L.geoJson(data, {
//     // Style each feature (in this case a neighborhood)
//     style: function(feature) {
//       return {
//         color: "white",
//         // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
//         fillColor: chooseColor(feature.properties.party),
//         fillOpacity: 0.5,
//         weight: 1.5
//       };
//     },
//     // Called on each feature
//     onEachFeature: function(feature, layer) {
//       // Set mouse events to change map styling
//       layer.on({
//         // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
//         mouseover: function(event) {
//           layer = event.target;
//           layer.setStyle({
//             fillOpacity: 0.9
//           });
//         },
//         // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
//         mouseout: function(event) {
//           layer = event.target;
//           layer.setStyle({
//             fillOpacity: 0.5
//           });
//         },
//         // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
//         click: function(event) {
//           map.fitBounds(event.target.getBounds());
//         }
//       });
//       // Giving each feature a pop-up with information pertinent to it
//       layer.bindPopup("<h1>District: " + feature.properties.district + "</h1> <hr> <h2>" + feature.properties.party + "</h2>");

//     }
//   }))
// });

// var layer113=[]
// // Grabbing our GeoJSON data..
// d3.json(link2).then(function(data) {
//     // Creating a geoJSON layer with the retrieved data
//     layer113.push(L.geoJson(data, {
//       // Style each feature (in this case a neighborhood)
//       style: function(feature) {
//         return {
//           color: "white",
//           // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
//           fillColor: chooseColor(feature.properties.party),
//           fillOpacity: 0.5,
//           weight: 1.5
//         };
//       },
//       // Called on each feature
//       onEachFeature: function(feature, layer) {
//         // Set mouse events to change map styling
//         layer.on({
//           // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
//           mouseover: function(event) {
//             layer = event.target;
//             layer.setStyle({
//               fillOpacity: 0.9
//             });
//           },
//           // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
//           mouseout: function(event) {
//             layer = event.target;
//             layer.setStyle({
//               fillOpacity: 0.5
//             });
//           },
//           // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
//           click: function(event) {
//             map.fitBounds(event.target.getBounds());
//           }
//         });
//         // Giving each feature a pop-up with information pertinent to it
//         layer.bindPopup("<h1>District: " + feature.properties.district + "</h1> <hr> <h2>" + feature.properties.party + "</h2>");
  
//       }
//     }))
//   });

//   var congress114 = L.layerGroup(layer114);
//   var congress113 = L.layerGroup(layer113);

//   var baseMaps = {
//     "Street Map": streetmap,
//   };

//   var overlayMaps = {
//     "Congress 114th": congress114,
//     "Congress 113th": congress113
//   };



  
//   // Pass our map layers into our layer control
//   // Add the layer control to the map
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(map);
  
