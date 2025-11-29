module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // ✅ Expo Router (EAS + Metro safe)
      require.resolve("expo-router/babel"),

      // ✅ NativeWind
      "nativewind/babel",

      // ✅ Module Resolver
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./src",
            "@components": "./src/components",
            "@context": "./src/context",
            "@services": "./src/services",
            "@hooks": "./src/hooks",
            "@types": "./src/types",
            "@lib": "./src/lib" // ✅ ADDED
          },
        },
      ],

      // ✅ Dotenv
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          allowUndefined: true,
        },
      ],

      // ✅ MUST be last (critical for Android)
      "react-native-reanimated/plugin",
    ],
  };
};
