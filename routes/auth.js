/*
    Rutas de Usuarios / Auth
    hotst + /api/auth

*/
const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');


const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
/*
El middlewares validar-campos se ejecuta cada vez que se hace un check, si cumple la condición avanza al siguiente
si encuentra un error se detiene. Al llegar al final ejecuta el controlador.

*/

router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe tener al menos 5 caracteres').isLength({ min: 5 }),
    validarCampos
],
    crearUsuario);


router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe tener al menos 5 caracteres').isLength({ min: 5 }),
    validarCampos
],
    loginUsuario);



router.get('/renew', validarJWT ,revalidarToken);



module.exports = router;