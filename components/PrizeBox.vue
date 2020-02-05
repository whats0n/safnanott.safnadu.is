<template>
  <div
    :class="{
      'is-opened': isOpened || !(coast && meta)
    }"
    class="prize-box"
  >
    <div class="prize-box__container">
      <div v-if="number" class="prize-box__number">{{ number }}.</div>
      <div
        v-if="coast || meta"
        class="prize-box__header"
        @click.prevent="toggle"
      >
        <div v-if="coast" class="prize-box__coast">{{ coast }}</div>
        <div v-if="meta" class="prize-box__meta">{{ meta }}</div>
        <svg viewBox="0 0 12 8" class="prize-box__arrow">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.6 0.599976L6 5.19998L1.4 0.599976L0 1.99998L6 7.99998L12 1.99998L10.6 0.599976Z"
          />
        </svg>
      </div>
      <ul v-if="list.length" class="prize-box__list">
        <li v-for="(item, i) in list" :key="i" class="prize-box__list-item">
          <div v-for="(text, index) in item" :key="index">
            {{ text }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrizeBox',
  props: {
    number: {
      type: [String, Number],
      default: ''
    },
    coast: {
      type: String,
      default: ''
    },
    meta: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    isOpened: false
  }),
  methods: {
    toggle() {
      this.isOpened = !this.isOpened
    }
  }
}
</script>

<style lang="scss">
.prize-box {
  position: relative;
  border-radius: pxToRem(5);
  color: #fff;
  background: #201d1d;

  &.is-opened {
    @include mq-tablet {
      .prize-box {
        &__list {
          display: block;
        }
      }
    }
  }

  &__header {
    position: relative;
    padding: pxToRem(9) pxToRem(41) pxToRem(6) pxToRem(52);

    @include mq-tablet {
      cursor: pointer;
    }
  }

  &__arrow {
    position: absolute;
    top: 50%;
    right: pxToRem(16);
    display: none;
    margin-top: pxToRem(-3);
    width: pxToRem(12);
    height: pxToRem(7);
    fill: currentColor;

    @include mq-tablet {
      display: block;
    }
  }

  &__number {
    position: absolute;
    top: pxToRem(9);
    left: pxToRem(7);
    font-size: pxToRem(38);
    font-weight: 700;
    line-height: (46/38);
  }

  &__coast {
    font-weight: 700;
    font-size: pxToRem(20);
    line-height: (24/20);
  }

  &__meta {
    font-size: pxToRem(14);
  }

  &__list {
    padding: pxToRem(16) pxToRem(16) pxToRem(30) pxToRem(52);
    font-size: pxToRem(16);
    line-height: (22/16);

    @include mq-tablet {
      display: none;
      padding-right: pxToRem(16);
    }

    &-item {
      &:not(:last-child) {
        margin-bottom: (19/16) * 1em;
      }
    }
  }
}
</style>
