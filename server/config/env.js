const dev = {
  SERVER_PORT: process.env.SERVER_DEV_PORT,
  MONGODB_URI: process.env.MONGODB_DEV_URI
}

const staging = {
  SERVER_PORT: process.env.SERVER_STAGING_PORT,
  MONGODB_URI: process.env.MONGODB_STAGING_URI
}
module.exports = function () {
  switch (process.env.NODE_ENV) {
    case 'development':
      return dev
    case 'staging':
      return staging
    default:
      return dev // Default to development settings
  }
}
