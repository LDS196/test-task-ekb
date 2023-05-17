import React, { FC, memo } from "react"
import { Card, CardContent, CardMedia, Grid, IconButton, Typography } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { ProductTypeForCart } from "../../services/types"
import { useActions } from "../../hooks/useActions"
import { cartActions } from "./catr.slice"
import { useSelector } from "react-redux"
import { selectIsLoading } from "../../app/app.select"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"

type PropsType = {
    product: ProductTypeForCart
}
export const ProductCardForCart: FC<PropsType> = memo(({ product }) => {
    const isLoading = useSelector(selectIsLoading)
    const { removeItem, addItem, minusItem } = useActions(cartActions)
    const deleteProduct = () => {
        removeItem({ product })
    }
    const addItemToCart = () => {
        addItem({ product })
    }
    const minusItemHandler = () => {
        minusItem({ product })
    }
    return (
        <Grid item>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia component="img" height="194" image={product.color.images[0]} alt="product" />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Name: {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Color: {product.color.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Size: {product.color.size.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Price: {product.color.price}$
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Total price: {+product.color.price * product.count}$
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Count: {product.count}
                    </Typography>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <IconButton onClick={addItemToCart} disabled={isLoading}>
                            <AddCircleIcon />
                        </IconButton>
                        <IconButton onClick={minusItemHandler} disabled={isLoading}>
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                        <IconButton onClick={deleteProduct} disabled={isLoading} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </CardContent>
            </Card>
        </Grid>
    )
})
