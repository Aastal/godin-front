<template>
  <div>
    <Header id="history-header" :title="$t('headers.history.title')" />
    <section-image
      class="container history-section"
      image="/histoire.jpeg"
      iconFleet
      flip
    >
      <template #text>
        <IconFleet :number="6" />
        <h3>{{ $t('pages.history.section.mastery.heading') }}</h3>
        <h2 class="large">{{ $t('pages.history.section.mastery.title') }}</h2>
        <p>{{ $t('pages.history.section.mastery.text') }}</p>
      </template>
    </section-image>
    <section-image
      class="container history-section history-section--square-image"
      image="/soudure-2.jpg"
      iconFleet
    >
      <template #text>
        <IconFleet :number="6" />
        <h3>{{ $t('pages.history.section.asset.heading') }}</h3>
        <h2 class="large">{{ $t('pages.history.section.asset.title') }}</h2>
        <p>{{ $t('pages.history.section.asset.text') }}</p>
        <a class="link" :href="localePath({ name: 'silos' })">{{
          $t('our_silos')
        }}</a>
      </template>
    </section-image>
  </div>
</template>

<script>
export default {
  name: 'History',
  components: {
    Icon: () => import('../components/icon/Icon'),
    IconFleet: () => import('../components/icon/IconFleet'),
  },
  layout: 'main',
  nuxtI18n: {
    paths: {
      fr: '/histoire',
      en: '/history',
    },
  },
  head() {
    return {
      title: this.$i18n.tc('pages.history.title') + ' - Godin SAS',
    }
  },
}
</script>

<style lang="scss" scoped>
.history-section {
  padding-top: 32px;
  padding-bottom: 32px;

  .link {
    margin-top: 16px;
  }
}

h3 {
  text-align: left;
}

p {
  font-family: $light-font;
  font-size: 1.4rem;
}
</style>
