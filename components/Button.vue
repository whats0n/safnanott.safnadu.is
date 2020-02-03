<template>
  <button
    v-bind="$attrs"
    :class="animationClass"
    class="btn"
    v-on="$listeners"
    @click="handleClick"
  >
    <span class="btn__text">
      <slot name="default" />
    </span>
    <span class="btn__icon">
      <slot name="icon" />
    </span>
  </button>
</template>

<script>
export default {
  name: 'Button',
  inheritAttrs: false,
  props: {
    animationType: {
      type: String,
      default: 'arrow'
    }
  },
  computed: {
    animationClass() {
      return this.animationType.length ? `btn_${this.animationType}` : ''
    }
  },
  methods: {
    createRipple(e) {
      const ripple = document.createElement('span')
      const rect = this.$el.getBoundingClientRect()
      ripple.classList.add('btn__ripple')
      ripple.style.top = `${e.pageY - rect.top}px`
      ripple.style.left = `${e.pageX - rect.left}px`
      ripple.addEventListener('animationend', () =>
        this.$el.removeChild(ripple)
      )
      this.$el.appendChild(ripple)
    },
    handleClick(e) {
      this.$emit('click', e)
      this.createRipple(e)
    }
  }
}
</script>

<style lang="scss">
.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: top;
  overflow: hidden;
  padding: 0 pxToRem(44);
  border-radius: pxToRem(31);
  max-width: 100%;
  min-width: 0;
  height: pxToRem(62);
  color: $white;
  background: $secondary;

  &:disabled {
    opacity: 0.72;
    pointer-events: none;
  }

  &_arrow {
    @include hover {
      .btn {
        &__icon {
          animation: arrow 0.5s forwards;
        }
      }
    }
  }

  &_check {
    @include hover {
      .btn {
        &__icon {
          animation: check 0.5s forwards;
        }
      }
    }
  }

  &__ripple {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    padding-top: 200%;
    border-radius: 50%;
    width: 200%;
    background-color: $black;
    animation: ripple 0.8s forwards;
  }

  &__text {
    overflow: hidden;
    flex: 0 1 auto;
    padding-top: pxToRem(5);
    font-size: pxToRem(25);
    font-weight: 700;
    line-height: (30/25);
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__icon {
    display: inline-block;
    vertical-align: top;
    align-self: center;
    flex: 0 0 auto;
    fill: currentColor;
    font-size: 0;

    &:not(:first-child) {
      margin-left: pxToRem(14);
    }
  }

  &__icon svg {
    display: inline-block;
    vertical-align: top;
    height: pxToRem(20);
  }
}

@keyframes arrow {
  0% {
    transform: translate3d(0, 0, 0);
  }
  70% {
    opacity: 0;
    transform: translate3d(60px, 0, 0);
  }
  71% {
    opacity: 0;
    transform: translate3d(-14px, 0, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes check {
  0% {
    transform: translate3d(0, 0, 0);
  }
  70% {
    opacity: 0;
    transform: translate3d(0, -50px, 0);
  }
  71% {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes ripple {
  0% {
    opacity: 0.24;
    transform: translate3d(-50%, -50%, 0) scale(0);
  }
  100% {
    opacity: 0;
    transform: translate3d(-50%, -50%, 0) scale(1);
  }
}
</style>
