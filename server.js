const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const morgan = require('morgan')

const colors = require('colors')

const mongoSanitize = require('express-mongo-sanitize')

const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')


const cookieParser = require('cookie-parser')

const errorHandler = require('./middleware/error')

const connectDB = require('./config/db')



//load env var
dotenv.config({ path: './config/config.env' })

//connect to database

connectDB()

//Route files
const quotations = require('./routes/quotations')
const products = require('./routes/products')
const clients = require('./routes/clients')
const auth = require('./routes/auth')
const users = require('./routes/users')

//init express
const app = express()

//cors otions
const corsOptions = {
    origin: 'http://localhost:3000',
    optionSuccessStatus: 200,
    credentials: true
}

//Body parser

app.use(express.json())

//Cookie parser
app.use(cookieParser())

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//enbale cors
app.use(cors(corsOptions))

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//Mount routers
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', users)
app.use('/api/v1/products', products)
app.use('/api/v1/clients', clients)
app.use('/api/v1/quotations', quotations)


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



const PORT = process.env.PORT || 5000

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))

//Handle unhandled promise rejections

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red)
    //close server & exit process
    server.close(() => process.exit(1))
})