import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import CartContext from "../Context/CartContext";
import { Link } from "react-router-dom";

const ProductList = (props) => {
  const { addToCart, numberWithCommas } = useContext(CartContext);

  const filterCategory = !props.filterCategory[0] ? true : false;
  const cat = !props.filterCategory[0]
    ? props.categories
    : [props.filterCategory];

  return (
    <div className="max-w-screen-2xl m-auto flex flex-col gap-5 p-4 my-10">
      {cat.map((cat) => {
        return (
          <div key={cat}>
            <h1 className="text-header text-2xl font-[700] mt-4">{cat}</h1>
            <div className="flex flex-wrap items-center gap-6 mt-4 border-1 ">
              {filterCategory
                ? props.products.map((prod) => {
                    return (
                      prod.category === cat && (
                        <div
                          key={prod.id}
                          className="w-[230px] h-[330px] shadow-3xl border-2 border-zinc-500 rounded-lg overflow-hidden"
                        >
                          <img
                            className="w-full h-[180px] object-cover"
                            src={prod.url}
                            alt={prod.product_name}
                          />
                          <div className="flex items-center justify-center flex-col gap-5 p-2">
                            <h1 className="font-[500] text-[1rem]">
                              {prod.name}
                            </h1>
                            <div className=" flex items-center text-[18px] gap-6 font-[600] text-topic ">
                              <h1> {numberWithCommas(prod.price)} ฿ </h1>
                              <motion.button
                                whileHover={{
                                  scale: 1.1,
                                }}
                                whileTap={{
                                  scale: 1,
                                }}
                                onClick={() =>
                                  addToCart({
                                    id: prod.id,
                                    name: prod.name,
                                    price: prod.price,
                                    url: prod.url,
                                    quantity: 1,
                                  })
                                }
                                className="bg-[#c85e0e] rounded-lg p-[6px] text-[white] font-[500] outline-none"
                              >
                                Add to cart
                              </motion.button>
                            </div>
                            <Link to={`/product/${prod.id}`}>
                              <motion.button
                                whileHover={{
                                  scale: 1.1,
                                }}
                                whileTap={{
                                  scale: 1,
                                }}
                                className="flex items-center justify-center gap-1  text-[14px] text-paragraph w-[140px] rounded-lg p-1  font-[500] outline-none"
                              >
                                More info
                                <span className="w-[20px] h-[20px]">
                                  <ChevronDoubleRightIcon />
                                </span>
                              </motion.button>
                            </Link>
                          </div>
                        </div>
                      )
                    );
                  })
                : props.products.map((prod) => {
                    return (
                      prod.category === props.filterCategory && (
                        <div
                          key={prod.id}
                          className="w-[230px] h-[330px] shadow-3xl border-2 border-zinc-500 rounded-lg overflow-hidden"
                        >
                          <img
                            className="w-full h-[180px] object-cover"
                            src={prod.url}
                            alt={prod.product_name}
                          />
                          <div className="flex items-center justify-center flex-col gap-5 p-2">
                            <h1 className="font-[500] text-[1rem]">
                              {prod.name}
                            </h1>
                            <div className=" flex items-center text-[18px] gap-6 font-[600] text-topic ">
                              <h1> {numberWithCommas(prod.price)} ฿ </h1>
                              <motion.button
                                whileHover={{
                                  scale: 1.1,
                                }}
                                whileTap={{
                                  scale: 1,
                                }}
                                onClick={() =>
                                  addToCart({
                                    id: prod.id,
                                    name: prod.name,
                                    price: prod.price,
                                    url: prod.url,
                                    quantity: 1,
                                  })
                                }
                                className="bg-[#c85e0e] rounded-lg p-[6px] text-[white] font-[500] outline-none"
                              >
                                Add to cart
                              </motion.button>
                            </div>
                            <Link to={`/product/${prod.id}`}>
                              <motion.button
                                whileHover={{
                                  scale: 1.1,
                                }}
                                whileTap={{
                                  scale: 1,
                                }}
                                className="flex items-center justify-center gap-1  text-[14px] text-paragraph w-[140px] rounded-lg p-1  font-[500] outline-none"
                              >
                                More info
                                <span className="w-[20px] h-[20px]">
                                  <ChevronDoubleRightIcon />
                                </span>
                              </motion.button>
                            </Link>
                          </div>
                        </div>
                      )
                    );
                  })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
