<template>
  <svg v-if="isEn" viewBox="0 0 60 30">
    <clipPath id="t">
      <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
    </clipPath>
    <path d="M0,0 v30 h60 v-30 z" fill="#00247d" />
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6" />
    <path
      d="M0,0 L60,30 M60,0 L0,30"
      clip-path="url(#t)"
      stroke="#cf142b"
      stroke-width="4"
    />
    <path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10" />
    <path d="M30,0 v30 M0,15 h60" stroke="#cf142b" stroke-width="6" />
  </svg>
  <svg v-else-if="isIs" viewBox="0 0 2500 1800">
    <path d="M0,0H2500V1800H0" fill="#003897" />
    <path d="M700,0h400V1800h-400M0,700H2500v400H0" fill="#fff" />
    <path d="M800,0h200V1800h-200M0,800H2500v200H0" fill="#d72828" />
  </svg>
</template>

<script>
export default {
  name: 'Flag',
  computed: {
    isEn() {
      return this.$i18n.locale !== 'en'
    },
    isIs() {
      return this.$i18n.locale !== 'is'
    }
  }
}
</script>
