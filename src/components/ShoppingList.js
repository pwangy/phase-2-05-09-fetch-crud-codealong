import { useState, useEffect } from 'react'
import ItemForm from './ItemForm'
import Filter from './Filter'
import Item from './Item'

const ShoppingList = () => {
	const [selectedCategory, setSelectedCategory] = useState('All')
	const [items, setItems] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/items')
      .then(res => {
        if (!res.ok) {
          throw new Error ('Start server')
        }
        return res.json()
      })
      .then(i => setItems(i))
      .catch(err => console.error(err.message))
  }, [])

  const handleDeleteItem = deletedItem => {
    const updatedItems = items.filter(i => i.id !== deletedItem.id)
    setItems(updatedItems)
  }

  const handleUpdateItem = updatedItem => {
    const updatedItems = items.map(i => {
      if (i.id === updatedItem.id) {
        return updatedItem
      } else {
        return i
      }
    })
    setItems(updatedItems)
  }

  const handleAddItem = newItem => {
    setItems([...items, newItem])
  }

	function handleCategoryChange(category) {
		setSelectedCategory(category)
	}

	const itemsToDisplay = items.filter(i => {
		if (selectedCategory === 'All') return true

		return i.category === selectedCategory
	})

	return (
		<div className='ShoppingList'>
			<ItemForm onAddItem={handleAddItem} />
			<Filter 
        category={selectedCategory} 
        onCategoryChange={handleCategoryChange} 
      />
			<ul className='Items'>
				{itemsToDisplay.map(i => (
					<Item key={i.id} item={i} onUpdateItem={handleUpdateItem} onDeleteItem={handleDeleteItem} />
				))}
			</ul>
		</div>
)}

export default ShoppingList