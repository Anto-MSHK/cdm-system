import translate from "i18next";
import docs_ru from "@configurators/docsConfigurator/locales/ru.json";

type translateType = (
  path: keyof typeof docs_ru,
  params?: { model?: string; path?: string }
) => string;

translate.init({
  resources: {
    ru: {
      translation: docs_ru,
    },
  },
  lng: "ru",
});
export default translate.t as translateType;
