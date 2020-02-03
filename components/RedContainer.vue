<template>
  <div
    :class="{
      'red-container_inner-page': isInnerPage,
      'is-visible': isVisible
    }"
    class="red-container container"
  >
    <div class="red-container__out container">
      <div class="red-container__inner">
        <slot name="default" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RedContainer',
  props: {
    isInnerPage: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    isVisible: false
  }),
  mounted() {
    this.isVisible = true
  }
}
</script>

<style lang="scss">
.red-container {
  position: relative;
  padding-left: 0 !important;
  padding-right: 0 !important;
  color: $white;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.7s, visibility 0.7s;

  &.is-visible {
    opacity: 1;
    visibility: visible;
  }

  &.red-container_inner-page {
    &:before,
    &:after {
      top: 0;
      height: pxToRem(951);
      display: none;
    }
  }

  &:not(.red-container_inner-page) {
    .red-container {
      &__out:before {
        background-image: url('/img/ellipsis.png');
        background-position: bottom -197px right 280px;
        background-size: 416px 416px;
        background-repeat: no-repeat;
      }
    }
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    background-color: $primary;
  }

  &:after {
    top: pxToRem(100);
    left: pxToRem(-174);
    border-radius: 50% 50% 0 0;
    width: pxToRem(951);
    height: pxToRem(951);
    background-image: url('/img/ellipsis.png');
    background-position: 172px 145px;
    background-size: 562px 562px;
    background-repeat: no-repeat;

    @include mq-tablet {
      left: pxToRem(-250);
    }

    @include mq-phone-portrait {
      top: pxToRem(125);
      left: 50%;
      width: pxToRem(706);
      height: pxToRem(706);
      transform: translate3d(-50%, 0, 0);
    }
  }

  &:before {
    top: pxToRem(135);
    left: pxToRem(200);
    border-radius: 50% 50% 0 0;
    width: pxToRem(1520);
    height: pxToRem(916);

    @include mq-tablet {
      left: pxToRem(80);
    }

    @include mq-phone-portrait {
      display: none;
    }
  }

  &__out {
    position: relative;

    &:before {
      content: '';
      position: absolute;
      top: pxToRem(590);
      left: pxToRem(-174);
      bottom: 0;
      width: pxToRem(174 + 200 + 1520);
      background-color: $primary;
    }
  }

  &__inner {
    position: relative;
    z-index: 3;
  }
}
</style>
