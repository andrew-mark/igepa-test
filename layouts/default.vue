<template>
  <div>
    <div class="nav" :class="{'is-black' : isAboutPage}">
      <nuxt-link to="/">Take me home</nuxt-link>
      |
      <nuxt-link to="/about">Tell me about yourself</nuxt-link>
    </div>
    <nuxt />
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    computed: {
      isAboutPage() {
        return this.$route.name === 'about'
      }
    }
  }
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.nav {
  color: #fff;
  position: absolute;
  left: 50%;
  top: 20px;
  transform: translate(-50%);
}

.nav.nav.is-black {
  color: #000;
}

.nav.is-black a {
  color: #000;
}

a {
  color: #fff;
  text-decoration: none;
}

a:hover {
  opacity: 0.7;
}
</style>
