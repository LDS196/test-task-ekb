import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {ProductType} from "../services/types";
import {createAppAsyncThunk} from "../utils/create-app-async-thunk";
import {handleServerNetworkError} from "../utils/handle-server-network-error";
import {getProduct, getProducts} from "../services/api";

const fetchProducts = createAppAsyncThunk<any, void>("app/fetchProducts", async (_, ThunkApi) => {
    const {rejectWithValue,} = ThunkApi
    try {
        const res = await getProducts()
        return res
    } catch (error) {
        return rejectWithValue(handleServerNetworkError(error))
    }
})
const fetchProduct = createAppAsyncThunk<any, {id:number}>("app/fetchProduct", async (arg, ThunkApi) => {
    const {rejectWithValue,} = ThunkApi
    try {
        const res = await getProduct(arg.id)
        return res
    } catch (error) {
        return rejectWithValue(handleServerNetworkError(error))
    }
})
const slice = createSlice({
    name: "app",
    initialState: {
        currentProduct: null as ProductType | null,
        products: [] as ProductType[],
        isLoading: false,
        error: null as null | string
    },
    reducers: {
        setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
        setProducts: (state, action: PayloadAction<{ products: ProductType[] }>) => {
            state.products = action.payload.products
        },
        setProduct: (state, action: PayloadAction<{ product: ProductType }>) => {
            state.currentProduct = action.payload.product
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.currentProduct = action.payload
            })
            .addMatcher(
                (action) => {
                    return action.type.endsWith("/pending")
                },
                (state, action) => {
                    if (action.type === "app/initializeApp/pending") return
                    state.isLoading = true
                }
            )
            .addMatcher(
                (action) => {
                    return action.type.endsWith("/rejected")
                },
                (state, action) => {
                    const {payload} = action
                    if (payload?.showGlobalError) {
                        state.error = payload.data
                    }
                    state.isLoading = false
                }
            )
            .addMatcher(
                (action) => {
                    return action.type.endsWith("/fulfilled")
                },
                (state, action) => {
                    if (action.type === "app/initializeApp/fulfilled") return

                    state.isLoading = false
                }
            )
    },
})
export const appActions = slice.actions
export const appReducer = slice.reducer
export const appThunks = {fetchProducts,fetchProduct}
