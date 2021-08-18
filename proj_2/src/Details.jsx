import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from './services/useFetch';
import Spinner from './Spinner';
import PageNotFound from './PageNotFound'

export default function Details({ addToCart }) {
    const { id } = useParams();
    const { data: product, loading, error } = useFetch(`products/${id}`);
    const navigate = useNavigate();
    const [sku, setSku] = useState('');

    if (loading) return <Spinner />;
    if (!product) return <PageNotFound />;
    if (error) throw error;

    return (
        <div id="detail">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p id="price">${product.price}</p>
            <select id="size" value={sku} onChange={(e) => (setSku(e.target.value))}>
                <option value="">All sizes</option>
                {
                    product.skus.map((s) => (
                        <option key={s.sku} value={s.sku}>{s.size}</option>
                    ))
                }
            </select>
            <p>
                <button disabled={!sku} className="btn btn-primary" onClick={() => {
                    addToCart({ type: 'add', id, sku })
                    navigate('/cart');
                }}>Add to Cart</button>
            </p>
            <img src={`/images/${product.image}`} />
        </div>
    );
}