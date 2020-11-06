import { addDecorator } from "@storybook/react";
import React from "react";
import { I18nextProvider } from "react-i18next";
import { withI18next } from "storybook-addon-i18next";
import "../src/styles/globals.scss";
import { i18n } from "../src/utils/i18n";

addDecorator(
  withI18next({
    i18n,
    languages: {
      en: "English",
      ja: "日本語",
    },
  })
);

addDecorator((story, context) => (
  <React.Suspense>
    <I18nextProvider i18n={i18n}>{story(context)}</I18nextProvider>
  </React.Suspense>
));

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
