const configuration = () => ({
  port: process.env.PORT,
  secret_jwt: process.env.SECRET_JWT,
  expires_jwt: process.env.EXPIRES_JWT,
  secret_refresh_jwt: process.env.SECRET_REFRESH_JWT,
  expires_refresh_jwt: process.env.EXPIRES_REFRESH_JWT,
  nova_poshta_api_key: process.env.NOVA_POSHTA_API_KEY,
})

export default configuration
