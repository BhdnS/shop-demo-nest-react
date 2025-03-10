import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IInitialState {
  totalPrice: number
  novaPoshtaBranch: string
  products: {
    product: number
    quantity: number
  }[]
}

const initialState: IInitialState[] = []

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setProduct: (state, { payload }: PayloadAction<IInitialState>) => {
      state.push(payload)
    },
  },
})

export default orderSlice.reducer
export const { setProduct } = orderSlice.actions
