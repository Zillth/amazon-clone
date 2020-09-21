import React, { useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Checkout from './components/Checkout'
import Login from './components/Login'
import { auth } from './firebase'
import { useStateValue } from './StateProvider'
import Payment from './components/Payment'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Orders from './components/Orders'
import Footer from './components/Footer'

const promise = loadStripe('pk_test_51HRMG0Apj6MIxY7Y0KyRw3Oktck5Q25WsP51vVGWJBch02njtxfLRkWZE4bjq4qG8eEUscJVzNSoYwQ18AdkPX7k00Y2DiN409')

function App() {
  const [, dispatch] = useStateValue()
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/signIn">
            <h1>sigIn</h1>
          </Route>
          <Route path="/logIn">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
            <Footer />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
            <Footer />
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
            <Footer />
          </Route>
          <Route path="/">
            <Header />
            <Home />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
