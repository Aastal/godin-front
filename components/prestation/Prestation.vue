<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  titleEn: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
  descriptionEn: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    required: false,
  },
})

const { locale } = useI18n()
</script>

<template>
  <div class="prestation">
    <div v-if="image" class="prestation--image-wrapper">
      <div class="image-container">
        <div class="image" :style="`background-image: url(${image})`"></div>
      </div>
    </div>
    <div class="prestation--content">
      <h3>{{ locale === 'fr' ? title : titleEn }}</h3>
      <div
        class="description"
        v-html="locale === 'fr' ? description : descriptionEn"
      ></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.prestation {
  display: flex;
  flex-direction: row;
  background-color: $blue-text-color;
  @include border-radius(32px);

  &--image-wrapper {
    .image-container {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .image {
        display: block;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        width: 500px;
        height: 500px;
        @include border-radius(32px 0 0 32px);

        @media (max-width: $breakpoint-sm) {
          display: none;
        }
      }
    }
  }

  &--content {
    padding: 64px;

    .description {
      :deep(> p) {
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

    @media (max-width: $breakpoint-sm) {
      padding: 16px;
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
