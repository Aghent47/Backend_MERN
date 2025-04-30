import { request, response } from "express";
import { Producto } from "../models/index.js";

export const crearProducto = async (req, res = response) => {

    const { ...resto } = req.body;

    const productoDB = await Producto.findOne({ nombre: resto.nombre });

    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe!!`
        });
    }

    // Generar la data a guardar
    const data = {
        ...resto, // vienes todas las demas propiedades del objeto
        nombre: resto.nombre.toUpperCase(),
    }

    const producto = new Producto(data);
    //guardar en BD
    await producto.save();

    res.status(201).json(producto);

}
export const searchProducts = async (req = request, res = response) => {
    try {
        const { q = '' } = req.query;
        const regex = new RegExp(q, 'i');
        const productos = await Producto.find({
            $or: [
                { nombre: regex },
                { descripcion: regex }
            ],
            estado: true
        });

        res.json({
            results: productos
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
}

export const getProductos = async (req = request, res = response) => {
    const { limit = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [productos, total] = await Promise.all([
        Producto.find(query)
            .skip(Number(desde))
            .limit(Number(limit)),
        Producto.countDocuments({ estado: true })
    ]);

    res.json({
        msg: 'get API - categorias',
        total,
        productos

    });
}

export const getProductoById = async (req = request, res = response) => {

    const { id } = req.params;
    const producto = await Producto.findById(id).populate('categoria', 'name').populate('usuario', 'nombre');

    res.json({
        producto
    });
}
