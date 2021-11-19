const config = require("./.babelrc.common.js");
config.presets.push([
  "@babel/preset-env",
  {
    useBuiltIns: "usage",
    corejs: {
      version: 3,
    },
  },
]);
module.exports = config;
