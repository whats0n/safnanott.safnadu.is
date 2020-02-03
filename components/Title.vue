<template>
  <div class="title">
    <slot name="default" />
  </div>
</template>

<script>
export default {
  name: 'Title'
}
</script>

<style lang="scss">
.title {
  font-weight: 700;
  font-size: pxToRem(30);
  line-height: (35/30);
}
</style>
