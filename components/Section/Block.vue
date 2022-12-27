<template>
  <layer
    class="container history-section"
    :image="image"
    iconFleet
    :flip="flip"
  >
    <template #text>
      <IconFleet v-if="iconFleet" :number="6" />
      <h3 v-if="subtitle">{{ locale === 'fr' ? subtitle : subtitleEn }}</h3>
      <h2 class="large">{{ locale === 'fr' ? title : titleEn }}</h2>
      <div class="text" v-html="locale === 'fr' ? text : textEn"></div>
      <a
        v-if="linkTarget"
        class="link"
        :href="localePath({ name: linkTarget })"
      >
        {{ locale === 'fr' ? linkText : linkTextEn }}
      </a>
    </template>
  </layer>
</template>

<script>
export default {
  name: 'Block',
  components: {
    Icon: () => import('../../components/icon/Icon'),
    IconFleet: () => import('../../components/icon/IconFleet'),
    Layer: () => import('./Layer'),
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    titleEn: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: false,
    },
    subtitleEn: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: true,
    },
    textEn: {
      type: String,
      required: true,
    },
    linkText: {
      type: String,
      required: false,
    },
    linkTextEn: {
      type: String,
      required: false,
    },
    linkTarget: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
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
  computed: {
    locale () {
      return this.$i18n.locale
    }
  }
}
</script>

<style lang="scss" scoped>
h3 {
  text-align: left;
}

.text {
  ::v-deep > p {
    font-family: $light-font;
    font-size: 1.4rem;
  }
}

.link {
  margin-top: 16px;
}
</style>
