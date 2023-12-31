import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js';

export const verify = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) return next(errorHandler(401, 'Access denied!'))

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err) return next(errorHandler(403, 'token is not valid'))

        req.user = user;
        next();
    })
}