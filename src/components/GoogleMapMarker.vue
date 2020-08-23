<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      newMarker: {},
    };
  },
  props: {
    google: {
      type: Object,
      required: true,
    },
    map: {
      type: Object,
      required: true,
    },
    marker: {
      type: Object,
      required: true,
    },
  },

  methods: {
    Marker() {
      this.newMarker = new this.google.maps.Marker({
        position: this.marker.position,
        marker: this.marker,
        map: this.map,
        draggable: true,
        animation: this.google.maps.Animation.DROP,
        //   icon: POINT_MARKER_ICON_CONFIG,
      });
      // console.log(newMarker);
      this.newMarker.addListener('click', this.toggleBounce);
    },
    toggleBounce() {
      if (this.newMarker.getAnimation() !== null) {
        this.newMarker.setAnimation(null);
      } else {
        this.newMarker.setAnimation(this.google.maps.Animation.BOUNCE);
      }
    },
  },
  mounted() {
    this.Marker();
  },
};
</script>

<style>
</style>
