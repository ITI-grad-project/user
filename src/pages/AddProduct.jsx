import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import notify from "../hooks/useNotification";
import { ToastContainer } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";

import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const AddProduct = ({ listOfCategories }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState(false);
  const [previewImage, setPreviewImage] = useState(false);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const [prodPhotos, setProdPhotos] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [fileList, setFileList] = useState([]);

  let countries = [
    "Cairo",
    "Ismailia",
    "PortSaid",
    "Alexandria",
    "Suez",
    "Giza",
  ];
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function fetchProductById() {
      const { data } = await axios.get(
        `https://bekya.onrender.com/api/v1/products/${id}`
      );
      setProductName(data.data.title);
      setPrice(data.data.price);
      setDescription(data.data.description);
      setCountry(data.data.country);
      setCategoryId(data.data.category._id);
      setPhone(data.data.phone);
      setProdPhotos(data.data.images);
      setFileList(
        data.data.images.map((image) => {
          return { url: image.image, _id: image._id };
        })
      );
    }

    if (id !== "add") {
      fetchProductById();
    } else {
      setProductName("");
      setPrice("");
      setDescription("");
      setCountry("Pick one");
      setCategoryId("Pick one");
      setPhone("");
      setFileList([]);
    }
  }, [id]);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleBeforeUpload = async (file) => {
    if (id != "add") {
      const formData = new FormData();
      formData.append("image", file);
      try {
        const res = await axios.put(
          `https://bekya.onrender.com/api/v1/products/addPhoto/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (res.data.message) {
          const newFilesList = res.data.data.map((image) => ({
            url: image.image,
            _id: image._id,
          }));
          setFileList(newFilesList);
          notify(res.data.message, "success");
        }
      } catch (err) {
        if (err.response.data.message) {
          notify(err.response.data.message, "error");
        }
      }
    }
  };

  const handleChange = async ({ fileList: newFileList }) => {
    if (id == "add") {
      setFileList(newFileList);
    }
    setUploadedImages(newFileList.map((item) => item.originFileObj));
  };

  const handleRemove = async (file) => {
    if (id != "add") {
      try {
        const res = await axios.delete(
          `https://bekya.onrender.com/api/v1/products/deletePhoto/${file._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status == 204) {
          setFileList(fileList.filter((ele) => ele._id != file._id));
          notify("imaged deleted successfully", "success");
        }
      } catch (err) {
        if (err.response.data.message) {
          notify(err.response.data.message, "error");
        }
      }
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("phone", data.phone);
      formData.append("country", data.country);
      for (let i = 0; i < uploadedImages.length; i++) {
        formData.append("images", uploadedImages[i]);
      }
      if (id === "add") {
        const response = await axios.post(
          "https://bekya.onrender.com/api/v1/products/",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data) {
          notify("product added successfully", "success");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } else {
        const response = await axios.put(
          `https://bekya.onrender.com/api/v1/products/${id}`,
          {
            ...(price && { price }),
            ...(description && { description }),
            ...(country && { country }),
            ...(productName && { title: productName }),
            ...(categoryId && { category: categoryId }),
            ...(phone && { phone }),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data) {
          notify("product updated successfully", "success");
        }
      }
    } catch (error) {
      if (error?.response?.data?.errors) {
        let arr = error.response.data.errors.map((err) => err.msg);
        arr.forEach((ele) => notify(ele, "error"));
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="flex flex-col justify-center items-center m-10">
        <h2 className="font-bold text-3xl uppercase text-center">
          {id === "add" ? `Add Product` : `Edit Product`}
        </h2>
        <hr className="w-16 bg-primary h-1 mt-2" />
      </div>
      <div className="flex justify-center px-4 md:px-10">
        <div className="form flex-1 p-4 w-full md:w-1/2">
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text text-base">Product Name</span>
              </label>
              <input
                {...(id == "add" && {
                  ...register("name", { required: true, minLength: 5 }),
                })}
                type="text"
                placeholder="Type here"
                className="input input-bordered border-primary w-full  focus:outline-primary"
                onChange={(e) => {
                  setProductName(e.target.value);
                }}
                value={productName}
              />
              {errors.name?.type === "required" && (
                <span className="text-red-500 ">Product name is required</span>
              )}
              {errors.name?.type === "minLength" && (
                <span className="text-red-500">
                  The name must be greater than 5 characters
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                {...(id == "add" && {
                  ...register("description", { required: true, minLength: 3 }),
                })}
                className="textarea textarea-bordered border-primary h-24 focus:outline-primary"
                placeholder="Bio"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                value={description}
              ></textarea>
              {errors.description?.type === "required" && (
                <span className="text-red-500 ">
                  Product description is required
                </span>
              )}
              {errors.name?.type === "minLength" && (
                <span className="text-red-500">
                  The description must be greater than 3 characters
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                {...(id == "add" && {
                  ...register("price", { required: true }),
                })}
                type="number"
                className="input input-bordered border-primary w-full focus:outline-primary"
                placeholder="Price"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                value={price}
              ></input>
              {errors.price?.type === "required" && (
                <span className="text-red-500 ">
                  Products price is required
                </span>
              )}
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Categories</span>
              </label>
              <select
                {...(id == "add" && {
                  ...register("category", { required: true }),
                })}
                className="select select-bordered border-primary w-full  focus:outline-primary"
                onChange={(e) => {
                  setCategoryId(e.target.value);
                }}
                value={categoryId}
              >
                <option disabled selected>
                  Pick one
                </option>
                {listOfCategories?.map((category) => {
                  return <option value={category._id}>{category.name}</option>;
                })}
              </select>
              {errors.category?.type === "required" && (
                <span className="text-red-500 ">Category is required</span>
              )}
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                {...(id == "add" && {
                  ...register("phone", { required: true }),
                })}
                type="text"
                placeholder="Type here"
                className="input input-bordered border-primary w-full  focus:outline-primary"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                value={phone}
              />
              {errors.phone?.type === "required" && (
                <span className="text-red-500 ">Phone is required</span>
              )}
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Country</span>
              </label>
              <select
                {...(id == "add" && {
                  ...register("country", { required: true }),
                })}
                className="select select-bordered border-primary w-full  focus:outline-primary"
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                value={country}
              >
                <option disabled selected>
                  Pick one
                </option>
                {countries?.map((country) => {
                  return <option value={country}>{country}</option>;
                })}
              </select>
              {errors.country?.type === "required" && (
                <span className="text-red-500 ">Country is required</span>
              )}
            </div>
            <div className="btn-group btn-group-vertical w-full lg:btn-group-horizontal">
              {isLoading ? (
                <ThreeDots
                  wrapperClass="text-primary flex justify-center items-center"
                  color="currentColor"
                />
              ) : (
                <button
                  type="submit"
                  className="btn btn-active w-full mt-5 btn-outline hover:bg-white hover:border-primary hover:text-primary rounded-lg text-white  "
                >
                  {id === "add" ? "Add Product" : "Update"}
                </button>
              )}
            </div>
            {/* </div> */}
          </form>
        </div>

        <div className="image p-6 w-full md:w-1/2">
          <h4 className="pb-2">Product Images</h4>
          <div className="flex flex-col justify-center items-center  border border-primary rounded p-4 ">
            <div className="mx-auto">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={handleRemove}
                beforeUpload={handleBeforeUpload}
                className="justify-center"
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
            </div>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{
                  width: "100%",
                }}
                src={previewImage}
              />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
