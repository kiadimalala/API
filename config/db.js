const moongoose = require('mongoose')

const connectDB = async () => {
    const conn = await moongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDb Connected: ${conn.connection.host}`.cyan.underline.bold);
}

module.exports = connectDB