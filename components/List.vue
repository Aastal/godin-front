<script setup>
defineProps({
  listStyle: {
    type: String,
    default: 'flex',
  },
  columns: {
    type: Number,
    default: 3,
  },
})
</script>

<template>
  <div
    :class="[
      'list-container',
      `list-container--${listStyle}`,
      `list-container--${columns}`,
    ]"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.list-container {
  &--flex {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;

    &::after {
      content: '';
      width: calc(100% / 3 - 32px - 0.01px);

      @media (max-width: $breakpoint-sm) {
        width: calc(100% / 2 - 32px - 0.01px);
      }

      @media (max-width: $breakpoint-xs) {
        width: calc(100% - 32px - 0.01px);
      }
    }
  }

  &--grid {
    display: grid;
    grid-gap: 16px;
    grid-auto-rows: minmax(0, auto);
  }

  @for $i from 1 through 5 {
    &--#{$i} {
      grid-template-columns: repeat($i, 1fr);
    }

    @media (max-width: $breakpoint-sm) {
      &--#{$i} {
        grid-template-columns: repeat(round(math.div($i, 2)), 1fr);
      }
    }

    @media (max-width: $breakpoint-xs) {
      &--#{$i} {
        justify-content: center;
        grid-template-columns: repeat(round(math.div($i, 3)), 1fr);
      }
    }
  }
}
</style>
