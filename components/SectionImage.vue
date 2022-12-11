<template>
  <section :class="['section-image', { flip }]">
    <Information
      v-if="title"
      :title="title"
      :image="image"
      :link="link"
      :text-link="textLink"
      :text="text"
      :iconFleet="iconFleet"
    />
    <div class="information">
      <slot name="text" />
    </div>
    <div class="image-wrapper">
      <div class="image-container">
        <div class="image" :style="`background-image: url(${image})`"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SectionImage',
  components: {
    Icon: () => import('../components/icon/Icon'),
    IconFleet: () => import('../components/icon/IconFleet'),
  },
  props: {
    title: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: false,
    },
    textLink: {
      type: String,
      required: false,
    },
    link: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: true,
    },
    iconFleet: {
      type: Boolean,
      default: false,
    },
    flip: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.section-image {
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  padding-top: 64px;
  padding-bottom: 64px;
  background: $body-bg;
  z-index: 0;

  &.flip {
    flex-direction: row-reverse;
    @include box-shadow(0, 4px, 16px, rgba(0, 0, 0, 0.1), true);

    .image-container {
      justify-content: start;
    }
  }

  @media (max-width: $breakpoint-sm) {
    justify-content: center;
    flex-direction: column;

    .image-wrapper {
      margin-top: 32px;
      margin-bottom: 0;
    }

    &.flip {
      flex-direction: column;

      .image-wrapper {
        margin-top: 32px;
      }
    }
  }

  @media (max-width: $breakpoint-lg) {
    justify-content: center;
  }
}

.image-wrapper,
.information {
  max-width: 45%;

  @media (max-width: $breakpoint-sm) {
    max-width: 100%;
  }
}

.image-wrapper {
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
      @include border-radius(100%);

      @media (max-width: $breakpoint-lg) {
        width: 450px;
        height: 450px;
      }

      @media (max-width: $breakpoint-md) {
        width: 400px;
        height: 400px;
      }

      @media (max-width: $breakpoint-sm) {
        width: 350px;
        height: 350px;
      }
    }
  }
}
</style>
