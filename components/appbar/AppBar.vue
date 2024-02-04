<script setup>
import { ref } from 'vue'

const items = ref([
  { text: 'pages.homepage.title', to: { name: 'index' } },
  { text: 'pages.history.title', to: { name: 'history' } },
  {
    text: 'pages.jobs.title',
    pages: [
      { text: 'pages.silos.title', to: { name: 'silos' } },
      { text: 'pages.benefit.title', to: { name: 'benefit' } },
      { text: 'pages.boilermaking.title', to: { name: 'boilermaking' } },
    ],
  },
  { text: 'pages.contact.title', to: { name: 'contact' } },
])
</script>

<template>
  <header>
    <AppBarResponsive :items="items" />
    <AppBarInline :items="items" />
  </header>
</template>

<style scoped lang="scss">
header {
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  right: 0;
  z-index: 14;
  background: none;
}

.search-nav {
  position: absolute;
  visibility: hidden;
  opacity: 0;
  padding-bottom: 16px;
  transition: opacity 0.3s ease-in-out;

  &.display {
    position: static;
    visibility: visible;
    opacity: 1;
  }

  @media (min-width: $breakpoint-md) {
    padding-bottom: 2%;
  }
}

%dark-bg {
  background: #050606;
  @include box-shadow(0, 7px, 70px, #202020);
}

.scrolled {
  @extend %dark-bg;
}

.theme {
  &--dark {
    @extend %dark-bg;
  }
}
</style>
