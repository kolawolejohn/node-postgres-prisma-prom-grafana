require('dotenv').config()

const express = require('express')
const promClient = require('prom-client')
const authorRoutes = require('./routes/author-routes')
const bookRoutes = require('./routes/book-routes')

const app = express()
const PORT = process.env.PORT

app.use(express.json())

const register = new promClient.Registry()
promClient.collectDefaultMetrics({ register })

const httpRequestsCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
})
register.registerMetric(httpRequestsCounter)

//middleware to API Requests

app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestsCounter.inc({
      method: req.method,
      route: req.path,
      status: res.statusCode,
    })
  })
  next()
})

//Expose metrics endpoint for prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType)
  res.end(await register.metrics())
})

app.use('/api/v1/authors', authorRoutes)
app.use('/api/v1/books', bookRoutes)

app.listen(PORT, () => console.log(`Server is now listenening on port ${PORT}`))
