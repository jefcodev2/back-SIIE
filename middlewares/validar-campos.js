const { response } = require('express');
const { validationResult } = require('express-validator');
const StandardResponse = require('../utils/standar_response');

const validarCampos = (req, res = response, next ) => {

    const errores = validationResult( req );

    if ( !errores.isEmpty() ) {
        
        const response = new StandardResponse(
            false,
            "Error de validación",
            errores.mapped(),
            400 
        );

        return res.status(400).json(response.toJSON());
    }

    next();
}

module.exports = {
    validarCampos
}
