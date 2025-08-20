import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/product/productSlice";
import { ProductContext } from "./ProductContext";
import { justUrl } from "../utils/url";

export const ProductProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.product);

  const [popularProducts, setPopularProducts] = useState([]);
  const [mostViewed, setMostViewed] = useState([]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const response = await justUrl.get("/products/carted");
        setPopularProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPopularProducts();

    const fetchMostViewed = async () => {
      try {
        const response = await justUrl.get("/products/viewed");
        setMostViewed(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMostViewed();
  }, []);

  console.log(products);

  return (
    <ProductContext.Provider value={{ products, popularProducts, mostViewed }}>
      {children}
    </ProductContext.Provider>
  );
};
