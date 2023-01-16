<template>
    <div>
      <div>
        <h2>Vue Js Search and Add Marker</h2>
        <p>lat : <span>{{JSON.stringify(center)}}</span></p>
        <label>
          <GmapAutocomplete 
            @place_changed="initMarker"
          />
          <!-- <button @click="addLocationMarker">Add</button> -->
        </label>
        <br/>

        <textarea v-model="place"/>
        {{place}}
        <button @click="searchLocation">
            search
        </button>

      </div>
      <br>
      <GmapMap
            :zoom="17"    
            map-type-id="roadmap"
            :center="center"
            style="width:100%;  height: 400px;"
            :draggable="true"
            @dragend="handleDragEnd"
            @center_changed="handleDragMap"   
        >
        <GmapMarker
            :draggable="false"
            @drag="updateCoordinates"

          :key="index"
          v-for="(m, index) in locationMarkers"

          :position="m.position"
          @click="center=m.position"
        />
      </GmapMap>
    </div>
  </template>
   
  <script>
  import { gmapApi} from 'vue2-google-maps'
  export default {
    name: "AddGoogleMap",
    // components: ['gmapApi','GmapMap','GmapMarker' ],
    data() {
      return {
        place: '',
        center: { 
          lat: -6.9174639,
          lng: 107.6191228
        },
        locationMarkers: [{
            position : {lat: -6.9174639, lng: 107.6191228}
        }],
        locPlaces: [],
        existingPlace: null
      };
    },
    computed: {
        google: gmapApi,
    },
    mounted() {
        this.locateGeoLocation();
    },
   
    methods: {
         /* eslint-disable */ 
        searchLocation() {
            var geocoder = new this.google.maps.Geocoder();
            geocoder.geocode({'address': this.place }, (results, status) => {
                if (status === 'OK') {
                // this.currentLocation.lat = results[0].geometry.location.lat();
                // this.currentLocation.lng = results[0].geometry.location.lng();
                console.log('/////////////////////////////')
                console.log(results)
                console.log(results[0].geometry.location.lat());
                console.log(results[0].geometry.location.lng());
                console.log('/////////////////////////////');
                }else{
                    console.log('gagal');
                }
            });
        },
        handleDragMap(lo){
            console.log('dragend map')
            const marker = {
            lat: lo.lat(),
            lng: lo.lng()
          };
          this.locationMarkers =[{ position: marker }];
          console.log(marker, 'change center')
        },
        handleDragEnd(){
            this.center = this.locationMarkers[0].position
        },
      initMarker(loc) {
          // console.log(loc.geometry.location.lng())
          // this.existingPlace = loc;
          if (loc) {
              console.log(loc, 'loc')
          const marker = {
            lat: loc.geometry.location.lat(),
            lng: loc.geometry.location.lng()
          };
          this.locationMarkers.push({ position: marker });
          this.locPlaces.push(loc);
          this.center = marker;
        }
      },
      updateCoordinates(location) {
            if (location) {
                const marker = {
                    lat: location.latLng.lat(),
                    lng: location.latLng.lng()
                };
                this.locationMarkers =[{ position: marker }];
                this.locPlaces.push(location);
                this.center = marker;
            }
            // console.log('lat',location.latLng.lat())
            // console.log('lng', location.latLng.lng())
        },
      addLocationMarker() {
        if (this.existingPlace) {
          const marker = {
            lat: this.existingPlace.geometry.location.lat(),
            lng: this.existingPlace.geometry.location.lng()
          };
          this.locationMarkers.push({ position: marker });
          this.locPlaces.push(this.existingPlace);
          this.center = marker;
          this.existingPlace = null;
        }
      },
      locateGeoLocation: function() {
        navigator.geolocation.getCurrentPosition(res => {
            const marker = {
                lat:  res.coords.latitude,
                lng: res.coords.longitude
            };
            this.center = marker
          this.locationMarkers =[{ position: marker }];
        });
      }
    }
  };
  </script>