// export const BASE_URL =
//   process.env.NODE_ENV == "production"
//     ? "https://goldenasia-api.goldenyellowtravel.com"
//     : "http://127.0.0.1:8000";
export const BASE_URL = "http://127.0.0.1:8000";
export const API_URL = `${BASE_URL}/api/v1`;
export const IMAGE_URL = `${BASE_URL}/images`;
export const WEBSITE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://goldenasiaexpedition.com";
