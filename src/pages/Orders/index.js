import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../components/PaginationPosts/Pagination";
import DoneIcon from "../../assets/icons/done.svg";
import CancelIcon from "../../assets/icons/cancel.svg";
import RefundedIcon from "../../assets/icons/refunded.svg";
import OrderPosts from "../../components/PaginationPosts/OrderPosts";

function Orders() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [storeList , setStoreList] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(
        "https://vinhomesecommercewebapi.azurewebsites.net/api/v1/Order?include=User"
      );
      const store = await axios.get(
        "https://vinhomesecommercewebapi.azurewebsites.net/api/v1/Store"
      );
      console.log(res);
      setPosts(res.data.filter((value) => value.storeId  === '726b7918-3aac-4f65-92ff-d2edd7bbd6fa'));
      setStoreList(store.data)
      setLoading(false);
    };
    fetchPosts();
  }, []);
  console.log("Post",posts);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">Orders List</h1>
      <OrderPosts orders={currentPosts} loading={loading} storeList={storeList} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
}

export default Orders;
