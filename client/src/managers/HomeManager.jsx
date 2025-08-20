import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Home from "../pages/Home";
import { useProduct } from "../context/ProductContext";
import Footer2 from "../components/Footer2";

function HomeManager() {
  const { products } = useProduct();

  return (
    <>
      <header>
        <Navbar />
        <SearchBar products={products} />
      </header>

      <main className="pt-140">
        <Home />
      </main>

      <footer>
        <Footer />
        <Footer2 />
      </footer>
    </>
  );
}

export default HomeManager;
