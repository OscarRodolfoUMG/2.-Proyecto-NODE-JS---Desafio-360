import User from "../models/usuarios.model.js";
import sequelize from "../db.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res) => {
    try {
        const users = await sequelize.query('EXEC proc_usuarios_selectAll', {
            model: User,
            mapToModel: true,
        })
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error al obtener usuarios', error: err });
    }
};

export const getOneUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const users = await sequelize.query('EXEC proc_usuarios_selectByEmail :correo_electronico', {
            replacements: {
                correo_electronico: email,
            },
            model: User,
            mapToModel: true,
        })
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error al obtener usuario', error: err });
    }
};

export const createtUser = async (req, res) => {
    const { correo, nombre, password, telefono, fechaNacimiento, rol, estado } = req.body;
    try {

        const hashPassword = await bcrypt.hash(password, 10);

        await sequelize.query(
            `EXEC proc_usuarios_insert
          :correo, 
          :nombre, 
          :password, 
          :telefono, 
          :fechaNacimiento, 
          :rol, 
          :estado`,
            {
                replacements: {
                    correo,
                    nombre,
                    password: hashPassword,
                    telefono,
                    fechaNacimiento,
                    rol,
                    estado,
                },
            }
        );
        res.status(201).json({ message: "Usuario insertado correctamente" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error al insertar usuario", error: err });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const {
        correo_electronico,
        nombre_completo,
        password,
        telefono,
        fecha_nacimiento,
        fk_id_rol,
        fk_id_estados,
    } = req.body;

    try {
        await sequelize.query(
            `EXEC proc_usuarios_update
            :id_usuarios, 
            :correo_electronico, 
            :nombre_completo, 
            :password, 
            :telefono, 
            :fecha_nacimiento, 
            :fk_id_rol, 
            :fk_id_estados`,
            {
                replacements: {
                    id_usuarios: id,
                    correo_electronico,
                    nombre_completo,
                    password,
                    telefono,
                    fecha_nacimiento,
                    fk_id_rol,
                    fk_id_estados,
                },
            }
        );
        res.status(200).json({ message: "Usuario actualizado correctamente" });
    } catch (err) {
        console.log("Error al actualizar usuario:", err);
        res.status(500).json({ message: "Error al actualizar usuario", error: err.message });
    }
};


export const inactivateUser = async (req, res) => {
    const { id } = req.params;
    try {
        await sequelize.query(
            `EXEC proc_usuarios_inactivate :id_usuarios `,
            {
                replacements: {
                    id_usuarios: id,
                },
            }
        );
        res.status(201).json({ message: "Usuario inactivado correctamente" });
    } catch (err) {
        console.log(err);
        if (AggregateError) {
            res.status(500).json({ message: "No se encontro el Usuario" });
        } else {
            res.status(500).json({ message: "Error al inactivar usuario", error: err });
        }
    }
};

export const activateUser = async (req, res) => {
    const { id } = req.params;
    try {
        await sequelize.query(
            `EXEC proc_usuarios_activate :id_usuarios `,
            {
                replacements: {
                    id_usuarios: id,
                },
            }
        );
        res.status(201).json({ message: "Usuario activado correctamente" });
    } catch (err) {
        console.log(err);
        if (AggregateError) {
            res.status(500).json({ message: "No se encontro el Usuario" });
        } else {
            res.status(500).json({ message: "Error al activar usuario", error: err });
        }
    }
};



