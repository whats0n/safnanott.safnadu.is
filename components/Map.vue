<template>
  <div
    :class="{
      'map_without-text': !hasText
    }"
    class="map"
  >
    <div v-if="hasText" class="map__header">
      <div class="map__title">
        <svg viewBox="0 0 20 29" class="map__title-icon">
          <path
            d="M9.82323 0C4.51718 0 0.21582 4.30136 0.21582 9.60741C0.21582 11.3139 0.674094 12.91 1.45422 14.2982C1.5838 14.5288 1.71962 14.7558 1.86709 14.9744L9.82323 28.8222L17.7794 14.9744C17.9019 14.793 18.0075 14.6009 18.1168 14.4111L18.1925 14.2982C18.9719 12.91 19.4306 11.3139 19.4306 9.60741C19.4306 4.30136 15.1289 0 9.82323 0ZM9.82323 4.80371C12.4761 4.80371 14.6269 6.95445 14.6269 9.60741C14.6269 12.2603 12.4761 14.4111 9.82323 14.4111C7.17027 14.4111 5.01953 12.2603 5.01953 9.60741C5.01953 6.95445 7.17027 4.80371 9.82323 4.80371Z"
          />
          <path
            d="M9.82348 3.60278C6.50724 3.60278 3.81885 6.29118 3.81885 9.60742C3.81885 12.9232 6.50724 15.6121 9.82348 15.6121C13.1392 15.6121 15.8281 12.9232 15.8281 9.60742C15.8281 6.29118 13.1392 3.60278 9.82348 3.60278ZM9.82348 6.00464C11.8134 6.00464 13.4263 7.6176 13.4263 9.60742C13.4263 11.5972 11.8134 13.2102 9.82348 13.2102C7.83355 13.2102 6.2207 11.5972 6.2207 9.60742C6.2207 7.6176 7.83355 6.00464 9.82348 6.00464Z"
          />
        </svg>
        <div class="map__title-text">
          {{ $t('map.title') }}
        </div>
      </div>
      <!-- <div class="map__description">
        {{ $t('map.description') }}
      </div> -->
    </div>
    <client-only>
      <template v-if="markers.length">
        <GoogleMapLoader
          ref="map"
          :map-config="mapConfig"
          api-key="AIzaSyDDF1URxEauxeJdHd6NjcA_D5lao_FenvI"
          class="map__figure"
          @init="handleMapInit"
        >
          <template #default="{ google, map }">
            <GoogleMapMarker
              v-for="marker in markers"
              ref="marker"
              :id="marker.id"
              :key="marker.id"
              :icon="marker.icon"
              :marker="marker"
              :google="google"
              :map="map"
            />
          </template>
        </GoogleMapLoader>
      </template>
    </client-only>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import { TimelineMax, Power1 } from 'gsap'

import GoogleMapLoader from './GoogleMapLoader'
import GoogleMapMarker from './GoogleMapMarker'
import { mapSettings } from '~/helpers/constants'

export default {
  name: 'Map',
  components: {
    GoogleMapLoader,
    GoogleMapMarker
  },
  props: {
    hasText: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapState(['activeCreatureId']),
    ...mapGetters(['creatures']),
    markers() {
      return this.creatures.map(item => ({
        id: item.id,
        position: { lat: +item.position.lat, lng: +item.position.lng },
        icon: '/img/map.svg'
      }))
    },
    mapConfig() {
      return {
        ...mapSettings,
        center: this.mapCenter,
        zoom: this.mapZoom
      }
    },
    activeMarker() {
      return this.markers.find(item => item.id === this.activeCreatureId)
    },
    mapCenter() {
      const marker = this.activeMarker || this.markers[0]
      return marker && marker.position
    },
    mapZoom() {
      return this.activeMarker ? mapSettings.zoom + 2 : mapSettings.zoom
    }
  },
  methods: {
    handleMapInit(maps) {
      this.$refs.marker.forEach(marker =>
        maps.event.addListener(marker.item, 'click', () => {
          this.$router.push({
            path: this.$i18n.path('creature'),
            query: {
              id: marker.id
            }
          })

          const position = { x: 0, y: window.scrollY || window.pageYOffset }

          new TimelineMax({
            onUpdate: () => {
              window.scrollTo(position.x, position.y)
            }
          }).to(position, 0.7, {
            y: 0,
            ease: Power1.easeInOut
          })
        })
      )
    }
  }
}
</script>

<style lang="scss">
.map {
  padding-top: pxToRem(30);
  padding-bottom: pxToRem(30);

  @include mq-tablet {
    // padding-top: 0;
    padding-bottom: 0;
  }

  &_without-text {
    padding-top: pxToRem(105);

    @include mq-phone-landscape {
      padding-top: 0;
    }
  }

  &__figure {
    @include mq-tablet {
      margin-left: pxToRem(-16);
      margin-right: pxToRem(-16);
    }
  }

  &__header {
    text-align: center;

    &:not(:last-child) {
      margin-bottom: pxToRem(27);
    }
  }

  &__title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: pxToRem(28);
    font-weight: 700;
    line-height: (34/28);

    &-icon {
      align-items: flex-start;
      flex-shrink: 0;
      margin-right: pxToRem(10);
      width: (20/29) * 1em;
      height: 1em;
      fill: currentColor;
      transform: translate(0, -15%);
    }
  }

  &__description {
    font-size: pxToRem(19);
    line-height: (23/19);
  }
}
</style>
