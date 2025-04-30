import { useState } from 'react';

export function ProductDetail() {
    const [product] = useState(null);

    return (
        <div className="container">
            {product ? (
                <div className="product-detail">
                    <h2>{product.nombre}</h2>
                    <p>{product.descripcion}</p>
                    <p>Precio: ${product.precio}</p>
                    <p>Categoría: {product.categoria}</p>
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    )
}