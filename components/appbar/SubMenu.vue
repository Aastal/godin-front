<script setup>
import { ref, watch, computed } from 'vue'
import { useEventBus } from '~/composables/useEventBus'

const { $emit } = useEventBus()

const props = defineProps({
  label: {
    type: String,
    default: 'Menu',
  },
  showMenu: {
    type: Boolean,
    default: false,
  },
  open: {
    type: Boolean,
    default: false,
  },
})

const slots = useSlots()
const emit = defineEmits(['close'])

const menuRef = ref(null)

const hasFooter = computed(() => {
  return !!slots.footer
})

watch(
  () => props.open,
  (newVal) => {
    const target = menuRef.value

    if (target) {
      if (!target.classList.contains('visible') && newVal) {
        target.classList.add('visible')
        $emit('disable-body', true)
      } else {
        target.classList.remove('visible')
        $emit('disable-body', false)
      }
    }
  },
)

const closeMenu = (event) => {
  if (event.target.classList.contains('disable-bg')) {
    emit('close')
  }
}
</script>

<template>
  <nav
    ref="menuRef"
    v-click-outside="closeMenu"
    :class="[`menu`, { display: showMenu }]"
  >
    <slot name="items" />
    <div v-if="hasFooter" class="menu-footer">
      <slot name="footer" />
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.menu {
  position: absolute;
  opacity: 0;
  right: -10000px;
  top: 0;
  color: $light-text-color;
  z-index: 999;
  max-height: 100vh;
  @include border-radius(8px 0 0 8px);
  @include box-shadow(-24px, 4px, 20px, rgba(0, 0, 0, 0.5));
  background: $ternary-bg;

  &.display {
    transition: opacity 0.3s ease-in-out;
  }

  &.visible {
    opacity: 1;
    outline: none;
    right: 0;
    position: fixed;
  }

  .menu-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px 8px;

    * {
      flex: 1 1 auto;
      margin: 0 12px;
    }
  }

  @media (min-width: $breakpoint-md) {
    top: 3%;

    .menu-footer {
      padding: 32px 8px;
    }
  }
}
</style>
