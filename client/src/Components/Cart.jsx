import {
  ShoppingCartIcon,
  ChevronDownIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import CartContext from "../Context/CartContext";

const Cart = () => {
  const [isOpenedCart, setIsOpenedCart] = useState(false);

  const {
    addToCart,
    removeFromCart,
    cart,
    numberWithCommas,
    totalPrice,
    totalQuantity,
  } = useContext(CartContext);

  const openCartToggle = () => {
    setIsOpenedCart((prev) => !prev);
  };

  return (
    <motion.div
      animate={{
        height: isOpenedCart ? "300px" : "",
      }}
      className="flex flex-col gap-5 w-[100%] lg:w-[500px] h-fit border-2 border-zinc-400 rounded-md py-[10px]  overflow-hidden"
    >
      <div className="flex justify-between px-5">
        <div className="flex items-center gap-8">
          <div className="relative">
            <ShoppingCartIcon className="w-[30px] h-[30px]" />
            <span className="absolute flex items-center justify-center bottom-[50%] left-[65%] w-[25px] h-[25px] bg-zinc-600 p-[4px] rounded-xl border-2 border-[#242424] font-[700] ">
              {totalQuantity}
            </span>
          </div>

          <div>
            {totalQuantity === 0
              ? "No product in cart"
              : `Total : ${numberWithCommas(totalPrice)} ฿`}
          </div>
        </div>

        <motion.button
          whileHover={{
            scale: 1.3,
          }}
          whileTap={{
            scale: 1,
          }}
          className="w-[30px] h-[30px] outline-none"
          onClick={openCartToggle}
        >
          <ChevronDownIcon />
        </motion.button>
      </div>
      {isOpenedCart && (
        <div className="overflow-auto flex flex-col gap-3 px-4">
          {cart.map((prod) => {
            return (
              <motion.div
                key={prod.id}
                animate={{
                  opacity: 1,
                }}
                initial={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="flex justify-between gap-3"
              >
                <div className="flex gap-3">
                  <img
                    className="w-[50px] h-[50px] object-cover rounded-xl"
                    src={prod.url}
                    alt=""
                  />
                  <p className="text-[1rem] w-[150px] text-paragraph">
                    {prod.name}
                  </p>
                </div>
                <div>
                  <p className="text-[1rem] text-[#eb9834]">
                    {numberWithCommas(prod.price * prod.quantity)} /{" "}
                    <span className="text-paragraph">x</span>
                    <span className="text-[#eb9834]">{prod.quantity}</span>
                  </p>
                  <div className="flex justify-center gap-2">
                    <motion.button
                      whileHover={{
                        scale: 1.2,
                      }}
                      whileTap={{
                        scale: 1,
                      }}
                      onClick={() => removeFromCart(prod.id)}
                    >
                      <MinusCircleIcon className="w-[22px] h-[22px]" />
                    </motion.button>

                    <motion.button
                      whileHover={{
                        scale: 1.2,
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
                    >
                      <PlusCircleIcon className="w-[22px] h-[22px]" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
