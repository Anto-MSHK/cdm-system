import translate from "i18next";
import docs_ru from "./locales/ru/docs-ru.json";
import errors_ru from "./locales/ru/errors-ru.json";

type translateType = (
  path: keyof typeof docs_ru | keyof typeof errors_ru,
  params?: { model?: string; path?: string }
) => string;

translate.init({
  resources: {
    ru: {
      translation: { ...docs_ru, ...errors_ru },
    },
  },
  lng: "ru",
});
export default translate.t as translateType;
