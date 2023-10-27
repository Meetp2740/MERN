import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
// import userRoute from './routes/user.route.js'
import userRoute from '../apiiii/routes/user.route.js'
import authRoutes from '../apiiii/routes/auth.route.js'

mongoose.connect(process.env.MONGO).then(() => {
    console.log("connected sucessfull to database")
}).catch((err) => {
    console.log("not connected", err)
})

const app = express();
app.use(express.json())


app.listen(3000, () => {
    console.log("Server listing on port 3000")
})

app.use('/api/user', userRoute);
app.use('/api/auth', authRoutes);

//Midleware

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message;
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
});
