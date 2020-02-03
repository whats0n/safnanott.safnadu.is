<template>
  <Common>
    <template #default>
      <Intro />
    </template>
    <template #red-container>
      <nuxt />
    </template>
  </Common>
</template>

<script>
import Common from './common'
import Intro from '~/components/Intro'

export default {
  name: 'CreatureLayout',
  components: {
    Common,
    Intro
  }
}
</script>
