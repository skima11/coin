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
      output: "server", // or "static" — but NOT "single"
    },

    plugins: [
      "expo-router",      // 👈 REQUIRED
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
      eas: {
        projectId: "db5380b1-97c6-4fd5-bfa1-c54a6da4d984",
      },
    },

    experiments: {
      typedRoutes: true,
    },
  },
};
