module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Expo Router
      "expo-router/babel",

      // NativeWind (safe)
      "nativewind/babel",

      // Module Resolver (safe placement)
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
            "@lib": "./src/lib",
          },
        },
      ],

      // dotenv loader (must be BEFORE reanimated)
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          allowUndefined: true,
        },
      ],

      // Reanimated must ALWAYS be LAST
      "react-native-reanimated/plugin",
    ],
  };
};
