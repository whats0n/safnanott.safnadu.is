<template>
  <div class="index">
    <Creatures />
  </div>
</template>

<script>
import Creatures from '~/components/Creatures'

export default {
  name: 'Index',
  transition(to, from) {
    return from && from.name.includes('creature') ? 'page' : 'index'
  },
  components: {
    Creatures
  }
}
</script>
