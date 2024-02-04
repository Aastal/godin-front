<script setup>
import { BlueSquare, RedLightTriangle, RedTriangle } from '#components'

const props = defineProps({
  number: {
    type: Number,
    default: 6,
  },
})

const items = computed(() => {
  let icons = []
  const options = [BlueSquare, RedLightTriangle, RedTriangle]
  let position = 0
  let fill, maxTop, maxRight, opacity

  for (let i = 1; i <= props.number; i++) {
    if (position === 0) {
      fill = 'rgba(245, 37, 45, .3)'
      maxTop = 20
      maxRight = 100
      opacity = 0.9
    } else if (position === 1) {
      fill = 'rgba(245, 37, 45, .1)'
      maxTop = 100
      maxRight = 100
      opacity = 0.8
    } else if (position === 2) {
      fill = 'rgba(218, 232, 243, .7)'
      maxTop = 120
      maxRight = 100
      opacity = 0.7
    }

    icons.push({
      name: String(position),
      icon: options[position],
      fill,
      width: 48,
      height: 48,
      top: getRandomInt(Number(maxTop)),
      right: getRandomInt(Number(maxRight)),
      opacity,
    })

    position++
    if (position >= 3) {
      position = 0
    }
  }

  return icons
})

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}
</script>

<template>
  <div class="fleet">
    <Icon
      v-for="(item, key) in items"
      :key="key"
      :class="item.name"
      :name="item.name"
      :width="item.width"
      :height="item.height"
      :fill="item.fill"
      :style="`top: ${item.top}%; right: ${item.right}%; opacity: ${item.opacity};`"
    >
      <component :is="item.icon" />
    </Icon>
  </div>
</template>

<style lang="scss" scoped>
.fleet {
  svg {
    position: absolute;
    z-index: -1;
  }
}
</style>
