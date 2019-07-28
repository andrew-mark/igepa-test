<template>
  <div ref="teaserContainer" class="l-Teaser">
    <div class="l-Teaser-wrapper">
      <div v-if="!positionCalculated" class="l-Teaser-containerClone">
        <div class="l-Teaser-textClone"></div>
        <div class="l-Teaser-cardClone"></div>
        <div class="l-Teaser-placeholder"></div>
      </div>
      <div class="l-Teaser-container l-Teaser-container--center" ref="container" :style="lazyContainerStyles" :class="{'fullscreen': !startCardTransitions, 'animation-finished': animationIsFinished}">
        <div class="l-Teaser-mobileSwipe" :class="{'slide-in': mobileSwipeIn, 'slide-out': mobileSwipeOut}"></div>
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
        <div class="l-Teaser-card" ref="card" :class="{'has-box-shadow': applyBoxShadow && cardRequiresHorizontalMovement}" :style="lazyCardStyles">
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
        calculationFinished: false,
        container: null,
        card: null,
        headline: null,
        showText: false,
        marginSizeInPercentage: 0,
        startPointOfCard: 0,
        pointToTravelTo: 0,
        showHeadline: false,
        showRemainingInformation: false,
        windowSize: null,
        positionCalculated: false,
        resizeObserved: false,
        showSubline: false,
        lazyCardStyles: {},
        lazyContainerStyles: {},
        placeholderWidth: 0,
        isIE11: false,
        applyBoxShadow: false,
        mobileSwipeIn: false,
        mobileSwipeOut: false
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
      this.isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
      this.attachRefs()
      this.registerEventListeners()
      this.getEdgeValueOfCard()
      this.calculatePointToTravelTo()
      this.windowSize = window.innerWidth
      this.$eventBus.$on('applyShadow', () => {
        this.applyBoxShadow = true
      })
    },
    watch: {
      startCardTransitions() {
        setTimeout(() => {
          this.mobileSwipeIn = true
        }, 400)
        this.startTransitions()
      },
      mobileSwipeIn() {
        setTimeout(() => {
          this.mobileSwipeOut = true
        }, 500)
      },
      animationIsFinished() {
        if (this.cardRequiresHorizontalMovement) {
          if (this.isIE11) {
            this.applyLazyStyles()
          } else {
            setTimeout(() => {
              this.applyLazyStyles()
            }, 5000)
          }
        }
      }
    },
    computed: {
      ...mapState('loading-sequence', {
        animationHasStarted: state => state.animationStarted,
        animationIsFinished: state => state.animationFinished,
        loading: state => state.loading,
        startCardTransitions: state => state.startCardTransitions
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
        if (this.mobileSwipeIn) {
          return [
            'animation-finished'
          ]
        }
      },
    },
    methods: {
      ...mapActions({
        animationStarted: 'loading-sequence/animationStarted',
        animationFinished: 'loading-sequence/animationFinished'
      }),
      registerEventListeners() {
        window.addEventListener('resize', debounce(this.handleResize, 0))
      },
      applyLazyStyles() {
        this.lazyCardStyles = {
          transform: 'translateX(0)',
          position: 'relative',
          marginRight: `${this.placeholderWidth}%`
        }
        this.lazyContainerStyles = {
          flexDirection: 'row',
          justifyContent: 'space-between'
        }
      },
      handleResize() {
        this.resizeObserved = true
        this.windowSize = window.innerWidth

        if (this.windowSize < 768) {
          this.resizeMargin = {
            marginRight: 0
          }
        } else if (this.windowSize < 1024) {
          this.resizeMargin = {
            marginRight: `calc((${this.placeholderWidth} / 4) * 3%)`
          }
        } else {
          this.resizeMargin = {marginRight: `${this.placeholderWidth}%`}
        }
      },
      attachRefs() {
        this.card = this.$refs.card
        this.container = this.$refs.container
      },
      startTransitions() {
        if (this.cardRequiresHorizontalMovement) {
          this.animationStarted()
          this.$eventBus.$emit('load-header')
          this.$velocity(this.card, { translateX: `${this.translateDistanceForCard}px`}, { duration: 1000 }, [0.09, 0.55, 0.83, 0.67])
          .then(() => {
            this.showText = true
            this.finishTransitions()
          })
        } else {
          this.animationStarted()
          this.$eventBus.$emit('load-header')
          this.$velocity(this.card, { opacity: 0 }, { duration: 1000 })
          .then(() => {
            this.showText = true
            this.$velocity(this.card, { opacity: 1 }, { duration: 0.000000001 })
            this.finishTransitions()
          })
        }
      },
      finishTransitions() {
        if (this.cardRequiresHorizontalMovement) {
          this.card.classList.add('animation-finished')
          if (!this.isIE11) {
            this.card.classList.add('is-not-IE')
          }
        } else {
          this.card.classList.add('animation-finished');
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
      getEdgeValueOfCard() {
        let cardBoundingBox = this.card.getBoundingClientRect()
        let bodyBoundingBox = document.body.getBoundingClientRect()
        let wrapperBoundingBox = document.querySelector('.l-Page-dimensionHelper').getBoundingClientRect().left
        let wrapperStartPoint = wrapperBoundingBox - bodyBoundingBox.right
        if (this.cardRequiresHorizontalMovement) {
          this.startPointOfCard = cardBoundingBox.right
        } else {
          this.startPointOfCard = cardBoundingBox.top - bodyBoundingBox.top
        }
      },
      calculatePointToTravelTo() {
        let cardClone = this.$el.querySelector('.l-Teaser-cardClone')
        let wrapperBoundingBox = document.querySelector('.l-Page-dimensionHelper').clientWidth
        let placeholderWidth = this.$el.querySelector('.l-Teaser-placeholder').clientWidth
        this.placeholderWidth = placeholderWidth / (wrapperBoundingBox / 100)
        let cardCloneBoundingBox = cardClone.getBoundingClientRect().right
        this.pointToTravelTo = cardCloneBoundingBox
        this.positionCalculated = true
      }
    }
  }
</script>
