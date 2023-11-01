import User from "../model/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'

export const test = (req, res) => {
    res.json({
        message: "Api working"
    })
};

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'you cannot update'))
    try {

        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profileImage: req.body.photo
            }
        }, { new: true })

        const { password, ...rest } = updatedUser._doc

        res.status(200).json(rest);

    } catch (error) {
        next(error)
    }
}


export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'you can delete only your account'))
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted')
    }
    catch(error){
        next(error);
    }
}











