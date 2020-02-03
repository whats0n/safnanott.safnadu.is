<template>
  <Modal
    ref="modal"
    :class="{
      'is-success': isSuccessMode || activeCreature.isChecked
    }"
    :has-close="!isSuccessMode && !activeCreature.isChecked"
    @open="$emit('open')"
    @close="$emit('close')"
  >
    <ClientOnly>
      <Login v-if="isLoginMode" ref="login" @success="handleLoginSuccess" />
      <QuestionForm
        v-else-if="isQuestionFormMode"
        ref="questionForm"
        @success="handleQuestionFormSuccess"
      />
      <Success
        v-else-if="isSuccessMode || activeCreature.isChecked"
        @submit="handleSuccessSubmit"
      />
    </ClientOnly>
  </Modal>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'

import Modal from '~/components/Modal'
import Login from '~/components/Login'
import QuestionForm from '~/components/QuestionForm'
import Success from '~/components/Success'

export default {
  name: 'ModalLogin',
  components: {
    Modal,
    Login,
    QuestionForm,
    Success
  },
  data: () => ({
    isSuccessMode: false
  }),
  computed: {
    ...mapGetters(['isAuthorized', 'activeCreature']),
    ...mapState(['creatureInProcessing']),
    isLoginMode() {
      return !this.isAuthorized
    },
    isQuestionFormMode() {
      return (
        this.isAuthorized &&
        !this.isSuccessMode &&
        !this.activeCreature.isChecked
      )
    }
  },
  methods: {
    ...mapMutations(['authSuccess']),
    handleQuestionFormSuccess() {
      this.isSuccessMode = true
    },
    handleSuccessSubmit() {
      this.$router.push(this.$i18n.path(''))
      this.close()
    },
    handleLoginSuccess(data) {
      this.creatureInProcessing === null && this.close()
      this.$nextTick(() => this.authSuccess(data))
    },
    open() {
      this.$refs.modal.open()
      this.clear()
    },
    close() {
      this.$refs.modal && this.$refs.modal.close()
    },
    clear() {
      this.$refs.login && this.$refs.login.clear()
      this.$refs.questionForm && this.$refs.questionForm.clear()
    }
  }
}
</script>
