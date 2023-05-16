import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {createAppAsyncThunk} from "../../../utils/create-app-async-thunk";
import {getProduct, getSize, getSizes} from "../../../services/api";
import {handleServerNetworkError} from "../../../utils/handle-server-network-error";
import {ColorType, ProductType, SizeType} from "../../../services/types";


const fetchProduct = createAppAsyncThunk<any, { id: number }>("product/fetchProduct", async (arg, ThunkApi) => {
    const {rejectWithValue, dispatch} = ThunkApi
    dispatch(productActions.clear())
    try {
        const res = await getProduct(arg.id) as ProductType
        dispatch(productActions.setColor({color: res.colors[0]}))
        return res
    } catch (error) {
        return rejectWithValue(handleServerNetworkError(error))
    }
})
const fetchSizes = createAppAsyncThunk<any, void>("product/fetchSizes", async (arg, ThunkApi) => {
    const {rejectWithValue,} = ThunkApi
    try {
        const res = await getSizes()
        return {sizes: res}
    } catch (error) {
        return rejectWithValue(handleServerNetworkError(error))
    }
})
const fetchSize = createAppAsyncThunk<any, { id: number }>("product/fetchSize", async (arg, ThunkApi) => {
    const {rejectWithValue,} = ThunkApi
    try {
        const res = await getSize(arg.id)
        return {size: res}
    } catch (error) {
        return rejectWithValue(handleServerNetworkError(error))
    }
})
const slice = createSlice({
    name: "product",
    initialState: {
        currentProduct: null as ProductType | null,
        color: null as null | ColorType,
        size: null as null | SizeType,
        sizes: [] as SizeType[]
    },
    reducers: {
        setColor: (state, action: PayloadAction<{ color: ColorType }>) => {
            state.color = action.payload.color
        },
        clear: (state) => {
            state.currentProduct = null
            state.color = null
            state.size = null
        },
        clearSize: (state) => {
            state.size = null
        },
        setSize: (state, action: PayloadAction<{ size: SizeType }>) => {
            state.size = action.payload.size
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.currentProduct = action.payload
            })
            .addCase(fetchSize.fulfilled, (state, action) => {
                state.size = action.payload.size
            })
            .addCase(fetchSizes.fulfilled, (state, action) => {
                state.sizes = action.payload.sizes
            })

    },
})
export const productActions = slice.actions
export const productReducer = slice.reducer
export const productThunks = {fetchProduct, fetchSizes, fetchSize}
