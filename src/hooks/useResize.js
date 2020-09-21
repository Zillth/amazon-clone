import React, {useEffect, useState} from 'react'
const useResize = (myRef) => {
    const [width, setWidth] = useState(0)

    useEffect(() => {
        setWidth(myRef.current.offsetWidth)
    }, [])

    useEffect(() => {
        const handleResize = () => {
            setWidth(myRef.current.offsetWidth)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [myRef])

    return width
}

export {useResize}