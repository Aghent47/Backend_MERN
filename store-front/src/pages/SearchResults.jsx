import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchProducts } from '../services/api';
import './SearchResults.css';

export function SearchResults() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState({});
    const location = useLocation();

    // Agrupar productos por categoría
    const groupByCategory = (productos) => {
        return productos.reduce((acc, product) => {
            const category = product.categoria;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(product);
            return acc;
        }, {});
    };

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const query = new URLSearchParams(location.search).get('q') || '';
                const productos = await searchProducts(query);
                setProducts(productos);
                setCategories(groupByCategory(productos));
            } catch (error) {
                console.error('Error al buscar productos:', error);
                setProducts([]);
                setCategories({});
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [location.search]);

    if (loading) {
        return <div className="container">Cargando...</div>;
    }

    return (
        <div className="search-page">
            <div className="container-center">
                {/* Header de búsqueda */}
                <div className="search-header">
                    <h2 className="search-title text-center">
                        {products.length} resultados encontrados
                    </h2>
                    <div className="category-tags">
                        {Object.entries(categories).map(([category, items]) => (
                            <span key={category} className="category-tag">
                                {category} ({items.length})
                            </span>
                        ))}
                    </div>
                </div>

                {/* Contenedor de productos */}
                <div className="products-container">
                    {products.map(product => (
                        <div key={product.id} className="product-card">
                            <div className="product-image">
                                {product.imagen ? (
                                    <img 
                                        src={product.imagen} 
                                        alt={product.nombre}
                                    />
                                ) : (
                                    <div className="image-placeholder">
                                        <span>Sin imagen</span>
                                    </div>
                                )}
                            </div>
                            <div className="product-content">
                                <h3 className="product-name">{product.nombre}</h3>
                                <p className="product-description">{product.descripcion}</p>
                                <div className="product-details">
                                    <span className="product-price">${product.precio}</span>
                                    <span className="product-category">{product.categoria}</span>
                                </div>
                                {product.puntuacion && (
                                    <div className="rating">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className={`star ${i < Math.round(product.puntuacion) ? 'active' : ''}`}>
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}