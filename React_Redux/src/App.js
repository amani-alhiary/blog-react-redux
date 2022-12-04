import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductListing from "./containers/ProductListing";
import Header from "./containers/Header";
import "./App.css";
import ProductDetails from "./containers/ProductDetails";
import Login from "./containers/Login";
import Page404 from "./containers/Page404";

function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
        <Route path="/"  element={<Login/>} />
        
          <Route path="/blogs"  element={<ProductListing/>} />
          <Route path="/product/:productId" element={<ProductDetails/>} />:
         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
