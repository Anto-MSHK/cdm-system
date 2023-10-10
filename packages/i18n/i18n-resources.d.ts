import "i18next";
// import all namespaces (for the default language, only)
import doc_ru from "../configurators/docsConfigurator/locales/ru.json";

declare module "i18next" {
  // Extend CustomTypeOptions
  interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: "ru";
    // custom resources type
    resources: {
      ru: typeof doc_ru;
    };
    // other
  }
}
