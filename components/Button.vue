<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'light',
  },
  label: {
    type: String,
    required: true,
  },
  to: {
    type: [Object, String],
    default: null,
  },
  isExternal: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  responsive: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'medium',
  },
})

const tag = computed(() => {
  if (props.isExternal) {
    return 'a'
  }

  return props.to ? 'NuxtLink' : 'button'
})

const attrs = useAttrs()
const disabled = computed(() => {
  if (
    (typeof attrs.disabled !== 'undefined' && attrs.disabled !== false) ||
    props.loading
  ) {
    return 'disabled'
  } else {
    return ''
  }
})
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :href="isExternal ? to : null"
    :target="isExternal ? '_blank' : null"
    :class="[
      'button',
      type,
      disabled,
      loading ? 'loading' : '',
      responsive ? 'responsive' : '',
      `button--${size}`,
    ]"
    :aria-disabled="disabled.length"
    :disabled="loading"
  >
    <template v-if="!loading">
      <slot name="icon" />
      {{ label }}
    </template>
  </component>
</template>

<style lang="scss">
%transition {
  transition:
    background 0.3s,
    border 0.3s,
    color 0.3s,
    margin-left 0.1s;
}

.button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  text-transform: uppercase;
  font-family: $light-font;
  font-weight: 100;
  @include border-radius(12px);
  outline: none;
  border: none;
  white-space: nowrap;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  max-width: fit-content;

  @extend %transition;

  &--small {
    padding: 12px 32px !important;
    font-size: 0.75rem;
  }

  &--medium {
    padding: 12px 32px !important;
    font-size: 1rem;
  }

  &.responsive {
    padding: 16px;
  }

  @media (min-width: $breakpoint-md) {
    &.responsive {
      padding: 19px 128px;
    }
  }
}

.light {
  font-family: $primary-font;
  letter-spacing: 0.15rem;
  background: $body-bg;
  border: 1px solid $secondary-text-color;
  border-left-width: 4px;
  border-bottom-width: 4px;
  color: $secondary-text-color !important;

  &:hover {
    border-left-width: 1px;
    border-bottom-width: 1px;
  }
}

.transparent {
  background: transparent;
  color: $body-bg;
}
</style>
