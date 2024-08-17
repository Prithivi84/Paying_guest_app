const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push("cjs");
// config.resolver.sourceExts.push("esm");

module.exports = withNativeWind(config, { input: "./global.css" });
