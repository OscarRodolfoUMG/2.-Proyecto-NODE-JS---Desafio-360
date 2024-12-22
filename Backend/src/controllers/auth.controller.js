import User from "../models/usuarios.model.js";
import sequelize from "../db.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Debe ingresar usuario y contraseña" });
        }

        const userFound = await User.findOne({ where: { correo_electronico: email } });

        if (!userFound) {
            return res.status(400).json({ message: "Usuario no encontrado" })
        }

        const isMatch = await bcrypt.compare(password, userFound.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        const token = await createAccessToken({ id: userFound.id_usuarios })

        res.cookie("token", token);

        res.status(200).json({ message: "Inicio de sesión exitoso", user: userFound.nombre_completo });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener usuarios', error: error });
    }
}

export const logoutUser = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
}
