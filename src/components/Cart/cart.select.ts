import { RootState } from "../../app/store"

export const selectCart = (state: RootState) => state.cart
export const selectItems = (state: RootState) => state.cart.items
export const selectTotalCount = (state: RootState) => state.cart.totalCount
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice
