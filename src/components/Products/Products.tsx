import React, { useEffect } from "react"
import { useActions } from "../../hooks/useActions"
import { appThunks } from "../../app/app.slice"
import { useSelector } from "react-redux"
import { selectProducts } from "../../app/app.select"
import { Container, Grid } from "@mui/material"
import { ProductCard } from "./ProductCard/ProductCard"

const Products = () => {
    const products = useSelector(selectProducts)
    const { fetchProducts } = useActions(appThunks)
    useEffect(() => {
        fetchProducts({})
    }, [])
    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </Grid>
        </Container>
    )
}

export default Products
