<template>
  <div
    :class="{
      'is-opened': isOpened
    }"
    class="overlay"
  />
</template>

<script>
export default {
  name: 'Overlay',
  props: {
    isOpened: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
.overlay {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  visibility: hidden;
  background: rgba(0, 0, 0, 0.3);
  transition: opacity 0.4s, visibility 0.4s;

  @include mq-phone-landscape {
    background: none;
  }

  &.is-opened {
    opacity: 1;
    visibility: visible;
  }
}
</style>
