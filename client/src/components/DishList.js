import React, { useEffect, useState } from 'react'
import axios from './axios'
import DishTable from './DishTable'

const DishList = () => {
  const [data, setData] = useState([])
  const [originalData, setOriginalData] = useState([])

  useEffect(() => {
    // Fetch data from your API and store it in both data and originalData
    axios.get('/api/dishes').then((response) => {
      setData(response.data)
      setOriginalData(response.data)
      console.log('Received data:', response.data)
    })
  }, [])

  const updatePrice = (id, newPrice) => {
    // Update the price in the data state
    const updatedData = data?.map((dish) =>
      dish.id === id ? { ...dish, price: parseFloat(newPrice) } : dish,
    )
    setData(updatedData)

    // No need to send the updated price to the server immediately
  }

  const handleSave = () => {
    // Send the updated data to the server for saving
    axios.post('/api/save-dishes', data).then((response) => {
      console.log('Data saved successfully', response.data)
    })
  }

  const handleResetAll = () => {
    // Send a PATCH request to reset all prices on the server
    fetch('/api/dishes/resetAll', {
      method: 'PATCH',
      credentials: 'include', // Include credentials to handle cookies (if needed)
    })
      .then((response) => {
        if (response.ok) {
          return response.json() // Assuming the response contains JSON data
        } else {
          throw new Error('Network response was not ok')
        }
      })
      .then((data) => {
        console.log('All prices reset successfully', data)
        // Reset the state to its original data (originalData)
        setOriginalData(data)
        // You can also update the current data state if needed
        setData(data)
      })
      .catch((error) => {
        console.error('An error occurred:', error)
      })
  }

  return (
    <div>
      <h1>Dish List</h1>
      {data.length > 0 && <DishTable data={data} updatePrice={updatePrice} />}
      <button onClick={handleSave}>Save</button>
      <button onClick={handleResetAll}>Reset</button>
    </div>
  )
}

export default DishList
