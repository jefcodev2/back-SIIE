const { response } = require("express");
const { db_postgres } = require("../../database/config");

/**
 * Obtiene la lista de encuestas telefónicas desde la vista survey_telefonica
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getSurveyTelefonica = async (req, res) => {
  try {
    const desde = Number(req.query.desde) || 0;
    const limit = Number(req.query.limit) || 10;

    // Consultas
    const querySurvey = `SELECT * FROM survey_telefonica OFFSET $1 LIMIT $2;`;
    const querySurveyCount = `SELECT COUNT(*) FROM survey_telefonica;`;

    // Promesas para obtener datos y total
    const [encuestas, total] = await Promise.all([
      db_postgres.query(querySurvey, [desde, limit]),
      db_postgres.one(querySurveyCount),
    ]);

    const totalCount = total.count;

    res.json({
      ok: true,
      encuestas,
      total: totalCount,
      desde,
      limit
    });
  } catch (error) {
    console.error('Error en getSurveyTelefonica:', error);
    res.status(500).json({
      ok: false,
      msg: "Error al obtener las encuestas telefónicas",
      error: error.message
    });
  }
};

/**
 * Obtiene una encuesta telefónica específica por ID
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getSurveyTelefonicaById = async (req, res) => {
  try {
    const { id } = req.params;

    const encuesta = await db_postgres.oneOrNone(
      "SELECT * FROM survey_telefonica WHERE id = $1",
      [id]
    );

    if (!encuesta) {
      return res.status(404).json({
        ok: false,
        msg: "Encuesta telefónica no encontrada"
      });
    }

    res.json({
      ok: true,
      encuesta
    });
  } catch (error) {
    console.error('Error en getSurveyTelefonicaById:', error);
    res.status(500).json({
      ok: false,
      msg: "Error al obtener la encuesta telefónica",
      error: error.message
    });
  }
};





/**
 * Carga encuestas desde un archivo CSV y las inserta en la BD
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const uploadSurveyTelefonica = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        ok: false,
        msg: "No se ha subido ningún archivo"
      });
    }

    const filePath = path.resolve(req.file.path);
    const results = [];

    // Leer y parsear el CSV
    fs.createReadStream(filePath)
      .pipe(csv.parse({ headers: true, trim: true }))
      .on("error", (error) => {
        console.error("Error al leer CSV:", error);
        return res.status(500).json({
          ok: false,
          msg: "Error al leer el archivo CSV",
          error: error.message,
        });
      })
      .on("data", (row) => {
        results.push(row);
      })
      .on("end", async () => {
        try {
          // Inserción en sur_respondent (ejemplo básico)
          for (const row of results) {
            await db_postgres.none(
              `INSERT INTO sur_respondent 
              (code, name, business_type, survey_type, business_group,
               main_street, secondary_street, nomenclature, geo_area,
               latitud, longitud, province, canton, parish)
               VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
              ON CONFLICT (code) DO NOTHING`,
              [
                row.codigo,
                row.nombre,
                row.tipo_negocio,
                row.tipo_encuesta,
                row.grupo_negocio,
                row.calle_principal,
                row.calle_secundaria,
                row.nomenclatura,
                row.area_geografica,
                row.latitud,
                row.longitud,
                row.provincia,
                row.canton,
                row.parroquia
              ]
            );
          }

          res.json({
            ok: true,
            msg: "Encuestas cargadas correctamente",
            total: results.length,
          });
        } catch (dbError) {
          console.error("Error al insertar en la BD:", dbError);
          res.status(500).json({
            ok: false,
            msg: "Error al insertar los datos en la base de datos",
            error: dbError.message,
          });
        } finally {
          // Limpieza: borrar archivo subido
          fs.unlinkSync(filePath);
        }
      });
  } catch (error) {
    console.error("Error en uploadSurveyTelefonica:", error);
    res.status(500).json({
      ok: false,
      msg: "Error al subir encuestas telefónicas",
      error: error.message,
    });
  }
};


module.exports = {
  getSurveyTelefonica,
  getSurveyTelefonicaById,
  uploadSurveyTelefonica
};
