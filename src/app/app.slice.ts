import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {ProductType} from "../services/types";
import {createAppAsyncThunk} from "../utils/create-app-async-thunk";
import { getProducts} from "../services/api";

const fetchProducts = createAppAsyncThunk<any, void>("app/fetchProducts", async (_, ThunkApi) => {
    const {rejectWithValue} = ThunkApi
    try {
        const res = await getProducts()
        return res
    } catch (error) {
        return rejectWithValue(null)
    }
})

const slice = createSlice({
    name: "app",
    initialState: {
        products: [] as ProductType[],
        isLoading: false,
        error: null as null | string
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
                (state) => {
                    state.isLoading = false
                }
            )
    },
})
export const appActions = slice.actions
export const appReducer = slice.reducer
export const appThunks = {fetchProducts,}
