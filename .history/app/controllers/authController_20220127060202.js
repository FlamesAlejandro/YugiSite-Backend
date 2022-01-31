const { Request, Response } = require("express");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const { usuario, usuarioAttributes } = require("../models/usuario");
const { NavigationService } = require('../service/navigationService');

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const authUser = await usuario.findOne({
            where: { email },
        });

        // Verificar si el email existe
        if (!authUser) {
            return res.status(200).json({
                success: false,
                message: "Usuario / Password no son correctos",
            });
        }

        // SI el usuario está activo
        // VER SI EL ESTADO ES UN BOOLEAN O NUMERO
        if (!authUser.estado) {
            return res.status(200).json({
                success: false,
                message: "Usuario no habilitado",
            });
        }

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
        const token = await generarJWT(authUser.email, authUser.nombre);

        // buscar navegacion que le corresponde a ese rol
        const navigation = await NavigationService.GetNavigation(authUser.email);

        res.json({
            success: true,
            message: "Autentificación correcta",
            email: authUser.email,
            nombre: authUser.nombre,
            navigation,
            token,
        });
    } catch (error) {
        res.status(500).json({
            msg: "Hable con el administrador",
        });
    }
};
