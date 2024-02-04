<script setup>
const props = defineProps({
  benefits: {
    type: Object,
    default() {
      return {}
    },
  },
})

const id = ref((Math.random() + 1).toString(36).substring(7))
</script>

<template>
  <div class="carousel">
    <div class="carousel--content">
      <Swiper
        :modules="[SwiperAutoplay, SwiperNavigation]"
        :slides-per-view="1"
        :loop="true"
        :autoplay="{
          delay: 6000,
          disableOnInteraction: true,
        }"
      >
        <SwiperSlide v-for="benefit in props.benefits" :key="benefit.id">
          <PrestationSlide
            :title="benefit.title"
            :title-en="benefit.field_title_en"
            :description="benefit.body?.processed"
            :description-en="benefit.field_body_en?.processed"
            :image="benefit.field_image?.uri.url"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

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
