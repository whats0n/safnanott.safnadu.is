<template>
  <div v-if="false">
    marker
  </div>
</template>

<script>
export default {
  props: {
    google: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
    marker: {
      type: Object,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    id: {
      type: [String, Number],
      required: true
    }
  },

  data: () => ({
    item: null
  }),

  mounted() {
    this.item = new this.google.maps.Marker({
      position: this.marker.position,
      marker: this.marker,
      map: this.map,
      icon: {
        url: this.icon,
        size: new this.google.maps.Size(52, 52),
        scaledSize: new this.google.maps.Size(52, 52),
        anchor: this.google.maps.Size(26, 26)
      }
    })
  }
}
</script>
