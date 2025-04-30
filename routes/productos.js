import { Router,} from "express";
import { crearProducto, getProductoById, getProductos, searchProducts } from "../controllers/productos.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/index.js";
import { existeProductoById } from "../helpers/db_validators.js";

const router = Router();

// Crear una nueva producto - privado - cualquier persona con un token valido
router.post('/create',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
], crearProducto );

// search products
router.get('/items', searchProducts);

// Obtener una Producto por id - path publico
router.get('/items/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id',).custom(existeProductoById),
    validarCampos

], getProductoById );


export default router;