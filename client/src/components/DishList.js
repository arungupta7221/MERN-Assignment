// src/components/DishList.js
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DishTable from './DishTable'

const DishList = () => {
  const [data, setData] = useState([])
  const [originalData, setOriginalData] = useState([])

  // Set the base URL for Axios
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000', // Update this URL to match your backend's address
  })

  useEffect(() => {
    // Fetch data from your API and store it in both data and originalData
    axiosInstance.get('/api/dishes').then((response) => {
      setData(response.data)
      setOriginalData(response.data)
    })
  }, [])

  const updatePrice = (id, newPrice) => {
    // Update the price in the data state
    const updatedData = data.map((dish) =>
      dish.id === id ? { ...dish, price: parseFloat(newPrice) } : dish,
    )
    setData(updatedData)

    // Send the updated price to the server
    axiosInstance.put(`/api/dishes/${id}`, { price: parseFloat(newPrice) }).then((response) => {
      console.log('Price updated successfully', response.data)
    })
  }

  const handleSave = () => {
    // Send the updated data to the server for saving
    axiosInstance.post('/api/save-dishes', data).then((response) => {
      console.log('Data saved successfully', response.data)
    })
  }

  const handleReset = (id) => {
    // Reset the data to the originalData
    setData(originalData)

    // Send a request to reset the price on the server
    axiosInstance.put(`/api/dishes/reset/${id}`).then((response) => {
      console.log('Price reset successfully', response.data)
    })
  }

  return (
    <div>
      <h1>Dish List</h1>
      <DishTable data={data} updatePrice={updatePrice} />
      <button onClick={handleSave}>Save</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}

export default DishList
