import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { justUrl } from "../../utils/url";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await justUrl.get("/products");
    return response.data;
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData) => {
    const response = await justUrl.post("/products", productData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await justUrl.delete(`/products/${id}`);
    return id;
  }
);

export const searchProductsBySubCategory = createAsyncThunk(
  "products/searchProductsBySubCategory",
  async ({ category, subCategory }) => {
    const response = await justUrl.get(
      `/products/search?category=${category}&subCategory=${subCategory}`,
      {
        headers: { "Cache-Control": "no-cache" },
      }
    );
    return response.data;
  }
);

export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id) => {
    const response = await justUrl.get(`/products/${id}`);
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updatedProduct }) => {
    console.log(id);
    const response = await justUrl.put(`/products/${id}`, updatedProduct);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    selectedProducts: [],
    status: "idle", // "loading", "succeeded", "failed"
    currentProduct: null,
    error: null,
  },
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // Create product
    builder
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products.push(action.payload); // Add newly created product to the list
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // Delete Product
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // Search products by subCategory
    builder
      .addCase(searchProductsBySubCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchProductsBySubCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedProducts = action.payload;
      })
      .addCase(searchProductsBySubCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // get product by id
    builder
      .addCase(getProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentProduct = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // updateProduct
    builder
      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentProduct = action.payload;
        const index = state.products.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearCurrentProduct, resetStatus } = productSlice.actions;
export default productSlice.reducer;
