# Title :- DishList Web Application

## Introduction

The DishList web application allows users to manage and display a list of dishes. Users can update dish prices, save changes, and reset prices to their original values. This README provides information on setting up and using the application.

## Getting Started

These instructions will help you get the project up and running on your local machine.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- MongoDB server running locally or accessible
- API server (backend)

1. Clone the repository:

   ```bash
   git clone https://github.com/arungupta7221/MERN-Assignment.git

   1. Install dependencies for the frontend:
      cd client
      npm install

   2. Install dependencies for the backend:
       cd server
       npm install

   3.  Start the backend server:
       npm start

   4.  Start the frontend development server:
       npm start
   ```

## Usage

The DishList application allows you to:

1. View a list of dishes.
2. Update dish prices by entering new values in the Price column.
3. Save changes to the server by clicking the "Save" button.
4. Reset prices to their original values by clicking the "Reset" button.

## API Routes

The application communicates with a server using the following API routes:

1. `GET /api/dishes`: Retrieve the list of dishes.
2. `PUT /api/dishes/:id`: Update the price of a specific dish by ID.
3. `POST /api/save-dishes` : Save updated dish data to the server.
4. `PATCH /api/dishes/resetAll` : Reset all dish prices to their original values.
