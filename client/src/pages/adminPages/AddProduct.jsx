import { useState, useRef } from "react";
import { Button, Container, Form, Toast } from "react-bootstrap";
import AdminNav from "./AdminNav";
import { useDispatch } from "react-redux";
import { createProduct } from "../../features/product/productSlice";
import { category as categoryList } from "../../components/category";
import { Link } from "react-router-dom";

function AddProduct() {
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [toastBg, setToastBg] = useState("");
  const [toastText, setToastText] = useState("");
  const fileInputRef = useRef(null);

  const [description, setDescription] = useState("");
  const [colors, setColors] = useState("");

  const [product, setProduct] = useState({
    name: "",
    price: 0,
    category: "",
    subCategory: "",
    countInStock: 0,
    rating: "",
    formerPrice: 0,
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "description") {
      setDescription(value);
    } else if (name === "colors") {
      setColors(value);
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleImagesChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = new FormData();

    const finalProduct = {
      ...product,
      description: description
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
      colors: colors.split(",").map((color) => color.trim()),
    };

    for (const key in finalProduct) {
      if (Array.isArray(finalProduct[key])) {
        productData.append(key, JSON.stringify(finalProduct[key]));
      } else {
        productData.append(key, finalProduct[key]);
      }
    }

    for (let i = 0; i < images.length; i++) {
      productData.append("images", images[i]);
    }

    try {
      await dispatch(createProduct(productData)).unwrap();

      setShowToast(true);
      setToastBg("success");
      setToastText("Product added successfully");

      setDescription("");
      setColors("");
      setProduct({
        name: "",
        price: 0,
        category: "",
        subCategory: "",
        countInStock: 0,
        rating: "",
        formerPrice: 0,
      });

      setImages([]);
      fileInputRef.current.value = "";
    } catch (err) {
      console.error("Error: ", err);

      setShowToast(true);
      setToastBg("danger");
      setToastText(
        "Something went wrong. Please try again, make sure pictures sent are 5"
      );
    }
  };

  const selectedCategory = categoryList.find(
    (cat) => cat.category === product.category
  );
  const subCategories = selectedCategory ? selectedCategory.subCategory : [];

  return (
    <>
      <AdminNav />
      <Container fluid>
        <Link to={-1} className="back">
          <i className="bi bi-arrow-left" />
        </Link>
        <h3 className="text-center my-5">Add product</h3>
        <Form
          onSubmit={handleSubmit}
          className="shapeForm"
          encType="multipart/form-data"
        >
          <Form.Group className="mb-4">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={description}
              name="description"
              placeholder="Enter each description point on a new line"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={product.price}
              placeholder="Product Price"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Product Former Price</Form.Label>
            <Form.Control
              type="number"
              name="formerPrice"
              value={product.formerPrice}
              placeholder="Product Former Price"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={product.category}
              required
              onChange={(e) => {
                setProduct({
                  ...product,
                  category: e.target.value,
                  subCategory: "",
                });
              }}
            >
              <option value="">-- Select a category --</option>
              {categoryList.map((cat) => (
                <option key={cat.id} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Sub Category</Form.Label>
            <Form.Select
              name="subCategory"
              value={product.subCategory}
              onChange={handleChange}
              disabled={!product.category}
              required
            >
              <option value="">-- Select Sub Category</option>
              {subCategories.map((subCat) => (
                <option key={subCat} value={subCat}>
                  {subCat}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Stock Count</Form.Label>
            <Form.Control
              type="number"
              name="countInStock"
              value={product.countInStock}
              placeholder="Stock Count"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              name="rating"
              placeholder="Rating"
              min="1"
              max="5"
              value={product.rating}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Product Images</Form.Label>
            <Form.Control
              type="file"
              name="images"
              multiple
              ref={fileInputRef}
              onChange={handleImagesChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Colors</Form.Label>
            <Form.Control
              type="text"
              name="colors"
              placeholder="Colors (comma separated)"
              value={colors}
              onChange={handleChange}
              className="mb-3"
              required
            />
          </Form.Group>

          <Button type="submit" className="mb-10">
            Add Product
          </Button>
        </Form>
      </Container>

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        className="position-fixed top-0 end-0 p-3 mt-3"
        bg={toastBg}
        delay={3000}
        autohide
      >
        <Toast.Body className="text-white">{toastText} </Toast.Body>
      </Toast>
    </>
  );
}

export default AddProduct;
