import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import NotFound from "./component/layout/NotFound/NotFound"
import Header from "./component/layout/Header/Header"
import Home from "./component/Home/Home"
import ProductDetails from './component/Product/ProductDetails'
import Products from './component/Product/Products'
import Search from "./component/Product/Search"
// import Home from "./"

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path='/search?keyword =""' element={<Search />} />
      </Routes>
    </Router>
  )
}

export default App