<template>
  <div class="success">
    <div class="success__icon">
      <svg viewBox="0 0 42 32" class="success__icon-in">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.337 24.9891L3.52174 15.1739L0.25 18.4457L13.337 31.5326L41.3804 3.48915L38.1087 0.217407L13.337 24.9891Z"
        />
      </svg>
    </div>
    <div class="success__title">
      {{ title }}
    </div>
    <div class="success__description">
      {{ $t('success.description', [answersLength, questionsLength]) }}
    </div>
    <Button type="button" class="success__btn" @click.prevent="handleSubmit">
      <template #default>
        {{ $t('success.button') }}
      </template>
      <template #icon>
        <svg viewBox="0 0 12 20">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 2.33333L2.27027 0L12 10L2.27027 20L0 17.6667L7.45946 10L0 2.33333Z"
          />
        </svg>
      </template>
    </Button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Button from '~/components/Button'

export default {
  name: 'Success',
  components: {
    Button
  },
  computed: {
    ...mapGetters(['questionsLength', 'answersLength', 'activeCreature']),
    title() {
      return this.$t(this.activeCreature.name || 'success.title')
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit')
    }
  }
}
</script>

<style lang="scss">
.success {
  padding-bottom: pxToRem(50);
  margin: 0 auto;
  max-width: pxToRem(320);
  text-align: center;

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto pxToRem(23);
    border-radius: 50%;
    width: pxToRem(72);
    height: pxToRem(72);
    background: $secondary;

    &:not(:last-child) {
      margin-bottom: pxToRem(23);
    }

    &-in {
      width: pxToRem(42);
      height: pxToRem(32);
      fill: $white;
    }
  }

  &__title {
    font-size: pxToRem(28);
    font-weight: 700;
    line-height: (37/31);

    &:not(:last-child) {
      margin-bottom: pxToRem(3);
    }
  }

  &__description {
    font-size: pxToRem(28);
    line-height: (34/28);

    &:not(:last-child) {
      margin-bottom: pxToRem(25);
    }
  }
}
</style>
