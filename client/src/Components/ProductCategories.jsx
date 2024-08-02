import React from "react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ProductCategories = (props) => {
  const filterCategoryHandle = (cat) => {
    props.setFilterCategory((prev) => {
      if (prev.includes(cat)) {
        return [];
      }
      return cat;
    });
  };

  const resetCategoryHandle = () => {
    props.setFilterCategory([]);
  };

  return (
    <div className="max-w-screen-2xl m-auto flex flex-col items-start gap-3 lg:flex-row lg:justify-between p-4 my-12">
      <div className="flex flex-col gap-5">
        <h1 className="text-header text-[20px] font-[700]">
          Product Categories
        </h1>
        <div className="flex items-center flex-wrap gap-5">
          <motion.button
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{
              scale: 1,
            }}
            onClick={resetCategoryHandle}
            className="border-2 border-zinc-50 py-2 px-4 rounded-lg font-[700] text-[20px] outline-none"
          >
            Reset
          </motion.button>
          {props.categories.map((cat) => {
            return (
              <motion.button
                key={cat}
                onClick={() => filterCategoryHandle(cat)}
                animate={{
                  scale: props.filterCategory.includes(cat) ? 1.1 : 1,
                  backgroundColor: props.filterCategory.includes(cat)
                    ? "white"
                    : "GrayText",
                  color: props.filterCategory.includes(cat) ? "gray" : "white",
                }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "white",
                  color: "gray",
                }}
                whileTap={{
                  scale: 1,
                  backgroundColor: "white",
                  color: "gray",
                }}
                className="border-2 border-zinc-200 py-1 px-4 rounded-lg font-[600] text-[18px] outline-none"
              >
                {cat}
              </motion.button>
            );
          })}
        </div>
      </div>
      <button>
        <motion.button
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{
            scale: 1,
          }}
          className="border-2 border-zinc-50 py-2 px-4 rounded-lg font-[700] text-[20px] outline-none"
        >
          <Link to={"/add-product"}> Add Product </Link>
        </motion.button>
      </button>
    </div>
  );
};

export default ProductCategories;
