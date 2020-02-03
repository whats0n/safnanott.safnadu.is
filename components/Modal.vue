<template>
  <div
    :class="{
      'is-opened': isOpened
    }"
    class="modal"
    @click="handleClose"
  >
    <div ref="container" class="modal__container">
      <button
        v-if="hasClose"
        type="button"
        class="modal__close"
        @click.prevent="close"
      >
        <svg viewBox="0 0 36 38" class="modal__close-in">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M35.333 33.0556L31.1708 37.3334L13.333 19L31.1708 0.666706L35.333 4.94448L21.6573 19L35.333 33.0556Z"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.5 4.9444L4.66216 0.666626L22.5 19L4.66216 37.3333L0.5 33.0555L14.1757 19L0.5 4.9444Z"
          />
        </svg>
      </button>
      <div ref="container" class="modal__inner">
        <div class="modal__content">
          <slot name="default" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    hasClose: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    isOpened: false
  }),
  methods: {
    handleClose(e) {
      const isContainer = Array.isArray(e.path)
        ? !e.path.includes(this.$refs.container)
        : e.target.closest('.modal__container') !== this.$refs.container
      isContainer && this.close()
    },
    open() {
      this.isOpened = true
      this.$nextTick(() => this.$emit('open'))
    },
    close() {
      this.isOpened = false
      this.$nextTick(() => this.$emit('close'))
    }
  }
}
</script>

<style lang="scss">
.modal {
  position: fixed;
  z-index: 150;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s, visibility 0.4s;

  @include mq-tablet {
    align-items: flex-end;
    // padding-top: pxToRem(184);
    padding-top: pxToRem(50);
    background: rgba($black, 0.6);
  }

  &.is-opened {
    opacity: 1;
    visibility: visible;
  }

  &.is-success {
    .modal {
      &__container {
        padding-top: 0;
        max-width: pxToRem(537);
        max-height: pxToRem(537);

        &:before {
          transform: scale(1);
        }
      }

      &__inner {
        overflow: visible;
      }
    }
  }

  &__close {
    position: absolute;
    z-index: 5;
    top: pxToRem(-33);
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: pxToRem(-33);
    border-radius: 50%;
    width: pxToRem(66);
    height: pxToRem(66);
    background-color: $secondary;
    font-size: 0;

    &-in {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -0.5em 0 0 (-(36/38) * 1em)/2;
      width: (36/38) * 1em;
      height: 1em;
      fill: $white;
      font-size: pxToRem(36);
    }
  }

  &__container {
    position: relative;
    display: flex;
    margin: auto;
    width: 100%;
    max-width: pxToRem(631);
    height: 100%;
    max-height: pxToRem(631);
    transition: max-width 0.4s, max-height 0.4s;

    @include mq-tablet {
      padding-top: pxToRem(38);
      max-width: none;
      // max-height: none;
      margin: 0;
      height: auto;
      max-height: 100%;

      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        border-radius: 50%;
        width: pxToRem(729);
        height: pxToRem(729);
        background: $primary;
        transform: translate3d(-50%, 0, 0);
      }
    }

    @include mq-phone-portrait {
    }

    &:before {
      content: '';
      position: absolute;
      top: pxToRem(-97);
      left: pxToRem(-97);
      right: pxToRem(-97);
      bottom: pxToRem(-97);
      border: pxToRem(1) solid $primary;
      border-radius: 50%;
      background: $primary;
      opacity: 0.4;
      box-shadow: pxToRem(49) pxToRem(13) pxToRem(92) rgba(0, 0, 0, 0.15);
      transform: scale(0.7);
      transition: transform 0.4s;

      @include mq-tablet {
        display: none;
      }
    }
  }

  &__inner {
    position: relative;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 1 auto;
    overflow: auto;
    margin: auto;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    color: $white;
    background: $primary;

    @include mq-tablet {
      display: block;
      // margin-top: 38px;
      padding-bottom: pxToRem(38);
      border-radius: 0;
      background: none;
    }
  }

  &__content {
    margin: auto;
    width: 100%;
  }
}
</style>
