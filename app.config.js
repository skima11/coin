import "dotenv/config";

export default {
  expo: {
    name: "coin",
    slug: "coin",
    version: "1.0.0",
    scheme: "coin",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",

    // 👇 Required for expo-router SSR/static
    web: {
      output: "server",
    },

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
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.coin.app",
    },

    extra: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,

      // ✅ YOUR REAL EAS PROJECT ID (ADDED)
      eas: {
        projectId: "68b17be2-4e27-4dc9-a0b0-cf1a051d337f",
      },
    },

    experiments: {
      typedRoutes: true,
    },
  },
};
