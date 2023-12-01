import axios from "axios";
import { ProductsIndex } from "./ProductsIndex";
import { ProductsNew } from "./ProductsNew";
import { ProductShow } from "./ProductShow";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { Modal } from "./Modal";
import { useState, useEffect } from "react";

export function Content() {
  const [products, setProducts] = useState([]);
  const [isProductShowVisible, setIsProductShowVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

  const handleIndexProducts = () => {
    axios.get("http://localhost:3000/products.json").then((response) => {
      console.log(response.data);
      setProducts(response.data);
    });
  };
  useEffect(handleIndexProducts, []);

  const handleCreateProduct = (params, successCallback) => {
    axios.post("http://localhost:3000/products.json", params).then((response) => {
      console.log(response.data);
      setProducts([...products, response.data]);
      successCallback();
    });
  };

  const handleShowProduct = (product) => {
    setIsProductShowVisible(true);
    setCurrentProduct(product);
  };

  const handleClose = () => {
    setIsProductShowVisible(false);
  };

  return (
    <main>
      <h1>Welcome to React!</h1>
      <Signup />
      <Login />
      <ProductsNew onCreateProduct={handleCreateProduct} />
      <ProductsIndex products={products} onShowProduct={handleShowProduct} />
      <Modal show={isProductShowVisible} onClose={handleClose}>
        <ProductShow product={currentProduct} />
      </Modal>
    </main>
  );
}
