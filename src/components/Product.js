import React from 'react'
import './Product.css'
import { Star } from '@material-ui/icons'
import { useStateValue } from '../StateProvider'

export default function Product({ data }) {
    const [, dispatch] = useStateValue()
    function handleAddToBasket() {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: data?.id,
                title: data?.title,
                imageUrl: data?.imageUrl,
                imageAlt: data?.imageAlt,
                price: data?.price,
                rating: data?.rating
            }
        })
    }

    return (
        <div className="product">
            <div className="product__header">
                <img src={data?.imageUrl} alt={data?.imageAlt} />
                <button onClick={handleAddToBasket}>Add to basket</button>
            </div>
            <div className="product__info">
                <p className="product__price">
                    <small>$</small>
                    <strong>{data?.price}</strong>
                </p>
                <p>{data?.title}</p>
                <div className="product__rating">
                    {Array(data?.rating).fill().map((value, index) => {
                        return <Star key={index}/>
                    })}
                </div>
            </div>
        </div>
    )
}
