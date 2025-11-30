import "dotenv/config";

export default {
  expo: {
    name: "vad-mining-app",
    slug: "vad-mining-app",
    version: "1.0.0",
    orientation: "portrait",

    icon: "./assets/images/icon.png",
    scheme: "vadminingapp",
    userInterfaceStyle: "automatic",

    newArchEnabled: true,

    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.vad.vadminingapp",
    },

    android: {
      package: "com.vad.vadminingapp",
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
    },

    web: {
  output: "single",
  favicon: "./assets/images/favicon.png",
},


    plugins: [
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000",
          },
        },
      ],
      "expo-secure-store",
      "expo-build-properties",
    ],

    experiments: {
      typedRoutes: true,

      /**  ❤️ REQUIRED new compiler config for Expo 54 */
      reactCompiler: {
        enabled: true,
        // optional recommended options:
        optimizeDependencies: true,
        // remove if issues: devtools: true,
      },
    },

    extra: {
      eas: {
        projectId: "4c8236ee-0372-4141-ab89-31c84e48562c",
      },
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    },
  },
};
