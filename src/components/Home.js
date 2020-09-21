import React from 'react'
import './Home.css'
import ProductsRow from './ProductsRow'
import {ps4Games, xboxGames, switchGames} from '../products.json'
import Advice from './Advice'
export default function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img className="home__image" src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_45M_v2_1x._CB432458380_.jpg" alt="amazon-start" />
                <Advice />
                <ProductsRow products={ps4Games} />
                <ProductsRow products={xboxGames} />
                <ProductsRow products={switchGames} />
            </div>
        </div>
    )
}