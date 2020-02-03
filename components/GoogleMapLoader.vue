<template>
  <div class="google-map">
    <div class="google-map__zoom-controls">
      <button
        type="button"
        class="google-map__zoom-control google-map__zoom-control_plus"
        @click.prevent="zoomIn"
      />
      <button
        type="button"
        class="google-map__zoom-control"
        @click.prevent="zoomOut"
      />
    </div>
    <div ref="googleMap" class="google-map__canvas"></div>
    <template v-if="isLoaded">
      <slot :google="google" :map="map" name="default" />
    </template>
  </div>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader'
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'GoogleMapLoader',
  props: {
    mapConfig: {
      type: Object,
      default: () => ({})
    },
    apiKey: {
      type: String,
      default: ''
    }
  },
  data: vm => ({
    google: null,
    map: null,
    zoomLevel: vm.mapConfig.zoom,
    position: null
  }),
  computed: {
    ...mapGetters(['creatures']),
    ...mapState(['durations']),
    isLoaded() {
      return !!this.google && !!this.map
    }
  },
  watch: {
    creatures: {
      immediate: true,
      handler(newItems, oldItems) {
        !(oldItems && oldItems.length) && this.calculateDistance()
      }
    },
    google: {
      immediate: true,
      handler() {
        this.calculateDistance()
      }
    },
    position: {
      immediate: true,
      handler() {
        this.calculateDistance()
      }
    },
    'mapConfig.center': {
      immediate: true,
      handler(center) {
        this.map && this.map.setCenter(center)
      }
    },
    'mapConfig.zoom': {
      immediate: true,
      handler(zoom) {
        this.map && this.map.setZoom(zoom)
      }
    }
  },
  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: this.apiKey,
      language: 'en'
    })
    this.google = googleMapApi
    this.initializeMap()
    this.initPosition()
  },
  methods: {
    ...mapMutations(['setDurations']),
    initializeMap() {
      this.map = new this.google.maps.Map(this.$refs.googleMap, this.mapConfig)
      this.$nextTick(() => this.$emit('init', this.google.maps))
    },
    calculateDistance() {
      if (
        !(this.creatures && this.google && this.position) ||
        Object.keys(this.durations).length
      )
        return
      const directionsService = new this.google.maps.DirectionsService()
      const durations = {}
      const calculationDuration = (item, i) => {
        const position = new this.google.maps.LatLng(
          +item.position.lat,
          +item.position.lng
        )
        setTimeout(() => {
          directionsService.route(
            {
              origin: this.position,
              destination: position,
              travelMode: 'WALKING'
            },
            (response, status) => {
              if (status === 'OK') {
                durations[item.id] = response.routes[0].legs[0].duration
                Object.keys(durations).length === this.creatures.length &&
                  this.setDurations(durations)
              } else {
                console.log('Directions request failed due to ' + status)
              }
            }
          )
        }, 500 * i)
      }
      this.creatures.forEach(calculationDuration)
    },
    initPosition() {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          this.position = new this.google.maps.LatLng(lat, lng)
          this.$root.$emit('preloader:close')
        },
        () => this.$root.$emit('preloader:close')
      )
    },
    zoomIn() {
      this.map.setZoom(++this.zoomLevel)
    },
    zoomOut() {
      this.map.setZoom(--this.zoomLevel)
    }
  }
}
</script>

<style lang="scss">
.google-map {
  position: relative;

  &__zoom-controls {
    position: absolute;
    z-index: 2;
    top: pxToRem(78);
    right: 0;
    display: flex;
    flex-direction: column;
  }

  &__zoom-control {
    position: relative;
    width: pxToRem(58);
    height: pxToRem(58);
    background: $secondary;

    &:not(:last-child) {
      margin-bottom: pxToRem(9);
    }

    &_plus {
      &:before {
        content: '';
        position: absolute;
        top: pxToRem(14);
        left: 50%;
        bottom: pxToRem(14);
        margin-left: pxToRem(-3);
        border-left: pxToRem(6) solid $white;
      }
    }

    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: pxToRem(14);
      right: pxToRem(14);
      margin-top: pxToRem(-3);
      border-top: pxToRem(6) solid $white;
    }
  }

  &__canvas {
    height: pxToRem(548);
  }
}
</style>
