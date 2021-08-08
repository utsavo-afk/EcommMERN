# EcommMERN

Is a fullstack MERN application built to do e-commerce. View the live demo [here](https://limitless-falls-34804.herokuapp.com/)

## Client

- **Redux** and Multiple Reducers
- **Moment**
- **React-Router**
- **Protected Routes, Admin Routes and normal routes**
- **Axios** to make async network calls and **Redux-thunk** for asynchronous actions
- Sending multipart form-data to server
- React-Bootstrap for UI-Components

## Server

- **Express**
- **Mongoose** and **MongoDB**
- **Braintree** payment gateway API for accepting payments on platform
- **URL query params** for search and filtering product data
- 🔥 **Formidable** to handle multipart-form data from client and store images to MongoDB as buffer
- MVC architecture
- Request for Product Image URL separately, makes load time faster
- Send different queryObject to mongoose and filter By Category, Price and Search for products
- JWT authetication, Role based operations for not registered, registered and Admin

## Features

- ### USERS
  - Register Users
  - Auto Logout on JWT expired
  - Query products by arrival, best Selling, price, category, name
  - Checkout for registered users
  - Using Braintree SDK to process payments on the platform
  - Dashboard to see purchase history and update user profile, password, email
- ### ADMIN
  - Add products and Categories to store
  - Process orders made by users on platform
  - Delete Products and update Products
  - Admin dashboard to customize and manage store
