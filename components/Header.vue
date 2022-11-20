<template>
  <section :class="`${id}`">
    <h1 v-html="title"></h1>
  </section>
</template>

<script>
export default {
  name: 'Header',
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
section {
  position: relative;
  background-image: url('/silos-grains.jpg');
  background-size: cover;
  background-position-y: 60%;
  background-repeat: no-repeat;
  z-index: 2;
  padding: 64px 0;

  &:before {
    z-index: 1;
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: $blue-text-color;
    opacity: 0.82;
  }

  @media (max-width: $breakpoint-sm) {
    padding: 64px 0;
  }
}

h1 {
  position: relative;
  color: $light-text-color;
  font-size: 3rem;
  text-transform: uppercase;
  text-align: center;
  white-space: break-spaces;
  z-index: 2;

  @media (max-width: $breakpoint-sm) {
    font-size: 2rem;
  }
}
</style>
