module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // React Compiler FIRST
      "react-compiler",

      // Expo Router
      "expo-router/babel",

      // NativeWind
      "nativewind/babel",

      // Module resolver
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

      // Dotenv
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          allowUndefined: true,
        },
      ],

      // Reanimated LAST
      "react-native-reanimated/plugin",
    ],
  };
};
