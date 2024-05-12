var redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  

// Inicializar el mapa y establecer su vista inicial
var map = L.map('map', {
    minZoom: 3,  // Nivel mínimo de zoom permitido
    maxZoom: 19, // Nivel máximo de zoom permitido
    worldCopyJump: true, // Evita que el mapa se repita al desplazarte horizontalmente
    maxBounds: [[-90, -180], [90, 180]], // Limita la vista a la extensión del mundo
    maxBoundsViscosity: 1.0, // Hace que los límites sean completamente sólidos
}).setView([-34.61, -58.38], 13);

// Agregar la capa de teselas de OpenStreetMap al mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 19,
}).addTo(map);



//L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=tu_clave_de_api', {
//  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//    maxZoom: 19,
//    id: 'mapbox/streets-v11',
//    tileSize: 512,
//    zoomOffset: -1,
//    language: 'es' // Configura el idioma a español
//}).addTo(map);





// Variable para almacenar el marcador actual
var marker;

// Variable para almacenar el círculo actual
var circle;

// Agregar un marcador al mapa cuando se hace clic izquierdo
map.on('click', function(e) {
    // Si ya hay un marcador, lo remueve
    if (marker) {
        map.removeLayer(marker);
    }

    // Si ya hay un círculo, lo remueve
    if (circle) {
        map.removeLayer(circle);
    }

    // Agrega un nuevo marcador en la ubicación del clic con el icono personalizado
    marker = L.marker(e.latlng, {icon: redIcon}).addTo(map);

    // Agrega un nuevo círculo en la ubicación del clic
    circle = L.circle(e.latlng, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500 // radio en metros
    }).addTo(map);
});

// Remover el marcador y el círculo del mapa cuando se hace clic derecho
map.on('contextmenu', function(e) {
    // Si ya hay un marcador, lo remueve
    if (marker) {
        map.removeLayer(marker);
        marker = null; // Asegúrate de resetear la variable del marcador
    }

    // Si ya hay un círculo, lo remueve
    if (circle) {
        map.removeLayer(circle);
        circle = null; // Asegúrate de resetear la variable del círculo
    }
});

// Agregar un marcador al mapa cuando se hace clic izquierdo
map.on('click', function(e) {
    // Si ya hay un marcador, lo remueve
    if (marker) {
        map.removeLayer(marker);
    }

    // Si ya hay un círculo, lo remueve
    if (circle) {
        map.removeLayer(circle);
    }

    // Agrega un nuevo marcador en la ubicación del clic con el icono personalizado
    marker = L.marker(e.latlng, {icon: redIcon}).addTo(map);

    // Agrega un nuevo círculo en la ubicación del clic
    circle = L.circle(e.latlng, {
        // Aquí irían las propiedades del círculo
    }).addTo(map);

    // Imprime las coordenadas en la consola
    console.log(e.latlng);
});
// Agregar el control de geocodificación al mapa
var geocoder = L.Control.geocoder({
    defaultMarkGeocode: false
})
.on('markgeocode', function(e) {
    var bbox = e.geocode.bbox;
    var poly = L.polygon([
        [bbox.getSouthWest().lat, bbox.getSouthWest().lng],
        [bbox.getNorthWest().lat, bbox.getNorthWest().lng],
        [bbox.getNorthEast().lat, bbox.getNorthEast().lng],
        [bbox.getSouthEast().lat, bbox.getSouthEast().lng]
    ]).addTo(map);
});