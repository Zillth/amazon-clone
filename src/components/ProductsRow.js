import React, { useEffect, useRef, useState } from 'react'
import './ProductsRow.css'
import Product from './Product'
import { ArrowLeft, ArrowRight } from '@material-ui/icons'
import { useResize } from '../hooks/useResize'
export default function ProductsRow({ products }) {
    const ref = useRef()
    const width = useResize(ref)
    const [first_lastIndex, setFirst_lastIndex] = useState([0, 5])
    const items = []
    for (let index = first_lastIndex[0]; index < first_lastIndex[1]; index++) {
        if (products[index]) {
            items.push(<Product data={products[index]} key={index}/>)
        }
    }

    useEffect(() => {
        setFirst_lastIndex([0, Math.trunc(width / 220)])
    }, [width])

    const handleNext = () => {
        if (first_lastIndex[0] != 0) {
            setFirst_lastIndex([first_lastIndex[0] - 1, first_lastIndex[1] - 1])
        }
    }

    const handlePrev = () => {
        if (first_lastIndex[1] < products.length) {
            setFirst_lastIndex([first_lastIndex[0] + 1, first_lastIndex[1] + 1])
        }
    }

    return (
        <div className="product__row" ref={ref}>
            <ArrowLeft className="product__arrow icon-left" onClick={handleNext} />
            {items}
            <ArrowRight className="product__arrow icon-rigth" onClick={handlePrev} />
        </div>
    )
}