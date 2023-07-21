import axios from "axios";
import React,  { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { UserAuth } from "../Login/AuthContext";


function Details (){
    const [searchParams, setSearchParams] = useSearchParams();
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState([]);
    const { logOut, user } = UserAuth();
    const config = {
      headers:{
        'Access-Control-Allow-Origin': '*',
        'Authorization' : `Bearer ${user.accessToken}`,
      }
    };

    console.log(searchParams.get("id"));
    useEffect(() => {
        const fetchPosts = async () => {
          const res = axios.get("https://vinhomesecommercewebapi.azurewebsites.net/api/v1/Product/"+ searchParams.get("id") +"?include=Category",
          config);
          setPosts((await res).data);
          setCategory((await res).data.category);
        };
        fetchPosts();
      }, [user]);
      console.log(category);
      console.log(posts);
    // axios.get("https://vinhomesecommercewebapi.azurewebsites.net/api/v1/Product/"+ searchParams.get("id") +"?include=Inventory")
    return (
      <div className="container mt-5">
        <h1 class="text-center text-3x2 font-bold py-8" >Product Detail</h1>
        <div 
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '50vh',
          }}>
         
            <div className="col-sm-6 offset-sm-3">
            <img src={posts.imageUrl} width="200" height="200" sizes="" alt="Avatar" className="image-products"/>
                <p></p>
                <span>ID Products :</span>
                <span>{posts.id}</span>
                <p></p>
                <span>Products Name :</span>
                <span>{posts.name}</span>
                <p></p>
                <span>Category Id :</span>
                <span>{category.id}</span>
                <p></p>
                <span>Category Name :</span>
                <span>{category.name}</span>
                <p></p>
                <span>Category Description :</span>
                <span>{category.description}</span>
            </div>
        </div>
      </div>
      );
}

export default Details;