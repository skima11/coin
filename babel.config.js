module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // ✅ React Compiler must come first
      "react-compiler",

      // Expo Router
      require.resolve("expo-router/babel"),

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

      // ⚠️ Reanimated must ALWAYS be last
      "react-native-reanimated/plugin",
    ],
  };
};
