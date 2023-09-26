const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(bodyParser.json())

// MongoDB connection
mongoose.connect('mongodb://0.0.0.0:27017/Table_DB_Dev', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
  console.log('Connected to MongoDB')
})

// Define your MongoDB schema and model here

const dishSchema = new mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  category: String,
  label: String,
  price: Number,
  description: String,
  originalPrice: Number,
})

const Dish = mongoose.model('Dish', dishSchema)

// // Define API routes for fetching, updating, and resetting data

// Get all dishes
app.get('/api/dishes', async (req, res) => {
  try {
    const dishes = await Dish.find()
    res.json(dishes)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update price by ID
app.put('/api/dishes/:id', async (req, res) => {
  const { id } = req.params
  const { price } = req.body

  try {
    await Data.updateOne({ id }, { price })
    res.json({ message: 'Price updated successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Reset price by ID
app.put('/api/dishes/reset/:id', async (req, res) => {
  const { id } = req.params

  try {
    const dish = await Dish.findOne({ id })

    if (!dish) {
      res.status(404).json({ error: 'Dish not found' })
      return
    }

    // Reset the price to the original value
    dish.price = dish.originalPrice

    await dish.save()
    res.json({ message: 'Price reset successfully', dish })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
