import { useState } from 'react';

export function CreateProduct() {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        categoria: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implementar lógica de creación
    }

    return (
        <div className="container">
            <h2>Crear Nuevo Producto</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                    />
                </div>
                <div>
                    <label>Precio:</label>
                    <input
                        type="number"
                        name="precio"
                        value={formData.precio}
                        onChange={(e) => setFormData({...formData, precio: e.target.value})}
                    />
                </div>
                <button type="submit">Crear Producto</button>
            </form>
        </div>
    )
}