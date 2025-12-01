import "dotenv/config";

export default {
  expo: {
    name: "coin",
    slug: "coin",
    version: "1.0.0",
    scheme: "coin",
    orientation: "portrait",
    icon: "./assets/images/icon.png", // ✅ fixed path
    userInterfaceStyle: "light",

    plugins: [
      "expo-router",
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static",
          },
        },
      ],
    ],

    ios: {
      supportsTablet: false,
    },

    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/android-icon-foreground.png", // ✅ fixed
        backgroundImage: "./assets/images/android-icon-background.png", // 🆕 added
        monochromeImage: "./assets/images/android-icon-monochrome.png", // 🆕 added
        backgroundColor: "#ffffff",
      },
      package: "com.coin.app",
    },

    splash: {
      image: "./assets/images/splash-icon.png", // 🆕 added
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },

    extra: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
      eas: {
        projectId: "68b17be2-4e27-4dc9-a0b0-cf1a051d337f",
      },
    },

    experiments: {
      typedRoutes: true,
    },
  },
};

