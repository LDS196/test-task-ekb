import React from "react"
import { Button, Container, Grid } from "@mui/material"
import { ProductCardForCart } from "./ProductCardForCart"
import { useSelector } from "react-redux"
import { selectItems } from "./cart.select"
import { CartEmpty } from "./CartEmpty"
import { useActions } from "../../hooks/useActions"
import { cartActions } from "./catr.slice"
import { selectIsLoading } from "../../app/app.select"
import { Link } from "react-router-dom"
import { v1 } from "uuid"

const Cart = () => {
    const isLoading = useSelector(selectIsLoading)
    const { clearItems } = useActions(cartActions)
    const items = useSelector(selectItems)
    const clearCart = () => {
        clearItems()
    }

    return (
        <Container maxWidth="lg">
            {items.length ? (
                <div>
                    <div style={{ display: "flex", marginBottom: "20px", gap: "0 30px" }}>
                        <Link to="/">
                            <Button variant="contained" disabled={isLoading}>
                                Go To Main Page
                            </Button>
                        </Link>
                        <Button variant="contained" onClick={clearCart} disabled={isLoading}>
                            Clear Cart
                        </Button>
                    </div>

                    <Grid container spacing={3}>
                        {items.map((i) => (
                            <ProductCardForCart key={v1()} product={i} />
                        ))}
                    </Grid>
                </div>
            ) : (
                <CartEmpty />
            )}
        </Container>
    )
}

export default Cart
