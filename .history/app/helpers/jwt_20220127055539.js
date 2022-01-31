import jwt from 'jsonwebtoken';
import settings from '../../config/db/settings';

export const generarJWT = (correo: string, nombre: string) => {

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

export const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers?.authorization;

    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}

// export const VerifyToken = (req: any, res: any, next: any) => {

//     // @ts-ignore
//     const bearerHeader = req.headers.authorization;

//     if (typeof bearerHeader !== 'undefined') {
//         const bearerToken = bearerHeader.split(" ")[1];
//         req.token = bearerToken;
//         next();
//     } else {
//         res.sendStatus(403);
//     }
// }

// const rutasProtegidas = express.Router();
// rutasProtegidas.use((req, res, next) => {
//     const token = req.headers['access-token'];

//     if (token) {
//         jwt.verify(token, app.get('llave'), (err, decoded) => {
//             if (err) {
//                 return res.json({ mensaje: 'Token inválida' });
//             } else {
//                 req.decoded = decoded;
//                 next();
//             }
//         });
//     } else {
//         res.send({
//             mensaje: 'Token no proveída.'
//         });
//     }
// });





