import React, {useEffect} from 'react';
import {NavLink, useParams} from "react-router-dom";
import {Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {useActions} from "../../../hooks/useActions";
import {useSelector} from "react-redux";
import {selectApp} from "../../../app/app.select";
import {productThunks} from "./product.slice";
import {selectProduct} from "./product.select";
import {SelectColor} from "./SelectColor";
import {SelectSize} from "./SelectSize";
import s from './ProductPage.module.css'
import defaultImg from '../../../assets/img/defaultItem.jpg'

type UserParams = {
    id: string
}
const ProductPage = () => {
    const {isLoading} = useSelector(selectApp)
    const {fetchProduct} = useActions(productThunks)
    const {currentProduct} = useSelector(selectProduct)
    const {id} = useParams<UserParams>() as UserParams
    const {fetchSizes} = useActions(productThunks)


    useEffect(() => {
        fetchProduct({id: +id})
    }, [])

    useEffect(() => {
        fetchSizes({})
    }, [])
    return (
        <div>
            <NavLink to={"/"}>
                <Button disabled={isLoading} variant="contained" sx={{mt: 3, mb: 2}}>
                    Go to Home
                </Button>
            </NavLink>
            <Card sx={{maxWidth: 345, gap: '20px 20px'}}>
                <CardMedia
                    component="img"
                    height="194"
                    image={currentProduct ? currentProduct.colors[0].images[0] : defaultImg}
                    alt="product"
                />
                <CardContent className={s.content}>
                    <Typography variant="body2" color="text.secondary">
                        Id: {currentProduct?.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Name: {currentProduct?.name}
                    </Typography>
                    {currentProduct && <SelectColor/>}
                    {currentProduct && <SelectSize/>}
                </CardContent>
            </Card>
        </div>
    );
};

export default ProductPage;