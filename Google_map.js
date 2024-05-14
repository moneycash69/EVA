// En este .js voy a probar utilizar la API de google maps para mostrar un mapa en la pagina web, ya que ahora tengo una cuenta de Google Cloud Platform
// y puedo utilizar la API de google maps :D.

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });

  // Crea un cuadro de búsqueda y lo vincula a un elemento de entrada de texto
  var input = document.getElementById('search-input');
  var searchBox = new google.maps.places.SearchBox(input);

  // Asegúrate de que el mapa se ajuste cuando el usuario selecciona un lugar
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  // Escucha el evento cuando el usuario selecciona una predicción
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Para cada lugar, obtén el icono, el nombre y la ubicación
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }

      // Crea un marcador para cada lugar
      new google.maps.Marker({
        map: map,
        title: place.name,
        position: place.geometry.location
      });

      if (place.geometry.viewport) {
        // Solo los geocódigos tienen viewport
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}