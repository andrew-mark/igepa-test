<template>
  <div>
    <div class="l-Default-backgroundWrapper">
      <div class="l-Default-leftContainer"></div>
      <div class="l-Default-rightContainer"></div>
    </div>
    <TheHeader />
    <div class="l-Main">
      <nuxt />
    </div>
  </div>
</template>
<script>
  import TheHeader from '@/components/TheHeader'
  export default {
    data() {
      return {

      }
    },
    components: {
      TheHeader
    }
  }
</script>
<style lang="scss">
</style>

