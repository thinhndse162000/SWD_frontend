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
        <div 
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}>
            {posts && posts.orderDetails && <div className="col-sm-6 offset-sm-3"> 
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