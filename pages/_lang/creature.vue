<template>
  <div class="creature">
    <div class="container creature__container">
      <div class="creature__inner">
        <NuxtLink ref="button" :to="$i18n.path('')" class="creature__back">
          <svg viewBox="0 0 12 20" class="creature__back-icon">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 17.6667L9.72973 20L-8.74228e-07 10L9.72973 1.98473e-07L12 2.33333L4.54054 10L12 17.6667Z"
            />
          </svg>
        </NuxtLink>
        <div ref="img" class="creature__figure">
          <div class="creature__figure-in">
            <img :src="activeCreature.img" class="creature__img" alt="img" />
          </div>
        </div>
        <div class="creature__content">
          <div class="creature__content-in">
            <div class="creature__heading">
              <div ref="title" class="creature__title">
                {{ activeCreature.title }}
              </div>
              <div
                v-if="activeCreature.duration"
                ref="duration"
                class="creature__duration"
              >
                {{ activeCreature.duration }}
              </div>
            </div>
            <div ref="question" class="creature__question">
              {{ activeCreature.question }}
            </div>
            <div ref="btns" class="creature__btns">
              <div class="creature__btns-in">
                <button
                  v-if="!activeCreature.isChecked"
                  type="button"
                  class="creature__btn"
                  @click.prevent="handleAnswerClick"
                >
                  <span class="creature__btn-figure">
                    <svg viewBox="0 0 54 54" class="creature__btn-icon">
                      <path
                        d="M35.9725 22.3504C35.9725 17.1677 31.61 14.8933 27.173 14.8933C22.4005 14.8933 18.3736 17.5779 17.8143 22.9843L23.7428 23.6181C23.8173 21.8284 24.8986 20.1506 26.9493 20.1506C28.6272 20.1506 29.6712 21.1946 29.6712 22.7606C29.6712 23.9164 29 24.6621 28.1425 25.4079L26.912 26.5637C24.9732 28.2789 23.9665 29.5466 23.9665 32.1566V33.5734H29.783V32.604C29.783 31.038 30.1932 30.4041 31.7965 29.1364C34.3692 27.1603 35.9725 25.6316 35.9725 22.3504ZM30.5288 38.8307C30.5288 36.8919 28.8882 35.3259 26.912 35.3259C24.8986 35.3259 23.258 36.9291 23.258 38.868C23.258 40.8441 24.9359 42.3729 26.912 42.3729C28.9255 42.3729 30.5288 40.8069 30.5288 38.8307Z"
                      />
                    </svg>
                  </span>
                  <span class="creature__btn-text">
                    {{ $t('creatureSubmit') }}
                  </span>
                </button>
                <div v-else class="creature__btn">
                  <span class="creature__btn-figure">
                    <svg viewBox="0 0 52 52" class="creature__btn-icon">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M21.2727 31.8209L15.0682 25.5522L13 27.6418L21.2727 36L39 18.0896L36.9318 16L21.2727 31.8209Z"
                      />
                    </svg>
                  </span>
                  <span class="creature__btn-text">
                    {{ $t('creatureSubmitted') }}
                  </span>
                </div>
              </div>
              <div class="creature__btns-in">
                <a
                  :href="activeCreature.map"
                  target="_blank"
                  class="creature__btn"
                >
                  <span class="creature__btn-figure">
                    <svg viewBox="0 0 54 54" class="creature__btn-icon">
                      <path
                        d="M27.0001 12.7894C21.5063 12.7894 17.0527 17.243 17.0527 22.7368C17.0527 24.5037 17.5272 26.1562 18.3349 27.5936C18.4691 27.8323 18.6097 28.0673 18.7624 28.2936L27.0001 42.6315L35.2378 28.2936C35.3646 28.1059 35.474 27.9069 35.5872 27.7105L35.6655 27.5936C36.4725 26.1562 36.9475 24.5037 36.9475 22.7368C36.9475 17.243 32.4935 12.7894 27.0001 12.7894ZM27.0001 17.7631C29.7468 17.7631 31.9738 19.99 31.9738 22.7368C31.9738 25.4835 29.7468 27.7105 27.0001 27.7105C24.2533 27.7105 22.0264 25.4835 22.0264 22.7368C22.0264 19.99 24.2533 17.7631 27.0001 17.7631Z"
                      />
                      <path
                        d="M26.9998 16.5197C23.5662 16.5197 20.7827 19.3032 20.7827 22.7368C20.7827 26.1698 23.5662 28.9539 26.9998 28.9539C30.4329 28.9539 33.2169 26.1698 33.2169 22.7368C33.2169 19.3032 30.4329 16.5197 26.9998 16.5197ZM26.9998 19.0065C29.0602 19.0065 30.7301 20.6765 30.7301 22.7368C30.7301 24.797 29.0602 26.467 26.9998 26.467C24.9395 26.467 23.2696 24.797 23.2696 22.7368C23.2696 20.6765 24.9395 19.0065 26.9998 19.0065Z"
                      />
                    </svg>
                  </span>
                  <span class="creature__btn-text">
                    {{ $t('creatureDirection') }}
                  </span>
                </a>
              </div>
            </div>
            <div
              v-if="activeCreature.description"
              ref="description"
              class="creature__description"
            >
              {{ activeCreature.description }}
            </div>
            <div class="creature__info">
              <div v-if="hasAddress" class="creature__info-item">
                <div class="creature__info-text">
                  {{ activeCreature.address }}
                </div>
              </div>
              <div v-if="hasPhone || hasSiteUrl" class="creature__info-item">
                <div v-if="hasPhone" class="creature__info-text">
                  <a
                    :href="activeCreature.phoneLink"
                    class="creature__info-link"
                  >
                    {{ activeCreature.phone }}
                  </a>
                </div>
                <!-- <div v-if="hasSiteUrl" class="creature__info-text">
                  <a
                    :href="activeCreature.site"
                    target="_blank"
                    class="creature__info-link"
                  >
                    Vefsíða
                  </a>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'

import emitter from '~/helpers/emitter'

export default {
  name: 'Creature',
  layout: 'creature',
  computed: {
    ...mapState(['activeCreatureId']),
    ...mapGetters(['creatures']),
    activeCreature() {
      return (
        this.creatures.find(
          creature => `${creature.id}` === `${this.activeCreatureId}`
        ) || {}
      )
    },
    hasAddress() {
      return this.activeCreature.address && this.activeCreature.address.length
    },
    hasPhone() {
      return this.activeCreature.phone && this.activeCreature.phone.length
    },
    hasSiteUrl() {
      return this.activeCreature.site && this.activeCreature.site.length
    }
  },
  watch: {
    '$route.query.id': {
      immediate: true,
      handler(id) {
        this.setActiveCreatureId(id)
      }
    },
    '$route.query.key': {
      immediate: true,
      handler(key) {
        key && emitter.emit('answer-code', this.$route.query.id)
      }
    },
    activeCreature: {
      immediate: true,
      handler(item) {
        if (!Object.keys(item).length || this.isVisible) return
      }
    }
  },
  destroyed() {
    this.setActiveCreatureId(null)
  },
  methods: {
    ...mapMutations(['setActiveCreatureId']),
    handleAnswerClick() {
      emitter.emit('answer-click', this.$route.query.id)
    }
  }
}
</script>

<style lang="scss">
.creature {
  min-height: pxToRem(572);

  &__back {
    position: absolute;
    top: pxToRem(61);
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: pxToRem(36);
    height: pxToRem(36);
    color: $white;
    background: $secondary;

    @include mq-tablet {
      top: pxToRem(33);
    }

    &-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      margin: pxToRem(-10) 0 0 pxToRem(-6);
      width: pxToRem(12);
      height: pxToRem(20);
      fill: currentColor;
    }
  }

  &__container {
    position: relative;

    &:before {
      content: '';
      position: absolute;
      z-index: -1;
      top: pxToRem(-82);
      left: pxToRem(-284);
      border-radius: 50%;
      width: pxToRem(951);
      height: pxToRem(951);
      background: $primary;

      @include mq-phone-landscape {
        top: pxToRem(184);
        left: 50%;
        border-radius: 50% 50% 0 0;
        transform: translate3d(-50%, 0, 0);
      }

      @include mq-phone-portrait {
        width: pxToRem(729);
        height: pxToRem(729);
      }
    }
  }

  &__inner {
    position: relative;
    display: flex;
    align-items: flex-start;
    padding-top: pxToRem(80);

    @include mq-phone-landscape {
      align-items: center;
      flex-direction: column;
    }
  }

  &__figure {
    order: 1;
    width: 543px / (1440px - 107px * 2) * 100%;

    @include mq-tablet {
      width: 52%;
    }

    @include mq-phone-landscape {
      order: 0;
      width: 100%;
      max-width: pxToRem(236);
    }

    &-in {
      position: relative;
      overflow: hidden;
      padding-bottom: 100%;
      background: #f5f5f5;

      @include mq-phone-landscape {
        padding-bottom: 118%;
      }

      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
    }
  }

  &__img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;

    @include mq-phone-landscape {
      border-radius: pxToRem(4);
      box-shadow: pxToRem(9) pxToRem(13) pxToRem(32) rgba(0, 0, 0, 0.15);
    }
  }

  &__content {
    padding-top: pxToRem(65);
    width: (1440px - (107px * 2) - 543px) / (1440px - 107px * 2) * 100%;
    color: $white;

    @include mq-tablet {
      padding-top: 0;
      width: 48%;
    }

    @include mq-phone-landscape {
      padding-top: pxToRem(16);
      width: 100%;
      text-align: center;
    }
  }

  &__heading {
    max-width: pxToRem(500);

    @include mq-phone-landscape {
      max-width: none;
    }

    &:not(:last-child) {
      margin-bottom: pxToRem(39);
    }
  }

  &__title {
    font-size: pxToRem(28);
    font-weight: 700;
    line-height: (33/28);
  }

  &__question {
    max-width: pxToRem(300);
    font-size: pxToRem(28);
    line-height: (34/28);

    @include mq-phone-landscape {
      margin: 0 auto;
    }

    &:not(:last-child) {
      margin-bottom: pxToRem(34);
    }
  }

  &__btns {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    margin: pxToRem(-16);

    @include mq-phone-landscape {
      justify-content: center;
    }

    &:not(:last-child) {
      padding-bottom: pxToRem(41);
    }

    &-in {
      padding: pxToRem(16);
    }
  }

  &__btn {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    vertical-align: top;
    color: inherit;
    background: none;

    &-figure {
      display: block;
      margin: 0 auto pxToRem(2);
      border-radius: 50%;
      width: pxToRem(52);
      height: pxToRem(52);
      background: $secondary;
    }

    &-icon {
      width: 100%;
      height: 100%;
      fill: $white;
    }

    &-text {
      font-size: pxToRem(18);
      font-weight: 700;
      line-height: (22/18);
    }
  }

  &__description {
    max-width: pxToRem(330);
    font-size: pxToRem(20);
    line-height: (24/20);

    @include mq-phone-landscape {
      padding: pxToRem(40) pxToRem(16) pxToRem(80);
      margin: 0 pxToRem(-16);
      max-width: none;
      background: $black;
    }

    &:not(:last-child) {
      margin-bottom: pxToRem(30);
    }
  }

  &__duration {
    font-size: pxToRem(20);
    line-height: (24/20);
  }

  &__info {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    font-weight: 700;
    font-size: pxToRem(18);
    line-height: (22/18);

    &-item {
      flex: 0 0 auto;
      padding-right: 20px;
      max-width: 200px;
    }
  }
}
</style>
