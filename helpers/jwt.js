const jwt = require('jsonwebtoken');


const generarJWT = ( uid, name) =>{

    return new Promise( (resolv, reject)=>{

        const payload = {
            uid,
            name
        }

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '3h'
        }, (err, token) =>{ 

            if( err ){
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolv( token );

        });

    })

}

module.exports = {
    generarJWT
}