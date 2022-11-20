<template>
  <div>
    <Header id="benefit-header" :title="$t('headers.contact.title')" />
    <ContactForm />
  </div>
</template>

<script>
export default {
  name: 'Contact',
  layout: 'main',
  nuxtI18n: {
    paths: {
      fr: '/contact',
      en: '/contact',
    },
  },
  head() {
    return {
      title: this.$i18n.tc('pages.contact.title') + ' - Godin SAS',
    }
  },
}
</script>

<style lang="scss" scoped>
.contact-form {
  padding: 64px 0;
}
</style>
