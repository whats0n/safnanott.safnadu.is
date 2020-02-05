<template>
  <div class="prizes">
    <div class="prizes__container">
      <div class="prizes__row">
        <div v-for="item in prizes" :key="item.number" class="prizes__col">
          <PrizeBox v-bind="item" class="prizes__col-in" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PrizeBox from '~/components/PrizeBox'

export default {
  name: 'Prizes',
  transition(to, from) {
    return (from && from.name) === 'creature' ? 'page' : 'index'
  },
  components: {
    PrizeBox
  },
  computed: {
    prizes() {
      return this.$t('prizes')
    }
  }
}
</script>

<style lang="scss">
.prizes {
  padding-top: pxToRem(52);

  @include mq-tablet {
    padding-bottom: pxToRem(50);
  }

  &__row {
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: pxToRem(-11) pxToRem(-15);

    @include mq-laptop {
      margin: pxToRem(-15);
    }

    @include mq-tablet {
      flex-wrap: wrap;
      margin: pxToRem(-7);
    }
  }

  &__col {
    display: flex;
    flex: 0 1 auto;
    padding: pxToRem(11) pxToRem(15);
    width: 33.33%;

    @include mq-laptop {
      padding: pxToRem(15);
    }

    @include mq-tablet {
      padding: pxToRem(7);
      width: 50%;
    }

    @include mq-phone-landscape {
      width: 100%;
    }

    &-in {
      flex: 1 1 auto;
    }
  }
}
</style>
