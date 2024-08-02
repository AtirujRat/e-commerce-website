import React from "react";
import Products from "../Components/IntroSection";
import ProductList from "../Components/ProductList";
import ProductCategories from "../Components/ProductCategories";
import { useEffect, useState } from "react";
import supabase from "../../config/superbaseClient";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const getProducts = async () => {
    const { data, error } = await supabase.from("products").select();
    if (error) {
      setError("Could not fetch the products");
    }

    if (data) {
      setProducts(data);
      setError(null);
    }
  };

  const removeDuplicateCategory = () => {
    const Category = products.map((item) => {
      return item.category;
    });
    const removeDuplicateCategory = Category.filter(
      (item, index) => Category.indexOf(item) === index
    );

    setCategories(removeDuplicateCategory);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    removeDuplicateCategory();
  }, [products]);

  return (
    <>
      <Products />
      <ProductCategories
        categories={categories}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
      />
      {error && <h1>{error}</h1>}
      {products && (
        <ProductList
          products={products}
          filterCategory={filterCategory}
          categories={categories}
        />
      )}
    </>
  );
};

export default Home;
