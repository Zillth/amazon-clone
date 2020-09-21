import React from 'react'
import './Header.css'
import { Search, ShoppingBasket } from '@material-ui/icons'
import { Link, useHistory } from 'react-router-dom'
import { useStateValue } from '../StateProvider'
import { auth } from '../firebase'

export default function Header() {
  const [{ basket, user }] = useStateValue()
  const history = useHistory();

  function handleAuthentification() {
    if (user) {
      auth.signOut()
    } else {
      history.push('/logIn')
    }
  }


  return (
    <div className="header">
      <Link to='/'>
        <div className="logo__container">
          <img src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon-logo" className="header__logo" />
        </div>
      </Link>
      <div className="header__search">
        <input type="text" className="header__searchInput" />
        <Search className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <div className="header__option clickable" onClick={handleAuthentification}>
          <span className="header__option-first">Hello {user ? 'User' : 'Guest'}</span>
          <span className="header__option-two">{user ? 'Sign Out' : 'Sign In'}</span>
        </div>
        <Link to='/orders'>
          <div className="header__option">
            <span className="header__option-first">Returns</span>
            <span className="header__option-two">& Orders</span>
          </div>
        </Link>
        <div className="header__option">
          <span className="header__option-first">Your</span>
          <span className="header__option-two">Prime</span>
        </div>
        <Link to='/checkout'>
          <div className="header__option__basket">
            <ShoppingBasket />
            <span className="header__option-two header__basketCount">{basket?.length}</span>
          </div>
        </Link>
      </div>
    </div>
  )
}