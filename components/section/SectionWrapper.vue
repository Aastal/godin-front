<script setup>
defineProps({
  section: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <SectionInline
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
</template>

<style scoped lang="scss"></style>
