import Constants from "expo-constants/build/Constants"

export const API_URL_BASE =
  process.env.NODE_ENV === "development"
    ? Constants?.manifest?.extra?.devApiUrlBase
    : Constants?.manifest?.extra?.prodApiUrlBase
