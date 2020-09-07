const contentful = require("contentful");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_CONTENT_DELIVERY_API_ACCESS_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONMENT,
  space: process.env.CONTENTFUL_SPACE_ID,
});

(async () => {
  const contentTypes = await client.getContentTypes();

  fs.writeFileSync(
    path.resolve(__dirname, "../public/contents/content-types.json"),
    JSON.stringify(contentTypes),
    "utf8"
  );

  const entities = await client.getEntries();

  fs.writeFileSync(
    path.resolve(__dirname, "../public/contents/entries.json"),
    JSON.stringify(entities),
    "utf8"
  );
})();
