const express = require('express')

const dotenv = require('dotenv')

const morgan = require('morgan')

const colors = require('colors')

const mongoSanitize = require('express-mongo-sanitize')

const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')

const cookieParser = require('cookie-parser')

const errorHandler = require('./middleware/error')

const connectDB = require('./config/db')



//load env var
dotenv.config({ path: './config/config.env' })

//connect to database

connectDB()

//Route files

const products = require('./routes/products')

const auth = require('./routes/auth')
const users = require('./routes/users')

//init express
const app = express()

//Body parser

app.use(express.json())

//Cookie parser
app.use(cookieParser())

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//Mount routers
app.use('/api/v1/products', products)
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', users)


//Middleware
app.use(errorHandler)

//sanitize data
app.use(mongoSanitize())

//set security headers
app.use(helmet())

//prevent xss attack
app.use(xss())

//rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10mn
    max: 100
})

app.use(limiter)

//prevent http param pollution
app.use(hpp())
//enbale cors

app.use(cors())
const PORT = process.env.PORT || 5000

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))

//Handle unhandled promise rejections

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red)
    //close server & exit process
    server.close(() => process.exit(1))
})