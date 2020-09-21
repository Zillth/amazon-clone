import React from 'react'
import './ProductInBasket.css'
import { Star } from '@material-ui/icons'
import { useStateValue } from '../StateProvider'

export default function ProductInBasket({ id, title, price, imageUrl, imageAlt, rating, hiddeButton, qty }) {
    const [, dispatch] = useStateValue();
    function handleRemoveFromBasket() {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            item: { id, title, price, imageUrl, imageAlt, rating, hiddeButton }
        })
    }

    return (
        <div className='checkoutProduct'>
            <img src={imageUrl} alt={imageAlt} className="checkoutProduct__image" />
            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>
                <p>Qty: {qty}</p>
                <p className="checkoutProduct__price"><small>$ </small> <strong>{price}</strong></p>
                <div className="checkoutProduct__rating">
                    {Array(rating).fill().map((value, index) => {
                        return <Star key={index} />
                    })}
                </div>
                {!hiddeButton && (
                    <button onClick={handleRemoveFromBasket}>Remove from basket</button>
                )}
            </div>

        </div>
    )
}
