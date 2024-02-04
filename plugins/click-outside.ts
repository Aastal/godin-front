export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('click-outside', {
    mounted(el, binding) {
      el.clickOutsideEvent = function (event: MouseEvent) {
        if (!(el === event.target || el.contains(event.target as Node))) {
          binding.value(event, el)
        }
      }
      document.addEventListener('click', el.clickOutsideEvent)
    },
    beforeUnmount(el) {
      document.removeEventListener('click', el.clickOutsideEvent)
    },
  })
})
