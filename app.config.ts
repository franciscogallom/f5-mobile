import "dotenv/config"

export default {
  expo: {
    name: "f5",
    slug: "f5",
    owner: "franciscogallom",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./src/assets/icon.png",
    splash: {
      image: "./src/assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#191414",
    },
    extra: {
      devApiUrlBase: process.env.DEV_API_URL_BASE,
      prodApiUrlBase: process.env.PROD_API_URL_BASE,
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/adaptive-icon.png",
        backgroundColor: "#191414",
      },
      package: "com.franciscogallom.f5",
    },
    web: {
      favicon: "./src/assets/favicon.png",
    },
  },
}
