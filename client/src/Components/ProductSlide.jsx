import { useEffect, useState } from "react";
import slide_1 from "../assets/slide_images/slide_1.jpg";
import slide_2 from "../assets/slide_images/slide_2.jpg";
import slide_3 from "../assets/slide_images/slide_3.jpg";
import { StopIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
const images = [slide_1, slide_2, slide_3];

const ProductSlide = () => {
  const [currentImageSlide, setCurrentImageSlide] = useState(0);

  const imageSlideHandle = (index) => {
    setCurrentImageSlide(index);
  };

  useEffect(() => {
    if (currentImageSlide > 2) {
      setCurrentImageSlide(0);
    }
    const interval = setInterval(() => {
      setCurrentImageSlide(currentImageSlide + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentImageSlide]);

  return (
    <div className="relative w-[100%]  lg:w-[70%] h-fit border-2 border-zinc-400 rounded-md overflow-hidden">
      <div className="absolute bg-black w-full h-full opacity-30"></div>
      <img
        className="w-full h-[300px] object-cover"
        src={images[currentImageSlide]}
        alt=""
      />
      <div className="absolute flex items-center gap-5 left-[45%] bottom-5  text-gray-300">
        {images.map((item, index) => {
          return (
            <motion.button
              key={item}
              animate={{
                scale: index === currentImageSlide ? 1.2 : 0.7,
                color: index === currentImageSlide ? "yellow" : "white",
              }}
              onClick={() => imageSlideHandle(index)}
              className="w-[25px] h-[25px] outline-none"
            >
              <StopIcon />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSlide;
