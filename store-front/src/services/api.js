import api from './axios';

export const searchProducts = async (query) => {
    try {
        const { data } = await api.get(`/items?q=${query}`);
        console.log('Data recibida:', data);
        
        // Verificamos que data.results existe y es un array
        if (!data.results || !Array.isArray(data.results)) {
            throw new Error('Formato de respuesta inválido');
        }
        
        // Transformamos los datos antes de devolverlos
        const productos = data.results.map(producto => ({
            id: producto._id,
            nombre: producto.nombre,
            precio: producto.precio,
            categoria: producto.categoria,
            descripcion: producto.descripcion
        }));

        return productos;
    } catch (error) {
        console.error('Error en searchProducts:', error.message);
        return []; // Retornamos array vacío en caso de error
    }
};

export const getProductById = async (id) => {
    try {
        const { data } = await api.get(`/items/${id}`);
        return data.producto;
    } catch (error) {
        console.error('Error obteniendo producto:', error);
        throw error;
    }
};

export const createProduct = async (productData) => {
    try {
        const { data } = await api.post('/create', productData);
        return data;
    } catch (error) {
        console.error('Error creando producto:', error);
        throw error;
    }
};