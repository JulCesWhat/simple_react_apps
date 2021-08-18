import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Fetch } from './services/useFetch';
import Spinner from './Spinner';
import PageNotFound from './PageNotFound';
import { CartContext } from './CartContext';

export default function DetailsWrapper() {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <Details id={id} navigate={navigate} />
    );
}

class Details extends React.Component {

    state = {
        sku: ''
    }

    render() {
        // fetchResponse: { data: product, loading, error },
        const { id, addToCart, navigate } = this.props;
        const { sku } = this.state;

        return (
            <CartContext.Consumer>
                {
                    ({ dispatch: addToCart }) => {
                        return (
                            <Fetch url={`products/${id}`}>
                                {
                                    (product, loading, error) => {
                                        if (loading) return <Spinner />;
                                        if (!product) return <PageNotFound />;
                                        if (error) throw error;
                                        return (
                                            <div id="detail">
                                                <h1>{product.name}</h1>
                                                <p>{product.description}</p>
                                                <p id="price">${product.price}</p>
                                                <select
                                                    id="size"
                                                    value={sku}
                                                    onChange={(e) => (this.setState({ sku: e.target.value }))}>
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
                                }
                            </Fetch>
                        );
                    }
                }
            </CartContext.Consumer>
        );
    }
}