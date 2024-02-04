<template>
  <SectionLayer class="container" :image="image" :flip="flip">
    <template #text>
      <h3 v-if="subtitle">{{ locale === 'fr' ? subtitle : subtitleEn }}</h3>
      <h2 class="large">{{ locale === 'fr' ? title : titleEn }}</h2>
      <div class="text" v-html="locale === 'fr' ? text : textEn"></div>
      <NuxtLink v-if="linkTarget" class="link" :to="linkTarget">
        {{ locale === 'fr' ? linkText : linkTextEn }}
      </NuxtLink>
    </template>
  </SectionLayer>
</template>

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
  flip: {
    type: Boolean,
    default: false,
  },
})

const { $i18n } = useNuxtApp()
const locale = computed(() => $i18n.locale)
</script>

<style lang="scss" scoped>
h2 {
  font-family: $bold-font;
}

h3 {
  text-align: left;
}

.text {
  :deep(> p) {
    font-family: $primary-font;
    font-size: 1.4rem;
    line-height: 1.5;
  }

  :deep(> ul) {
    li {
      display: flex;
      font-family: $light-font;
      font-size: 1.4rem;
      margin-top: 4px;

      &:before {
        display: inline-block;
        content: url('~/assets/images/BlueSquare.svg');
        width: 15px;
        height: 15px;
        margin-right: 10px;
      }
    }
  }
}

.link {
  margin-top: 16px;
}
</style>
