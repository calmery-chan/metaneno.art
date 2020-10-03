module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  "**/*": () => require("./package.json")["lint-staged"]["**/*"] || "",
};
