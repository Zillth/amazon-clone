const formatItems = (basket) => {
    const toReturn = []
    basket.map((item, index) => {
        let isInToReturn = toReturn.findIndex(element => element.id == item.id) != -1
        if(!isInToReturn) {
            let qty = basket.filter(element => element.id == item.id).length
            toReturn.push({...item, qty})
        }
    }) 
    return toReturn
}
export {formatItems}