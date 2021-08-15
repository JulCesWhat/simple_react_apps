import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from './services/useFetch';
import Spinner from './Spinner';
import PageNotFound from './PageNotFound'

export default function Details() {
    const { id } = useParams();
    const { data: product, loading, error } = useFetch(`products/${id}`);
    const navigate = useNavigate();

    if (loading) return <Spinner />;
    if (!product) return <PageNotFound />;
    if (error) throw error;

    return (
        <div id="detail">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p id="price">${product.price}</p>
            <p>
                <button className="btn btn-primary" onClick={() => (navigate('/cart'))}>Add to Cart</button>
            </p>
            <img src={`/images/${product.image}`} />
        </div>
    );
}