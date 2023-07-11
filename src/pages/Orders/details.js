import axios from "axios";
import React,  { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function OrderDetails(){
    const [searchParams, setSearchParams] = useSearchParams();
    var orderId = searchParams.get("id");
    const [posts, setPosts] = useState([]);
    console.log(searchParams.get("id"));
    useEffect(() => {
        const fetchPosts = async () => {
          const res =  await axios.get("https://vinhomesecommercewebapi.azurewebsites.net/api/v1/Order/"+ orderId +"?include=OrderDetails");

          setPosts(res.data);
        };
        fetchPosts();
      }, []);
      console.log("posts",posts);
      return (
        <div 
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}>
            {posts && <div className="col-sm-6 offset-sm-3"> 
                <p>Order ID :</p>
                <p>{posts.id}</p>
                <p>Quantity :</p>
                <p>{posts.orderDetails && posts.orderDetails[0].quantity}</p>
                <p>price :</p>
                <p>{posts.orderDetails && posts.orderDetails[0].price}</p>
                <p>Product Name :</p>
                <p>{posts.orderDetails && posts.orderDetails[0].productName}</p>
            </div>}
        </div>
      );
}
export default OrderDetails;