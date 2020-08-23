<template>
  <div>
    <div>
      <input id="site" type="text" ref="site" v-model="site" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    google: {
      type: Object,
      required: true,
    },
    map: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      autocomplete: null, // google map Autocomplete method
      site: '餐廳', // place API要綁定的搜尋框
      places: null, // 存place確定後回傳的資料
      infowindow: {},
      markers: [],
    };
  },
  methods: {
    siteAuto() {
      // 將搜索範圍限制為默認國家/地區，並放置類型“ cities”。
      const options = {
        types: ['(cities)'],
        componentRestrictions: { country: 'tw' }, // 限制在台灣範圍
      };
      this.autocomplete = new this.google.maps.places.Autocomplete(
        this.$refs.site,
        options,
      );
      this.places = new this.google.maps.places.PlacesService(this.map);
      //   this.place = this.autocomplete.getPlace();
      // 地址的輸入框，值有變動時執行
      console.log(this.autocomplete.getPlace());
      this.autocomplete.addListener('place_changed', () => {
        const place = this.autocomplete.getPlace(); // 地點資料存進place
        // 確認回來的資料有經緯度
        if (place.geometry) {
          // 改變map的中心點
          const searchCenter = place.geometry.location;
          // panTo是平滑移動、setCenter是直接改變地圖中心
          this.map.panTo(searchCenter);
          this.search();

          // 在搜尋結果的地點上放置標記（未確認）////////
          //   const marker = new this.google.maps.Marker({
          //     position: searchCenter,
          //     map: this.map,
          //   });

          // info window
          //   this.infowindow = new this.google.maps.InfoWindow({
          //     content: this.place.formatted_address,
          //   });
          //   this.infowindow.open(this.map, marker);
          // 在搜尋結果的地點上放置標記（未確認）////
        }
      });
    },
    search() {
      const search = {
        bounds: this.map.getBounds(),
        types: ['lodging'],
      };
      this.places.nearbySearch(search, (results, status) => {
        if (status === this.google.maps.places.PlacesServiceStatus.OK) {
          this.clearResults();
          this.clearMarkers();
          for (let i = 0; i < results.length; i += 1) {
            this.markers[i] = new this.google.maps.Marker({
              position: results[i].geometry.location,
              animation: this.google.maps.Animation.DROP,
            });
            this.markers[i].placeResult = results[i];
            this.google.maps.event.addListener(
              this.markers[0],
              'click',
              this.showInfoWindow(),
            );
            setTimeout(this.dropMarker(i), i * 100);
            this.addResult(results[i], i);
          }
        }
      });
    },
    clearMarkers() {
      for (let i = 0; i < this.markers.length; i += 1) {
        if (this.markers[i]) {
          this.markers[i].setMap(null);
        }
      }
      this.markers = [];
    },
    setAutocompleteCountry() {
      const country = document.getElementById('country').value;

      if (country === 'all') {
        this.autocomplete.setComponentRestrictions({ country: [] });
        this.map.setCenter({ lat: 15, lng: 0 });
        this.map.setZoom(2);
      } else {
        this.autocomplete.setComponentRestrictions({ country });
        // this.map.setCenter(countries[country].center);
        // this.map.setZoom(countries[country].zoom);
      }
      this.learResults();
      this.clearMarkers();
    },
    dropMarker(i) {
      return this.markers[i].setMap(this.map);
    },
    showInfoWindow() {
      const marker = this;
      this.places.getDetails(
        { placeId: marker.placeResult.place_id },
        (place, status) => {
          if (status !== this.google.maps.places.PlacesServiceStatus.OK) {
            // return;
          }
          //   infoWindow.open(map, marker);
          //   buildIWContent(place);
        },
      );
    },
  },
  mounted() {
    this.siteAuto();
  },
};
</script>

<style>
</style>
