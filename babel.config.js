module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["expo-router/babel"],

    plugins: [
      // NativeWind
      "nativewind/babel",

      // Module aliasing
      [
        "module-resolver",
        {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
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

      // react-native-dotenv
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          allowUndefined: true,
        },
      ],

      // MUST BE LAST
      "react-native-reanimated/plugin",
    ],

    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
  };
};
