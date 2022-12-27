<template>
  <div>
    <Header id="history-header" :title="$t('headers.history.title')" />
    <SectionBlock
      class="container history-section"
      v-for="section in sectionByPage('history')"
      :key="section.id"
      icon-fleet
      :title="section.title"
      :title-en="section.field_title_en"
      :text="section.body.processed"
      :text-en="section.field_body_en.processed"
      :image="section.field_image?.uri.url"
      :subtitle="section.field_subtitle"
      :subtitle-en="section.field_subtitle_en"
      :link-text="section.field_link_text"
      :link-text-en="section.field_link_text_en"
      :link-target="section.field_link_target"
      :flip="section.field_flip"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { sentryNormalizeException } from '@/utils/handle-error'

export default {
  name: 'History',
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
  async fetch() {
    try {
      const filter =
        'filter[section-page][condition][value]=history' +
        '&filter[section-page][condition][operator]=%3D'
      const include = ['image']

      await this.findAll({ filter, include })
    } catch (e) {
      const exception = sentryNormalizeException(e)
      this.$sentry.captureException(exception)
    }
  },
  computed: {
    ...mapGetters('section', {
      isLoading: 'isLoading',
      sectionByPage: 'sectionByPage',
    }),
  },
  methods: {
    ...mapActions('section', {
      findAll: 'findAll',
    }),
  },
}
</script>

<style lang="scss" scoped>
.history-section {
  padding-top: 32px;
  padding-bottom: 32px;
}
</style>
