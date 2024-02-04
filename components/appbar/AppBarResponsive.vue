<script setup>
import { ref, watch } from 'vue'

defineProps({
  items: {
    type: Array,
    required: true,
  },
})

const openMenu = ref(false)
const route = useRoute()

const localePath = useLocalePath()
const { showNavbar, addSubMenu, closeMenu, isMenuVisible } = useNavbar()

const toggle = () => {
  openMenu.value = !openMenu.value
}

watch(
  () => route.path,
  () => {
    openMenu.value = false
  },
)

const navbarStyle = computed(() => [
  'navbar',
  { display: showNavbar.value ? 'block' : 'none' },
])
</script>

<template>
  <div class="appbar-responsive">
    <nav :class="navbarStyle">
      <NuxtLink :to="localePath('index')">
        <img src="/logo-name.svg" class="brand brand--small" alt="logo_nav" />
      </NuxtLink>
      <ul class="navbar--right">
        <li class="burger" @click="toggle">
          <Icon class="burger" name="Burger" :width="48" :height="48">
            <Burger />
          </Icon>
        </li>
      </ul>
    </nav>
    <SubMenu
      label="Menu"
      :open="openMenu"
      :show-menu="showNavbar"
      @close="openMenu = false"
    >
      <template #items>
        <ul class="menu-list">
          <template v-for="item in items" :key="item.text">
            <li @click.capture="addSubMenu(item)">
              <NuxtLink v-if="item.to" :to="localePath(item.to)">
                {{ $t(item.text) }}
              </NuxtLink>
              <span v-else>{{ $t(item.text) }}</span>
            </li>
            <ul
              v-if="item.pages && isMenuVisible(item.text)"
              :key="item.icon"
              class="sub-menu"
            >
              <li v-for="page in item.pages" :key="page.text">
                <NuxtLink :to="localePath(page.to)">
                  {{ $t(page.text) }}
                </NuxtLink>
              </li>
            </ul>
          </template>
          <li class="break">
            <NuxtLink :to="localePath('quotation')" class="quotation-button">
              {{ $t('quotation_request') }}
            </NuxtLink>
          </li>
        </ul>
      </template>
    </SubMenu>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  position: absolute;
  display: grid;
  grid-template-columns: 2fr auto;
  opacity: 0;
  top: -1000px;
  color: #fff;
  transition:
    background-color 0.3s,
    opacity 0.3s;
  padding: 16px;
  background: $ternary-bg;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  &--dark {
    position: relative;
    opacity: 1;
    top: auto;
  }

  &--right {
    display: grid;
    grid-gap: 16px;
    align-items: center;
    font-weight: 400;
    grid-template-columns: auto;
  }

  &.display {
    position: relative;
    opacity: 1;
    top: auto;
    transition: opacity 0.3s ease-in-out;
  }

  img {
    display: block;
    margin: auto 0;
    height: 100%;
  }

  @media (min-width: $breakpoint-md) {
    display: none;
  }
}
</style>
