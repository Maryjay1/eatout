import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const initMapbox = () => {
  const mapElement = document.getElementById('map');

  const fitMapToMarkers = (map, markers) => {
    map.setZoom(13);
    map.setCenter([markers[0].lng, markers[0].lat])
    const bounds = new mapboxgl.LngLatBounds();
    markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
    // map.fitBounds(bounds, { padding: 70, maxZoom: 14, duration: 1000 });
  };

  if (mapElement) {
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/lordmoomoo/ck0705ics06cn1cm50aeuz50k'
    });
    if (window.location.href.includes("restaurants")) {
      map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken, mapboxgl: mapboxgl }));
    };

    map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }));

    // const directionFetch = (usrLat, usrLng, restLat, restLng) => {
      // fetch(`https://api.mapbox.com/directions/v5/mapbox/walking/${usrLat},${usrLng};${restLat},${restLng}?geometries=geojson&access_token, {
      // method: "POST"
    // })
      // .then(response => response.json())
      // .then((data) => {
        // console.log(data);
      // });
    // };

    //directionFetch(51.5151385, 0.115524, 51.5151385, 0.105234);

    const markers = JSON.parse(mapElement.dataset.markers);
    markers.forEach((marker) => {
      // console.log(marker.lat, 'lat');
      const popup = new mapboxgl.Popup().setHTML(marker.infoWindow);
      // console.log(marker, 'marker')
      const element = document.createElement('div');
      element.className = 'marker';
      element.style.backgroundImage = `url('${marker.image_url}')`;
      element.style.backgroundSize = 'contain';
      element.style.width = '30px';
      element.style.height = '30px';

      new mapboxgl.Marker(element)
      .setLngLat([ marker.lng, marker.lat ])
      .setPopup(popup)
      .addTo(map);
    });


    fitMapToMarkers(map, markers);


  }




};

export { initMapbox };
