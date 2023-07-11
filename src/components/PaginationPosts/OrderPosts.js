import React, { useEffect, useState } from "react";
import DashboardHeader from "../DashboardHeader";
import "./styles.css";
import axios from "axios";

const OrderPosts = ({ orders, loading, storeList }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleClick = (event) => {
    console.log(event.currentTarget.id);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredStores = orders.filter((store) => {
    return (
      store.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.user.name
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });
  console.log(orders);
  return (
    <div className="dashboard-content">
      <DashboardHeader />
      <div className="dashboard-content-container">
        <div className="dashboard-content-header"></div>
        <div className="table-content-products">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search Products"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <table>
            <tbody>
              {filteredStores.map((post) => {
                const storeName = storeList.find(
                  (value) => value.id === post.storeId
                ).name;
                return (
                  <tr key={post.id}>
                    <td>
                      <div>
                        <span>{post.id}</span>
                      </div>
                    </td>
                    <td>
                      <span>{post.orderDate}</span>
                    </td>
                    <td>
                      <span>{storeName}</span>
                    </td>
                    <td>
                      <span>{post.status}</span>
                    </td>
                    <td>
                      <div>
                        <img
                          src={post.user.imageUrl}
                          width="200"
                          height="200"
                          sizes=""
                          alt="Avatar"
                          className="image-products"
                        />
                      </div>
                    </td>
                    <td>
                      <span>{post.user.name}</span>
                    </td>
                    <td>
                      <span>${post.total}</span>
                    </td>
                    <td>
                      <a href={"orders/details?id=" + post.id}>
                        <button
                          className="btn btn-primary"
                          id={post.id}
                          type="button"
                          onClick={handleClick}
                        >
                          Details
                        </button>
                      </a>
                    </td>
                    <td>
                      <a href={"orders/details?id=" + post.id}>
                        <button
                          className="btn btn-primary"
                          id={post.id}
                          type="button"
                          onClick={handleClick}
                        >
                          Update
                        </button>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderPosts;
