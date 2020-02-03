<template>
  <div
    :class="{
      'is-opened': isOpened
    }"
    class="nav"
    @click="handleClose"
  >
    <div ref="container" class="nav__container">
      <div class="nav__inner">
        <Title class="nav__title">
          {{ $t('nav.title') }}
        </Title>
        <ul class="nav__meta">
          <ClientOnly>
            <li v-if="isAuthorized" class="nav__meta-item">
              {{ $t('nav.greeting') }}
              <strong>{{ userName }}</strong
              >, 📞 {{ userPhone }}
            </li>
          </ClientOnly>
          <li
            class="nav__meta-item"
            v-html="$t('nav.userStatistic', [answersLength, questionsLength])"
          />
          <li class="nav__meta-item">
            <a
              href="#"
              class="nav__meta-link"
              @click.prevent="$emit('create-user')"
            >
              {{ $t('nav.createUser') }}
            </a>
          </li>
        </ul>
        <ul class="nav__menu">
          <li class="nav__menu-item">
            <NuxtLink
              :to="$i18n.path('')"
              class="nav__menu-link"
              @click.native="close"
            >
              {{ $t('tabs.creatures') }}
            </NuxtLink>
          </li>
          <li class="nav__menu-item">
            <NuxtLink
              :to="$i18n.path('prizes')"
              class="nav__menu-link"
              @click.native="close"
            >
              {{ $t('tabs.prizes') }}
            </NuxtLink>
          </li>
          <!-- <li class="nav__menu-item">
            <NuxtLink :to="localeLink" class="nav__menu-lang">
              <Flag class="nav__menu-icon" />
              {{ $t(`locale.${unusedLocale}`) }}
            </NuxtLink>
          </li> -->
        </ul>
      </div>
    </div>
    <div class="nav__logo">
      <svg
        class="nav__logo-icon"
        viewBox="0 0 25.2 39.2"
        style="enable-background:new 0 0 25.2 39.2;"
        xml:space="preserve"
      >
        <path
          style="fill-rule: evenodd; clip-rule: evenodd;"
          fill="currentColor"
          d="M12.7,0H0v23.7c0.6,6.8,6.6,12.8,12.6,15.5c5.9-2.7,12-8.8,12.6-15.5V0H12.7z M4.8,0.5h3.9v3.9H4.8V0.5z
          M4.4,17.9l-1.9-1.3l-1.9,1.3V16l1.9-1.3L4.4,16V17.9z M4.4,14.1l-1.9-1.3l-1.9,1.3v-1.9l1.9-1.3l1.9,1.3V14.1z M4.4,10.2L2.4,8.9
          l-1.9,1.3V8.2L2.4,7l1.9,1.3V10.2z M8.7,36.3c-1.1-0.7-2.9-2.4-3.9-3.4V6.3h3.9L8.7,36.3z M8.7,5.8H4.8v-1h3.9V5.8z M16,17.9
          l-1.9-1.3l-1.5,1l-1.5-1l-1.9,1.3V16l1.9-1.3l1.4,1.1l1.5-1.1L16,16V17.9z M16,14.1l-1.9-1.3l-1.5,1l-1.5-1l-1.9,1.3v-1.9l1.9-1.3
          l1.4,1.1l1.5-1.1l1.9,1.3V14.1z M16,10.2l-1.9-1.3l-1.5,1l-1.5-1l-1.9,1.3V8.2L11.1,7L12.6,8L14.1,7L16,8.2V10.2z M20.4,32.9
          c-1,1-2.8,2.7-3.9,3.4l0-30h3.9V32.9z M20.4,5.8h-3.9v-1h3.9V5.8z M20.4,4.4h-3.9V0.5h3.9V4.4z M24.7,17.9l-1.9-1.3l-1.9,1.3V16
          l1.9-1.3l1.9,1.3V17.9z M24.7,14.1l-1.9-1.3l-1.9,1.3v-1.9l1.9-1.3l1.9,1.3V14.1z M24.7,10.2l-1.9-1.3l-1.9,1.3V8.2L22.8,7l1.9,1.3
          V10.2z"
        />
      </svg>
      <svg class="nav__logo-text" viewBox="0 0 126 20" fill="none">
        <path
          d="M11.4146 7.24145L14.9498 6.39811C14.816 4.46025 13.6912 1.69941 9.12965 1.69941C5.09713 1.69941 2.23037 4.34172 2.23037 7.68495C2.23037 13.1491 10.1987 11.6887 10.1987 14.8572C10.1987 16.0982 9.27185 16.8645 7.32683 16.8645C5.11175 16.8645 3.42811 15.4708 2.74582 14.7189L0.138 17.4949L0.233184 17.5881C1.15574 18.4712 3.31762 19.9856 6.82547 19.9856C11.64 19.9856 14.088 17.4952 14.088 14.3012C14.088 8.5234 6.13072 9.93231 6.13072 7.02987C6.13072 5.74384 7.17596 4.87826 8.82981 4.87826C10.7537 4.87826 11.4867 6.27767 11.4146 7.24145ZM28.4131 16.1454L29.5455 6.99053H26.6016C26.2459 7.77202 25.9066 9.04611 25.8795 9.41746H25.8253C25.3792 7.89544 24.2253 6.82778 22.1495 6.82778C18.3949 6.82778 15.8098 10.066 15.8098 14.3595C15.8098 17.907 17.8158 19.9566 20.6175 19.9566C22.7061 19.9566 23.9732 18.9657 24.7635 17.5991C24.7313 19.155 25.5314 19.9438 27.4423 19.9438L27.5755 19.9426C28.5207 19.9247 29.2587 19.7233 29.2587 19.7233L29.4678 16.8946C29.3164 16.9361 29.1555 16.9633 29.0057 16.9633C28.5514 16.9633 28.3579 16.7484 28.4081 16.1963L28.4131 16.1454ZM21.8992 16.8393C20.4721 16.8393 19.6129 15.6965 19.6129 13.9545C19.6129 11.5666 20.8971 9.94424 22.6855 9.94424C24.4158 9.94424 25.2952 11.4522 25.1089 12.9728L25.133 12.9479L24.98 13.9767C24.7019 15.3432 23.5542 16.795 21.9715 16.8381L21.8992 16.8393ZM39.94 3.61176C40.717 3.61176 41.1919 4.0474 41.3189 4.12363L42.7222 1.14415L42.7006 1.12802C42.5248 1.0077 41.5157 0.480382 39.8663 0.480382C36.8156 0.480382 34.311 2.54708 33.8868 6.03707L33.7698 6.9908H31.9402L31.5956 9.81024H33.4239L32.1983 19.7941H35.8931L37.1138 9.81024H40.9202L41.2647 6.9908H37.4586L37.5819 5.98282C37.7555 4.5495 38.6569 3.61204 39.9402 3.61204L39.94 3.61176ZM54.2791 16.9635C53.8458 16.9635 53.6451 16.7083 53.6992 16.2743L54.2358 11.9258C54.5969 9.01899 53.3431 6.82778 50.3027 6.82778C48.1291 6.82778 46.7935 8.04843 46.0169 9.56177H45.9224C45.9765 9.02089 45.957 7.71289 45.8056 6.8804L42.8473 6.99053L41.2764 19.7938H44.9839L45.8154 13.0189C46.0665 11.5224 47.0291 10.031 48.6488 10.031C50.0124 10.031 50.5995 11.0172 50.4378 12.5177L49.882 17.1898L49.8696 17.3058C49.7243 18.8422 50.4107 19.971 52.424 19.971L52.589 19.9699C53.7225 19.9547 54.4119 19.7869 54.5435 19.7504L54.7526 16.8946L54.6806 16.9122C54.5766 16.9367 54.4413 16.9633 54.2794 16.9633L54.2791 16.9635ZM69.1771 16.1454L70.3096 6.99053H67.3656C67.01 7.77202 66.6706 9.04611 66.6435 9.41746H66.5893C66.1432 7.89544 64.9894 6.82778 62.9135 6.82778C59.1589 6.82778 56.5738 10.066 56.5738 14.3595C56.5738 17.907 58.5798 19.9566 61.3816 19.9566C63.4701 19.9566 64.7372 18.9657 65.5276 17.5991C65.4953 19.155 66.2955 19.9438 68.2064 19.9438L68.3395 19.9426C69.2847 19.9247 70.0227 19.7233 70.0227 19.7233L70.2318 16.8946C70.0804 16.9361 69.9195 16.9633 69.7697 16.9633C69.3155 16.9633 69.122 16.7484 69.1721 16.1963L69.1771 16.1454ZM62.6633 16.8393C61.2361 16.8393 60.377 15.6965 60.377 13.9545C60.377 11.5666 61.6611 9.94424 63.4496 9.94424C65.1798 9.94424 66.0593 11.4522 65.8729 12.9728L65.897 12.9479L65.744 13.9767C65.466 15.3432 64.3182 16.795 62.7355 16.8381L62.6633 16.8393ZM83.2048 3.1802L85.2525 1.80466L84.2257 0.0355225L81.5889 1.80791C80.5805 1.17236 79.4139 0.771712 78.1273 0.625505L76.0401 3.27948C77.007 3.30389 77.8559 3.49784 78.5886 3.82443L76.7275 5.07546L77.7302 6.85843L80.3676 5.08658C81.4266 6.21338 81.9984 7.75629 82.0997 9.39251C81.7045 8.60017 80.6095 7.6014 78.6568 7.6014C74.9326 7.6014 72.0523 10.4453 72.0523 14.5922C72.0523 17.5912 74.0718 19.9571 77.5675 19.9571C82.7823 19.9571 85.5805 16.1959 85.5805 10.4274C85.5805 7.32472 84.7059 4.8666 83.2048 3.1802ZM78.247 16.912C76.7075 16.912 75.6444 15.8313 75.6444 14.2054C75.6444 12.1235 77.0959 10.646 79.0461 10.646C80.743 10.646 81.8419 11.744 81.7322 13.4972L81.714 13.639C81.4591 15.5139 80.1252 16.9117 78.247 16.9117V16.912ZM98.9503 16.1454L100.083 6.99053H96.3753L95.5657 13.6309C95.3552 15.0951 94.4272 16.753 92.8801 16.753C91.5165 16.753 90.9234 15.7679 91.0924 14.2664L91.9768 6.99026H88.2569L87.2945 14.8583C86.9296 17.7651 88.1859 19.9563 91.2406 19.9563C93.2087 19.9563 94.4749 18.9399 95.2425 17.5549H95.298C95.2412 19.1398 96.0502 19.9436 97.979 19.9436L98.1121 19.9423C99.0563 19.9244 99.7829 19.723 99.7829 19.723L99.992 16.8944C99.8531 16.9359 99.6922 16.963 99.5297 16.963C99.0882 16.963 98.895 16.7485 98.9447 16.1975L98.9503 16.1454ZM101.547 18.0705C101.547 19.1309 102.318 19.9566 103.389 19.9566C104.641 19.9566 105.783 18.9106 105.783 17.6297C105.783 16.5694 104.986 15.7166 103.925 15.7166C102.682 15.7166 101.582 16.7564 101.548 18.0107L101.547 18.0705ZM114.092 2.64881C114.092 1.44768 113.196 0.578849 111.969 0.578849C110.532 0.578849 109.279 1.68259 109.279 3.14737C109.279 4.3485 110.175 5.19021 111.39 5.19021C112.824 5.19021 114.092 4.12797 114.092 2.64881ZM113.063 6.8804L109.328 6.99053L108.061 17.317L108.048 17.4342C107.903 18.9639 108.576 19.971 110.564 19.971C111.745 19.971 112.396 19.7887 112.534 19.7504L112.756 16.9234C112.647 16.9505 112.499 16.9776 112.31 16.9776C112.026 16.9776 111.836 16.8276 111.876 16.4929L113.063 6.8804ZM125.612 11.268L122.326 11.4595C122.377 11.3453 122.458 11.0773 122.458 10.7789C122.458 9.90057 121.856 9.32497 120.765 9.32497C119.514 9.32497 118.84 9.95129 118.84 10.7735C118.84 13.0699 125.372 11.4093 125.372 15.6968C125.372 18.2466 123.129 19.9563 119.472 19.9563C115.676 19.9563 114.168 18.3244 113.93 18.0448L115.917 15.7977L115.938 15.8226C116.208 16.1181 117.844 17.3585 119.642 17.3585C120.907 17.3585 121.552 16.9304 121.552 16.2455C121.552 14.4042 115.337 15.4003 115.337 11.3076C115.337 8.57114 117.731 6.82751 121.207 6.82751C124.004 6.82751 125.856 8.19491 125.856 10.1048C125.856 10.7542 125.612 11.268 125.612 11.268Z"
          fill="currentColor"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import Title from '~/components/Title'
import Flag from '~/components/Flag'

export default {
  name: 'Nav',
  components: {
    Title,
    Flag
  },
  props: {
    isOpened: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'userName',
      'userPhone',
      'isAuthorized',
      'questionsLength',
      'answersLength',
      'unusedLocale'
    ]),
    ...mapState(['locale']),
    localeLink() {
      return (
        '/' +
        this.unusedLocale +
        this.$route.fullPath
          .split('/')
          .filter(item => item !== this.locale)
          .join('/')
      )
    }
  },
  methods: {
    handleClose(e) {
      !e.path.includes(this.$refs.container) && this.$emit('close')
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.nav {
  position: fixed;
  z-index: 150;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  color: $white;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s, visibility 0.4s;
  transition-delay: 0.4s;

  @include mq-phone-portrait {
    padding-bottom: pxToRem(30);
    background: $white;
  }

  &.is-opened {
    opacity: 1;
    visibility: visible;
    transition-duration: 0s;
    transition-delay: 0s;

    @include mq-phone-portrait {
      transition-duration: 0.225s;
    }

    .nav {
      &__container {
        &:before {
          transform: scale(1);
          transition-delay: 0s;

          @include mq-phone-portrait {
            transform: translate3d(50%, 0, 0) scale(1);
          }
        }
      }

      &__inner {
        opacity: 1;
        visibility: visible;
        transition: opacity 0.4s, visibility 0.4s;
        transition-delay: 0.2s;
      }

      &__logo {
        opacity: 1;
        visibility: visible;
        transition: opacity 0.4s, visibility 0.4s;
        transition-delay: 0.2s;
      }
    }
  }

  &__container {
    position: relative;
    padding: pxToRem(101) pxToRem(68) pxToRem(30) pxToRem(180);
    margin-left: auto;
    border-radius: 50%;
    max-width: pxToRem(606);
    min-height: pxToRem(655);

    @include mq-phone-landscape {
      padding: pxToRem(90) pxToRem(20) pxToRem(30) pxToRem(120);
    }

    @include mq-max-width('520') {
      padding-left: pxToRem(16);
      padding-right: pxToRem(16);
    }

    &:before {
      content: '';
      position: absolute;
      top: pxToRem(-93);
      right: pxToRem(-142);
      border-radius: 50%;
      width: pxToRem(748);
      height: pxToRem(748);
      background: $primary;
      transform: scale(0);
      // transform-origin: 74.4% 23%;
      transform-origin: 76% 21.5%;
      transition: transform 0.4s;

      @include mq-tablet {
        transform-origin: 78% 17%;
      }

      @include mq-phone-portrait {
        top: pxToRem(-60);
        right: 50%;
        width: pxToRem(706);
        height: pxToRem(706);
        transform: translate3d(50%, 0, 0) scale(0);
        transform-origin: 72.5% 13%;
      }
    }
  }

  &__inner {
    position: relative;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s, visibility 0.2s;
  }

  &__title {
    max-width: pxToRem(305);

    &:not(:last-child) {
      margin-bottom: pxToRem(38);
    }
  }

  &__meta {
    font-size: pxToRem(20);
    line-height: (23/20);

    &:not(:last-child) {
      margin-bottom: pxToRem(60);
    }

    &-item {
      &:not(:last-child) {
        margin-bottom: pxToRem(11);
      }
    }

    &-link {
      position: relative;
      border-bottom: pxToRem(1) dashed currentColor;
      color: inherit;
      transition: border-color 0.4s;
    }
  }

  &__menu {
    padding-left: pxToRem(60);

    &-item {
      &:not(:last-child) {
        margin-bottom: pxToRem(39);
      }
    }

    &-link,
    &-lang {
      display: block;
      color: inherit;
    }

    &-link {
      font-size: pxToRem(28);
      font-weight: 700;
      line-height: (34/28);
    }

    &-icon {
      position: absolute;
      top: 50%;
      left: 0;
      margin-top: pxToRem(-2);
      width: pxToRem(26);
      transform: translate3d(0, -50%, 0);
    }

    &-lang {
      position: relative;
      padding-left: pxToRem(32);
      font-size: pxToRem(20);
      line-height: (24/20);
      text-transform: uppercase;
    }
  }

  &__logo {
    display: flex;
    align-items: center;
    margin: pxToRem(50) pxToRem(180) 0 auto;
    width: (172/51) * 1em;
    color: #f5f5f5;
    opacity: 0;
    visibility: hidden;
    font-size: pxToRem(51);
    transition: opacity 0.2s, visibility 0.2s;

    @include mq-phone-portrait {
      margin: pxToRem(50) auto 0;
      color: #1809ba;
    }

    &-icon,
    &-text {
      flex: 0 0 auto;
    }

    &-icon {
      width: (33/51) * 1em;
      height: (51/51) * 1em;
    }

    &-text {
      margin-left: (13/51) * 1em;
      width: (126/51) * 1em;
      height: (20/51) * 1em;
    }
  }
}
</style>
