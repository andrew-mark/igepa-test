<template>
	<div class="fan-wrapper">
			<transition-group class="fan" :class="{'forty-two-active': currentInteger[0] === 42}" tag="div">
				<div class="fan-point" :key="1" :style="[integer >= 1 ? {'backgroundColor': '#382775'} : {'backgroundColor': '#ccc'}]" :class="[`fan-point-${1}`]"></div>
				<div v-for="n in 5" :key="n+1" class="fan-point" :style="[integer >= 6 ? {'backgroundColor': '#763682'} : {'backgroundColor': '#ccc'}]" :class="[`fan-point-${n+1}`]"></div>
				<div v-for="n in 6" :key="n+6" class="fan-point" :style="[integer >= 12 ? {'backgroundColor': '#AD498B'} : {'backgroundColor': '#ccc'}]" :class="[`fan-point-${n+6}`, {'is-active': integer == 12}]"></div>
				<div v-for="n in 6" :key="n+12" class="fan-point" :style="[integer >= 18 ? {'backgroundColor': '#CE2C24'} : {'backgroundColor': '#ccc'}]" :class="[`fan-point-${n+12}`, {'is-active': integer == 18}]"></div>
				<div v-for="n in 6" :key="n+18" class="fan-point" :style="[integer >= 24 ? {'backgroundColor': '#DB806C'} : {'backgroundColor': '#ccc'}]" :class="[`fan-point-${n+18}`, {'is-active': integer == 24}]"></div>
				<div v-for="n in 6" :key="n+24" class="fan-point" :style="[integer >= 30 ? {'backgroundColor': '#E5E074'} : {'backgroundColor': '#ccc'}]" :class="[`fan-point-${n+24}`, {'is-active': integer == 30}]"></div>
				<div v-for="n in 6" :key="n+30" class="fan-point" :style="[integer >= 36 ? {'backgroundColor': '#88C1C5'} : {'backgroundColor': '#ccc'}]" :class="[`fan-point-${n+30}`, {'is-active': integer == 36}]"></div>
				<div v-for="n in 6" :key="n+36" class="fan-point" :style="[integer >= 42 ? {'backgroundColor': '#5876A6'} : {'backgroundColor': '#ccc'}]" :class="[`fan-point-${n+36}`, {'is-active': integer == 42}]"></div>
			</transition-group>
		<transition-group name="fadeInteger" tag="span" mode="out-in">
			<span v-for="number in currentInteger" :key="number" :style="{color: color}" class="fan-number" ref="integer">{{number}}</span>
			<!-- <span :key="incomingNumber" :style="{color: color}" ref="integer">{{incomingNumber}}</span> -->
		</transition-group>
	</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	name: 'Fan',
  data() {
    return {
      integer: 1,
      incomingNumber: 6,
      showInteger: true,
      colors: [
        '#382775',
        '#763682',
        '#AD498B',
        '#CE2C24',
        '#DB806C',
        '#E5E074',
        '#88C1C5',
        '#FFFFFF',
      ],
      numbers: [1,6,12,18,24,30,36,42],
      color: '#382775'
    }
  },
  mounted() {
    this.increment()
  },
  computed: {
    currentInteger() {
      return this.numbers.filter(number => {
        return number === this.integer
      })
    }
  },
  watch: {
  },
  methods: {
    ...mapActions({
      endLoading: 'loading-sequence/endLoading'
    }),
    increment() {
      let index = 0

      let counter = setInterval(() => {
        index++
        this.integer = this.numbers[index]
        this.incomingNumber = this.numbers[index + 1]
        this.color = this.colors[index]
        if (this.integer === this.numbers[this.numbers.length - 1]) {
          clearInterval(counter)
          this.endLoading()
        }
      }, 300)
    }
  }
}
</script>

<style lang="scss" scoped>
.fan-point {
  background-color: grey;
  color: black;
  width: 2px;
  height: 235px;
  position: absolute;
  bottom : 0;
  transform-origin: bottom;
  transition: background-color 1s ease;
}

.fan-wrapper {
  color: #000;
  height: 100%;
  position: relative;
	width: 100%;

	@include image-aspect-lock(1,1, 'div');
}

.fan-number {
  color: #000;
  top: 50%;
	left: 50%;
	position: absolute;
	transform: translate(-50%, -55%);
  @include typography('number');
}

.fan {
	height: 100%;
	left: 50%;
  position: absolute;
  top: -50%;
  width: 100%;

  &.forty-two-active {
    color: #fff;

    &:after {
      background-color: #8A9BA2;
      border-radius: 50%;
      content: '';
      display: block;
      height: 11vh;
      position: absolute;
      width: 7vw;
      bottom: 0;
      transform: translate(-50%, 50%);
    }
  }
}

.fan-point-42 {
  &:after {
    content: '';
    display: block;
    position: absolute;
    background-color: #fff;
    width: 20vw;
    height: 20vw;
    bottom: 0;
    border-radius: 50%;
    bottom: 0;
    transform: translate(-50%, 50%);

    @include min-respond-to('medium') {
      width: 10vw;
      height: 10vw;
    }
  }
}

$class: fan-point-;

@for $i from 1 through 42 {
  .#{$class}#{$i} {
    transform: rotate(calc(8.57 * #{$i}deg));

    @if $i % 2 == 0 {
      height: 42%;
    } @else {
      height: 37%;
    }
  }
}

.page-enter-active, .page-leave-active {
  transition: transform 0.7s ease;
}
.page-enter, .page-leave-active {
  transform: translateX(-100vw);
  transition: transform 0.7s ease;
}

.fadeInteger-enter-active, .fadeInteger-leave-active {
  transition: opacity 0.3s ease, transform 0.5s ease;
}
.fadeInteger-enter, .fadeInteger-leave-active {
  opacity: 0;
  transform: scale(0.95) translate(-50%, -50%);
  transition: opacity 0.3s ease, transform 0.5s ease;
}
</style>
