const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack')
const path = require('path')
module.exports = {
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
    return config
  }
}