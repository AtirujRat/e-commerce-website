import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import supabase from "../../config/superbaseClient";
import { motion } from "framer-motion";

const numberWithCommas = (x) => {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
};

const Product = () => {
  const [product, setProduct] = useState();

  const params = useParams();

  const getProducts = async () => {
    let { data: products, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", params.id)
      .single();
    setProduct(products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex flex-col justify-center lg:flex-row lg:justify-between gap-3 max-w-screen-md h-fit mx-auto mt-20 p-7">
      <div className="w-[100%] lg:w-[50%]">
        <img
          className="w-[100%] h-[500px] object-cover rounded-md"
          src={product?.url}
          alt={product?.name}
        />
      </div>
      <div className="flex flex-col gap-10 w-[100%] lg:w-[50%] border-2  border-neutral-200 rounded-lg p-4">
        <h1 className="text-[#ffff] text-[1.7rem] font-bold">
          {product?.name}
        </h1>

        <div className="text-paragraph text-[1.1rem] rounded-md">
          {product?.description}
        </div>

        <h1 className="text-topic text-[1.3rem] font-bold">
          ฿ {product?.price && numberWithCommas(product.price)}
        </h1>
        <div className="text-end  ">
          <Link to={"/"}>
            <motion.button
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{
                scale: 1,
              }}
              className="border-2 border-zinc-300 rounded-lg py-1 px-3"
            >
              Back
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
