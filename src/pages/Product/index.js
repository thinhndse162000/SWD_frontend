import React, { useState, useEffect } from "react";
import axios from "axios";
import Posts from "../../components/PaginationPosts/Posts";
import Pagination from "../../components/PaginationPosts/Pagination";
import '../../pages/styles.css'
import { UserAuth } from "../Login/AuthContext";

function Products() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const { logOut, user } = UserAuth();
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(
        "https://vinhomesecommercewebapi.azurewebsites.net/api/v1/Store/5a3bacb6-51d5-22bb-b182-1b8b8623dfb6?include=Products.Category"
      
      ,
        {
          headers:{ 
          'Access-Control-Allow-Origin': '*',
          "Authorization" : `Bearer ${user.accessToken}`,
          }
        });
      const newData = res.data.products.map((item)=> {
        return {
          "id": item.id,
          "name": item.name,
          "price": item.price,
          "imageUrl": item.imageUrl,
          "description": item.description,
          "categoryId" : item.categoryId,
          "categoryName": item.category.name
        }
      
      });
      setPosts(newData);
      setLoading(false);
    };
    fetchPosts();
  }, [user]);
  console.log(posts);
  
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">Product List</h1>
      <Posts  posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
}
export default Products;
