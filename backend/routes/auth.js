import express from 'express'
import User from '../models/User.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { verifyRefreshToken} from '../middlewares/verifyToken.js'

dotenv.config();

const router = express.Router()

//Validate password
function validatePassword(password) {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
  
    if (password.length < minLength) {
      return {
        valid: false,
        message: 'Password must be at least 8 characters long.',
      };
    }
    if (!hasUppercase) {
      return {
        valid: false,
        message: 'Password must contain at least one uppercase letter.',
      };
    }
    if (!hasLowercase) {
      return {
        valid: false,
        message: 'Password must contain at least one lowercase letter.',
      };
    }
    if (!hasNumber) {
      return {
        valid: false,
        message: 'Password must contain at least one number.',
      };
    }
    if (!hasSpecialChar) {
      return {
        valid: false,
        message:
          'Password must contain at least one special character (!@#$%^&*).',
      };
    }
  
    return { valid: true };
  }

  //Register
router.post('/register', async (req, res)=> {
    if (
        req.body.lastname === '' || req.body.lastname === null,
        req.body.firstname === '' || req.body.firstname === null,
        req.body.email === '' || req.body.email === null,
        req.body.password === '' || req.body.password === null
    ) {
        res.status(400).json(`Please fill all fields!`)
    }

    const validatedPassword = validatePassword(req.body.password)
    if (validatedPassword.valid === false) {
        res.status(400).send(validatedPassword.message);
    } else  {
        const newUser = new User({
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            email: req.body.email,
            password: req.body.password,
        });
        try {
            const savedUser = await newUser.save()
            res.status(201).send(savedUser)
        } catch (error) {
            res.status(500).send(error);
        }
    }
})

//Login 
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if (user) {
            const hashedPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )

            const {password, ...others } = user._doc;

            const accessToken = jwt.sign(
                {
                    id: user._id,
                },
                process.env.JWT_SEC,
                {
                    expiresIn: '1h'
                }
            );
            const refreshToken = jwt.sign(
                {
                    id: user._id,
                },
                process.env.JWT_SEC_REFRESH,
                {
                    expiresIn: '1y',
                    audience: user._id.toString()
                }
            );
            if (hashedPassword) {
                res.status(200).send({
                    ...others,
                    accessToken,
                    refreshToken,
                    message: 'Valid Password'
                })
            } else {
                res.status(400).send(`Invalid password`)
            } 
        } else {
            res.status(401).send('User does not exist!');
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
})

//Refresh Token
router.post('/refresh-token', async (req, res) => {
    try {
        const {refreshToken, email } = req.body;
        if (!refreshToken) {
            res.status(500).send(`Bad Request`);
        }
        const user = await  User.findOne({email});
        if (user) {
            const userId = await verifyRefreshToken(refreshToken)
            const accessToken = jwt.sign(
                {
                    id: userId,
                },
                process.env.JWT_SEC,
                {
                    expiresIn: '1h'
                }
            );
            const refToken = jwt.sign(
                {
                    id: userId,
                },
                process.env.JWT_SEC_REFRESH,
                {
                    expiresIn: '1y',
                    audience: userId.toString()
                }
            );
            res
            .status(200)
            .send({accessToken, refreshToken:refToken});
        }
    } catch (error) {
        console.log(err);
        res.status(500).send(error)
    }
})

export default router;