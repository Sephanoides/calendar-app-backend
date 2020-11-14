const moment = require('moment');

const isDate = ( value, rest ) =>{

    if( !value ){
        return false
    }
    console.log('HOLANDAAAAAAAAAAAAAAAAAAAAAAAAAA')
    console.log(rest)
    const fecha = moment(value);
    if ( fecha.isValid() ){
        return true
    }else{
        return false
    }
   
}

module.exports = {
    isDate
}