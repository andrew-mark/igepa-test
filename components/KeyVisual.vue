<template>
  <transition name="fadeInKeyVisual">
    <div v-show="ready" class="c-KeyVisual">
      <svg viewBox="0 0 100 100">
        <line class="lines" stroke="#AFB5B9" stroke-width="0.5" v-for="(line, index) in lines" :key="index">
        </line>
        <circle cx="50" cy="50" r="17" class="c-KeyVisual-outerCircle" />
        <circle cx="50" cy="50" r="11.5" :class="{'initial': initialState.color, 'initial-motion': initialState.motion, 'end': endState}" class="c-KeyVisual-innerCircle" />
        <text v-for="(number,index) in currentStep" :key="`number-${index}`" x="50" y="50" width="100" dy="0.28em" :class="{'initial-color': initialState.color, 'is-active': !transitionNumbers}" :style="{fill: textColor}" class="c-KeyVisual-text">{{number}}</text>
      </svg>
    </div>
  </transition>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	name: 'KeyVisual',
  data() {
    return {
      integer: 1,
      incomingNumber: 6,
      showInteger: true,
      colors: [
        '#3C2A7E',
        '#763682',
        '#AD498B',
        '#CE2C24',
        '#DB806C',
        '#E5E074',
        '#88C1C5',
        '#FFFFFF',
      ],
      number: 42,
      numbers: [1,6,12,18,24,30,36,42],
      textColor: '#FFF',
      lines: 42,
      initialState: {
        color: true,
        motion: false,
      },
      endState: false,
      ready: false,
      svg: null,
      svgLines: null,
      transitionNumbers: false
    }
  },
  mounted() {
    this.initSvg()
  },
  computed: {
    currentStep() {
      return this.numbers.filter(number => {
        return number === this.integer
      })
    },
  },
  watch: {
    ready() {
      this.initialState.motion = true
      setTimeout(() => {
        this.colorSvg()
      }, 1000)
    },
    integer() {
      this.transitionNumbers = true
      this.$nextTick(() => {
        this.transitionNumbers = false
      })
    }
  },
  methods: {
    ...mapActions({
      endLoading: 'loading-sequence/endLoading'
    }),
    modulo(i, modulo) {
      return i % modulo === 0
    },
    setAttributeSvg(line, attrs) {
      for (let attr in attrs) {
        line.setAttribute(attr, attrs[attr])
      }
      return line
    },
    colorSvg() {
      let colorIndex = 0
      let lineIndex = 0
      let colors = []
      let interval = 70
      

      this.svgLines.forEach((line, index) => {
        const getNewColor = this.modulo(index, 6)
        if (getNewColor && index !== 0) {
          colorIndex++
        }
        const color = this.colors[colorIndex]
        colors.push(color)
      })
      let numberIndex = 0
      
      let counter = setInterval(() => {
        this.initialState.motion = false
        this.initialState.color = false
        if (lineIndex === this.svgLines.length) {
          clearInterval(counter)
          return
        }
        if (lineIndex === this.svgLines.length - 18) {
          this.endLoading()
        }
        let getNewNumber = this.modulo(lineIndex, 6)
        if (getNewNumber && lineIndex !== 0) {
          numberIndex++
        }
        if (lineIndex === this.svgLines.length - 1) {
          this.integer = 42
          this.textColor = '#FFF'
          this.endState = true
        } else {
          this.integer = this.numbers[numberIndex]
          this.textColor = this.colors[numberIndex]
        }

        let line = this.svgLines[lineIndex]
        line.setAttribute("stroke", colors[lineIndex]);
        lineIndex++
      }, interval);
    },
    initSvg() {
      this.svg = this.$el.querySelector('svg')
      this.svgLines = this.svg.querySelectorAll('.lines')
      this.svgLines.forEach((line, index) => {
        const rotate = index / 42 * 360
        line.setAttribute("transform", `rotate(${rotate} 50 50)`)
        const even = index % 2 === 0

        if (even) {
          this.setAttributeSvg(line, {
            'x1': 50,
            'y1': 50,
            'x2': 50,
            'y2': 0
          })
        } else {
          this.setAttributeSvg(line, {
            'x1': 50,
            'y1': 50,
            'x2': 50,
            'y2': 7
          })
        }
      })
      this.ready = true
    }
  }
}
</script>
<style lang="scss" scoped>
  .c-KeyVisual {
    display: flex;
    width: 100%;
    height: 100%;

    svg {
      flex: 1;
    }

    &-outerCircle {
      fill: white;
    }

    &-innerCircle {
      fill: #fff;
      transform: scale(0.95);
      transform-origin: center;
      transition: all 0.15s ease;

      &.initial-color {
        fill: $color-purple;
      }

      &.initial-motion {
        fill: $color-purple;
        transform: scale(1);
        transition: all 0.35s ease;
      }

      &.end {
        fill: $color-slate;
        transform: scale(1);
      }
    }

    &-text {
      fill: white;
      opacity: 0;
      text-anchor: middle;
      transform-origin: center;
      transform: scale(0.95);
      transition: opacity 0.15s ease;

      &.is-active {
        opacity: 1;
        transform: scale(1);
        transition: opacity 0.15s ease, transform 0.15s ease;
      }
    }
  }

  .fadeInKeyVisual-enter-active, .fadeInKeyVisual-leave-active {
    transition: opacity 0.5s ease-out;
  }
  .fadeInKeyVisual-enter, .fadeInKeyVisual-leave-active {
    opacity: 0;
  }
</style>
