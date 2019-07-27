<template>
  <div ref="teaserContainer" class="l-Teaser">
    <div class="l-Teaser-wrapper">
      <div class="l-Teaser-container l-Teaser-container--center" :class="{'fullscreen': loading, 'animation-finished': animationIsFinished}">
        <div class="l-Teaser-text" :class="[getTextClasses]">
          <div v-if="showText" class="l-Teaser-container l-Teaser-container--text">
            <div class="l-Teaser-textInner">
              <div class="l-Teaser-title">
                <transition name="fadeIn" @after-enter="showHeadline = true" appear>
                  <span class="l-Teaser-fortyTwo">42</span>
                </transition>
                <div class="l-Teaser-headlineWrapper" v-if="showHeadline" :class="{'is-visible': showHeadline}">
                  <transition-group
                    tag="h1"
                    :key="'headline'"
                    class="l-Teaser-headline"
                    v-on:before-appear="beforeHeadlineAppears"
                    v-on:appear="headlineAppears"
                    v-on:after-appear="afterHeadlineAppears">
                    <span v-for="(letter, index) in headline" :key="letter" :data-index="index">{{letter}}</span>
                  </transition-group>
                </div>
                <transition name="fadeInSubline" @after-enter="showRemainingInformation = true">
                  <h2 v-if="showSubline" class="l-Teaser-subline">Take a deep breath, close your eyes and start to feel</h2>
                </transition>
              </div>
              <div :class="{'is-visible': showRemainingInformation}" class="l-Teaser-intro">
                <p>Erleben Sie hier bald alle 42 Momente und tauchen Sie ein in eine Welt voller Träume, …</p>
                <p>Sie möchten diesen Moment nicht verpassen? Dann melden Sie sich jetzt zum Newsletter an und wir benachrichtigen Sie sobald es soweit ist.</p>
              </div>
              <div :class="{'is-visible': showRemainingInformation}" class="l-Teaser-buttonWrapper">
                <div></div>
                <button class="l-Teaser-button">Jetzt anmelden</button>
                <div></div>
              </div>
            </div>
          </div>
          <mq-layout :mq="['tiny', 'small', 'medium']">
            <div class="l-Teaser-arrowDown">
              <div class="l-Teaser-arrowDownIcon">
                <ArrowDown />
              </div>
            </div>
          </mq-layout>
        </div>
        <div class="l-Teaser-card" ref="card" :style="setStyles">
          <KeyVisual />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ArrowDown from '@/assets/svg/arrow-down.svg'
  import { mapState, mapActions } from 'vuex'
  import SplitWord from '@/utilities/split-word.js'
  import KeyVisual from '@/components/KeyVisual'
  var debounce = require('lodash.debounce')

  export default {
    layout: 'teaser',
    components: {
      ArrowDown,
      KeyVisual
    },
    data() {
      return {
        animationHasFinishedStyles: {},
        calculationFinished: false,
        card: null,
        headline: null,
        showText: false,
        marginSizeInPercentage: 0,
        startPointOfCard: 0,
        pointToTravelTo: 0,
        showHeadline: false,
        showRemainingInformation: false,
        windowSize: null,
        resizeObserved: false,
        showSubline: false
      }
    },
    head() {
      return {
        bodyAttrs: {
          class: this.loading ? 'no-scroll' : ''
        }
      }
    },
    mounted() {
      this.headline = SplitWord('Moments')
      this.attachRefs()
      this.registerEventListeners()
      this.getEdgeValueOfCard()
      this.windowSize = window.innerWidth
    },
    watch: {
      loading() {
        this.startTransitions()
      },
    },
    computed: {
      ...mapState('loading-sequence', {
        animationHasStarted: state => state.animationStarted,
        animationIsFinished: state => state.animationFinished,
        loading: state => state.loading
      }),
      cardRequiresHorizontalMovement() {
        return window.innerWidth > 768
      },
      translateDistanceForCard() {
        if (this.cardRequiresHorizontalMovement) {
          return this.pointToTravelTo - this.startPointOfCard
        } else {
          return this.getViewportHeight - this.startPointOfCard
        }
      },
      getViewportHeight() {
        return window.innerHeight
      },
      getDistanceFromVieportHeight() {
        return this.getViewportHeight - 40
      },
      getTextClasses() {
        if (this.animationHasStarted && !this.animationIsFinished) {
          return [
            'animation-started'
          ]
        } 

        if (this.animationIsFinished) {
          return [
            'animation-started',
            'animation-finished'
          ]
        }
      },
      setStyles() {
        if (this.resizeObserved) {
          return {
            position: 'relative',
            transform: 'translateX(0)'
          }
        }
      }
    },
    methods: {
      ...mapActions({
        animationStarted: 'loading-sequence/animationStarted',
        animationFinished: 'loading-sequence/animationFinished'
      }),
      registerEventListeners() {
        window.addEventListener('resize', debounce(this.hello, 0))
      },
      hello() {
        this.resizeObserved = true
        this.windowSize = window.innerWidth
      },
      attachRefs() {
        this.card = this.$refs.card
      },
      startTransitions() {
        if (this.cardRequiresHorizontalMovement) {
          this.animationStarted()
          this.$velocity(this.card, { translateX: `${this.translateDistanceForCard}px`}, { duration: 1800 }, [0.09, 0.55, 0.83, 0.67])
          .then(() => {
            this.showText = true
            this.finishTransitions()
          })
        } else {
          this.animationStarted()
          this.$velocity(this.card, { translateY: `${this.translateDistanceForCard}px` }, { duration: 1500 })
          .then(() => {
            this.showText = true
            this.finishTransitions()
          })
        }
      },
      finishTransitions() {
        if (this.cardRequiresHorizontalMovement) {
          this.card.classList.add('animation-finished')
        } else {
          this.card.classList.add('animation-finished');
          this.$velocity(this.card, { translateY: 0 })
        }
        this.animationFinished()
      },
      beforeHeadlineAppears(el) {
        el.style.opacity = 0
        el.style.transform = 'translateX(-15px)'
      },
      headlineAppears(el, done) {
        var delay = el.dataset.index * 70
        setTimeout(function () {
          Velocity(
            el,
            { opacity: 1, translateX: 0 },
            { complete: done }
          )
        }, delay)
      },
      afterHeadlineAppears() {
        this.showSubline = true
      },
      getPointToTravelTo() {
        let viewportWidth = window.innerWidth
        if (viewportWidth >= 1280) {
          this.pointToTravelTo = 1280 - 150
        } else if (viewportWidth >= 1024) {
          this.pointToTravelTo = viewportWidth - 200
        } else if (viewportWidth >= 880) {
          this.pointToTravelTo = viewportWidth - 50
        } else {
           this.pointToTravelTo = viewportWidth - 24
        }
      },
      getEdgeValueOfCard() {
        let cardBoundingBox = this.card.getBoundingClientRect()
        let bodyBoundingBox = document.body.getBoundingClientRect()
        let wrapperBoundingBox = document.querySelector('.l-Page-dimensionHelper').getBoundingClientRect().left
        let wrapperStartPoint = wrapperBoundingBox - bodyBoundingBox.right
        if (this.cardRequiresHorizontalMovement) {
          this.startPointOfCard = cardBoundingBox.right - wrapperBoundingBox
        } else {
          this.startPointOfCard = cardBoundingBox.top - bodyBoundingBox.top
        }
        this.getPointToTravelTo()
      }
    }
  }
</script>
