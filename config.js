const GOOGLE_API_KEY =
  process.env.NODE_ENV === "production"
    ? process.env.GOOGLE_API_KEY
    : process.env.GOOGLE_API_KEY_DEVELOPMENT;

const googleConfig = {
  url: `https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_API_KEY}`,
  method: "GET"
};

const colormindConfig = {
  url: "http://colormind.io/api/",
  method: "POST",
  data: '{"model":"default"}'
};

module.exports = { googleConfig, colormindConfig };
