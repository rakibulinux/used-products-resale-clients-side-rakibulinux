import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../../components/Button/PrimaryButton";
import Spinner from "../../../../components/Spinner/Spinner";
import { APIContext } from "../../../../contexts/APIProvider";
import { AuthContext } from "../../../../contexts/AuthProvider";
import { format } from "date-fns";

const AddProduct = () => {
  const { categories, isLoading } = useContext(APIContext);
  const imageHostKey = process.env.REACT_APP_IMG_BB_KEY;
  const { user } = useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();
  const date = format(new Date(), "PP");
  const handleAddProduct = (data) => {
    console.log(data);
    const phoneName = data.name;
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          toast.success("Image upload success");
          const product = {
            categoryId: data.categoryId,
            originalPrice: data.originalPrice,
            resalePrice: data.resalePrice,
            publishedDate: date,
            phoneName: data.name,
            yearsOfUse: data.yearsOfUse,
            phoneNumber: data.phoneNumber,
            email: user?.email,
            seller: {
              name: user?.displayName,
              img: user?.photoURL,
              verify: false,
            },

            location: data.location,
            picture: imgData.data.url,
            condition: data.condition,
            description: data.description,
          };
          // Update in database
          fetch(`${process.env.REACT_APP_API_URL}/products`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("usedPhoneToken")}`,
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((data) => {
              toast.success(`${phoneName} New product added`);
              navigate("/dashboard/seller/my-products");
            });
        }
      });
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <h2 className="text-3xl">Add A Product</h2>
      <div>
        <form onSubmit={handleSubmit(handleAddProduct)} className="card-body">
          <div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone Name</span>
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                name="name"
                placeholder="Enter your phone name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email")}
                type="email"
                name="email"
                className="input input-bordered"
                defaultValue={user?.email}
                disabled
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Original Price</span>
              </label>
              <input
                {...register("originalPrice")}
                type="number"
                name="originalPrice"
                placeholder="Please type Original Price"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Resale Price</span>
              </label>
              <input
                {...register("resalePrice")}
                type="number"
                name="resalePrice"
                placeholder="Please type Resale Price"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Year of purchase</span>
              </label>
              <input
                {...register("yearsOfUse")}
                type="number"
                name="yearsOfUse"
                placeholder="Years Of Use"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                {...register("phoneNumber")}
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                {...register("location")}
                type="text"
                name="location"
                placeholder="Location"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                {...register("categoryId")}
                className="select select-bordered w-full mb-4"
              >
                {categories.map((category) => (
                  <option
                    key={category._id}
                    name="categoryId"
                    value={category._id}
                  >
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Condition</span>
              </label>
              <select
                {...register("condition")}
                className="select select-bordered w-full mb-4"
              >
                <option value="excelent">Excelent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                {...register("image", { required: true })}
                type="file"
                name="image"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                {...register("description")}
                type="number"
                name="description"
                placeholder="Phone description"
                className="input input-bordered"
              />
            </div>
          </div>
          <div className="form-control mt-6">
            <PrimaryButton
              type="submit"
              classes="w-full px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 hover:text-white text-gray-100"
            >
              Add A Product
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
