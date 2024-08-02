import Cart from "./Cart";
import ProductSlide from "./ProductSlide";
const Products = () => {
  return (
    <div className="max-w-screen-2xl m-auto flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 gap-6  mt-20">
      <Cart />
      <div className="flex items-center flex-col w-[100%]">
        <ProductSlide />
      </div>
    </div>
  );
};

export default Products;
