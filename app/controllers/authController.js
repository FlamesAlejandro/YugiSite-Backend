const { Request, Response } = require("express");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const initModels = require("../models/init-models");
const { db } = require("../../config/db/connection");

const { usuario } = initModels(db);

const PostLogin = async (req, res) => {
    const { correo, password } = req.body;

    try {
        const authUser = await usuario.findOne({
            where: { correo },
        });

        // Verificar si el correo existe
        if (!authUser) {
            return res.status(200).json({
                success: false,
                message: "Usuario / Password no son correctos",
            });
        }

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

        if (!validPassword) {
            return res.status(200).json({
                success: false,
                message: "Usuario / Password no son correctos - password",
            });
        }

        // Generar el JWT
        const token = await generarJWT(authUser.correo, authUser.nombre);

        res.json({
            success: true,
            message: "Autentificación correcta",
            email: authUser.correo,
            nombre: authUser.nombre,
            rol: authUser.Rol_idRol,
            token,
        });
        
    } catch (error) {
        res.status(500).json({
            msg: "Hable con el administrador",
        });
    }
};

// opcional

const Signin = async(req, res) => {

    const { correo, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ correo });

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
        const token = await generarJWT( usuario.id, usuario.nombre );

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
