const mongoose = require('mongoose');

const tipoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    descripcion: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tipo', tipoSchema);

