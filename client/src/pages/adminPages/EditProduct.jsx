import { useEffect, useState } from "react";
import { Button, Container, Form, Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  clearCurrentProduct,
  getProductById,
  resetStatus,
  updateProduct,
} from "../../features/product/productSlice";
import { category as categoryList } from "../../components/category";
import AdminNav from "./AdminNav";

function EditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProduct, status, error } = useSelector(
    (state) => state.product
  );
  const [showToast, setShowToast] = useState(false);
  const [toastBg, setToastBg] = useState("");
  const [toastText, setToastText] = useState("");

  const [colors, setColors] = useState("");
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    subCategory: "",
    countInStock: 0,
    rating: "",
    formerPrice: 0,
  });

  useEffect(() => {
    dispatch(getProductById(id));
    return () => {
      dispatch(clearCurrentProduct());
      dispatch(resetStatus());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (currentProduct) {
      setProduct({
        ...currentProduct,
      });

      setColors(currentProduct.colors?.join(", ") || "");
    }
  }, [currentProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "colors") {
      setColors(value);
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalProduct = {
      ...product,
      colors: JSON.stringify(colors.split(",").map((color) => color.trim())),
    };

    try {
      await dispatch(
        updateProduct({ id, updatedProduct: finalProduct })
      ).unwrap();
      setShowToast(true);
      setToastBg("success");
      setToastText("Product Updated");
    } catch (err) {
      console.error("Error: ", err);
      setShowToast(true);
      setToastBg("danger");
      setToastText("Something went wrong");
    }
  };

  const selectedCategory = categoryList.find(
    (cat) => cat.category === product.category
  );
  const subCategories = selectedCategory ? selectedCategory.subCategory : [];

  if (status === "failed") return <div>Error: {error}</div>;
  if (!currentProduct || status === "loading") return <div>Loading...</div>;

  return (
    <Container fluid>
      <AdminNav />
      <Link to={-1} className="back">
        <i className="bi bi-arrow-left" />
      </Link>
      <h1>Edit Product</h1>
      <h5 className="text-center my-5">{currentProduct.name}</h5>
      <Form className="px-2 editProduct shapeForm" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder={currentProduct.name}
            value={product.name || ""}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="description">Description</Form.Label>
          <Form.Control
            name="description"
            as={"textarea"}
            rows={4}
            type="text"
            placeholder={currentProduct.description}
            value={product.description || ""}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="category">Category</Form.Label>
          <Form.Select
            name="category"
            value={product.category || ""}
            onChange={(e) => {
              setProduct({
                ...product,
                category: e.target.value,
                subCategory: "",
              });
            }}
          >
            <option value="">{currentProduct.category}</option>
            {categoryList.map((cat) => (
              <option key={cat.id} value={cat.category}>
                {cat.category}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Sub Category</Form.Label>
          <Form.Select
            name="subCategory"
            value={product.subCategory || ""}
            onChange={handleChange}
            disabled={!product.category}
          >
            <option value="">{currentProduct.subCategory}</option>
            {subCategories.map((subCat) => (
              <option key={subCat} value={subCat}>
                {subCat}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="price">Price</Form.Label>
          <Form.Control
            name="price"
            type="number"
            placeholder={currentProduct.price}
            value={product.price || 0}
            onChange={handleChange}
          />
        </Form.Group>
        {currentProduct.formerPrice && (
          <Form.Group>
            <Form.Label htmlFor="formerPrice">Former Price</Form.Label>
            <Form.Control
              name="formerPrice"
              type="number"
              placeholder={currentProduct.formerPrice}
              value={product.formerPrice || 0}
              onChange={handleChange}
            />
          </Form.Group>
        )}
        <Form.Group>
          <Form.Label htmlFor="colors">Colors (comma separated)</Form.Label>
          <Form.Control
            name="colors"
            type="text"
            placeholder="Colors (comma separated)"
            value={colors || ""}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="countInStock">Count In Stock</Form.Label>
          <Form.Control
            name="countInStock"
            type="number"
            placeholder={currentProduct.countInStock}
            value={product.countInStock || 0}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="rating">Rating</Form.Label>
          <Form.Control
            name="rating"
            type="number"
            placeholder={currentProduct.rating}
            value={product.rating || 0}
            onChange={handleChange}
          />
        </Form.Group>

        <Button className="mb-10" type="submit">
          Update Product
        </Button>
      </Form>

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        className="position-absolute top-0 end-0 p-3"
        bg={toastBg}
        delay={3000}
        autohide
      >
        <Toast.Body className="text-white">{toastText} </Toast.Body>
      </Toast>
    </Container>
  );
}

export default EditProduct;
