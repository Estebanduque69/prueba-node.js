const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const meediaSchema = new Schema({
  serial: { type: String, required: true, unique: true },
  titulo: { type: String, required: true },
  sinopsis: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  imagen: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now },
  anioEstreno: { type: Number, required: true },
  genero: { type: mongoose.Schema.Types.ObjectId, ref: "Genero", required: true },
  director: { type: mongoose.Schema.Types.ObjectId, ref: "Director", required: true },
  productora: { type: mongoose.Schema.Types.ObjectId, ref: "Productora", required: true },
  tipo: { type: mongoose.Schema.Types.ObjectId, ref: "Tipo", required: true }
});

module.exports = model('Meedia', meediaSchema);
