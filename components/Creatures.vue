<template>
  <div class="creatures">
    <div class="creatures__container">
      <div v-if="answersLength" class="creatures__statistic">
        {{ $t('creaturesAnswered', [answersLength, questionsLength]) }}
      </div>
      <div class="creatures__inner">
        <client-only>
          <Swiper ref="swiper" :options="options" class="creatures__slider">
            <SwiperSlide
              v-for="item in items"
              :key="item.id"
              class="creatures__slide"
            >
              <div class="creatures__item">
                <a
                  :href="item.linkUrl"
                  class="creatures__item-in"
                  @click.prevent="$router.push(item.link)"
                >
                  <div
                    :style="{
                      'background-image': `url(${item.img})`
                    }"
                    class="creatures__img"
                  >
                    <div v-if="item.isChecked" class="creatures__state">
                      <svg viewBox="0 0 17 13" class="creatures__icon">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M5.54338 9.99561L1.61729 6.06952L0.308594 7.37822L5.54338 12.613L16.7608 1.39561L15.4521 0.0869141L5.54338 9.99561Z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div class="creatures__title">
                    {{ item.title }}
                  </div>
                  <div v-if="item.duration" class="creatures__duration">
                    {{ item.duration }}
                  </div>
                </a>
              </div>
            </SwiperSlide>
          </Swiper>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import isClient from '~/helpers/isClient'

const components = {}

isClient(() => {
  const { swiper, swiperSlide } = require('vue-awesome-swiper')
  components.Swiper = swiper
  components.SwiperSlide = swiperSlide
})

export default {
  name: 'Creatures',
  components,
  data: () => ({
    options: {
      slidesPerView: 'auto'
    }
  }),
  computed: {
    ...mapGetters(['questionsLength', 'answersLength', 'creatures']),
    items() {
      return this.creatures.map(item => ({
        ...item,
        link: {
          path: this.$i18n.path('creature'),
          query: {
            id: item.id
          }
        },
        linkUrl: `${this.$i18n.path('creature')}?id=${item.id}`
      }))
    }
  }
}
</script>

<style lang="scss">
.creatures {
  // overflow: hidden;
  padding-top: pxToRem(15);
  padding-bottom: pxToRem(60);

  @include mq-tablet {
    padding-top: pxToRem(9);
  }

  &__statistic {
    margin-bottom: pxToRem(19);
    color: $secondary;
    font-size: pxToRem(15);
    font-weight: 700;
    line-height: (18/15);

    @include mq-phone-landscape {
      padding-top: pxToRem(10);
      margin-bottom: 0;
      font-size: pxToRem(28);
      line-height: (34/28);
      text-align: center;
    }
  }

  &__inner {
    margin: 0 pxToRem(-11);
  }

  &__slider {
    overflow: visible;
  }

  &__slide {
    padding: pxToRem(11);
    width: pxToRem(156);
    // color: $white;
    text-align: center;

    @include mq-phone-portrait {
      width: pxToRem(146);
    }
  }

  &__img {
    position: relative;
    padding-bottom: (160/134) * 100%;
    margin-bottom: pxToRem(10);
    border-radius: pxToRem(4);
    @include cover;
  }

  &__item {
    &-in {
      display: block;
    }
  }

  &__state {
    position: absolute;
    top: pxToRem(-8);
    right: pxToRem(-8);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: pxToRem(30);
    height: pxToRem(30);
    color: $white;
    background: $secondary;
  }

  &__icon {
    height: pxToRem(13);
    fill: currentColor;
  }

  &__title {
    font-size: pxToRem(16);
    font-weight: 700;
    line-height: (19/16);
  }

  &__duration {
    font-size: pxToRem(16);
    line-height: (19/16);
  }
}
</style>
