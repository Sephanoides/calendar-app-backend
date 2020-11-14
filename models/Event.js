const { Schema, model } = require('mongoose');


const EventoSchema = Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario', // para saber que usuario creo el evento.
        required: true
    }
})

EventoSchema.method('toJSON', function (){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id
    return object;
});

module.exports = model('Evento', EventoSchema);