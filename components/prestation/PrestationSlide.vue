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
  description: {
    type: String,
    default: null,
  },
  descriptionEn: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <Prestation
    :title="title"
    :title-en="titleEn"
    :description="description"
    :description-en="descriptionEn"
    :image="image"
  />
</template>
