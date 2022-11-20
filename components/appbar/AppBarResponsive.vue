<template>
  <div>
    <nav :class="navbarStyle">
      <nuxt-link :to="localePath('index')">
        <img
          src="~/static/logo-name.svg"
          class="brand brand--small"
          alt="logo_nav"
        />
      </nuxt-link>
      <ul class="navbar--right">
        <li class="burger" @click="toggle">
          <icon class="burger" name="Burger" :width="48" :height="48">
            <Burger />
          </icon>
        </li>
      </ul>
    </nav>
    <sub-menu
      label="Menu"
      :open="openMenu"
      :show-menu="showNavbar"
      @close="openMenu = false"
    >
      <template #items>
        <ul>
          <template v-for="item in items">
            <li :key="item.text" @click.capture="toggleSubMenu($event, item)">
              <nuxt-link v-if="item.to" :to="localePath(item.to)">
                {{ $t(item.text) }}
              </nuxt-link>
              <span v-else>{{ $t(item.text) }}</span>
            </li>
            <ul
              v-if="item.pages"
              :key="item.icon"
              :ref="item.text + '-menu'"
              class="sub-menu"
            >
              <li v-for="page in item.pages" :key="page.text">
                <nuxt-link :to="localePath(page.to)">
                  {{ $t(page.text) }}
                </nuxt-link>
              </li>
            </ul>
          </template>
          <li class="break">
            <Button
              :label="$t('quotation_request')"
              :to="localePath('quotation')"
            />
          </li>
        </ul>
      </template>
    </sub-menu>
  </div>
</template>

<script>
import navbar from '../../mixins/navbar'

export default {
  name: 'AppBarResponsive',
  components: {
    Icon: () => import('../icon/Icon'),
    Burger: () => import('../icon/icons/Burger'),
  },
  mixins: [navbar],
  data() {
    return {
      openMenu: false,
    }
  },
  computed: {
    navbarStyle() {
      return ['navbar', { display: this.showNavbar }]
    },
  },
  watch: {
    $route() {
      this.openMenu = false
      this.$root.$emit('disable-body', false)
    },
  },
  methods: {
    toggle() {
      this.openMenu = !this.openMenu
    },
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  position: absolute;
  display: grid;
  grid-template-columns: 2fr auto;
  opacity: 0;
  top: -1000px;
  color: #fff;
  transition: background-color 0.3s, opacity 0.3s;
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

  @media (min-width: $breakpoint-md) {
    display: none;
  }
}
</style>
