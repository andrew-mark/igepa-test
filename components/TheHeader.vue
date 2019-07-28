<template>
  <header class="m-Header" :style="getHeight">
    <div class="m-Header-wrapper">
      <div class="m-Header-container">
        <div :class="{'is-active': loadHeader}" class="m-Header-logo">
          <Logo />
        </div>
      </div>
    </div>
  </header>
</template>
<script>
  import Logo from '@/assets/svg/logo.svg'

  export default {
    name: 'TheHeader',
    props: [
      'loadHeader'
    ],
    components: {
      Logo
    },
    data() {
      return {}
    },
    computed: {
      getHeight() {
        return this.loadHeader ? {visibility: 'visible', position: 'relative'} : {visibility: 'hidden', position: 'absolute'}
      }
    }
  }
</script>
<style lang="scss">
  .m-Header {
    align-items: center;
    display: flex;
    height: 10vh;

    @include max-respond-to('medium') {
      background-color: #422583;
    }

    &-wrapper {
      @include grid-wrapper;
    }

    &-container {
      @include grid-container;
    }

    &-logo {
      @include grid-cell(3);

      opacity: 0;
      transform: translateY(1px);
      transition: all 0.35s ease 1.5s;
      visibility: hidden;

      &.is-active {
        opacity: 1;
        transform: translateY(0);
        visibility: visible;
      }
    }
  }
</style>
