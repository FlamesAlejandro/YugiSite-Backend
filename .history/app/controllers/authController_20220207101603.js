const { Request, Response } = require("express");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const { usuario } = require("../models/usuario");

const PostLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log('llego aca');

    try {
        const authUser = await usuario.findOne({
            where: { email },
        });
        console.log('llego aca post find');

        // Verificar si el email existe
        if (!authUser) {
            return res.status(200).json({
                success: false,
                message: "Usuario / Password no son correctos",
            });
        }
        console.log('llego aca parte2');

        // SI el usuario está activo
        // VER SI EL ESTADO ES UN BOOLEAN O NUMERO
        // if (!authUser.estado) {
        //     return res.status(200).json({
        //         success: false,
        //         message: "Usuario no habilitado",
        //     });
        // }

        // Esta seccion de hash de password esta comentado mientras no terminemos el mantenedor de usuario,
        // donde se va a hashear la password y almacenar

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, authUser.password);
        console.log('llego aca 3');

        if (!validPassword) {
            return res.status(200).json({
                success: false,
                message: "Usuario / Password no son correctos - password",
            });
        }
        console.log('llego aca 4');

        // Generar el JWT
        const token = await generarJWT(authUser.email, authUser.nombre);
        console.log('llego aca 5');

        res.json({
            success: true,
            message: "Autentificación correcta",
            email: authUser.email,
            nombre: authUser.nombre,
            rol: authUser.Rol_idRol,
            token,
        });
        console.log('llego aca 6');
    } catch (error) {
        res.status(500).json({
            msg: "Hable con el administrador",
        });
    }
};

// opcional

const Signin = async(req, res) => {

    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }

        usuario = new Usuario( req.body );

        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync( password, salt );


        await usuario.save();

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}



module.exports = {
    PostLogin
}
