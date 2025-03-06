const { Schema, model } = require('mongoose');

const productoraSchema = Schema({
    name: { type: String, required: true },
    state: { type: String, required: true, enum: [ 'Active', 'Inactive' ]},
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    slogan: { type: String },
   descripcion: { type: String }
});

module.exports = model('Productora', productoraSchema);

