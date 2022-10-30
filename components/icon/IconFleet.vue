<template>
  <div class="fleet">
    <icon
      v-for="(item, key) in items"
      :key="key"
      :class="item.icon"
      :name="item.icon"
      :width="item.width"
      :height="item.height"
      :fill="item.fill"
      :style="`top: ${item.top}%; right: ${item.right}%;`"
    >
      <component :is="item.icon"/>
    </icon>
  </div>
</template>

<script>
export default {
  name: 'IconFleet',
  components: {
    Icon: () => import('../icon/Icon'),
    RedTriangle: () => import('../icon/icons/RedTriangle'),
    RedLightTriangle: () => import('../icon/icons/RedLightTriangle'),
    BleuCircle: () => import('../icon/icons/BleuCircle'),
  },
  props: {
    number: {
      type: Number,
      default: 6
    }
  },
  computed: {
    items() {
      let icons = []
      const options = ['RedTriangle', 'RedLightTriangle', 'BleuCircle']
      let position = 0
      let fill, maxTop, maxRight

      for (let i = 1; i <= this.number; i++) {
        if (position === 0) {
          fill = '#f4262c'
          maxTop = 20
          maxRight = 100
        } else if (position === 1) {
          fill = 'rgba(245, 37, 45, .5)'
          maxTop = 100
          maxRight = 100
        } else if (position === 2) {
          fill = 'rgba(218, 232, 243, .7)'
          maxTop = 120
          maxRight = 100
        }

        icons.push({
          icon: options[position],
          fill,
          width: 64,
          height: 64,
          top: this.getRandomInt(maxTop),
          right: this.getRandomInt(maxRight),
        })

        position++
        if (position >= 3) {
          position = 0
        }
      }

      return icons
    }
  },
  methods: {
    getRandomInt (max) {
      return Math.floor(Math.random() * max);
    }
  }
}
</script>

<style lang="scss" scoped>
.fleet {
  svg {
    position: absolute;
    z-index: -1;
  }
}
</style>
