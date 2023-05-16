import React from "react"
import emptyCartImg from "../../assets/img/empty-cart.png"
import { useSelector } from "react-redux"
import { selectApp } from "../../app/app.select"
import { ButtonLinkOnClick } from "../Button/ButtonLinkOnClick"

export const CartEmpty = () => {
    const { isLoading } = useSelector(selectApp)
    return (
        <div style={{ textAlign: "center" }}>
            <h2>CART IS EMPTY!</h2>
            <p>Add product in your cart</p>
            <img src={emptyCartImg} alt="Empty cart" />
            <div>
                <ButtonLinkOnClick variant={"contained"} isLoading={isLoading} link={""} title={"Go To Main Page"} />
            </div>
        </div>
    )
}
