<template>
  <form action="/" class="login" @submit.prevent="handleSubmit">
    <div class="login__title">
      {{ $t('login.title') }}
    </div>
    <div class="login__description">
      {{ $t('login.description') }}
    </div>
    <div class="login__fields">
      <Input
        v-model="name"
        :placeholder="$t('login.name')"
        :error-message="errors.name"
        :is-valid="!errors.name"
        class="login__input-field"
        @input="resetValidateName"
      />
      <Input
        v-model="phone"
        :placeholder="$t('login.phone')"
        :error-message="errors.phone"
        :is-valid="!errors.phone"
        type="tel"
        class="login__input-field"
        @input="resetValidatePhone"
      />
    </div>
    <Button :disabled="isBusy" type="sumit" class="login__btn">
      <template #default>
        {{ $t('login.button') }}
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
  </form>
</template>

<script>
import { mapActions } from 'vuex'

import Input from '~/components/Input'
import Button from '~/components/Button'

import hasValidPhone from '~/helpers/hasValidPhone'

export default {
  name: 'Login',
  components: {
    Input,
    Button
  },
  data: () => ({
    name: '',
    phone: '',
    isBusy: false,
    errors: {}
  }),
  computed: {
    hasErrors() {
      return Object.keys(this.errors).length
    }
  },
  methods: {
    ...mapActions(['authRequest']),
    handleSubmit() {
      this.validateName()
      this.validatePhone()
      if (this.isBusy || this.hasErrors) return
      this.isBusy = true
      const data = {
        name: this.name,
        phone: this.phone
      }
      this.authRequest(data)
        .then(token => {
          this.$emit('success', {
            ...data,
            token: token
          })
        })
        .finally(() => {
          this.isBusy = false
        })
    },
    validateName() {
      this.toggleError({
        field: 'name',
        message: 'errorMessages.isRequiredName',
        isValid: !!this.name.length
      })
    },
    validatePhone() {
      const isRequired = this.phone.length
      const isPhone = hasValidPhone(this.phone)
      const isValid = isRequired && isPhone
      this.toggleError({
        field: 'phone',
        message: !isPhone
          ? 'errorMessages.isInvalidPhone'
          : 'errorMessages.isRequiredPhone',
        isValid
      })
    },
    resetValidateName() {
      this.toggleError({
        field: 'name',
        isValid: true
      })
    },
    resetValidatePhone() {
      this.toggleError({
        field: 'phone',
        isValid: true
      })
    },
    toggleError({ field, message, isValid }) {
      isValid
        ? this.$delete(this.errors, field)
        : this.$set(this.errors, field, message)
    },
    clear() {
      this.name = ''
      this.phone = ''
    }
  }
}
</script>

<style lang="scss">
.login {
  margin: 0 auto;
  max-width: pxToRem(320);
  text-align: center;

  &__title {
    font-size: pxToRem(31);
    font-weight: 700;
    line-height: (37/31);

    &:not(:last-child) {
      margin-bottom: pxToRem(3);
    }
  }

  &__description {
    font-size: pxToRem(20);
    line-height: (24/20);

    &:not(:last-child) {
      margin-bottom: pxToRem(32);
    }
  }

  &__input-field {
    margin: 0 auto;
    max-width: pxToRem(275);

    &:not(:last-child) {
      margin: pxToRem(20);
    }
  }

  &__btn {
    margin-top: pxToRem(33);
  }
}
</style>
