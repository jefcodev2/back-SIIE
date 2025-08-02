/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar-campos');

const { getUsuarios, createUsuario, getUsuarioById, deleteUsuario, updateUsuario, updateActivateUser, getPermisos, getRol } = require('../../controller/seguridad/usuarios');
const { validarJWT } = require('../../middlewares/validar-jwt');
const { validarPermisos } = require('../../middlewares/validar-permisos');



const router = Router();


router.get('/', [validarJWT], getUsuarios);


//router.get('/',  getPermisos);
router.post('/', /* [validarJWT,validarPermisos(['Admin'])],[validarJWT], */
    /* [   validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],  */
    createUsuario
);
router.delete('/:id',
    /* [   validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],  */
    deleteUsuario
);

router.put('/:id',
    /* [   validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],  */
    updateUsuario
);
router.put('/activar/:id',  
    /* [   validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],  */
    updateActivateUser
);
router.get('/:id', getUsuarioById);



module.exports = router;