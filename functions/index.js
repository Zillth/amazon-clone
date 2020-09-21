const functions = require('firebase-functions');
const express = require('express')
const cors = require('cors');
const stripe = require('stripe')('sk_test_51HRMG0Apj6MIxY7YwbnwreYdX4CSqD4Mxinnie7OuRAjUclfQPEJlMfkWLfjgxKb0uurAjUeLlQkPoZgd19HTlt000YnPEXnLb')

// API

// APP CONFIG
const app = express()

// MIDDLEWARES
app.use(cors({origin: true}))
app.use(express.json())

// API ROUTES
app.get('/', (req, res) => {
    res.status(200).send('Hello world')
})

app.post('/payment/create', async (req, res) => {
     const total = req.query.total
     const paymentIntent = await stripe.paymentIntents.create({
         amount: total,
         currency: 'usd'
     })
     res.status(201).send({
         clientSecret: paymentIntent.client_secret
     })
})
// LISTEN COMMAND
exports.api = functions.https.onRequest(app)

// END POINT http://localhost:5001/clone-c6383/us-central1/api
