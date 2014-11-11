var leaflet = require('leaflet')

var centuries = [1300, 1400, 1500, 1600, 1700, 1800, 1900]
  , tileProxy = "habsburgs.dx.artsmia.org:3245"
  , layerUrls = centuries.map(function(year) { return "//"+tileProxy+"/assets/tiles/wdh-"+year+"/{z}/{x}/{y}.png" })
  , layers = layerUrls.map(function(url) { 
      return L.tileLayer(url, {maxZoom: 7, minZoom: 3})
    })

var map = L.map('map').setView([47.197178, 13.73291], 5)

layers.forEach(function(layer) { layer.addTo(map) })

var activeLayer = layers[0]

var range = document.querySelector('input')

function update() {
  var nextIndex = (layers.indexOf(activeLayer)+1)%layers.length
    , nextLayer = layers[nextIndex]
  activeLayer = nextLayer
  layers.forEach(function(layer) { layer.setZIndex(0) })
  activeLayer.setZIndex(1)
  range.value = nextIndex
  setTimeout(update, 1000) 
}
update()

window.api = {
  map: map,
  layers: layers,
  update: update,
}
