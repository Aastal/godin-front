<template>
  <div id="app">
    <AppBar />
    <Nuxt class="main" />
    <Footer />
    <div v-if="disable" class="disable-bg" />
  </div>
</template>

<script>
export default {
  name: 'Main',
  data: () => ({
    disable: false,
  }),
  mounted() {
    window.scrollTo(0, 0)
  },
  created() {
    this.$root.$on('disable-body', this.disableBody)
  },
  methods: {
    disableBody(state) {
      this.disable = state
    },
  },
}
</script>

<style scoped lang="scss">
div#__nuxt,
#__layout,
#__layout > div,
#app {
  .main {
    padding-top: 96px;

    @media (min-width: $breakpoint-md) {
      padding-top: 80px;
    }
  }
}

.disable-bg {
  content: '\A';
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 12;
  background: rgba(7, 7, 7, 0.8);
}
</style>
