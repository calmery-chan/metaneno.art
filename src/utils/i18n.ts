import NextI18Next from "next-i18next";
import * as path from "path";
import json from "~/locales/ja/common.json";

// Types
// Reference: https://stackoverflow.com/questions/58434389/typescript-deep-keyof-of-a-nested-object

type Join<K, P> = K extends string | number ?
  P extends string | number ?
    `${K}${"" extends P ?"" : "."}${P}` : never : never;

type Paths<T, D extends number = 10> = [D] extends [never] ?
  never : T extends Record<string, unknown> ?
    { [K in keyof T]-?: K extends string | number ? Join<K, Paths<T[K], Prev[D]>> : never }[keyof T] : ""

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]]

// Setup

type I18nKeys = Paths<typeof json>;
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
    t: (key: I18nKeys) => t(key),
  };
};

export const withI18n = appWithTranslation;
