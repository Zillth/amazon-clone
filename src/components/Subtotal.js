import React from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from '../StateProvider'
import { getBasketTotal } from '../Reducer'
import { useHistory } from 'react-router-dom'

function Subtotal() {
    const history = useHistory()
    const [{ basket }] = useStateValue()
    let subtotal = 0;
    basket.map((item) => {
        return subtotal += item.price
    })

    return (
        <div className='subtotal'>
            <CurrencyFormat
                renderText={(value) => {
                    return <>
                        <p>
                            Subtotal ({basket?.length} items) :
                            <strong>{` ${value}`}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" name="gift" id="check_gift" />
                            This order contains a gift
                        </small>
                    </>
                }}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
            <button onClick={e => history.push('/payment')}>Proceed to checkout</button>
        </div>
    )
}

export default Subtotal