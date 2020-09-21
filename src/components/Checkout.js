import React from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'
import { useStateValue } from '../StateProvider'
import ProductInBasket from './ProductInBasket'
import {formatItems} from '../formtaItems'
import Advice from './Advice'

function Checkout() {
    const [{ basket, user }] = useStateValue()

    const items = formatItems(basket).map((item, index) => (
        <ProductInBasket key={index} id={item.id} title={item.title} imageUrl={item.imageUrl} imageAlt={item.imageAlt} price={item.price} rating={item.rating} qty={item.qty}/>
    ))
    
    return (
        <div className='checkout'>
            <div className="checkout__left">
                <img src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="ad" className="checkout__ad" />
                <div>
                    <h3>Hello, {user? user.email : 'Guest'}</h3>
                    <Advice />
                    <h2 className="checkout__title">
                       Your Shopping Basket
                    </h2>
                    {items}
                </div>
            </div>
            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout
