import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { ProductTypeForCart,} from "../../services/types";




const slice = createSlice({
    name: "cart",
    initialState: {
        items: [] as ProductTypeForCart[] ,
        totalPrice: 0,
        totalCount:0
    },
    reducers: {
        addItem(state, action:PayloadAction<{product:ProductTypeForCart}>) {
            const findItem = state.items.find(obj => {
                return (obj.id === action.payload.product.id
                    && obj.color.id=== action.payload.product.color.id
                && obj.color.size.id=== action.payload.product.color.size.id)
            })
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({...action.payload.product, count: 1})
            }
            state.totalCount = state.items.reduce((sum, obj) => {
                return obj.count + sum
            }, 0)
            state.totalPrice = state.items.reduce((sum, obj) => {
                return (+obj.color.price * obj.count) + sum
            }, 0)
        },
        minusItem(state, action:PayloadAction<{product:ProductTypeForCart}>) {
            const findItem = state.items.find(obj => {
                return (obj.id === action.payload.product.id
                    && obj.color.id=== action.payload.product.color.id
                    && obj.color.size.id=== action.payload.product.color.size.id)
            })
            if (findItem) {
                if (findItem.count > 0) findItem.count--
            }
            state.totalCount = state.items.reduce((sum, obj) => {
                return obj.count + sum
            }, 0)
            state.totalPrice = state.items.reduce((sum, obj) => {
                return (+obj.color.price * obj.count) + sum
            }, 0)
        },
        removeItem(state, action:PayloadAction<{product:ProductTypeForCart}>) {
            const index = state.items.findIndex(obj => {
                return (obj.id === action.payload.product.id
                    && obj.color.id=== action.payload.product.color.id
                    && obj.color.size.id=== action.payload.product.color.size.id)
            })
           if(index!==-1) state.items.splice(index,1)

            state.totalPrice = state.items.reduce((sum, obj) => {
                return (+obj.color.price * obj.count) + sum
            }, 0)
            state.totalCount = state.items.reduce((sum, obj) => {
                return obj.count + sum
            }, 0)
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
            state.totalCount = 0
        },


    },

})
export const cartActions = slice.actions
export const cartReducer = slice.reducer

