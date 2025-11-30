module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // ❌ REMOVE expo-router/babel completely

      // NativeWind
      "nativewind/babel",

      // Module aliases
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

      // dotenv
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
