<template>
  <span
    :class="{
      'is-animating': isAnimating
    }"
    class="code"
  >
    <span class="code__icon">
      <div class="code__icon-bg" />
      <div class="code__icon-container">
        <svg viewBox="0 0 77 76" class="code__icon-in">
          <rect width="77" height="75.4902" rx="3" />
          <path
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M28.9054 29.8701C24.5561 29.8701 21.0304 33.3959 21.0304 37.7451C21.0304 42.0943 24.5561 45.6201 28.9054 45.6201C33.2546 45.6201 36.7803 42.0943 36.7803 37.7451C36.7803 33.3959 33.2546 29.8701 28.9054 29.8701ZM17.7041 37.7451C17.7041 31.5588 22.7191 26.5438 28.9054 26.5438C35.0917 26.5438 40.1066 31.5588 40.1066 37.7451C40.1066 43.9314 35.0917 48.9464 28.9054 48.9464C22.7191 48.9464 17.7041 43.9314 17.7041 37.7451Z"
          />
          <path
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M31.7078 39.8739C32.4655 39.3548 33.5006 39.5482 34.0198 40.306L38.1554 46.3432C38.6745 47.101 38.481 48.1361 37.7233 48.6552C36.9655 49.1743 35.9304 48.9809 35.4113 48.2231L31.2756 42.1859C30.7565 41.4281 30.95 40.393 31.7078 39.8739Z"
          />
          <path
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M41.1484 28.207C41.1484 27.2884 41.8931 26.5438 42.8116 26.5438H50.4038C52.3623 26.5438 54.2405 27.3218 55.6254 28.7067C57.0102 30.0915 57.7882 31.9697 57.7882 33.9282C57.7882 35.8866 57.0102 37.7649 55.6254 39.1497C54.2405 40.5345 52.3623 41.3125 50.4038 41.3125H42.8116C41.8931 41.3125 41.1484 40.5679 41.1484 39.6494V28.207ZM44.4747 29.8701V37.9862H50.4038C51.4801 37.9862 52.5123 37.5587 53.2733 36.7977C54.0344 36.0366 54.4619 35.0044 54.4619 33.9282C54.4619 32.8519 54.0344 31.8197 53.2733 31.0587C52.5123 30.2977 51.4801 29.8701 50.4038 29.8701H44.4747Z"
          />
          <path
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M42.8116 37.9835C43.7301 37.9835 44.4747 38.7281 44.4747 39.6467V47.2833C44.4747 48.2018 43.7301 48.9464 42.8116 48.9464C41.8931 48.9464 41.1484 48.2018 41.1484 47.2833V39.6467C41.1484 38.7281 41.8931 37.9835 42.8116 37.9835Z"
          />
          <path
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M49.5421 38.2245C50.3275 37.7482 51.3503 37.9987 51.8266 38.784L56.4585 46.4206C56.9348 47.206 56.6843 48.2288 55.8989 48.7051C55.1136 49.1815 54.0908 48.931 53.6144 48.1456L48.9826 40.509C48.5062 39.7237 48.7567 38.7009 49.5421 38.2245Z"
          />
          <path
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M52.3506 11.1348C52.3506 10.2163 53.0952 9.47168 54.0137 9.47168H59.6916C61.3694 9.47268 62.9782 10.1396 64.1645 11.326C65.3509 12.5124 66.0179 14.1212 66.0189 15.799V21.4768C66.0189 22.3953 65.2742 23.1399 64.3557 23.1399C63.4372 23.1399 62.6926 22.3953 62.6926 21.4768V15.8009C62.6926 15.8007 62.6926 15.8004 62.6926 15.8002C62.6926 15.8001 62.6926 15.8003 62.6926 15.8002C62.6918 15.0043 62.3753 14.2409 61.8125 13.678C61.2495 13.1151 60.4862 12.7985 59.69 12.798H54.0137C53.0952 12.798 52.3506 12.0534 52.3506 11.1348Z"
          />
          <path
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M64.3557 52.3503C65.2742 52.3503 66.0189 53.095 66.0189 54.0135V59.6913C66.0179 61.3691 65.3509 62.9779 64.1645 64.1643C62.9782 65.3507 61.3694 66.0176 59.6916 66.0186H54.0137C53.0952 66.0186 52.3506 65.274 52.3506 64.3555C52.3506 63.4369 53.0952 62.6923 54.0137 62.6923H59.6896C59.6899 62.6923 59.6901 62.6923 59.6903 62.6923C59.6904 62.6923 59.6903 62.6923 59.6903 62.6923C60.4863 62.6916 61.2497 62.3751 61.8125 61.8123C62.3753 61.2494 62.6918 60.4863 62.6926 59.6903C62.6926 59.6903 62.6926 59.6904 62.6926 59.6903C62.6926 59.6901 62.6926 59.6896 62.6926 59.6894V54.0135C62.6926 53.095 63.4372 52.3503 64.3557 52.3503Z"
          />
          <path
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.1348 52.3503C12.0534 52.3503 12.798 53.095 12.798 54.0135V59.6898C12.7985 60.4859 13.1151 61.2493 13.678 61.8123C14.2409 62.3751 15.004 62.6916 15.7999 62.6923C15.8 62.6923 15.7999 62.6923 15.7999 62.6923C15.8002 62.6923 15.8007 62.6923 15.8009 62.6923H21.4768C22.3953 62.6923 23.1399 63.4369 23.1399 64.3555C23.1399 65.274 22.3953 66.0186 21.4768 66.0186H15.799C14.1212 66.0176 12.5124 65.3507 11.326 64.1643C10.1396 62.9779 9.47268 61.3691 9.47168 59.6913L9.47168 54.0135C9.47168 53.095 10.2163 52.3503 11.1348 52.3503Z"
          />
          <path
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.799 9.47168L21.4768 9.47168C22.3953 9.47168 23.1399 10.2163 23.1399 11.1348C23.1399 12.0534 22.3953 12.798 21.4768 12.798H15.8005C15.0044 12.7985 14.241 13.1151 13.678 13.678C13.1151 14.241 12.7985 15.0044 12.798 15.8005V21.4768C12.798 22.3953 12.0534 23.1399 11.1348 23.1399C10.2163 23.1399 9.47168 22.3953 9.47168 21.4768L9.47168 15.799C9.47268 14.1212 10.1396 12.5124 11.326 11.326C12.5124 10.1396 14.1212 9.47268 15.799 9.47168Z"
          />
        </svg>
      </div>
    </span>
    <span class="code__text">
      <span class="code__text-container code__text-container_static">
        {{ codeText }}
      </span>
      <span class="code__text-container code__text-container_processing">
        <span
          v-for="item in processingText"
          :key="item"
          class="code__text-item"
        >
          {{ item }}
        </span>
      </span>
    </span>
  </span>
</template>

<script>
export default {
  name: 'Code',
  data: () => ({
    isAnimating: false
  }),
  computed: {
    processingText() {
      return this.$t('scanner.processing').split(' ')
    },
    codeText() {
      return this.$t('scanner.code')
    }
  },
  methods: {
    animationStart() {
      this.isAnimating = true
    },
    animationEnd() {
      this.isAnimating = false
    }
  }
}
</script>

<style lang="scss">
.code {
  display: block;

  $duration: 2.4s;

  &.is-animating {
    .code {
      &__icon {
        &-bg {
          opacity: 1;
        }

        &-container {
          &:before {
            opacity: 1;
          }
        }
      }

      &__text {
        &-container {
          &_static {
            opacity: 0;
          }

          &_processing {
            opacity: 1;
          }
        }
      }
    }
  }

  &__icon {
    position: relative;
    display: block;
    margin: 0 auto;
    max-width: pxToRem(77);

    &:not(:last-child) {
      margin-bottom: pxToRem(10);
    }

    &-bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
      transition: opacity 0.3s;
      pointer-events: none;

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
        opacity: 0.04;
        animation: bumping $duration infinite ease-in-out;
      }

      &:after {
        width: 130%;
        height: 130%;
        opacity: 0.09;
        animation: bumping-lg $duration infinite ease-in-out;
      }
    }

    &-container {
      position: relative;
      z-index: 1;

      &:before {
        content: '';
        position: absolute;
        z-index: 1;
        top: -15%;
        bottom: -10%;
        left: -10%;
        right: -10%;
        border-top: pxToRem(5) solid $white;
        opacity: 0;
        pointer-events: none;
        animation: scanning $duration infinite ease-in-out;
        transition: opacity 0.3s;
      }
    }

    &-in {
      display: inline-block;
      vertical-align: top;
      width: pxToRem(77);
      height: pxToRem(76);
      color: $white;
      fill: $black;
    }
  }

  &__text {
    position: relative;
    display: block;
    font-size: pxToRem(16);
    line-height: (19/16);

    &.fade-enter-active,
    &.fade-leave-active {
      transition: opacity 0.5s;
    }
    &.fade-enter,
    &.fade-leave-to {
      opacity: 0;
    }

    &-container {
      transition: opacity 0.25s;

      &_static {
        display: inline-block;
        vertical-align: top;
        max-width: 280px;
      }

      &_processing {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
      }
    }

    &-item {
      display: inline-block;
      padding: 0 pxToRem(2);
      vertical-align: top;

      @for $i from 1 through 4 {
        &:nth-child(#{$i}) {
          animation: fading $duration $i * 0.05s infinite ease-in-out;
        }
      }
    }
  }
}

@keyframes bumping {
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

@keyframes scanning {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, 98%);
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
</style>
