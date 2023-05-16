import React, { FC } from "react"
import { Button, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material"
import { ProductType } from "../../../services/types"
import { useSelector } from "react-redux"
import { selectApp } from "../../../app/app.select"
import { useNavigate } from "react-router-dom"

type PropsType = {
    product: ProductType
}
export const ProductCard: FC<PropsType> = ({ product }) => {
    const { isLoading } = useSelector(selectApp)
    const navigate = useNavigate()
    const showProductPage = () => {
        navigate(`/productPage/${product.id}`)
    }
    return (
        <Grid item>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia component="img" height="194" image={product.colors[0].images[0]} alt="product" />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Id: {product.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Name: {product.name}
                    </Typography>
                    <Button onClick={showProductPage} disabled={isLoading}>
                        Show Product
                    </Button>
                </CardContent>
            </Card>
        </Grid>
    )
}
