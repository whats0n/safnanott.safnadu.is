<template>
  <div
    :class="{
      'is-loaded': isLoaded,
      'is-visible': !isInvisible
    }"
    class="preloader"
  >
    <div class="preloader__container">
      <div class="preloader__icon">
        <svg viewBox="0 0 20 29" class="preloader__marker">
          <path
            d="M9.82323 0C4.51718 0 0.21582 4.30136 0.21582 9.60741C0.21582 11.3139 0.674094 12.91 1.45422 14.2982C1.5838 14.5288 1.71962 14.7558 1.86709 14.9744L9.82323 28.8222L17.7794 14.9744C17.9019 14.793 18.0075 14.6009 18.1168 14.4111L18.1925 14.2982C18.9719 12.91 19.4306 11.3139 19.4306 9.60741C19.4306 4.30136 15.1289 0 9.82323 0ZM9.82323 4.80371C12.4761 4.80371 14.6269 6.95445 14.6269 9.60741C14.6269 12.2603 12.4761 14.4111 9.82323 14.4111C7.17027 14.4111 5.01953 12.2603 5.01953 9.60741C5.01953 6.95445 7.17027 4.80371 9.82323 4.80371Z"
          />
          <path
            d="M9.82348 3.60278C6.50724 3.60278 3.81885 6.29118 3.81885 9.60742C3.81885 12.9232 6.50724 15.6121 9.82348 15.6121C13.1392 15.6121 15.8281 12.9232 15.8281 9.60742C15.8281 6.29118 13.1392 3.60278 9.82348 3.60278ZM9.82348 6.00464C11.8134 6.00464 13.4263 7.6176 13.4263 9.60742C13.4263 11.5972 11.8134 13.2102 9.82348 13.2102C7.83355 13.2102 6.2207 11.5972 6.2207 9.60742C6.2207 7.6176 7.83355 6.00464 9.82348 6.00464Z"
          />
        </svg>
        <div class="preloader__icon-in">
          <img
            v-for="(img, i) in images"
            :src="img"
            :alt="i"
            :key="i"
            :class="{
              'is-visible': activeImg === i
            }"
            class="preloader__img"
            @load="handleLoad"
          />
        </div>
      </div>
      <div class="preloader__text">
        <div
          v-for="item in processingText"
          :key="item"
          class="preloader__text-item"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import images from '~/helpers/preloader-images'
import { mapMutations } from 'vuex'

export default {
  name: 'Preloader',
  data: () => ({
    isVisible: true,
    isLoaded: false,
    hasTimeout: true,
    counter: 0,
    activeImg: 0
  }),
  computed: {
    images() {
      return images
    },
    processingText() {
      return this.$t('preloader').split(' ')
    },
    isInvisible() {
      return !this.isVisible && !this.hasTimeout
    }
  },
  watch: {
    isLoaded(isLoaded) {
      this.timer && clearTimeout(this.timer)
      isLoaded && this.autoplay()
    },
    isInvisible(isInvisible) {
      isInvisible && setTimeout(() => this.setLoading(false), 800)
    }
  },
  beforeCreate() {
    this.$root.$on('preloader:close', () => {
      this.isVisible = false
    })
  },
  created() {
    setTimeout(() => {
      this.hasTimeout = false
    }, 2000)
    setTimeout(() => {
      this.$root.$emit('preloader:close')
    }, 5000)
  },
  methods: {
    ...mapMutations(['setLoading']),
    handleLoad() {
      this.counter++
      this.isLoaded = this.counter >= this.images.length
    },
    autoplay() {
      return setTimeout(() => {
        this.activeImg =
          this.activeImg < this.images.length - 1 ? this.activeImg + 1 : 0
        this.timer = this.autoplay()
      }, 250)
    }
  }
}
</script>

<style lang="scss">
.preloader {
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  color: $white;
  background: $primary;
  transition: opacity 0.8s, visibility 0.8s;

  &.is-visible {
    opacity: 1;
    visibility: visible;
  }

  &.is-loaded {
    .preloader {
      &__icon-in {
        opacity: 1;
      }
    }
  }

  $duration: 2.4s;

  &__container {
    margin: auto;
  }

  &__marker {
    position: absolute;
    z-index: 2;
    left: 50%;
    bottom: 100%;
    width: pxToRem(60);
    fill: $white;
    transform: translate(-50%, 30%);
  }

  &__icon {
    position: relative;
    margin: 0 auto;
    width: pxToRem(300);
    height: pxToRem(300);

    &:before,
    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      border-radius: 50%;
      background: $white;
      transform: translate(-50%, -50%);
    }

    &:before {
      width: 110%;
      height: 110%;
      opacity: 0.09;
      animation: bumping-md $duration infinite ease-in-out;
    }

    &:after {
      width: 130%;
      height: 130%;
      opacity: 0.04;
      animation: bumping-lg $duration infinite ease-in-out;
    }

    &-in {
      position: relative;
      z-index: 1;
      overflow: hidden;
      border: pxToRem(7) solid $white;
      border-radius: 50%;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 0.3s;
    }
  }

  &__img {
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0;
    transform: translate(-50%, -35%);

    &.is-visible {
      opacity: 1;
    }
  }

  &__text {
    padding-top: pxToRem(46);

    &-item {
      display: inline-block;
      vertical-align: top;
      padding: 0 pxToRem(2);
      opacity: 0;
      font-size: pxToRem(24);
      font-weight: 700;
      line-height: 1.2;
      text-align: center;

      @for $i from 1 through 6 {
        &:nth-child(#{$i}) {
          animation: fading $duration $i * 0.1s infinite ease-in-out;
        }
      }
    }
  }

  @keyframes bumping-md {
    0%,
    100% {
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.3);
    }
  }

  @keyframes bumping-lg {
    0%,
    100% {
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.4);
    }
  }

  @keyframes fading {
    0% {
      opacity: 0;
      transform: translate(0, pxToRem(5));
    }

    20% {
      opacity: 1;
      transform: translate(0, 0);
    }

    80% {
      opacity: 1;
      transform: translate(0, 0);
    }

    100% {
      opacity: 0;
      transform: translate(0, pxToRem(-5));
    }
  }
}
</style>
