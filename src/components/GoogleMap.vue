<template>
  <div>
    <div><input type="text"></div>
    <GoogleMapLoader :mapConfig="mapConfig" apiKey="AIzaSyAQnQX7jMRvt7NdgPMKt-14DZQHSG5_j9A">
      <template slot-scope="{ google, map }">
        <GoogleMapMarker
          v-for="marker in markers"
          :key="marker.id"
          :marker="marker"
          :google="google"
          :map="map"
        />
        <GoogleMapPlace :google="google" :map="map"/>
      </template>
    </GoogleMapLoader>
    <div id="listing">
      <table id="resultsTable">
        <tbody id="results"></tbody>
      </table>
    </div>
  </div>
</template>

<script>
// import { mapSettings } from '@/constants/mapSettings';
import GoogleMapLoader from './GoogleMapLoader.vue';
import GoogleMapMarker from './GoogleMapMarker.vue';
import GoogleMapPlace from './GoogleMapPlace.vue';

export default {
  data() {
    return {
      markers: [
        { id: 'a', position: { lat: 25.033989, lng: 121.564546 } },
        { id: 'b', position: { lat: 5, lng: 99 } },
        { id: 'c', position: { lat: 6, lng: 97 } },
      ],
    };
  },
  components: {
    GoogleMapLoader,
    GoogleMapMarker,
    GoogleMapPlace,
  },
  computed: {
    mapConfig() {
      return {
        // ...mapSettings,
        zoom: 16,
        // center: { lat: 25.0374865, lng: 121.5647688 },
        center: this.mapCenter,
        // terrain根據地形信息顯示物理地圖
        // mapTypeId: 'terrain',
      };
    },
    mapCenter() {
      return this.markers[0].position;
    },
  },
};
</script>

<style lang="scss" >
.google-map {
  width: 100%;
  height: 540px;
  // overflow: none;
}
</style>
