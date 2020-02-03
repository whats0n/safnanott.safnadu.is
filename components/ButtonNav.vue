<template>
  <button
    :class="{
      'is-active': isActive
    }"
    type="button"
    class="btn-nav"
    v-on="$listeners"
  >
    <span class="btn-nav__line"></span>
    <span class="btn-nav__line"></span>
    <span class="btn-nav__line"></span>
  </button>
</template>

<script>
export default {
  name: 'ButtonNav',
  inheritAttrs: false,
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.btn-nav {
  position: fixed;
  z-index: 200;
  top: pxToRem(61);
  right: pxToRem(32);
  border-radius: 50%;
  width: pxToRem(36);
  height: pxToRem(36);
  background: $white;
  transition: background-color 0.4s;

  @include mq-laptop {
    top: pxToRem(20);
    right: pxToRem(17);
  }

  &.is-active {
    background: $secondary;

    .btn-nav {
      &__line {
        border-color: $white;

        &:nth-child(1) {
          transform: translate3d(pxToRem(3), 0, 0) rotate(45deg);
        }

        &:nth-child(2) {
          opacity: 0;
          transform: translate3d(pxToRem(-8), 0, 0);
        }

        &:nth-child(3) {
          transform: translate3d(pxToRem(3), 0, 0) rotate(-45deg);
        }
      }
    }
  }

  &__line {
    position: absolute;
    left: pxToRem(8);
    border-top: pxToRem(2) solid #000;
    border-radius: pxToRem(1);
    width: pxToRem(20);
    transform: translate3d(0, 0, 0);
    transition-property: border-color, opacity, transform;
    transition-duration: 0.4s;

    &:nth-child(1) {
      top: pxToRem(10);
      transform-origin: left center;
    }

    &:nth-child(2) {
      top: 50%;
      margin-top: pxToRem(-1);
    }

    &:nth-child(3) {
      bottom: pxToRem(10);
      transform-origin: left center;
    }
  }
}
</style>
