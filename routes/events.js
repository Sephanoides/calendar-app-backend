/*
    Events Route: CRUD
*/

const { Router } = require('express');
const { check } = require('express-validator')

const { isDate } = require('../helpers/isDate')
const { validarCampos} = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const { getEventos, crearEvento, actualizarEvento, eliminarEvento  } = require('../controllers/events');

const router = Router();

//Todas tienen que pasa rpor la validacion el JWT
router.use( validarJWT );

//Obtener eventos
router.get('/',getEventos);

//Crear evento
router.post('/',[
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligatoria').not().isEmpty().custom( isDate ),
    check('end','Fecha de termino es obligatoria').not().isEmpty().custom( isDate ),
    validarCampos
],  crearEvento);

//Actualizar evento
router.put('/:id', actualizarEvento);

//Eliminar evento
router.delete('/:id', eliminarEvento);


module.exports = router;

