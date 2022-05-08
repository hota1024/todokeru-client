const path = require('path')

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 600,
  webpack(config, options) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src')

    return config
  }
}
