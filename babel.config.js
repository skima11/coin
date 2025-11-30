module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // NativeWind
      "nativewind/babel",

      // Module aliasing
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

      // Reanimated must come last
      "react-native-reanimated/plugin",
    ],
  };
};
