console. log ("use strict")
console. log ("Loaded map.js")
mapboxgl.accessToken = "pk.eyJ1IjoidGFuaGFpbHVuIiwiYSI6ImNrN3h5NDVjcDAweGYzbG83YTdvcjhjYmIifQ.CMP3ZyJYJOCVhum1Mu3vmw"

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/basic-v9',
    center: [-73.96024, 40.80877],
    zoom: 16
})

let navigation = new mapboxgl.NavigationControl({
    showCompass: false
})

map.addControl(navigation, 'top-left')

let scale = new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'imperial'
})

map.addControl(scale, 'bottom-right')

let geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserLocation: true,
    fitBoundsOptions: {
    }
})

map.addControl(geolocate, 'top-left')

geolocate.on('geolocate', function(event) {

})

map.on('click', function(event) {
    let features = map.queryRenderedFeatures({ layers: ['rat-sightings'] })
    console.log(features)
    let current_location = [event.lngLat.lng, event.lngLat.lat]
    console.log("Click location:", current_location)
      if (features.length == 0) return
      let closest_distance = Infinity
    let closest_feature = null
     for (let feature of features) {
         let distance = turf.distance(turf.point(feature.geometry.coordinates), turf.point(current_location))
          if (distance < closest_distance) {
            closest_distance = distance
            closest_feature = feature
        }        

    }
     console.log("Closest feature:", closest_feature.geometry.coordinates, "(", closest_distance, "m)")
     })

