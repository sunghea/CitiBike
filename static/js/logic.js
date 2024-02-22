
let queryUrl = 'https://gbfs.citibikenyc.com/gbfs/en/station_information.json'

d3.json(queryUrl).then( function(response) {

 let stations = response.data.stations

 let bikeMarkers = []

 stations.forEach(function(station) {

  let marker = L.marker([station.lat, station.lon]).bindPopup(`<h3> ${station.name} </h3> <hr> <h2> ${station.capacity} </h2>`)

  bikeMarkers.push(marker)

 })

 let bikeStations = L.layerGroup(bikeMarkers)

 let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let baseMaps = {
  "Street Map": streetmap
};

let overlayMaps = {
  "Bike Stations": bikeStations
};

let map = L.map("map-id", {
  center: [40.73, -74.0059],
  zoom: 12,
  layers: [streetmap, bikeStations]
});

L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(map);

})