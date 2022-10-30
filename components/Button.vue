<template>
  <component
    :is="tag"
    :to="to"
    :href="isExternal ? to : null"
    :target="isExternal ? '_blank' : null"
    :class="['button', type, disabled, loading ? 'loading' : '', responsive ? 'responsive' : '', `button--${size}`]"
    :aria-disabled="disabled.length"
    :disabled="loading"
  >
    <template v-if="!loading">
      <slot name="icon" />
      {{ label }}
    </template>
  </component>
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'light'
    },
    label: {
      type: String,
      required: true
    },
    to: {
      type: [Object, String],
      default: null
    },
    isExternal: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    responsive: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium'
    }
  },
  computed: {
    tag () {
      if (this.isExternal) {
        return 'a'
      }

      return this.to ? 'nuxt-link' : 'button'
    },
    disabled () {
      if (
        (typeof this.$attrs.disabled !== 'undefined' && this.$attrs.disabled !== false) ||
          this.loading
      ) {
        return 'disabled'
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="scss">
%transition {
  transition: background .3s, border .3s, color .3s, margin-left .1s;
}

.button {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  text-transform: uppercase;
  font-family: 'FilsonProLight', sans-serif;
  font-weight: 100;
  @include border-radius(12px);
  outline: none;
  border: none;
  white-space: nowrap;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  width: 100%;

  @extend %transition;

  &--small {
    padding: 12px 32px;
    font-size: .75rem;
  }

  &--medium {
    padding: 12px 32px;
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
