import React, { useEffect, useReducer, useContext } from 'react';
import cartReducer from './cartReducer';

const CartContext = React.createContext();

let initialCart;
try {
    initialCart = JSON.parse(localStorage.getItem('cart')) ?? [];
} catch (e) {
    initialCart = [];
}

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, initialCart);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {
                children
            }
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider. Wrap a parent component in <CartProvider> to fix error');
    }
    return context;
}