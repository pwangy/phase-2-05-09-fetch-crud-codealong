const Item = ({ item, onUpdateItem, onDeleteItem }) => {
  const handleDelete = () => {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error ('server?')
        }
        return res.json()
      })
      .then(() => onDeleteItem(item))
      .catch(err => console.error(err.message))
  }

	const handleAddToCart = () => {
		fetch(`http://localhost:4000/items/${item.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				isInCart: !item.isInCart
			})
		})
			.then(res => {
				if (!res.ok) {
					throw new Error('Check server')
				}
				return res.json()
			})
			.then(updatedItem => onUpdateItem(updatedItem))
			.catch(err => console.error(err.message))
	}

	return (
		<li className={item.isInCart ? 'in-cart' : ''}>
			<span>{item.name}</span>
			<span className='category'>{item.category}</span>
			<button
				className={item.isInCart ? 'remove' : 'add'}
				onClick={handleAddToCart}>
				{item.isInCart ? 'Remove From' : 'Add to'} Cart
			</button>
			<button className='remove' onClick={handleDelete}>Delete</button>
		</li>
)}

export default Item