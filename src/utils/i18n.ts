import NextI18Next from "next-i18next";
import * as path from "path";
import isArray from "lodash/isArray";
import isObject from "lodash/isObject";
import json from "../../public/locales/ja/common.json";

// Helper Functions

const isRecord = (
  maybeRecord: unknown
): maybeRecord is Record<string, unknown> =>
  isObject(maybeRecord) && !isArray(maybeRecord);

const getI18nKeys = <T extends Record<string, unknown>>(
  json: T,
  prefixes: string[]
): T => {
  const keys: any = {};

  Object.entries(json).forEach(([key, value]) => {
    if (isRecord(value)) {
      return (keys[key] = getI18nKeys(value, [...prefixes, key]));
    }

    if (!isObject(value)) {
      const prefix = prefixes.join(".");
      return (keys[key] = `${prefix}${prefix ? "." : ""}${key}`);
    }
  });

  return keys;
};

// Setup

type I18nLanguage = "en" | "ja";

const { appWithTranslation, useTranslation, i18n } = new NextI18Next({
  defaultLanguage: "ja",
  localePath: path.resolve("./public/locales"),
  otherLanguages: ["en"],
});

const keys = getI18nKeys(json, []);

// Exports

export const changeLanguage = (language: I18nLanguage) => {
  i18n.changeLanguage(language);
};

export const useI18n = () => {
  const { i18n, t } = useTranslation();

  return {
    keys,
    language: i18n.language as I18nLanguage,
    t: (key: string) => t(key),
  };
};

export const withI18n = appWithTranslation;
