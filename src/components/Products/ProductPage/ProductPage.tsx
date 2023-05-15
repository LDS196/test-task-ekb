import React, {useEffect} from 'react';
import {NavLink, useParams} from "react-router-dom";
import {Button} from "@mui/material";
import {useActions} from "../../../hooks/useActions";
import {appThunks} from "../../../app/app.slice";

type UserParams = {
    id: string
}
const ProductPage = () => {
    const {fetchProduct} = useActions(appThunks)
    const {id} = useParams<UserParams>() as UserParams

    useEffect(() => {
        fetchProduct({id: +id})
    }, [])
    return (
        <div>
            <NavLink to={"/"}>
                <Button fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                    Go to Home
                </Button>
            </NavLink>
        </div>
    );
};

export default ProductPage;