const { response } = require('express')
const jwt = require('jsonwebtoken');

const validarJWT = ( req, res = response, next) =>{

    //Saber como recibir el jwt?? -  x-token en los headers
    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const { uid, name } = jwt.verify(
            token, //el token que recibimos
            process.env.SECRET_JWT_SEED
        )
            //una vez comporbado el token, agrega el uid y el name al request.
        req.uid = uid;
        req.name = name;
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

    next();
}

module.exports = {
    validarJWT
}