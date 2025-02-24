import { loadLanguageAsync, Locale } from '@/i18n'
import { useI18n } from 'vue-i18n'

export function useLocale() {
  const { locale } = useI18n()
  const locales = [
    ['en', 'EN'],
    ['zh', '中文'],
    ['kr', '한국어'],
    ['jp', '日本語'],
  ]
  async function setLocale(v: Locale) {
    await loadLanguageAsync(v)
    localStorage.setItem('locale', v)
    locale.value = v
  }

  const keyMap = {
    en: 'en',
    zh: 'cn',
    korea: 'kr',
    jp: 'jp',
  }

  function getApiLocaleValue(key: string, obj: any) {
    const en = obj[`en_${key}`]
    return obj[`${keyMap[locale.value as 'en']}_${key}`] || en
  }

  return { locale, locales, setLocale, getApiLocaleValue }
}
