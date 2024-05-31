// Google_map.js

window.onload = function() {
  var script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${config.apiKey}&libraries=places&callback=initMap`;
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });

  var marker; // Variable para guardar el marcador

  // Variables para guardar las coordenadas del marcador
  var markerLat, markerLng;

  // Agrega un evento de clic al mapa
  map.addListener('click', function(e) {
    // Elimina el marcador anterior, si existe
    if (marker) {
        marker.setMap(null);
    }

    // Crea un nuevo marcador en la ubicación del clic
    marker = new google.maps.Marker({
        position: e.latLng,
        map: map
    });

    // Guarda las coordenadas del marcador en las variables
    markerLat = e.latLng.lat();
    markerLng = e.latLng.lng();

    // Imprime las coordenadas en la consola
    console.log(`Marker coordinates: ${markerLat}, ${markerLng}`);
  });

  // Use the coordinates later in your code
  someFunctionThatNeedsCoordinates(markerLat, markerLng);
}
    

    // Crea un elemento div para el cuadro de búsqueda
    var inputDiv = document.createElement('div');
    inputDiv.style.margin = '10px'; // Añade un margen alrededor del cuadro de búsqueda

    // Crea el cuadro de búsqueda y lo agrega al div
    var input = document.createElement('input');
    
    input.id = 'search-input';
    input.type = 'text';
    input.style.width = '300px'; // Establece el ancho del cuadro de búsqueda
    inputDiv.appendChild(input);

    // Agrega el div como un control en el mapa
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputDiv);

    var searchBox = new google.maps.places.SearchBox(input);

    // Asegúrate de que el mapa se ajuste cuando el usuario selecciona un lugar
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    map.addListener('click', function(e) {
      // ...
      // Guarda las coordenadas del marcador en las variables
      markerLat = e.latLng.lat();
      markerLng = e.latLng.lng();

      // Imprime las coordenadas en la consola
      console.log(`Marker coordinates: ${markerLat}, ${markerLng}`);
  });

    // Añade un listener para el evento 'places_changed' que se dispara cuando el usuario selecciona un lugar de la caja de búsqueda
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Para cada lugar, obtén el icono, nombre y ubicación
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
          if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
          }

          // Extend the bounds of the map to include the selected place
          if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
          } else {
              bounds.extend(place.geometry.location);
          }
      });
      map.fitBounds(bounds);  // This line moves the map to the selected place
  });
