const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000

app.use(
  cors({
    origin: 'http://localhost:3000', // Update this with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Add PATCH to the allowed methods
  }),
)
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
    await Dish.updateOne({ id }, { price })
    res.json({ message: 'Price updated successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Add a new route to save updated prices
app.post('/api/save-dishes', async (req, res) => {
  const updatedDishes = req.body // Assuming req.body contains the updated dishes data

  try {
    // Loop through the updated dishes and update their prices
    for (const updatedDish of updatedDishes) {
      const { id, price } = updatedDish
      // Use the Mongoose updateOne method to update the price based on the dish ID
      await Dish.updateOne({ id }, { price })
    }

    res.json({ message: 'Dishes saved successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Reset all prices

app.patch('/api/dishes/resetAll', cors(), async (req, res) => {
  try {
    // Use the aggregate method to set prices to their original values
    await Dish.updateMany({}, [{ $set: { price: '$originalPrice' } }])

    res.json({ message: 'All prices reset successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.put('/api/dishes/reset/:id', async (req, res) => {
  const { id } = req.params

  try {
    // Parse the id as an integer (assuming it's an integer ID)
    const dishId = parseInt(id)

    const dish = await Dish.findOne({ id: dishId })

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
