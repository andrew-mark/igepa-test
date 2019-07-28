<template>
  <div>
    <div class="l-Page-backgroundWrapper">
      <div class="l-Page-leftContainer"></div>
      <div class="l-Page-rightContainer"></div>
    </div>
    <TheHeader :loadHeader="loadHeader" />
    <div class="l-Teaser-mobileSwipe" :class="{'slide-in': mobileSwipeIn, 'slide-out': mobileSwipeOut}"></div>
    <transition name="fadeOut" @leave="startCardTransitions">
      <div v-if="loading" class="l-Page-overlay"></div>
    </transition>
    <div class="l-Main" :class="{'loading-finished': loadingFinished}">
      <nuxt />
    </div>
    <mq-layout :mq="['tiny', 'small', 'medium']">
      <transition name="slideFooterIn">
        <!-- <TheFooter v-if="animationFinished" /> -->
      </transition>
    </mq-layout>
    <div class="l-Page-dimensionHelper"></div>
  </div>
</template>
<script>
  import TheHeader from '@/components/TheHeader'
  import TheFooter from '@/components/TheFooter'
  import { mapActions, mapState } from 'vuex'

  export default {
    data() {
      return {
        loadHeader: false,
        loadingFinished: false,
        mobileSwipeIn: false,
        mobileSwipeOut: false,
        containerStyles: {}
      }
    },
    components: {
      TheHeader,
      TheFooter
    },
    mounted() {
      this.$eventBus.$on('load-header', () => {
        this.loadHeader = true
      })
    },
    computed: {
      ...mapState('loading-sequence', {
        animationFinished: state => state.animationFinished,
        loading: state => state.loading,
        cardTransitions: state => state.startCardTransitions
      })
    },
    watch: {
      loading() {
        this.loadingFinished = true
      },
      cardTransitions() {
        setTimeout(() => {
          this.mobileSwipeIn = true
        }, 0)
      },
      mobileSwipeIn() {
        setTimeout(() => {
          this.mobileSwipeOut = true
        }, 900)
      }
    },
    methods: {
      ...mapActions({
        startCardTransitions: 'loading-sequence/startCardTransitions'
      })
    }
  }
</script>
