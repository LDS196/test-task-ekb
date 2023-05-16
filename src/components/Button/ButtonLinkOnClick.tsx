import React, { FC } from "react"
import { Button } from "@mui/material"

type PropsType = {
    variant: "outlined" | "contained"
    isLoading: boolean
    link: string
    title: string
    callback?: () => void
}
export const ButtonLinkOnClick: FC<PropsType> = ({ link, title, callback, isLoading, variant }) => {
    return (
        <a href={`/${link}`}>
            <Button disabled={isLoading} variant={variant} onClick={callback}>
                {title}
            </Button>
        </a>
    )
}
