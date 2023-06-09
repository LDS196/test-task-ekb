import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material"
import { useActions } from "../../../hooks/useActions"
import { useSelector } from "react-redux"
import { selectIsLoading } from "../../../app/app.select"
import { productThunks } from "./product.slice"
import { selectColor, selectCurrentProduct, selectSize } from "./product.select"
import { SelectColor } from "./Selects/SelectColor"
import { SelectSize } from "./Selects/SelectSize"
import s from "./ProductPage.module.css"
import defaultImg from "../../../assets/img/defaultItem.jpg"
import { cartActions } from "../../Cart/catr.slice"
import { ButtonLinkOnClick } from "../../Button/ButtonLinkOnClick"

type UserParams = {
    id: string
}
const ProductPage = () => {
    const isLoading = useSelector(selectIsLoading)
    const { fetchProduct } = useActions(productThunks)
    const { addItem } = useActions(cartActions)
    const currentProduct = useSelector(selectCurrentProduct)
    const color = useSelector(selectColor)
    const size = useSelector(selectSize)
    const { id } = useParams<UserParams>() as UserParams
    const { fetchSizes } = useActions(productThunks)

    const [numberImg, setNumberImg] = useState(0)

    const imageLink = color ? color.images[numberImg] : currentProduct ? currentProduct.colors[0].images[0] : defaultImg

    const changeImage = () => {
        if (color?.images.length) {
            if (numberImg < color.images.length - 1) {
                setNumberImg((prevState) => prevState + 1)
            } else {
                setNumberImg(0)
            }
        }
    }
    const addItemToCart = () => {
        if (currentProduct && color && size) {
            addItem({
                product: {
                    id: currentProduct.id,
                    name: currentProduct.name,
                    color: { ...color, size: size },
                    count: 1,
                },
            })
        }
    }

    useEffect(() => {
        fetchProduct({ id: +id })
        fetchSizes({})
    }, [])

    return (
        <div>
            <ButtonLinkOnClick variant={"contained"} isLoading={isLoading} link={""} title={"Go To Main Page"} />
            <Card sx={{ maxWidth: 200, gap: "20px 20px" }}>
                <CardMedia component="img" image={imageLink} alt="product" />
                <Button
                    onClick={changeImage}
                    disabled={isLoading || color?.images.length === 1 || !color}
                    variant="outlined"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Next Photo
                </Button>
                <CardContent className={s.content}>
                    <Typography variant="body2" color="text.secondary">
                        Name: {currentProduct?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Id: {currentProduct?.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Price: {color ? color.price : 0} $
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        description: {color ? color.description : ""}
                    </Typography>

                    {currentProduct && <SelectColor />}
                    {currentProduct && <SelectSize />}
                    <Button
                        onClick={addItemToCart}
                        disabled={isLoading || !size}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Add to Cart
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProductPage
