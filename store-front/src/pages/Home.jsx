import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchProducts } from '../services/api';

export function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setLoading(true);
            try {
                await searchProducts(searchQuery);
                navigate(`/items?q=${searchQuery}`);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="container">
            <h1 className="text-center text-3xl font-bold mb-8">Buscador de Productos</h1>
            <form onSubmit={handleSubmit} className="search-container">
                <div className="search-bar">
                    <input 
                        type="text" 
                        placeholder="Buscar productos..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        disabled={loading}
                    />
                    <button 
                        type="submit" 
                        disabled={loading}
                    >
                        {loading ? 'Buscando...' : 'Buscar'}
                    </button>
                </div>
            </form>
        </div>
    );
}