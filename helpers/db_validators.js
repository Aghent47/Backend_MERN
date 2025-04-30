import { Producto} from '../models/index.js';

export const existeProductoById = async (id) => {
    // verificar si el id existe
    const existeById = await Producto.findById(id);
    if(!existeById){
        throw new Error(`El id ${id} del producto no existe!!`);
    }
}
