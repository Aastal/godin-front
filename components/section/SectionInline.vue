<script setup>
const props = defineProps({
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
    required: false,
  },
  textEn: {
    type: String,
    required: false,
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

const { locale } = useI18n()
const router = useRouter()

const routeName = `${props.linkTarget}___${locale.value}`
const matchRoute = router.hasRoute(routeName)
</script>

<template>
  <SectionLayer class="container" :image="image" :flip="flip" type="inline">
    <template #text>
      <h3 v-if="subtitle">{{ locale === 'fr' ? subtitle : subtitleEn }}</h3>
      <h2 class="large">{{ locale === 'fr' ? title : titleEn }}</h2>
      <div class="text" v-html="locale === 'fr' ? text : textEn"></div>
      <NuxtLink v-if="matchRoute" class="link" :to="{ name: routeName }">
        {{ locale === 'fr' ? linkText : linkTextEn }}
      </NuxtLink>
    </template>
  </SectionLayer>
</template>

<style scoped lang="scss">
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
        content: url('/assets/images/BlueSquare.svg');
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
