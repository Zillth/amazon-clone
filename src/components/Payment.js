import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import { Link, useHistory } from 'react-router-dom'
import { useStateValue } from '../StateProvider'
import './Payment.css'
import ProductInBasket from './ProductInBasket'
import { getBasketTotal } from '../Reducer'
import axios from '../axios'
import { db } from '../firebase'
import { formatItems } from '../formtaItems'
import Advice from './Advice'

export default function Payment() {
    const history = useHistory()
    const [{ basket, user }, dispatch] = useStateValue()
    if (!user) {
        history.push('/login')
    }

    const items = formatItems(basket).map((item, index) => (
        <ProductInBasket
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl}
            imageAlt={item.imageAlt}
            price={item.price}
            rating={item.rating}
            qty={item.qty}
            key={index}
        />
    ))

    const stripe = useStripe()
    const elements = useElements()
    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [succeeded, setSucceeded] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [clientSecret, setClientSecret] = useState(true)

    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payment/create?total=${getBasketTotal(basket) * 100}`
            })
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret()
    }, [basket])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true)
        await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            db.collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                })

            setSucceeded(true)
            setError(null)
            setProcessing(false)
            dispatch({
                type: 'EMPTY_BASKET'
            })
            history.replace('/orders')
        })
    }

    const handleChange = e => {
        setDisabled(e.empty)
        setError(e.error ? e.error.message : "")
    }
    return (
        <div>
            <Advice />
            <div className='payment'>
                <div className="payment__container">
                    <h1>
                        Checkout
                    (<Link to='/checkout'>
                            {basket?.length} items
                    </Link>)
                </h1>
                    <div className="payment__section">
                        <div className="payment__title">
                            <h3>Delivery Address</h3>
                        </div>
                        <div className="payment__address">
                            <p>{user?.email}</p>
                            <p>123 react lane</p>
                            <p>Los Angeles, CA</p>
                        </div>
                    </div>
                    <div className="payment__section">
                        <div className="payment__title">
                            <h3>Review items and delivery</h3>
                        </div>
                        <div className="payment__items">
                            {items}
                        </div>
                    </div>
                    <p className="payment__advice">
                        For security reasons you must NOT introduce your credit card number, just introduce 42 repeatedly until fully the camps
                    </p>
                    <div className="payment__section">
                        <div className="payment__title">
                            <h3>Payment Method</h3>
                        </div>
                        <div className="payment__details">
                            <form onSubmit={handleSubmit}>
                                <CardElement onChange={handleChange} />
                                <div className="payment__price">
                                    <CurrencyFormat
                                        renderText={(value) => {
                                            return <>
                                                <p>
                                                    Subtotal ({basket?.length} items) :
                                                <strong>{` ${value}`}</strong>
                                                </p>
                                            </>
                                        }}
                                        decimalScale={2}
                                        value={getBasketTotal(basket)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$"}
                                    />
                                    <button disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                    </button>
                                </div>
                                {error && <div>{error}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
