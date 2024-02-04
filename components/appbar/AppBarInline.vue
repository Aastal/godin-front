<script setup>
import { watch } from 'vue'

defineProps({
  items: {
    type: Array,
    required: true,
  },
})

const localePath = useLocalePath()
const { showNavbar, addSubMenu, closeMenu, isMenuVisible } = useNavbar()

const navbarStyle = computed(() => [
  'navbar',
  { display: showNavbar.value ? 'block' : 'none' },
])

const route = useRoute()

watch(
  () => route.path,
  () => {
    closeMenu()
  },
)
</script>

<template>
  <nav v-click-outside="closeMenu" :class="navbarStyle">
    <NuxtLink :to="localePath('index')" class="title">
      <img src="/logo-name.svg" class="brand brand--small" alt="logo_nav" />
    </NuxtLink>
    <ul class="navbar--menu">
      <template v-for="item in items" :key="item.text">
        <li @click.capture="addSubMenu(item)">
          <NuxtLink v-if="item.to" :to="localePath(item.to)">
            {{ $t(item.text) }}
          </NuxtLink>
          <span
            v-else
            :class="{
              'sub-menu--active': item.pages?.find(
                (el) => el.to.name === $route.name.split('_')[0],
              ),
            }"
          >
            {{ $t(item.text) }}
          </span>
          <ul v-if="item.pages && isMenuVisible(item.text)" class="sub-menu">
            <li v-for="page in item.pages" :key="page.text">
              <NuxtLink :to="localePath(page.to)">
                {{ $t(page.text) }}
              </NuxtLink>
            </li>
          </ul>
        </li>
      </template>
    </ul>
    <ul class="navbar--right">
      <li>
        <NuxtLink :to="localePath('quotation')" class="quotation-button">
          {{ $t('quotation_request') }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  position: absolute;
  display: grid;
  visibility: hidden;
  opacity: 0;
  top: -1000px;
  color: #fff;
  padding: 0 56px;
  height: 72px;
  grid-template-columns: auto auto 2fr auto;
  transition:
    opacity 0.3s ease-in-out,
    padding-top 0.3s,
    padding-bottom 0.3s;
  background: $ternary-bg;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  .title {
    display: flex;
    text-decoration: none;
  }

  h1 {
    font-size: 1rem;
    text-transform: uppercase;
    margin: auto auto auto 8px;
    @include text-color(
      linear-gradient(
        130.4deg,
        #ffeed8 30.32%,
        rgba(226, 176, 111, 0.4375) 99.67%,
        #bea78b 129.38%
      )
    );
  }

  li {
    a {
      &:hover {
        color: $secondary-text-color;
      }
    }
  }

  &--right {
    display: grid;
    grid-gap: 12px;
    font-weight: 400;
    align-items: center;
    justify-content: flex-end;
    grid-template-columns: auto;
    margin-right: 64px;

    li {
      cursor: pointer;

      .select {
        display: flex;
        padding-left: 5px;
      }
    }
  }

  &--menu {
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-gap: 56px;
    justify-content: left;
    align-items: center;
    margin-left: 40px;

    .router-link-exact-active {
      @include text-color($secondary-text-color);

      &:before {
        display: inline-block;
        content: url('/assets/images/RedTriangle.svg');
        width: 10px;
        height: 10px;
        margin-right: 12px;
      }
    }
  }

  .sub-menu {
    position: absolute;
    opacity: 1;
    top: auto;
    z-index: 9;
    margin-top: 40px;
    transition: opacity 0.1s;

    &--active {
      color: $secondary-text-color;

      &:before {
        display: inline-block;
        content: url('/assets/images/RedTriangle.svg');
        width: 10px;
        height: 10px;
        margin-right: 10px;
      }
    }

    li {
      padding: 8px 24px;
      margin-bottom: 8px;
      border-bottom: 1px solid #fff;
      background: $ternary-bg;

      &:last-child {
        margin-bottom: 0;
        border-bottom: none;
      }
    }
  }

  @media (min-width: $breakpoint-md) {
    &--transparent,
    &--dark {
      visibility: visible;
      position: static;
      opacity: 1;
      top: 0;

      &:not(.display) {
        padding-top: 8px;
        padding-bottom: 8px;
      }
    }

    &.display {
      visibility: visible;
      position: static;
      opacity: 1;
      top: 0;
    }
  }
}
</style>
