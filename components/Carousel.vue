<template>
  <div>
    <swiper ref="carousel" :options="swiperOption">
      <slot />
    </swiper>
  </div>
</template>

<script>
import { Swiper, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  components: {
    Swiper,
  },
  directives: {
    swiper: directive,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 16,
        navigation: {
          nextEl: '.swiper-button-next',
        },
        loop: true,
      },
    }
  },
  computed: {
    swiper() {
      return this.$refs.carousel.$swiper
    },
  },
}
</script>

<style lang="scss" scoped></style>
