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
import isClient from '~/helpers/isClient'

export default {
  name: 'CreatureLayout',
  components: {
    Common,
    Intro
  },
  created() {
    isClient(() => {
      window.dataLayer = window.dataLayer || []
      function gtag() {
        window.dataLayer.push(arguments)
      }
      gtag('js', new Date())
      gtag('config', 'UA-53773496-2')
    })
  }
}
</script>
