import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../../types/product";
import products from "../../static_data/products";


interface ProductsState {
  items: Product[];
}

const initialState: ProductsState = {
    items:products,
}


const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
});

export default productsSlice.reducer;