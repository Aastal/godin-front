<template>
  <swiper-slide>
    <Prestation
      :title="title"
      :description="description"
      :image="image"
    />
  </swiper-slide>
</template>

<script>
import { SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'PrestationSlide',
  components: {
    SwiperSlide
  },
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: null
    },
    image: {
      type: String,
      required: false
    },
  }
}
</script>
