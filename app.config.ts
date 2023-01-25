import "dotenv/config"

export default {
  expo: {
    name: "f5",
    slug: "f5",
    owner: "franciscogallom",
    version: "0.0.1",
    orientation: "portrait",
    backgroundColor: "#191414",
    icon: "./src/assets/icon.png",
    splash: {
      image: "./src/assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#191414",
    },
    extra: {
      eas: {
        projectId: "4f8a3713-7c69-4853-b58b-525d43b1fa1e",
      },
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      versionCode: 5,
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
