// Import
const express = require('express')
const http = require('http')
require('dotenv').config()

// Define environment variables
const hostname = process.env.APP_HOST
const port = process.env.APP_PORT

// Initialize server
const app = express()
const server = http.Server(app)

// Define entry point
app.get('/', (req, res) => {
  res.send('Warm-up Challenge')
})

// Initialize body parser before routes
app.use(express.json())

// Import and initialize routes
const route = require('./routes/routes')
app.use('/', route)

// Listening
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});