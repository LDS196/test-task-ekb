import React from 'react';
import emptyCartImg from '../../assets/img/empty-cart.png'
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import {useSelector} from "react-redux";
import {selectApp} from "../../app/app.select";


export const CartEmpty = () => {
    const {isLoading} = useSelector(selectApp)
    return (
        <div style={{textAlign:'center'}} >
            <h2>CART IS EMPTY!</h2>
            <p>Add product in your cart</p>
            <img src={emptyCartImg} alt="Empty cart"/>
            <div> <Button  variant="contained" component={Link} to="/" disabled={isLoading}>Go To Main Page</Button></div>


        </div>
    );
};

