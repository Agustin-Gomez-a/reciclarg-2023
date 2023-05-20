function initMap() {
  // Crear un mapa centrado en unas coordenadas
  var map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.61772, lng: -68.33007 },
      zoom: 13,
  });
  // Solicitar la ubicación del usuario y almacenarla en una variable
  var userLocation;
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
          userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
          };
          // Crear un marcador para la ubicación del usuario
          var userMarker = new google.maps.Marker({
              position: userLocation,
              map: map,
              title: "Tu ubicación",
          });
      });
  }
  // Crear una constante con los marcadores que se quieren mostrar
  var markers = [
      { lat: -34.617438, lng: -68.321647, title: 'Punto ECO #1', desc: "Punto de reciclaje apto para: vidrio, plastico y metales" },
      { lat: -34.615361, lng: -68.337249, title: 'Punto ECO #2', desc: "Punto de reciclaje apto para: vidrio, plastico y metales" },
      { lat: -34.619537, lng: -68.332456, title: 'Punto ECO #3', desc: "Punto de reciclaje apto para: vidrio, plastico y metales" },
      { lat: -34.621273, lng: -68.344097, title: 'Punto ECO #4', desc: "Punto de reciclaje apto para: vidrio, plastico y metales" },
      { lat: -34.598896, lng: -68.324633, title: 'Punto ECO #5', desc: "Punto de reciclaje apto para: vidrio, plastico y metales" },
      { lat: -34.620728, lng: -68.311871, title: 'Punto ECO #6', desc: "Punto de reciclaje apto para: vidrio, plastico y metales" },
      { lat: -34.620015, lng: -68.316056, title: 'Punto ECO #7', desc: "Punto de reciclaje apto para: vidrio, plastico y metales" },
      { lat: -34.618579, lng: -68.312804, title: 'Punto ECO #8', desc: "Punto de reciclaje apto para: vidrio, plastico y metales" },
      { lat: -34.609064, lng: -68.317628, title: 'Punto ECO #9', desc: "Punto de reciclaje apto para: vidrio, plastico y metales" },
      { lat: -34.594653, lng: -68.343803, title: 'Punto ECO #10', desc: "Punto de reciclaje apto para: vidrio, plastico y metales" }
  ];
  const image = {
      url: "https://reciclarg.cloud/cesto.png"
  }
  // Crear un objeto LatLngBounds para ajustar el mapa a los marcadores
  var bounds = new google.maps.LatLngBounds();

  // Recorrer el array de marcadores y crearlos en el mapa
// Crear una variable para almacenar la instancia de la ventana de información actualmente abierta
var currentInfoWindow = null;

markers.forEach(function (marker) {
// Crear un objeto LatLng con las coordenadas del marcador
var position = new google.maps.LatLng(marker.lat, marker.lng);
// Extender el objeto bounds con la posición del marcador
bounds.extend(position);
// Crear el marcador en el mapa
var mapMarker = new google.maps.Marker({
position: position,
map: map,
title: marker.title,
icon: image

});
mapMarker.addListener('click', function() {
// Cerrar la ventana de información actualmente abierta
if (currentInfoWindow != null) {
  currentInfoWindow.close();
}
// Crear una instancia de la clase google.maps.InfoWindow()
var infowindow = new google.maps.InfoWindow({
  content: marker.title +" " + marker.desc
});
// Almacenar la instancia de la ventana de información actualmente abierta
var currentInfoWindow = infowindow;
// Abrir la ventana
infowindow.open(map, mapMarker);
});
});
  
  // Ajustar el mapa a los marcadores
  map.fitBounds(bounds);
  // Crear un botón para mostrar el marcador más cercano y la ruta
  var button = document.getElementById("button");

  // Añadir un evento click al botón
  button.addEventListener("click", function () {
      // Comprobar si se ha obtenido la ubicación del usuario
      if (userLocation) {
          // Calcular la distancia entre el usuario y cada marcador
          var distances = markers.map(function (marker) {
              return google.maps.geometry.spherical.computeDistanceBetween(
                  userLocation,
                  new google.maps.LatLng(marker.lat, marker.lng)
              );
          });
          // Encontrar el índice del marcador más cercano
          var minIndex = distances.indexOf(Math.min(...distances));
          // Obtener las coordenadas y el título del marcador más cercano
          var nearestMarker = markers[minIndex];
          // Crear un objeto DirectionsService para calcular la ruta
          var directionsService = new google.maps.DirectionsService();
          // Crear un objeto DirectionsRenderer para mostrar la ruta en el mapa
          var directionsRenderer = new google.maps.DirectionsRenderer();
          // Asignar el mapa al objeto directionsRenderer
          directionsRenderer.setMap(map);
          // Definir las opciones de la ruta
          var request = {
              origin: userLocation,
              destination: new google.maps.LatLng(nearestMarker.lat, nearestMarker.lng),
              travelMode: "DRIVING",
          };
          // Calcular y mostrar la ruta
          directionsService.route(request, function (result, status) {
              if (status == "OK") {
                  directionsRenderer.setDirections(result);
              }
          });
          // Crear una instancia de la clase google.maps.InfoWindow()
          var infowindow = new google.maps.InfoWindow({
              content:
                  "El marcador más cercano es " +
                  nearestMarker.title +
                  ", a " +
                  Math.round(distances[minIndex]) +
                  " metros de distancia.",
          });
          // Abrir la ventana de información en el marcador más cercano
          if (currenteInfoWindow !== null){
          currentInfoWindow.close();}
          infowindow.open(map, new google.maps.Marker({
              position: new google.maps.LatLng(nearestMarker.lat, nearestMarker.lng),
              map: map,
              title: nearestMarker.title,
          }));
      } else {
          // Mostrar un mensaje de error si no se ha obtenido la ubicación del usuario
          alert("No se ha podido obtener tu ubicación.");
      }
  });
}


// Add Event Listeners
btn.addEventListener("click", () => {
menu.classList.toggle("hidden");
});

// evento de inf contenedores
// Manejar el inicio de sesión
function signInWithGoogle() {
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      // El usuario ha iniciado sesión correctamente
      var user = result.user;
      console.log(user);
    })
    .catch((error) => {
      // Hubo un error en el inicio de sesión
      var errorMessage = error.message;
      console.log(errorMessage);
    });
}
//Estilos de la encuesta
const containers = document.querySelectorAll('.relative');

containers.forEach(container => {
  container.addEventListener('mouseenter', () => {
    container.querySelector('.fill').classList.add('fill-active');
  });

  container.addEventListener('mouseleave', () => {
    container.querySelector('.fill').classList.remove('fill-active');
  });
});
document.querySelectorAll('.progress-container').forEach(function(container) {
  container.addEventListener('mouseover', function() {
    var progressBar = this.querySelector('.progress-bar');
    progressBar.style.transform = 'scaleX(1)';
  });
});

//ocultar menu movil
window.addEventListener('resize', function() {
  const width = window.innerWidth || document.documentElement.clientWidth;

  if (width > 768) { // Ajusta el tamaño de pantalla según tus necesidades
    const hiddenElements = document.querySelectorAll('.hide-mobile');
    hiddenElements.forEach(function(element) {
      element.style.display = 'inline-block';
    });
  }
});

//js del hero
// Obtén todas las cards
const cards = document.querySelectorAll('.card');

// Añade un event listener para cada card
cards.forEach((card, index) => {
  card.addEventListener('click', () => {
    // Remueve la clase 'card-active' de todas las cards
    cards.forEach((c) => {
      c.classList.remove('card-active');
    });
    // Añade la clase 'card-active' a la card actual
    card.classList.add('card-active');
    // Añade el efecto de desenfoque (blur) a la card verde
    if (index !== 0) {
      cards[0].classList.add('card-blur');
    } else {
      cards[0].classList.remove('card-blur');
    }
  });
});




