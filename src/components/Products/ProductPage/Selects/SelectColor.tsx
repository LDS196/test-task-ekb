import * as React from "react"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { FC } from "react"
import { useActions } from "../../../../hooks/useActions"
import { productActions } from "../product.slice"
import { useSelector } from "react-redux"
import { selectColors, selectProduct } from "../product.select"

type PropsType = {}
export const SelectColor: FC<PropsType> = () => {
    const { color } = useSelector(selectProduct)
    const colors = useSelector(selectColors)
    const { setColor, clearSize } = useActions(productActions)

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.value

        const color = colors?.find((color) => color.name === name)
        if (color) {
            setColor({ color: color })
            clearSize()
        }
    }

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="color">Color</InputLabel>
                <Select
                    labelId="color"
                    id="select"
                    value={color ? color?.name : ""}
                    label="color"
                    onChange={handleChange}
                >
                    {colors?.map((c) => (
                        <MenuItem key={c.id} value={c.name}>
                            {c.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}
