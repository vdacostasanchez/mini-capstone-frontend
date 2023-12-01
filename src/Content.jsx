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

  const handleUpdateProduct = (id, params, successCallback) => {
    axios.patch(`http://localhost:3000/products/${id}.json`, params).then((response) => {
      setProducts(
        products.map((product) => {
          if (product.id === response.data.id) {
            return response.data;
          } else {
            return product;
          }
        })
      );
      successCallback();
      handleClose();
    });
  };

  const handleDestroyProduct = (product) => {
    axios.delete(`http://localhost:3000/products/${product.id}.json`).then((response) => {
      console.log(response.data);
      setProducts(products.filter((p) => p.id !== product.id));
      handleClose();
    });
  };

  return (
    <main>
      <h1>Welcome to React!</h1>
      <Signup />
      <Login />
      <ProductsNew onCreateProduct={handleCreateProduct} />
      <ProductsIndex products={products} onShowProduct={handleShowProduct} />
      <Modal show={isProductShowVisible} onClose={handleClose}>
        <ProductShow
          product={currentProduct}
          onUpdateProduct={handleUpdateProduct}
          onDestroyProduct={handleDestroyProduct}
        />
      </Modal>
    </main>
  );
}
