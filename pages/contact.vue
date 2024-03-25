<script setup>
import { useRuntimeConfig } from '#app'

definePageMeta({
  layout: 'default',
})

const { t } = useI18n()

useSeoMeta({
  title: t('pages.contact.title') + ' - Godin SAS',
  ogTitle: t('pages.contact.title') + ' - Godin SAS',
  description: t('pages.contact.text'),
  ogDescription: t('pages.contact.text'),
  ogImage: useRuntimeConfig().public.apiUrl + '/logo-name.svg',
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
