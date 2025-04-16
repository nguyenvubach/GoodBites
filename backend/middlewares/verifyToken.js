import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SEC, (err, user)=> {
            if (err) {
                res.status(403).send(`Token not valid!`)
                req.user = user;
                next();
            }
        })
    } else {
            return res.status(401).send(`You are not authenticated!`)
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () =>{
        if (req.user.id === req.params.id){
            next();
        }else {
            res.status(403).send(`Not allowed!`)
        }
    })
}

// refresh Token function

const verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, process.env.JWT_SEC_REFRESH, (err,payload) => {
            if(err) return reject(console.log('Bad request'))
                const userId = payload.aud;
                 user;

                 resolve(refreshToken);
        })
    })
}


export {verifyToken, verifyRefreshToken, verifyTokenAndAuthorization}