<template>
  <header :class="[{ scrolled: lastScrollPosition > 100 }]">
    <AppBarResponsive :items="items" />
    <AppBarInline :items="items" />
  </header>
</template>

<script>
export default {
  name: 'AppBar',
  data () {
    return {
      items: null,
      showSearchbar: true,
      lastScrollPosition: null
    }
  },
  mounted () {
    window.addEventListener('scroll', this.updateScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.updateScroll)
  },
  created () {
    this.items = [
      { text: 'pages.homepage.title', to: { name: 'homepage' } },
      { text: 'pages.history.title', to: { name: 'history' } },
      {
        text: 'pages.jobs.title',
        pages: [
          { text: 'pages.silos.title', to: { name: 'silos' } },
          { text: 'pages.benefit.title', to: { name: 'benefit' } }
        ]
      },
      { text: 'pages.contact.title', to: { name: 'contact' } },
    ]
  },
  methods: {
    updateScroll () {
      const currentScrollPosition = window.scrollY || document.documentElement.scrollTop

      this.showSearchbar = currentScrollPosition < this.lastScrollPosition && window.scrollY < 100
      this.lastScrollPosition = currentScrollPosition
    }
  }
}
</script>

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
  transition: opacity .3s ease-in-out;

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
