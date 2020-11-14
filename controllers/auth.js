const { response } = require('express')
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');



const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        let user = await Usuario.findOne({ email }) // email: emial del req.body
        if( user ){ // si existe devuelve un usuario, de lo contrario devuelve null  

            console.log('Por favor ingresa otro nombre de usuario')
            return res.status(400).json({
                ok: false,
                msg: 'Por favor ingresa otro nombre de usuario'
            })
        }

        user = new Usuario( req.body );

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt);
        await user.save();

        //Generar JWT
        const token = await generarJWT( user.id, user.name);
        
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            error: 'Por favor hable con el administrador'
        })
    }

}


const loginUsuario = async (req, res = response) => {

    const { email, password} = req.body;
    
    let user = await Usuario.findOne({ email });


    if( !user ){
        console.log('El usuario o contraseña son incorrectos');
        return res.status(400).json({
            ok :false,
            msg: 'El usuario o contraseña son incorrectos'
        });
    }


    //Confirmar contraseña
    const validPassword = bcrypt.compareSync( password, user.password );

    if( !validPassword ){
        console.log('El usuario o contraseña son incorrectos');
        return res.status(400).json({
            ok: 'false',
            msg: 'El usuario o contraseña con incorrectos'
        })
    }


    //JWT
    const token = await generarJWT( user.id, user.name);

    res.status(200).json({
        ok: true,
        msg: 'login',
        token

    })

}

const revalidarToken = async (req, res = response) => {

    const { uid, name } = req

    const token = await generarJWT( uid, name );

    res.status(200).json({
        ok: true,
        token
    })

}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}