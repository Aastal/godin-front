<template>
  <section class="container-fluid">
    <Information
      :title="title"
      :image="image"
      :link="link"
      :text-link="textLink"
      :text="text"
      :iconFleet="iconFleet"
    />
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
      required: true
    },
    text: {
      type: String,
      required: true
    },
    textLink: {
      type: String,
      required: false
    },
    link: {
      type: String,
      required: false
    },
    image: {
      type: String,
      required: true
    },
    iconFleet: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  padding-top: 64px;
  padding-bottom: 64px;
  background: $body-bg;
  @include box-shadow(0, 4px, 16px, rgba(0, 0, 0, .1), true);
  z-index: 0;
}

.image-wrapper,
.information {
  width: 45%;

  @media (max-width: $breakpoint-sm) {
    width: 100%;
  }
}

.image-wrapper {
  .image-container {
    .image {
      display: block;
      background-size: cover;
      background-position: right 100%, bottom 100%;
      background-repeat: no-repeat;
      width: 600px;
      height: 600px;
      @include border-radius(50%);

      @media (max-width: $breakpoint-sm) {
        width: 350px;
        height: 350px;
        margin: 64px auto 0 auto;
      }
    }
  }
}
</style>
