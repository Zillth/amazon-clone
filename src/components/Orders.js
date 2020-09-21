import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import { useStateValue } from '../StateProvider'
import './Orders.css'
import Order from './Order'
import Advice from './Advice'

export default function Orders() {
    const [orders, setOrders] = useState([])
    const [{ user }] = useStateValue()

    useEffect(() => {
        if (user) {
            db.collection('users')
                .doc(user?.uid)
                .collection('orders')
                .orderBy('created', 'desc')
                .onSnapshot(snapshot => {
                    setOrders(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
        } else {
            setOrders([])
        }

    }, [user])

    const orderItems = orders?.map(order => (
        <Order order={order} />
    ))

    return (
        <div className='orders'>
            <h1>Your orders</h1>
            <Advice />
            <div className="orders__order">
                {orderItems}
            </div>
        </div>
    )
}
