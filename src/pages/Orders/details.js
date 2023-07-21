import axios from "axios";
import React,  { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { UserAuth } from "../Login/AuthContext";


function OrderDetails(){
    const [searchParams, setSearchParams] = useSearchParams();
    var orderId = searchParams.get("id");
    const [posts, setPosts] = useState([]);
    const { logOut, user } = UserAuth();
    console.log(searchParams.get("id"));
    useEffect(() => {
        const fetchPosts = async () => {
          const res =  await axios.get("https://vinhomesecommercewebapi.azurewebsites.net/api/v1/Order/"+ orderId +"?include=OrderDetails",
          {
            headers:{ 
            'Access-Control-Allow-Origin': '*',
            "Authorization" : `Bearer ${user.accessToken}`,
            }
          });

          setPosts(res.data);
        };
        fetchPosts();
      }, [user]);
      console.log("posts",posts);
      return (
        <div className="container mt-5">
          <h1 class="text-center text-3x2 font-bold py-8" >Order Detail</h1>
        <div 
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '50vh',
          }}>
            {posts && posts.orderDetails && <div className="col-sm-6 offset-sm-3">
                
                <span>Order ID :</span>
                <span>{posts.id}</span>
                <p></p>
                <span>Quantity :</span>
                <span>{posts.orderDetails && posts.orderDetails[0].quantity}</span>
                <p></p>
                <span>price :</span>
                <span>{posts.orderDetails && posts.orderDetails[0].price}</span>
                <p></p>
                <span>Product Name :</span>
                <span>{posts.orderDetails && posts.orderDetails[0].productName}</span>
            </div>}
        </div>
        </div>
      );
}
export default OrderDetails;