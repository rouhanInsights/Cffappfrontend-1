const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const exclusionList = require("metro-config/src/defaults/exclusionList");

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    // 🚫 Ignore duplicate React Native inside react-native-in-app-update
    blockList: exclusionList([
      /node_modules\/react-native-in-app-update\/node_modules\/react-native\/.*/,
    ]),

    // ✅ Add support for web images and vector types
    assetExts: [
      ...defaultConfig.resolver.assetExts,
      "png",
      "jpg",
      "jpeg",
      "gif",
      "webp",
      "svg",
    ],
  },
  transformer: {
    ...defaultConfig.transformer,
  },
};

module.exports = mergeConfig(defaultConfig, config);
