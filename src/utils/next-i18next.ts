import NextI18Next from "next-i18next";
import * as path from "path";

export default new NextI18Next({
  defaultLanguage: "ja",
  localePath: path.resolve("./public/locales"),
  otherLanguages: ["en"],
});
