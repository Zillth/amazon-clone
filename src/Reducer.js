export const initialState = {
    basket: [],
    user: null
}

export const getBasketTotal = (basket) => basket?.reduce((amount, item) => item.price + amount, 0)

const reducer = (state, action) => {
    let newBasket, indexOfItem
    switch (action.type) {
        case 'ADD_TO_BASKET':
            newBasket = [...state.basket]
            indexOfItem = state.basket.findIndex((item) => (
                item.id == action.item.id
            ))
            return {
                ...state,
                basket: [...newBasket, action.item]
            }
        case 'REMOVE_FROM_BASKET':
            newBasket = [...state.basket]
            indexOfItem = state.basket.findIndex((item) => (
                item.id == action.item.id
            ))
            if (indexOfItem >= 0) {
                newBasket.splice(indexOfItem, 1)
            } else {
                console.warn(`Cant remove product ${action.item.id} as not is in basket!`)
            }
            return {
                ...state,
                basket: [...newBasket]
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: []
            }
        default:
            return state
    }
}
export default reducer