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
              <NuxtLink
                v-if="item.to"
                :to="localePath(item.to)"
                class="menu-list__link"
              >
                {{ $t(item.text) }}
              </NuxtLink>
              <span v-else>{{ $t(item.text) }}</span>
            </li>
            <ul class="sub-menu">
              <li
                v-if="item.pages && isMenuVisible(item.text)"
                v-for="page in item.pages"
                :key="page.text"
              >
                <NuxtLink :to="localePath(page.to)" class="menu-list__link">
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
.menu-list {
  list-style: none;
  margin: 0;
  padding: 16px;
  overflow-y: visible;
  overflow-x: hidden;
  height: auto;
  max-height: 70vh;

  li {
    position: relative;
    display: flex;
    margin: 24px 0;

    svg {
      margin: 0 3px 0 0;
    }
  }

  span,
  &__link {
    display: block;
    font-family: $primary-font;
    font-weight: 700;
    padding: 8px 0;
    font-size: 1rem;
    color: $ternary-text-color;
    text-decoration: none;

    &.router-link-exact-active {
      @include text-color($secondary-text-color);

      &:before {
        display: inline-block;
        content: url('/assets/images/RedTriangle.svg');
        width: 10px;
        height: 10px;
        margin-right: 8px;
      }
    }
  }
}

.sub-menu {
  list-style: none;
  margin: 0;
  padding: 0 0 0 24px;
  transition: display 0.4s ease-in-out;
  top: -200px;

  &.visible {
    display: block;
    top: 0;
  }

  li {
    margin: 12px 0;

    a {
      font-weight: 400;
    }
  }
}

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
