<template>
  <div class="carousel">
    <sound-icon
      slot="button-prev"
      class="swiper-button-prev"
      name="RedLightTriangle"
      fill="#f4262c"
      :scale="12"
    >
      <RedLightTriangle />
    </sound-icon>
    <div class="carousel--content">
      <swiper :ref="`carousel-${id}`" :options="swiperOption">
        <slot />
      </swiper>
    </div>
    <sound-icon
      slot="button-next"
      class="swiper-button-next"
      name="RedLightTriangleFlip"
      fill="#f4262c"
      :scale="12"
    >
      <RedLightTriangle />
    </sound-icon>
  </div>
</template>

<script>
import { Swiper, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'Carousel',
  components: {
    Swiper,
    SoundIcon: () => import('../components/icon/Icon'),
    RedLightTriangle: () => import('../components/icon/icons/RedLightTriangle')
  },
  directives: {
    swiper: directive
  },
  data () {
    return {
      id: (Math.random() + 1).toString(36).substring(7),
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 16,
        navigation: {
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next'
        },
        loop: true
      }
    }
  },
  computed: {
    swiper () {
      return this.$refs[`carousel-${this.id}`].$swiper
    }
  }
}
</script>

<style lang="scss" scoped>
.carousel {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;

  &--content {
    position: relative;
    width: 80%;
    margin: auto;
  }
}

.swiper-button-prev,
.swiper-button-next {
  position: relative;
  width: 48px;
  height: 48px;

  &:after {
    font-size: 3rem;
  }

  &.swiper-button-disabled {
    display: none;
  }

  &:focus {
    outline: none;
  }
}

.swiper-button-next {
  transform: rotate(180deg);
}
</style>
