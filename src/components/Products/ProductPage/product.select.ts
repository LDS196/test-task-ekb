import {RootState} from "../../../app/store";


export const selectProduct = (state: RootState) => state.product
export const selectColors = (state: RootState) => state.product.currentProduct?.colors

