import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import './ProductDetail.css';

export function ProductDetail() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (error) {
                console.error('Error al obtener el producto:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div className="container">Cargando...</div>;
    }

    if (!product) {
        return <div className="container">Producto no encontrado</div>;
    }

    return (
        <div className="product-detail-page">
            <div className="product-detail-container">
                <div className="product-images">
                    {product.imagenes ? (
                        <div className="images-gallery">
                            <img 
                                src={product.imagen} 
                                alt={product.nombre}
                                className="main-image" 
                            />
                            <div className="thumbnail-container">
                                {product.imagenes.map((img, index) => (
                                    <img 
                                        key={index}
                                        src={img}
                                        alt={`${product.nombre} - ${index + 1}`}
                                        className="thumbnail"
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="no-image-placeholder">
                            <span>Sin imágenes disponibles</span>
                        </div>
                    )}
                </div>

                <div className="product-info">
                    <h1 className="product-title">{product.nombre}</h1>
                    
                    <div className="product-meta">
                        <span className="product-brand">
                            Marca: {product.marca || 'No especificada'}
                        </span>
                        <span className="product-category">
                            Categoría: {product.categoria}
                        </span>
                    </div>

                    <div className="product-price-container">
                        <span className="product-price">${product.precio}</span>
                        <span className="stock-status">
                            {product.stock > 0 ? (
                                <span className="in-stock">
                                    En stock ({product.stock} unidades)
                                </span>
                            ) : (
                                <span className="out-of-stock">
                                    Agotado
                                </span>
                            )}
                        </span>
                    </div>

                    <div className="product-description">
                        <h2>Descripción</h2>
                        <p>{product.descripcion}</p>
                    </div>

                    {product.especificaciones && (
                        <div className="product-specs">
                            <h2>Especificaciones</h2>
                            <ul>
                                {Object.entries(product.especificaciones).map(([key, value]) => (
                                    <li key={key}>
                                        <strong>{key}:</strong> {value}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <button 
                        className="buy-button"
                        onClick={() => alert('Funcionalidad de compra no implementada')}
                        disabled={product.stock === 0}
                    >
                        {product.stock > 0 ? 'Comprar Ahora' : 'Producto Agotado'}
                    </button>
                </div>
            </div>
        </div>
    );
}