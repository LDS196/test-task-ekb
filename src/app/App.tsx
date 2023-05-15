import React from 'react';
import './App.css';
import Products from "../components/Products/Products";
import {Route, Routes} from "react-router-dom";
import Cart from "../components/Cart/Cart";
import ProductPage from "../components/Products/ProductPage/ProductPage";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={"/"} element={<Products />} />
                <Route path={"/cart"} element={<Cart />} />
                <Route path={"/productPage/:id"} element={<ProductPage />} />
            </Routes>
        </div>
    );
}

export default App;
