<script setup>
defineProps({
  title: {
    type: String,
    required: true,
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
  type: {
    type: String,
    default: 'transparent',
  },
})
</script>

<template>
  <div :class="['information', `information--${type}`]">
    <h2 v-html="title"></h2>
    <p v-if="text" v-html="text"></p>
    <a v-if="link" class="link" :href="link">{{ textLink }}</a>
  </div>
</template>

<style lang="scss" scoped>
h2 {
  font-family: $bold-font;
  font-size: 2.6rem;
  font-style: normal;
  text-align: left;
  white-space: break-spaces;
  margin: 0;

  @media (max-width: $breakpoint-sm) {
    font-size: 2rem;
  }
}

p {
  font-family: $light-font;
  font-size: 1.4rem;
  line-height: 1.5em;
}

.information {
  &--blue {
    width: 600px;
    padding: 32px 64px;
    background-color: $blue-text-color;
    @include border-radius(32px);

    @media (max-width: $breakpoint-sm) {
      width: 100%;
      padding: 32px;
      @include border-radius(0);
    }

    .link {
      position: absolute;
    }

    h2,
    p {
      color: #fff;
    }

    h2 {
      text-transform: uppercase;
    }

    p {
      font-size: 1.8rem;
      line-height: 1.2;
    }
  }
}
</style>
