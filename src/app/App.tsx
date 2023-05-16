import React from 'react';
import './App.css';
import Products from "../components/Products/Products";
import { Route, Routes} from "react-router-dom";
import Cart from "../components/Cart/Cart";
import ProductPage from "../components/Products/ProductPage/ProductPage";
import { LinearProgress, } from "@mui/material";
import {selectApp} from "./app.select";
import {useSelector} from "react-redux";
import ModalCart from "../components/Cart/ModulCart/ModalCart";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";

function App() {
    const {isLoading} = useSelector(selectApp)

    return (
        <div className="App">
            <ErrorSnackbar/>
            <div style={{height: "10px"}}>{isLoading && <LinearProgress/>}</div>
            <ModalCart/>

            <Routes>
                <Route path={"/"} element={<Products/>}/>
                <Route path={"/cart"} element={<Cart/>}/>
                <Route path={"/productPage/:id"} element={<ProductPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
