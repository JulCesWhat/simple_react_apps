import React from "react";
import useFetchAll from "./services/useFetchAll";
import Spinner from "./Spinner";
import { useNavigate } from 'react-router-dom';

export default function Cart({ cart, updateQuantity }) {
    const navigate = useNavigate();
    const urls = cart.map((i) => `products/${i.id}`);
    const { data: products, loading, error } = useFetchAll(urls);

    function renderItem({ id, sku, quantity }) {
        const { price, name, image, skus } = products.find(
            (p) => p.id === parseInt(id)
        );
        const { size } = skus.find((s) => s.sku === sku);

        return (
            <li key={sku} className="cart-item">
                <img src={`/images/${image}`} alt={name} />
                <div>
                    <h3>{name}</h3>
                    <p>${price}</p>
                    <p>Size: {size}</p>
                    <p>
                        <select
                            aria-label={`Select quantity for ${name} size ${size}`}
                            onChange={(e) => updateQuantity({ type: 'updateQuantity', sku, quantity: parseInt(e.target.value) })}
                            value={quantity} >
                            <option value="0">Remove</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </p>
                </div>
            </li>
        );
    }

    if (loading) return <Spinner />;
    if (error) throw error;

    const itemsInCart = cart.reduce((total, i) => (total + i.quantity), 0);

    return (
        <section id="cart">
            <h1>
                {
                    itemsInCart
                        ? `${itemsInCart} Item${itemsInCart > 1 ? 's' : ''} in my Cart`
                        : "Your cart is empty!"
                }
            </h1>
            <ul>{cart.map(renderItem)}</ul>
            {
                itemsInCart && <button className="btn btn-primary" onClick={() => (navigate('/checkout'))}>Checkout</button>
            }
        </section>
    );
}
