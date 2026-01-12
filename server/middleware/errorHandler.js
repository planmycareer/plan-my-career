export const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || err.status || 500
  const isProd = process.env.NODE_ENV === 'production'

  // Server-side logging
  console.error(err)

  // Client response (don’t leak internals in prod)
  const message = isProd && status === 500 ? 'Internal server error' : (err.message || 'Internal server error')
  res.status(status).json({
    success: false,
    message,
    ...(isProd ? {} : { stack: err.stack }),
  })
}
