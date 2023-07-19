import axios from "axios";
import React,  { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { UserAuth } from "../Login/AuthContext";

const statusList =[
    {
        id: 1,
        name: 'In Cart'
    },
    {
        id: 2,
        name: 'Has Checkout'
    },
    {
        id: 3,
        name: 'Canceled'
    },
    {
        id: 4,
        name: 'Approved'
    },
    {
        id: 5,
        name: 'Decline'
    }
]
function UpdateOrder(){
    const [searchParams, setSearchParams] = useSearchParams();
    var orderId = searchParams.get("id");
    console.log(searchParams.get("id"));
    const [posts, setPosts] = useState([]);
    const [select, setSelected] = useState("");
    const [optionList, setOptionList] = useState(statusList);

    const { logOut, user } = UserAuth();
    useEffect(() => {
        const fetchPosts = async () => {
          const res =  await axios.get("https://vinhomesecommercewebapi.azurewebsites.net/api/v1/Order/"+ orderId +"?include=OrderDetails",{
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
    function updateOrder() {
        const formData = {
          id : posts.id,
          orderDate : posts.orderDate,
          orderNumber : posts.orderNumber,
          total : parseFloat(posts.total),
          customerId : posts.customerId,
          storeId: posts.storeId,
          status: parseInt(select)
        }
        console.log('formData',formData);
        axios.put('https://vinhomesecommercewebapi.azurewebsites.net/api/v1/Order/'+ posts.id,formData,{
          headers: {
            'Access-Control-Allow-Origin': '*',
            "Authorization" : `Bearer ${user.accessToken}`,
          }
        }).then((response) => {
          response.headers = {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "Content-Type",
              "Access-Control-Allow-Methods": "GET, POST, OPTION",
          }
      })
      }
      const StatusComponent = ({ status }) => {
        let statusName;
   
     switch (status) {
       case 1:
         statusName = 'In Cart';
         break;
       case 2:
         statusName = 'Has Check Out';
         break;
       case 3:
         statusName = 'Canceled';
         break;
       case 4:
         statusName = 'Approved';
         break;
       case 5:
         statusName = 'Decline';
         break;
       default:
         statusName = 'Unknown';
     }
   
       return <div>{statusName}</div>;
     };
      return (
        <div className="dashboard-content">
          <div className="dashboard-content-container">
            <div className="dashboard-content-header">
              <h2>Update Order Status</h2>
            </div>
            <div className="col-sm-6 offset-sm-3">
            Order Id : <span>{posts.id}</span>
            <br />
            Order Date : <span>{posts.orderDate}</span>
            <br />
            Order Number : <span>{posts.orderNumber}</span>
            <br />
            Total : <span>{posts.total}$</span>
            <br />
            Customer Id : <span>{posts.customerId}</span>
            <br />
            Store Id : <span>{posts.storeId}</span>
            <br />
            Status Before Change: <span><StatusComponent status = {posts.status}/></span>
            <br />
              <select
                className="form-control"
                disabled={false}
                value={select}
                onChange={(e) => setSelected(e.currentTarget.value)}
                
              >
                {optionList.map((item) => (
                  <option key={item._id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <br />
              <button onClick={updateOrder} className="btn btn-primary">
                Save Order
              </button>
            </div>
          </div>
        </div>
      );
}
export default UpdateOrder;