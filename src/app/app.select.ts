import { RootState } from "./store"

export const selectApp = (state: RootState) => state.app
export const selectProducts = (state: RootState) => state.app.products
export const selectAppError = (state: RootState) => state.app.error
export const selectIsLoading = (state: RootState) => state.app.isLoading
