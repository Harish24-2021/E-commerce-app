import { createSlice,createSelector } from '@reduxjs/toolkit'

const initialState = {
  productsData: [],
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProductsData: (state,action)  => {
            state.productsData = action.payload
        }

    },
})

export const {setProductsData} = productsSlice.actions
export const  productsDataSelector = createSelector((state)=>
     state.products.productsData,
      (productsData)=>productsData
)
export default  productsSlice.reducer
