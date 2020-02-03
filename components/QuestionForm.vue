<template>
  <form action="/" class="scanner" @submit.prevent="handleSubmit">
    <div class="scanner__label">
      {{ $t('scanner.label') }}
    </div>
    <div class="scanner__title">
      {{ activeCreature.title }}
    </div>
    <div class="scanner__description">
      {{ activeCreature.question }}
    </div>
    <div class="scanner__fields">
      <Input
        v-model="answer"
        :placeholder="$t('scanner.answer')"
        :error-message="errors.answer"
        :is-valid="!errors.answer"
        class="scanner__input-field"
        @input="resetValidateAnswer"
      />
    </div>
    <Button type="sumit" animation-type="check" class="scanner__btn">
      <template #default>
        {{ $t('scanner.button') }}
      </template>
      <template #icon>
        <svg viewBox="0 0 27 20">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.59091 15.8209L2.14773 9.55224L0 11.6418L8.59091 20L27 2.08955L24.8523 0L8.59091 15.8209Z"
          />
        </svg>
      </template>
    </Button>
  </form>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

import Input from '~/components/Input'
import Button from '~/components/Button'
import Code from '~/components/Code'
import Scanner from '~/components/Scanner'

export default {
  name: 'QuestionForm',
  components: {
    Input,
    Button,
    Code,
    Scanner
  },
  data: () => ({
    answer: '',
    errors: {}
  }),
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
    hasError() {
      return Object.keys(this.errors).length
    }
  },
  watch: {
    '$route.query.key': {
      immediate: true,
      handler(key) {
        key && this.handleSubmitCode(key)
      }
    }
  },
  methods: {
    ...mapActions(['sendAnswer', 'requestAnswers']),
    handleSubmit() {
      this.validateAnswer()
      if (this.hasError) return
      this.sendAnswer({
        key: this.activeCreature.key,
        answer: this.answer
      }).then(() => {
        this.requestAnswers()
        this.$emit('success')
      })
    },
    handleSubmitCode(key) {
      this.sendAnswer({
        id: this.activeCreature.id,
        key
      }).then(() => {
        this.requestAnswers()
        this.$emit('success')
      })
    },
    resetValidateAnswer() {
      this.toggleError({
        field: 'answer',
        isValid: true
      })
    },
    validateAnswer() {
      this.toggleError({
        field: 'answer',
        message: 'errorMessages.isRequiredAnswer',
        isValid: !!this.answer.length
      })
    },
    toggleError({ field, message, isValid }) {
      isValid
        ? this.$delete(this.errors, field)
        : this.$set(this.errors, field, message)
    },
    clear() {
      this.answer = ''
      this.$refs.scanner && this.$refs.scanner.clear()
    }
  }
}
</script>

<style lang="scss">
.scanner {
  margin: 0 auto;
  max-width: pxToRem(336);
  text-align: center;

  &__label {
    font-size: pxToRem(16);
    line-height: (19/16);
  }

  &__title {
    font-size: pxToRem(31);
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
      margin-bottom: pxToRem(22);
    }
  }

  &__code {
    &:not(:last-child) {
      margin-bottom: pxToRem(22);
    }
  }

  &__input-field {
    margin: 0 auto;

    &:not(:last-child) {
      margin: pxToRem(20);
    }
  }

  &__btn {
    margin-top: pxToRem(28);
  }
}
</style>
