import React, { useState } from "react";

import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../config/superbaseClient";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(1);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [nameError, setNameError] = useState(null);
  const [priceError, setPriceError] = useState(null);
  const [categoryError, setCategoryError] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [popUpMessage, setPopUpMessage] = useState(false);

  const navigate = useNavigate();

  const errorCase = "text-[red] text-[0.8rem] ";
  const successCase = "text-[green] text-[0.8rem] ";

  const onBlurName = () => {
    if (name === "") {
      setNameError(true);
    } else {
      setNameError(false);
    }
  };

  const onBlurPrice = () => {
    if (price === "") {
      setPriceError(true);
    } else {
      setPriceError(false);
    }
  };

  const onBlurCategory = () => {
    if (category === "") {
      setCategoryError(true);
    } else {
      setCategoryError(false);
    }
  };

  const onBlurImage = () => {
    if (image === "") {
      setImageError(true);
    } else {
      setImageError(false);
    }
  };

  const onBlurDescription = () => {
    if (description === "") {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }
  };

  const continueButton = () => {
    setPopUpMessage(false);
  };

  const backToHomeButton = () => {
    setPopUpMessage(false);
    navigate("/");
  };

  const addProductHandle = async (e) => {
    e.preventDefault();
    if (name === "") {
      setNameError(true);
    }
    if (price === "") {
      setPriceError(true);
    }
    if (category === "") {
      setCategoryError(true);
    }
    if (image === "") {
      setImageError(true);
    }
    if (description === "") {
      setDescriptionError(true);
    }
    if (
      (nameError === false) &
      (priceError === false) &
      (categoryError === false) &
      (imageError === false) &
      (descriptionError === false)
    ) {
      const { data, error } = await supabase
        .from("products")
        .insert([{ name, price, description, category, url: image }])
        .select();

      setPopUpMessage(true);
      setImage("");
      setName("");
      setPrice(1);
      setDescription("");
      setCategory("");
      setDescriptionError(null);
      setCategoryError(null);
      setImageError(null);
      setNameError(null);
      setPriceError(null);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-40 h-fit border-2 border-zinc-400 p-6 rounded-xl">
      {popUpMessage && (
        <div className="absolute flex justify-center items-center left-0 top-0 w-[100vw] h-[100vh]">
          <div className="w-full h-full bg-black opacity-80"></div>
          <motion.div
            animate={{
              scale: 1,
            }}
            initial={{ scale: 0.5 }}
            className="absolute top-24 flex flex-col gap-4 bg-[#ffff] text-[black] p-10 z-10 rounded-md border-4 border-orange-400"
          >
            <h1 className="text-topic font-bold text-[1.5rem]">
              Create product successfully!!
            </h1>
            <div className="flex items-center justify-center gap-5">
              <button
                onClick={backToHomeButton}
                className="bg-orange-400 p-1 rounded-md font-bold"
              >
                Back to home
              </button>
              <button
                onClick={continueButton}
                className="bg-orange-400 p-1 rounded-md font-bold"
              >
                Countinue
              </button>
            </div>
          </motion.div>
        </div>
      )}
      <h1 className="text-3xl">Add a New Product</h1>
      <form onSubmit={addProductHandle} className="flex flex-col gap-8 mt-4">
        <div className="flex flex-col">
          <div className="flex items-center">
            <label className="mr-4">Name</label>
            {nameError === true && <b className={errorCase}>*Missing name</b>}
            {nameError === false && <b className={successCase}>*</b>}
          </div>
          <input
            className="bg-transparent outline-none border-b-2 border-zinc-400 "
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={onBlurName}
          />
        </div>
        <div className="flex items-center gap-10">
          <div>
            <div className="flex items-center gap-5">
              <label className="mr-4">Price</label>
              {priceError === true && (
                <b className={errorCase}>*Missing price</b>
              )}
              {priceError === false && <b className={successCase}>*</b>}
            </div>

            <input
              className="bg-transparent outline-none border-b-2 border-zinc-400 "
              type="number"
              min={1}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onBlur={onBlurPrice}
            />
          </div>
          <div>
            <label className="mr-4">Category</label>
            {categoryError === true && (
              <b className={errorCase}>*Missing category</b>
            )}
            {categoryError === false && <b className={successCase}>*</b>}
            <input
              className="bg-transparent outline-none border-b-2 border-zinc-400 "
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onBlur={onBlurCategory}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            <label className="mr-4">Image_url</label>
            {imageError === true && (
              <b className={errorCase}>*Missing Image_url</b>
            )}
            {imageError === false && <b className={successCase}>*</b>}
          </div>
          <input
            className="bg-transparent outline-none border-b-2 border-zinc-400 "
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            onBlur={onBlurImage}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className="mr-4">Description</label>
            {descriptionError === true && (
              <b className={errorCase}>*Missing Description</b>
            )}
            {descriptionError === false && <b className={successCase}>*</b>}
          </div>
          <textarea
            className="bg-transparent outline-none border-2 border-zinc-400 rounded-lg p-2 "
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={onBlurDescription}
          />
        </div>
        <div className="flex justify-end gap-10 items-center mt-3W  ">
          <Link to={"/"}>
            <motion.button
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{
                scale: 1,
              }}
              className="border-2 border-zinc-400 rounded-md py-2 px-4 "
            >
              Back
            </motion.button>
          </Link>
          <motion.button
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{
              scale: 1,
            }}
            className="border-2 border-zinc-400 rounded-md py-2 px-4  "
            type="submit"
          >
            Submit
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
