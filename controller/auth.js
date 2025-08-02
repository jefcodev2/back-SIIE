const { response } = require("express");
const bcrypt = require("bcryptjs");
const { db_postgres } = require("../database/config");
const { generarJWT } = require("../helpers/jwt");
const { getMenuFrontend } = require("../helpers/menu-frontend");
const StandardResponse = require("../utils/standar_response");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuarioDB = await db_postgres.oneOrNone("SELECT * FROM users WHERE email = $1", [email]);

    if (!usuarioDB) {
      const errorResponse = new StandardResponse(false, "Email no encontrado", null, 404);
      return res.status(404).json(errorResponse.toJSON());
    }

    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      const errorResponse = new StandardResponse(false, "Contraseña no válida", null, 400);
      return res.status(400).json(errorResponse.toJSON());
    }

    const token = await generarJWT(usuarioDB.id);
    delete usuarioDB.password;

    const successResponse = new StandardResponse(true, "Login exitoso", {
      token,
      usuario: usuarioDB,
    });

    return res.status(200).json(successResponse.toJSON());

  } catch (error) {
    console.log(error);
    const errorResponse = new StandardResponse(false, "Hable con el administrador", null, 500, error);
    return res.status(500).json(errorResponse.toJSON());
  }
};

const renewToken = async (req, res = response) => {
  try {
    const uid = req.uid;

    const token = await generarJWT(uid);

    const usuarioDB = await db_postgres.oneOrNone("SELECT * FROM users WHERE id = $1", [uid]);


    delete usuarioDB.password;

    const successResponse = new StandardResponse(true, "Token renovado", {
      token,
      usuario: usuarioDB
    });

    return res.status(200).json(successResponse.toJSON());
  } catch (error) {
    console.log(error);
    const errorResponse = new StandardResponse(false, "Error al renovar token", null, 500, error);
    return res.status(500).json(errorResponse.toJSON());
  }
};

module.exports = {
  login,
  renewToken,
};
