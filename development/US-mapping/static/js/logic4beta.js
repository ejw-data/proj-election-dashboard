// links to geojson data
var link = "static/data/112Congress/test114simple.json";
var link2 = "static/data/112Congress/test113simple.json";

var jsonlink;
function toconsole(){
    console.log(jsonlink);
}

d3.json(link, function(data){
    for (var i=0; i <data.length; i++){
        console.log(data[i]);
    }
})


// // Adding tile layer
// var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "mapbox.streets",
//   accessToken: API_KEY
// });



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


//   // Creating map object
// var map = L.map("map", {
//     center: [39.5, -98.35],
//     zoom: 5,
//     layers:[streetmap, congress113, congress114 ]
//   });
  
//   // Pass our map layers into our layer control
//   // Add the layer control to the map
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(map);
  
