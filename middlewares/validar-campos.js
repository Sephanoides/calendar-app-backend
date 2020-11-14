const { response } = require('express');
const { validationResult } = require('express-validator');



const validarCampos = ( req, res = response, next) =>{

    const errors = validationResult( req );
    
    if( !errors.isEmpty()){
        return res.status(400).json({
            errors: errors.mapped()
        });
    }


    next(); //si hay un error hacemos un return y  nunca llamamos al next

}

module.exports = {
    validarCampos
}