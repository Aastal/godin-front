<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    :viewBox="`0 0 ${scale} ${scale}`"
    :fill="fill"
    :aria-labelledby="name"
  >
    <title :id="name" lang="en">{{ name }}</title>
    <g :fill="fill" :stroke="stroke">
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true
    },
    scale: {
      type: Number,
      required: false,
      default: 24
    },
    width: {
      type: [String, Number],
      default: 24
    },
    height: {
      type: [String, Number],
      default: 24
    },
    fill: {
      type: String,
      default: 'none'
    },
    stroke: {
      type: String,
      default: 'none'
    }
  }
}
</script>

<style lang="scss" scoped>
svg {
  display: block;
  padding: 5px;
  box-sizing: content-box;
}
</style>
