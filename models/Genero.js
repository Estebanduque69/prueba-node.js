const { Schema, model } = require('mongoose');

const generoSchema = Schema({
    name: { type: String, required: true },
    state: { type: String, required: true, enum: [ 'Active', 'Inactive' ]},
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    descripcion: { type: String }

});

module.exports = model('Genero"', generoSchema);
