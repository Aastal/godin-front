<template>
  <div :class="['information', `information--${type}`]">
    <IconFleet v-if="iconFleet" :number="6" />
    <h2 v-html="title"></h2>
    <p v-html="text"></p>
    <a v-if="link" class="link" :href="link">{{ textLink }}</a>
  </div>
</template>

<script>
export default {
  name: 'Information',
  components: {
    Icon: () => import('../components/icon/Icon'),
    IconFleet: () => import('../components/icon/IconFleet'),
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
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
    iconFleet: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
h2 {
  font-family: $bold-font;
  font-size: 2.6rem;
  font-style: normal;
  text-align: left;
  white-space: break-spaces;

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

    @media (max-width: $breakpoint-sm) {
      width: 100%;
      padding: 32px;
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
    }
  }
}
</style>
