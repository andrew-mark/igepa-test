<template>
  <footer class="m-Footer">
    <div class="m-Footer-wrapper">
      <div class="m-Footer-container">
        <div class="m-Footer-columnOne">

        </div>
        <div class="m-Footer-columnTwo">
          <ul class="m-Footer-navList">
            <li class="m-Footer-navItem"><a href="/">Impressum</a></li>
            <li class="m-Footer-navItem"><a href="/">Datenschutz</a></li>
          </ul>
        </div>
        <div class="m-Footer-columnOne">

        </div>
      </div>
    </div>
  </footer>
</template>
<script>
  export default {
    name: 'TheFooter',
    components: {
    },
    data() {
      return {
        cardBottomPoint: 0
      }
    },
    mounted() {
      this.getBottomCoordinateOfcard()
    },
    computed: {
      topPosition() {
        return {
          top: `${this.cardBottomPoint}px`
        }
      }
    },
    methods: {
      getBottomCoordinateOfcard() {
        let card = document.querySelector('.l-Teaser-card');
        let cardBoundingBox = card.getBoundingClientRect()
        let bodyBoundingBox = document.body.getBoundingClientRect()
        this.cardBottomPoint = cardBoundingBox.bottom - bodyBoundingBox.bottom
      }
    }
  }
</script>
<style lang="scss">
  .m-Footer {
    height: 90px;
    width: 100%;

    &-wrapper {
      @include grid-wrapper;
    }

    &-container {
      @include grid-container;
    }

    &-columnOne {
      background-color: $color-teal;
      height: 90px;
      width: 60px;
    }

    &-columnTwo {
      background-color: $color-purple;
      height: 90px;
      flex: 1;
    }

    &-nav {
      &List {
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
      }

      &Item {
        color: #fff;
        opacity: 0.7;

        &:first-child {
          margin-bottom: 10px;
        }

        a {
          color: inherit;
          text-decoration: none;
          text-transform: uppercase;
        }
      }
    }
  }

  .slideFooterIn-enter-active, .slideFooterIn-leave-active {
    transform: translateY(0);
    transition: transform 0.5s ease;
  }
  .slideFooterIn-enter, .slideFooterIn-leave-active {
    transform: translateY(90px);
  }
</style>
