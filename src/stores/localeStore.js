import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    currentLocale: 'en'
  }),
  actions: {
    setLocale() {
      this.currentLocale = 'en'
      localStorage.setItem('currentLocale', 'en')
      const { locale } = useI18n()
      locale.value = 'en'
    }
  }
})
