import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Fuse from "fuse.js";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import Footer2 from "../components/Footer2";

function Search({ products }) {
  const location = useLocation();

  const query =
    new URLSearchParams(location.search).get("q")?.toLowerCase() || "";

  const [inputValue, setInputValue] = useState(query);

  const fuse = new Fuse(products, {
    keys: ["name", "category", "subCategory"],
    threshold: 0.4,
  });

  const fuseResults = inputValue
    ? fuse.search(inputValue)
    : products.map((product) => ({ item: product, score: 1 }));

  const matchedItems = fuseResults.map((r) => r.item);

  const categoryCounts = {};
  matchedItems.forEach((item) => {
    const key = item.category?.toLowerCase() || "uncategorized";
    categoryCounts[key] = (categoryCounts[key] || 0) + 1;
  });

  const topCategory = Object.entries(categoryCounts).sort(
    (a, b) => b[1] - a[1]
  )[0]?.[0];

  const sameCategoryProducts = topCategory
    ? products.filter((p) => p.category?.toLowerCase() === topCategory)
    : [];

  const exactMatches = matchedItems.filter(
    (item) => item.name.toLowerCase() === inputValue.toLowerCase()
  );

  const similarMatches = matchedItems.filter(
    (item) => item.name.toLowerCase() !== inputValue.toLowerCase()
  );

  const remainingSameCategory = sameCategoryProducts.filter(
    (item) => !matchedItems.includes(item)
  );

  const remainingOthers = products.filter(
    (item) =>
      !exactMatches.includes(item) &&
      !similarMatches.includes(item) &&
      !remainingSameCategory.includes(item)
  );

  useEffect(() => {
    const newQuery =
      new URLSearchParams(location.search).get("q")?.toLowerCase() || "";
    setInputValue(newQuery);
  }, [location.search]);

  fuseResults.forEach(({ item }) => {
    if (item.name.toLowerCase() === inputValue.toLowerCase()) {
      exactMatches.push(item);
    } else {
      similarMatches.push(item);
    }
  });

  // Products not in fuse results
  // const resultItems = fuseResults.map((res) => res.item);
  // const nonMatches = products.filter((p) => !resultItems.includes(p));

  const combinedList = [
    ...exactMatches,
    ...similarMatches,
    ...remainingSameCategory,
    ...remainingOthers,
  ];

  const seen = new Set();
  const finalList = combinedList.filter((p) => {
    if (seen.has(p._id)) return false;
    seen.add(p._id);
    return true;
  });

  return (
    <>
      <Navbar />
      <SearchBar
        products={products}
        searchTerm={inputValue}
        setSearchTerm={setInputValue}
      />
      <Container fluid className="pt-80 searchCon">
        <Row className="mt-5 gy-2 gx-2 productRow m-0 mb-5">
          <h4 className="px-2">
            {query ? `Results for "${query}"` : "All Products"}
          </h4>
          {finalList.length > 0 ? (
            finalList.map((product) => (
              <Col xs={6} sm={4} md={3} xxl={2} key={product._id}>
                <ProductCard product={product} />
              </Col>
            ))
          ) : (
            <>
              <p>No Products found for "{query}</p>
              {products.map((product) => (
                <Col xs={6} sm={4} md={3} xxl={2} key={product._id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </>
          )}
        </Row>
      </Container>
      <Footer2 />
      <Footer />
    </>
  );
}

export default Search;
