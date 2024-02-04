import { ref } from 'vue'

export default function useNavbar() {
  const showNavbar = ref(true)
  const lastScrollPosition = ref(0)
  const visibleMenus = ref([])

  const isMenuVisible = (menu) => {
    return visibleMenus.value.find((el) => el === menu)
  }

  const addSubMenu = (item: any) => {
    if (!item.pages) {
      return
    }

    visibleMenus.value.push(item.text)
  }

  const closeMenu = () => {
    visibleMenus.value = []
  }

  const updateScroll = () => {
    const currentScrollPosition =
      window.scrollY || document.documentElement.scrollTop

    showNavbar.value =
      lastScrollPosition.value < 0 ||
      (currentScrollPosition < lastScrollPosition.value && window.scrollY < 100)
    lastScrollPosition.value = currentScrollPosition
  }

  onMounted(() => {
    window.addEventListener('scroll', updateScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', updateScroll)
  })

  return { showNavbar, addSubMenu, closeMenu, isMenuVisible }
}
