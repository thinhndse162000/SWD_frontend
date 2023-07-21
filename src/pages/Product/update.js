import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { UserAuth } from "../Login/AuthContext";

const statusList = [
  {
    id: 1,
    name: "Active",
  },
  {
    id: 2,
    name: "Inactive",
  },
  {
    id: 3,
    name: "Disabled",
  },
];
function UpdateProduct() {
  const [searchParams, setSearchParams] = useSearchParams();
  var orderId = searchParams.get("id");
  const [posts, setPosts] = useState([]);
  const [select, setSelected] = useState("");
  const [optionList, setOptionList] = useState(statusList);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const { logOut, user } = UserAuth();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPosts({ ...posts, [name]: value });
    };
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        "https://vinhomesecommercewebapi.azurewebsites.net/api/v1/Product/" +
          orderId,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      setPosts(res.data);
    };
    fetchPosts();
  }, [user]);
  function updateProduct() {
    const formData =  
    { 
        ...posts,
      price: parseFloat(posts.price),
      status: parseInt(posts.status),  
    };

    console.log("formData", formData);
    axios
      .put(
        "https://vinhomesecommercewebapi.azurewebsites.net/api/v1/Product/" +
          posts.id,
        formData,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((response) => {
        response.headers = {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, OPTION",
        };
      });
  }
  console.log("posts", posts);
  return (
    <div className="dashboard-content">
      <div className="dashboard-content-container">
        <div className="dashboard-content-header">
          <h2>Update Order Status</h2>
        </div>
        <div className="col-sm-6 offset-sm-3">
          Name Of Product
          <input
            type="text"
            className="form-control"
            value={posts.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          <br />
          Description
          <input
            type="text"
            className="form-control"
            value={posts.description}
            name="description"
            onChange={(e) => handleChange(e)}
          />
          <br />
          Price
          <input
            type="text"
            className="form-control"
            value={posts.price}
            name="price"
            onChange={(e) => handleChange(e)}
          />
          <br />
          <select
            className="form-control"
            disabled={false}
            value={posts.status}
            name="status"
            onChange={(e) => handleChange(e)}
          >
            {optionList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <br />
          <span>Category ID : {posts.categoryId}</span>
          <br />
          <span>Store ID :{posts.storeId}</span>
          <br />
          <img
            src={posts.imageUrl}
            width="200"
            height="200"
            sizes=""
            alt="Avatar"
            className="image-products"
          />
          <br />
          <button onClick={updateProduct} className="btn btn-primary">
            Save Order
          </button>
        </div>
      </div>
    </div>
  );
}
export default UpdateProduct;
