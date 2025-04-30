import { response } from "express";
import { Types } from "mongoose";
import { User, Categoria, Producto } from "../models/index.js";

const { ObjectId } = Types;

const buscarProductos =  async (termino = '' , res = response) => {

    const esMongoId = ObjectId.isValid(termino); // si es un id de mongo retorna true

    if (esMongoId) {
        const producto = await Producto.findById(termino).populate('nombre')
        return res.json({
            results: (producto) ? [producto] : []
        })
    }

    const regex = new RegExp(termino, 'i');

    const productos = await Producto.find({ 
        $or: [{ nombre: regex }, {descrpcion: regex}],
        $and: [{ estado: true }]
     }).populate('nombre')

    res.json({
        results: productos
    })
}



export const buscar = (req, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionPermitidas}`
        })
    }

    switch (coleccion) {
        case 'users':
            buscarUsuarios(termino, res);
            break;

        case 'categorias':
            buscarCategorias(termino, res);
            break;

        case 'productos':

            buscarProductos(termino, res);

            break;

        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            })
            break;

    }

}