<script setup>
definePageMeta({
  layout: 'default',
})

const { t } = useI18n()

useHead({
  title: t('pages.contact.title') + ' - Godin SAS',
})
</script>

<template>
  <div>
    <Header id="benefit-header" :title="$t('headers.contact.title')" />
    <ContactForm />
  </div>
</template>

<style lang="scss" scoped>
.contact-form {
  padding: 64px 0;
}
</style>
