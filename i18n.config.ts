import en from '~/translations/en.json'
import fr from '~/translations/fr.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'fr',
  fallbackLocale: 'fr',
  messages: { en, fr },
}))
