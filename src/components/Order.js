import React from 'react'
import './Order.css'
import moment from 'moment'
import ProductInBasket from './ProductInBasket'
import CurrencyFormat from 'react-currency-format'
import {formatItems} from '../formtaItems'

export default function Order({ order }) {
    const orders = formatItems(order.data.basket)?.map(item => (
        <ProductInBasket
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            imageAlt={item.imageAlt}
            price={item.price}
            rating={item.rating}
            hiddeButton
            qty={item.qty}
        />
    ))

    return (
        <div className='order'>
            <h2>Order</h2>
            <p>{moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}</p>
            <p className="order__id">
                <small>{order.id}</small>
            </p>
            {orders}
            <CurrencyFormat
                renderText={(value) => (
                    <h3 className='order__total'>Order Total: {value}</h3>
                )}
                decimalScale={2}
                value={order.data.amount / 100}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
        </div>
    )
}
