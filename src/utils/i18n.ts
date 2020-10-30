import * as path from "path";
import NextI18Next from "next-i18next";
import * as nextConfig from 'next/config'
import json from "../../public/locales/ja/common.json";

// Template String Types
// Reference: https://stackoverflow.com/questions/58434389/typescript-deep-keyof-of-a-nested-object

type Join<T, U> =
  T extends string
    ? U extends string
      ? `${T}${U extends "" ? "" : "."}${U}`
      : never
    : never;

type Paths<T> =
  T extends Record<string, unknown>
    ? { [K in keyof T]: K extends string ? Join<K, Paths<T[K]>> : never }[keyof T]
    : ""

// Setup

type I18nKeys = Paths<typeof json>;
type I18nLanguage = "en" | "ja";

const { appWithTranslation, useTranslation, i18n } = new NextI18Next({
  defaultLanguage: "ja",
  localePath: path.resolve("./public/locales"),
  otherLanguages: ["en"],
});

// Exports

export const changeLanguage = (language: I18nLanguage) =>
  i18n.changeLanguage(language);

export const useI18n = () => {
  const { i18n, t } = useTranslation();

  return {
    language: i18n.language as I18nLanguage,
    t: (key: I18nKeys) => t(key),
  };
};

export const withI18n = appWithTranslation;
