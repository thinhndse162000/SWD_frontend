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
        <div 
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}>
            <div className="col-sm-6 offset-sm-3">
            <img src={posts.imageUrl} width="200" height="200" sizes="" alt="Avatar" className="image-products"/>
                <p>ID Products :</p>
                <p>{posts.id}</p>
                <p>Products Name :</p>
                <p>{posts.name}</p>
                <p>Category Id :</p>
                <p>{category.id}</p>
                <p>Category Name :</p>
                <p>{category.name}</p>
                <p>Category Description :</p>
                <p>{category.description}</p>
            </div>
        </div>
      );
}

export default Details;