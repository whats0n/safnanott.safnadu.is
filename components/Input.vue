<template>
  <div
    :class="{
      'is-activated': isActivated,
      'is-error': !isValid
    }"
    class="input-field"
  >
    <div class="input-field__label">
      {{ placeholder }}
    </div>
    <div class="input-field__container">
      <input
        :value="value"
        :type="type"
        class="input-field__control"
        @input="$emit('input', $event.target.value)"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </div>
    <div class="input-field__error-message">
      {{ $t(errorMessage) }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Input',
  inheritAttrs: false,
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    },
    errorMessage: {
      type: String,
      default: ''
    },
    isValid: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    isFocused: false
  }),
  computed: {
    isActivated() {
      return !!this.value.length || this.isFocused
    }
  },
  methods: {
    handleFocus() {
      this.isFocused = true
    },
    handleBlur() {
      this.isFocused = false
    }
  }
}
</script>

<style lang="scss">
.input-field {
  position: relative;
  padding-top: pxToRem(9);

  &.is-activated {
    .input-field {
      &__label {
        transform: translate3d(0, 0, 0) scale((12/20));
      }
    }
  }

  &.is-error {
    .input-field {
      &__error-message {
        opacity: 0.72;
      }
    }
  }

  &__error-message {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    margin-top: pxToRem(3);
    opacity: 0;
    font-size: pxToRem(14);
    line-height: 1.2;
    text-align: left;
    transition: opacity 0.3s;
  }

  &__label {
    position: absolute;
    top: 0;
    left: 0;
    color: inherit;
    font-size: pxToRem(20);
    line-height: (24/20);
    pointer-events: none;
    transform: translate3d(0, pxToRem(9), 0);
    transform-origin: left top;
    transition: transform 0.4s;
  }

  &__control {
    vertical-align: top;
    padding-top: pxToRem(8);
    border-bottom: pxToRem(2) solid $white;
    border-radius: 0;
    width: 100%;
    height: pxToRem(32);
    color: inherit;
    background: none;
    font-size: pxToRem(20);
    line-height: normal;
    appearance: none;
  }
}
</style>
