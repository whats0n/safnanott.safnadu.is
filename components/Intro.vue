<template>
  <div class="intro">
    <div class="container intro__container">
      <div ref="figure" class="intro__figure">
        <div
          :style="{
            'background-image': `url(${img})`
          }"
          class="intro__picture"
        />
      </div>
      <div class="intro__content">
        <Title ref="title" class="intro__title">
          {{ $t('intro.title') }}
        </Title>
        <div ref="description" class="intro__description">
          <template v-for="(item, i) in $t('intro.description')">
            <ul v-if="item.list" :key="i" class="intro__description-list">
              <li v-for="li in item.list" :key="li">
                {{ li }}
              </li>
            </ul>
            <p v-else :key="i" v-html="item" />
          </template>
        </div>
        <div ref="nav" class="intro__nav">
          <div class="intro__nav-in">
            <div class="intro__nav-item">
              <NuxtLink
                ref="creatures"
                :to="$i18n.path('')"
                class="intro__nav-link"
              >
                {{ $t('tabs.creatures') }}
              </NuxtLink>
            </div>
            <div class="intro__nav-item">
              <NuxtLink
                ref="prizes"
                :to="$i18n.path('prizes')"
                class="intro__nav-link"
              >
                {{ $t('tabs.prizes') }}
              </NuxtLink>
            </div>
            <!-- <div class="intro__nav-item">
              <NuxtLink :to="localeLink" class="intro__nav-lang">
                <Flag class="intro__nav-icon" />
                {{ $t(`locale.${unusedLocale}`) | lang }}
              </NuxtLink>
            </div> -->
          </div>
          <div :style="lineStyle" class="intro__nav-line" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import Title from '~/components/Title'
import Flag from '~/components/Flag'

import isClient from '~/helpers/isClient'

export default {
  name: 'Intro',
  components: {
    Title,
    Flag
  },
  filters: {
    lang(value) {
      return value.slice(0, 3)
    }
  },
  data: () => ({
    lineStyle: {}
  }),
  computed: {
    ...mapGetters(['questionsLength', 'answersLength', 'unusedLocale']),
    ...mapState(['locale']),
    img() {
      return '/img/main.png'
    },
    localeLink() {
      return (
        '/' +
        this.unusedLocale +
        this.$route.fullPath
          .split('/')
          .filter(item => item !== this.locale)
          .join('/')
      )
    },
    links() {
      return this.$refs.prizes && this.$refs.creatures
        ? [this.$refs.prizes.$el, this.$refs.creatures.$el]
        : []
    },
    nav() {
      return this.$refs.nav
    }
  },
  watch: {
    '$route.name': {
      immediate: true,
      handler() {
        this.setLine()
      }
    }
  },
  created() {
    isClient(() => window.addEventListener('resize', this.handleResize))
  },
  destroyed() {
    isClient(() => window.removeEventListener('resize', this.handleResize))
  },
  methods: {
    handleResize() {
      this.setLine()
    },
    setLine() {
      this.$nextTick(() => {
        const link =
          this.links.length &&
          this.links.find(item => item.classList.contains('is-active'))
        if (!link || !this.nav) return
        this.lineStyle = {
          transform: `translate3d(${link.offsetLeft -
            this.nav.offsetLeft}px,0,0) scale(${link.offsetWidth / 100})`
        }
      })
    }
  }
}
</script>

<style lang="scss">
.intro {
  color: $primary;

  &__container {
    display: flex;

    @include mq-tablet {
      flex-direction: column;
    }
  }

  &__figure {
    order: 2;
    width: (723/1226) * 100%;

    @include mq-tablet {
      order: 1;
      margin: 0 pxToRem(-16) pxToRem(20);
      width: auto;
    }
  }

  &__content {
    order: 1;
    padding: pxToRem(94) pxToRem(40) 0 0;
    width: ((1226 - 723)/1226) * 100%;

    @include mq-tablet {
      order: 2;
      padding: 0;
      width: 100%;
    }
  }

  &__picture {
    // padding-bottom: (482/723) * 100%;
    padding-bottom: (437/723) * 100%;
    @include cover;
  }

  &__title {
    max-width: pxToRem(400);

    @include mq-tablet {
      max-width: none;
    }

    &:not(:last-child) {
      margin-bottom: pxToRem(9);
    }
  }

  &__description {
    max-width: pxToRem(400);
    color: $text;
    font-size: pxToRem(20);
    line-height: (24/20);

    @include mq-tablet {
      max-width: none;
    }

    &:not(:last-child) {
      margin-bottom: pxToRem(89);

      @include mq-tablet {
        margin-bottom: pxToRem(37);
      }
    }

    &-list {
      font-weight: 700;
    }
  }

  &__nav {
    &-in {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;

      @include mq-phone-portrait {
        justify-content: space-between;
      }
    }

    &-item {
      &:not(:last-child) {
        margin-right: pxToRem(65);

        @include mq-phone-landscape {
          margin-right: pxToRem(20);
        }
      }
    }

    &-link,
    &-lang {
      display: block;
      color: $text;
      font-size: pxToRem(20);
      line-height: (24/20);
    }

    &-link {
      font-weight: 700;
    }

    &-lang {
      position: relative;
      padding-left: pxToRem(31);
    }

    &-icon {
      position: absolute;
      top: 50%;
      left: 0;
      margin-top: pxToRem(-2);
      width: pxToRem(26);
      transform: translate3d(0, -50%, 0);
    }

    &-line {
      border-top: pxToRem(2) solid $primary;
      width: pxToRem(100);
      transform-origin: left center;
      transition: width 0.4s, transform 0.4s;
    }
  }
}
</style>
