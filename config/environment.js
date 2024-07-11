export const BASE_URL = "https://goldenasia-api.goldenyellowtravel.com";
export const API_URL = `${BASE_URL}/api/v1`;
export const IMAGE_URL = `${BASE_URL}/images`;
export const WEBSITE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://goldenasiaexpedition.com";
