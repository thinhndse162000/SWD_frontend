import React, { useEffect, useState } from "react";
import DashboardHeader from "../DashboardHeader";
import "bootstrap/dist/css/bootstrap.css";

const Posts = ({ posts, loading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleClick = (event) => {
    console.log(event.currentTarget.id);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    
  };
  const filteredStores = posts.filter((store) => {
    return (
      store.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.name.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.description.toString().toLowerCase().includes(searchTerm.toLowerCase()) 
    );
  })
  console.log(filteredStores);
  return (
    <div className="dashboard-content">
      <DashboardHeader btnText="New Products" />
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
              {filteredStores.map((post) => (
                <tr key={post.id}>
                  <td>
                    <div>
                      <img
                        src={post.imageUrl}
                        width="200"
                        height="200"
                        sizes=""
                        alt="Avatar"
                        className="image-products"
                      />
                    </div>
                  </td>
                  <td>
                    <span>{post.categoryName}</span>
                  </td>
                  <td>
                    <span>{post.id}</span>
                  </td>
                  <td>
                    <span>{post.name}</span>
                  </td>
                  <td>
                    <span>{post.description}</span>
                  </td>
                  <td>
                    <span>${post.price}</span>
                  </td>
                  <td>
                    <a href={"products/details?id=" + post.id}>
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
                    <a href={"products/update?id=" + post.id}>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Posts;
