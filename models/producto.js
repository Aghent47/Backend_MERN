import { Schema, model } from 'mongoose';

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true,
    },
    estado: {
        type: Boolean,
        default: true,
        required: true,
    },
    precio: {
        type: Number, 
        default: 0,
    },
    categoria: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
    },
    disponible: {
        type: Boolean,
        default: true,
    },

});

ProductoSchema.methods.toJSON = function() {
    const {__v, estado, ...data } = this.toObject();
    return data;
}
export const Producto = model('Producto', ProductoSchema);