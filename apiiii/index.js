import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser';
import userRoute from '../apiiii/routes/user.route.js'
import authRoutes from '../apiiii/routes/auth.route.js'
import path from 'path';

mongoose.connect(process.env.MONGO).then(() => {
    console.log("connected sucessfull to database")
}).catch((err) => {
    console.log("not connected", err)
})

const __dirname = path.resolve();

const app = express();

app.use(express.static(path.join(__dirname, '/clint/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'clint', 'dist', 'index.html'));
});

app.use(express.json());

app.use(cookieParser());


app.listen(3000, () => {
    console.log("Server listing 3000")
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
