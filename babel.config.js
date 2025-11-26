module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Expo Router (must be near top)
      require.resolve("expo-router/babel"),

      // NativeWind
      "nativewind/babel",

      // Path alias resolver
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
          },
        },
      ],

      // Dotenv support
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          allowUndefined: true,
        },
      ],

      // ⚠️ MUST stay last ALWAYS
      "react-native-reanimated/plugin",
    ],
  };
};
