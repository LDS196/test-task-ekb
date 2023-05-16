import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit"
import { appReducer } from "./app.slice"
import { productReducer } from "../components/Products/ProductPage/product.slice"
import { cartReducer } from "../components/Cart/catr.slice"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"

const cartConfig = {
    key: "cart",
    storage,
}

const rootReducer = combineReducers({
    app: appReducer,
    product: productReducer,
    cart: persistReducer(cartConfig, cartReducer),
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
