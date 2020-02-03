<template>
  <Common is-inner-page class="creature-layout">
    <nuxt />
  </Common>
</template>

<script>
import Common from './common'

export default {
  name: 'CreatureLayout',
  components: {
    Common
  }
}
</script>
