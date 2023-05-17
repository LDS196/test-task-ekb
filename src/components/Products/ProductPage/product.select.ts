import { RootState } from "../../../app/store"

export const selectColors = (state: RootState) => state.product.currentProduct?.colors
export const selectCurrentProduct = (state: RootState) => state.product.currentProduct
export const selectSize = (state: RootState) => state.product.size
export const selectSizes = (state: RootState) => state.product.sizes
export const selectColor = (state: RootState) => state.product.color
