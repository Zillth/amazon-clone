import React, { useState } from 'react'
import './Login.css'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../firebase'
import Advice from './Advice';

export default function Login() {
    const history = useHistory();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function logIn(e) {
        e.preventDefault()
        const user = await auth.signInWithEmailAndPassword(email, password).catch(err => alert(err.message))
        if (user) {
            history.push('/')
        }
    }

    async function register(e) {
        const user = await auth.createUserWithEmailAndPassword(email, password).catch(error => alert(error.message))
        //console.log(user)
        if (user) {
            history.push('/')
        }
    }

    return (
        <div className="login">
            <Link to="/">
                <img className="login__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" alt="amazon logo" />
            </Link>
            <div className="login__container">
                <Advice />
                <h1>Sign-in</h1>
                <form action="">
                    <h5>E-mail</h5>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} name="email" id="emaiLID" />
                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} name="password" id="passwordID" />
                    <button type="submit" onClick={logIn} className="login__loginButton">Sign In</button>
                </form>
                <p>
                    By signin-in you agree to Amazon's fake clone Condition of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>
                <button onClick={register} className="login__registerButton">Create your Amazon Account</button>
            </div>
        </div>
    )
}
