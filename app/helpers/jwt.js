import jwt from 'jsonwebtoken';
import settings from '../../config/db/settings';

export const generarJWT = (correo, nombre) => {

    return new Promise((resolve, reject) => {

        const payload = { correo, nombre };

        jwt.sign(payload, settings.SECRET, {
            expiresIn: '4h'
        }, (err, token) => {

            if (err) {
                reject('No se pudo generar el token')
            } else {
                resolve(token);
            }
        })

    })
}

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers?.authorization;

    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET , (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}






