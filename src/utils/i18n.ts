import NextI18Next from "next-i18next";
import * as path from "path";

type I18nLanguage = "en" | "ja";

const { appWithTranslation, useTranslation, i18n } = new NextI18Next({
  defaultLanguage: "ja",
  localePath: path.resolve("./public/locales"),
  otherLanguages: ["en"],
});

// Exports

export const changeLanguage = (language: I18nLanguage) => {
  i18n.changeLanguage(language);
};

export const useI18n = () => {
  const { i18n, t } = useTranslation();

  return {
    language: i18n.language as I18nLanguage,
    t,
  };
};

export const withI18n = appWithTranslation;
