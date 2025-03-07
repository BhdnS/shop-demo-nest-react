const configuration = () => ({
  port: process.env.PORT,
  secret_jwt: process.env.SECRET_JWT,
  expires_jwt: process.env.EXPIRES_JWT,
  secret_refresh_jwt: process.env.SECRET_REFRESH_JWT,
  expires_refresh_jwt: process.env.EXPIRES_REFRESH_JWT,
})

export default configuration
