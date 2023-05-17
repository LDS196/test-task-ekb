import React from "react"
import { Paper, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectTotalCount, selectTotalPrice } from "../cart.select"
import style from "./ModalCart.module.css"
const ModalCart = () => {
    const totalPrice = useSelector(selectTotalPrice)
    const totalCount = useSelector(selectTotalCount)
    return (
        <Paper elevation={2} className={style.modal}>
            <NavLink to={"/cart"}>
                <Typography variant="body2" color="text.secondary">
                    Count: {totalCount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Sum: {totalPrice} $
                </Typography>
            </NavLink>
        </Paper>
    )
}

export default ModalCart
