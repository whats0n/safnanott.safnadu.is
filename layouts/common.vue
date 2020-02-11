<template>
  <div
    :class="{
      'is-visible': isVisible
    }"
    class="page-layout"
  >
    <!-- <Snow /> -->
    <ButtonNav :is-active="isOpenedNav" @click.native.prevent="toggleNav" />
    <Nav
      ref="nav"
      :is-opened="isOpenedNav"
      @create-user="handleCreateUser"
      @close="closeNav"
    />
    <Overlay :is-opened="isOpenedOverlay" />
    <ModalLogin ref="login" @open="handleLoginOpen" @close="handleLoginClose" />
    <div
      :class="{
        'is-filtered': isOpenedOverlay,
        'is-inner-page': isInnerPage
      }"
      class="out"
    >
      <div class="out__bg"></div>
      <div class="out__in">
        <slot name="default" />
        <RedContainer :is-inner-page="isInnerPage">
          <slot name="red-container" />
          <Map :has-text="!isInnerPage" />
        </RedContainer>
      </div>
    </div>
    <Preloader v-if="isLoading" />
    <div class="layout-overlay">
      <div class="layout-overlay__text">
        <span
          v-for="(item, i) in layoutText"
          :key="i"
          class="layout-overlay__text-item"
        >
          {{ item }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters, mapState } from 'vuex'

import Nav from '~/components/Nav'
import ButtonNav from '~/components/ButtonNav'
import Overlay from '~/components/Overlay'
import Map from '~/components/Map'
import RedContainer from '~/components/RedContainer'
import ModalLogin from '~/components/ModalLogin'
import Preloader from '~/components/Preloader'
// import Snow from '~/components/Snow'

import emitter from '~/helpers/emitter'
import isClient from '~/helpers/isClient'
import { getData } from '~/helpers/requests'

export default {
  name: 'CommonLayout',
  components: {
    Nav,
    ButtonNav,
    Overlay,
    Map,
    RedContainer,
    ModalLogin,
    Preloader
    // Snow
  },
  props: {
    isInnerPage: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    isVisible: false,
    isOpenedNav: false,
    isOpenedLogin: false,
    timer: null
  }),
  computed: {
    ...mapGetters(['isAuthorized', 'creatures']),
    ...mapState(['isLoading', 'hasSavedLocale', 'locale']),
    isOpenedOverlay() {
      return this.isOpenedNav || this.isOpenedLogin
    },
    layoutText() {
      return this.$t('layoutTransitionText').split(' ')
    },
    hasAnotherLocale() {
      return this.hasSavedLocale && this.locale === 'en'
    },
    localeLink() {
      const clearPath = this.$route.path
        .split('/')
        .filter(item => item !== 'en')
        .join('/')
      return this.hasAnotherLocale
        ? '/en' + clearPath
        : this.hasSavedLocale
        ? clearPath
        : this.$route.path
    }
  },
  watch: {
    isOpenedNav(isOpened) {
      if (isOpened && this.isOpenedLogin) this.closeLogin()
    },
    creatures: {
      immediate: true,
      handler(items) {
        if (!items.length) return
        this.isVisible = true
      }
    }
  },
  created() {
    isClient(() => {
      // this.localeCheck(() => {
      //   this.$router.replace({
      //     path: this.localeLink,
      //     query: this.$route.query
      //   })
      // })
      window.location.href = 'https://safnadu.is/'
      this.authCheck()
      this.$nextTick(() => this.isAuthorized && this.requestAnswers())
    })
    this.requestData()
    emitter.on('answer-click', id => {
      this.setProcessingCreature(id)
      this.openLogin()
    })
    emitter.on('answer-code', id => {
      this.setProcessingCreature(id)
      this.openLogin()
    })
  },
  methods: {
    ...mapMutations([
      'setCreatures',
      'setLang',
      'localeCheck',
      'authCheck',
      'authReset',
      'setProcessingCreature',
      'setProcessingCreature'
    ]),
    ...mapActions(['requestAnswers']),
    handleCreateUser() {
      this.authReset()
      this.openLogin()
    },
    handleLoginOpen() {
      this.isOpenedLogin = true
    },
    handleLoginClose() {
      this.isOpenedLogin = false
      this.setProcessingCreature(null)
    },
    async requestData() {
      const result = await getData()
      this.setCreatures(result)
    },
    openLogin() {
      this.$nextTick(() => {
        if (!this.$refs.login) return
        this.$refs.login && this.$refs.login.open()
        this.isOpenedNav = false
      })
    },
    closeLogin() {
      this.$nextTick(() => {
        this.$refs.login && this.$refs.login.close()
      })
    },
    closeNav() {
      this.isOpenedNav = false
    },
    toggleNav() {
      this.isOpenedNav = !this.isOpenedNav
    }
  }
}
</script>

<style lang="scss">
.page-layout {
  &.is-visible {
    .out.is-inner-page {
      .out {
        &__bg {
          &:before,
          &:after {
            opacity: 1;
            visibility: visible;
          }
        }
      }
    }
  }
}

.out {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  transition: all 0.4s;

  &.is-filtered {
    filter: blur(15px);

    @include mq-phone-landscape {
      filter: blur(4px);
    }
  }

  &.is-inner-page {
    .out {
      &__bg {
        position: absolute;
        z-index: 1;
        top: pxToRem(572);
        left: 50%;
        bottom: 0;
        width: 100%;
        max-width: pxToRem(1440);
        transform: translate3d(-50%, 0, 0);

        &:before,
        &:after {
          content: '';
          position: absolute;
          opacity: 0;
          visibility: hidden;
          background: $primary;
          transition: opacity 0.7s, visibility 0.7s;
        }

        &:before {
          top: 0;
          left: pxToRem(-174);
          border-radius: 50% 50% 0 0;
          width: pxToRem(951);
          height: pxToRem(951);
          min-height: 100%;

          @include mq-tablet {
            left: pxToRem(-250);
          }

          @include mq-phone-portrait {
            top: 0;
            left: 50%;
            width: pxToRem(706);
            height: pxToRem(706);
            transform: translate3d(-50%, 0, 0);
          }
        }

        &:after {
          top: 0;
          left: pxToRem(200);
          border-radius: 50% 50% 0 0;
          width: pxToRem(1520);
          height: pxToRem(916);
          min-height: 100%;

          @include mq-tablet {
            left: pxToRem(80);
          }

          @include mq-phone-portrait {
            display: none;
          }
        }
      }
    }
  }

  &__in {
    position: relative;
    z-index: 2;
  }
}
</style>
