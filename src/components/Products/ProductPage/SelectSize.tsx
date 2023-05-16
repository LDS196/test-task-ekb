import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {useActions} from "../../../hooks/useActions";
import {productActions,} from "./product.slice";
import {useSelector} from "react-redux";
import {selectProduct} from "./product.select";

export const SelectSize = () => {
    const { size,color,sizes} = useSelector(selectProduct)

    const {setSize} = useActions(productActions)


    const handleChange = (event: SelectChangeEvent) => {
        const label = event.target.value
        const size = sizes.find((size) => size.label === label)
        if (size) {
            setSize({size: size});
        }

    };
    return (
        <Box sx={{minWidth: 120}}>
            <FormControl fullWidth>
                <InputLabel id="size">Size</InputLabel>
                <Select
                    labelId="size"
                    id="selectSize"
                    value={size ? size.label : ''}
                    label="size"
                    onChange={handleChange}
                >
                    {sizes?.map(s => {
                        const disabledItem = color?color.sizes.includes(s.id):false
                            return <MenuItem
                                disabled={!disabledItem}

                                key={s.id} value={s.label}>{s.label}</MenuItem>
                        }
                    )}

                </Select>
            </FormControl>
        </Box>
    );
}