import { addDecorator } from "@storybook/react";
import { I18nextProvider } from "react-i18next";
import "../src/styles/globals.scss";
import { i18n } from "../src/utils/i18n";

addDecorator((story) => (
  <I18nextProvider i18n={i18n}>{story()}</I18nextProvider>
));

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};
