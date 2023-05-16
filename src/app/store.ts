import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit"
import {appReducer} from "./app.slice";
import {productReducer} from "../components/Products/ProductPage/product.slice";




const rootReducer = combineReducers({
    app: appReducer,
    product:productReducer
})

export const store = configureStore({
    reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
