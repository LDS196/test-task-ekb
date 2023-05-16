import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ProductType } from "../services/types"
import { createAppAsyncThunk } from "../utils/create-app-async-thunk"
import { getProducts } from "../services/api"
import { handleServerNetworkError } from "../utils/handle-server-network-error"

const fetchProducts = createAppAsyncThunk<ProductType[], void>("app/fetchProducts", async (_, { rejectWithValue }) => {
    try {
        return (await getProducts()) as ProductType[]
    } catch (error) {
        return rejectWithValue(handleServerNetworkError(error))
    }
})

const slice = createSlice({
    name: "app",
    initialState: {
        products: [] as ProductType[],
        isLoading: false,
        error: null as null | string,
    },
    reducers: {
        setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload
            })
            .addMatcher(
                (action) => {
                    return action.type.endsWith("/pending")
                },
                (state) => {
                    state.isLoading = true
                }
            )
            .addMatcher(
                (action) => {
                    return action.type.endsWith("/rejected")
                },
                (state, action) => {
                    const { payload } = action
                    if (payload?.showGlobalError) {
                        state.error = payload.data.message
                    }
                    state.isLoading = false
                }
            )
            .addMatcher(
                (action) => {
                    return action.type.endsWith("/fulfilled")
                },
                (state) => {
                    state.isLoading = false
                }
            )
    },
})
export const appActions = slice.actions
export const appReducer = slice.reducer
export const appThunks = { fetchProducts }
