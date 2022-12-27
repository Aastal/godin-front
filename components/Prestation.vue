<template>
  <div class="prestation">
    <h3>{{ title }}</h3>
    <div class="prestation--content" v-html="description"></div>
  </div>
</template>

<script>
import { SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'Prestation',
  components: {
    SwiperSlide,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      required: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.prestation {
  background-color: $blue-text-color;
  padding: 64px;

  &--content {
    ::v-deep > p {
      font-family: $light-font;
      color: #fff;
      font-size: 1.4rem;
      font-weight: normal;
      margin: 16px 0 0 0;

      strong {
        font-family: $primary-font;
        font-weight: bold;
      }
    }
  }

  h3 {
    font-family: $bold-font;
    color: #fff;
    font-size: 2.8rem;
    text-transform: none;
    font-style: normal;
    margin-bottom: 16px;
    text-align: left;

    &:before {
      content: none;
    }
  }
}
</style>
