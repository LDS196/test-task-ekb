import React from "react"
import { Meta } from "@storybook/react"

import { action } from "@storybook/addon-actions"
import { ButtonLinkOnClick } from "./ButtonLinkOnClick"

export default {
    title: "Button-Link-OnClick stories",
    component: ButtonLinkOnClick,
} as Meta<typeof ButtonLinkOnClick>

const callback = action("click")
export const ButtonLinkOnClickExample = () => {
    return (
        <ButtonLinkOnClick isLoading={false} variant={"contained"} callback={callback} title={"My button"} link={""} />
    )
}
export const ButtonLinkOnClickExample2 = () => {
    return <ButtonLinkOnClick isLoading={true} variant={"outlined"} callback={callback} title={"My button"} link={""} />
}
