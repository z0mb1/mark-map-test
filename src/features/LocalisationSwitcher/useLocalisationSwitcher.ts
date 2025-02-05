import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useLocale } from "vuetify";

const langCodes = ["ru", "en"] as const;

export const useLocalisationSwitcher = () => {
  const { locale } = useI18n();
  const { current } = useLocale();

  const availableLanguages = computed(() => {
    return langCodes.map((code) => {
      let languageNames = new Intl.DisplayNames([code], { type: "language" });
      return { title: languageNames.of(code), code };
    });
  });

  const changeLanguage = (code: (typeof langCodes)[number]) => {
    locale.value = code;
    current.value = code;
  };

  return {
    availableLanguages,
    changeLanguage,
    locale,
  };
};
